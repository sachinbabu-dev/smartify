import { actions } from "./BackgroundAction.js";
import { WelcomePage } from "./welcome.js";
const id = chrome.runtime.id;
const MenuInspectId = "font-inspect";
const analyzed = [];
class BackgroundPage {
    initialize() {
        new WelcomePage();
        chrome.action.onClicked.addListener(() => this.onFeatureActivated());
        chrome.runtime.onMessage.addListener((...params) => this.onMessage(...params));
        chrome.contextMenus.onClicked.addListener((...params) => this.onCtxClicked(...params));
        this.createCtxMenus();
    }
    onMessage(request, sender, respond) {
        if (sender.id != id || !request?.cmd) {
            return;
        }
        if (!sender.tab || !sender.tab.id) {
            return;
        }
        const tabId = sender.tab.id;
        if (request.cmd === 'release') {
            actions.release(sender.tab);
        }
        else if (request.cmd === 'open') {
            chrome.tabs.create({
                url: request.url,
                windowId: request.windowId
            });
        }
        else if (request.cmd === 'percent') {
            chrome.browserAction.setBadgeText({
                tabId,
                text: request.done ? '' : request.value
            });
        }
        else if (request.cmd === 'analyze') {
            actions.selection(sender.tab, sender);
        }
        else if (request.cmd === 'get') {
            respond?.(analyzed.shift());
        }
        else if (request.cmd === 'analyzed') {
            actions.release(sender.tab);
            request.url = sender.tab.url;
            analyzed.push(request);
            chrome.runtime.sendMessage('close-inspector');
            const prefs = { width: 500, height: 600 };
            chrome.windows.getCurrent(win => {
                request.id = win.id;
                const left = win.left + Math.round((win.width - 500) / 2);
                const top = win.top + Math.round((win.height - 600) / 2);
                chrome.windows.create({
                    url: chrome.runtime.getURL('data/window/index.html?mode=window'),
                    type: 'panel',
                    left,
                    top,
                    width: Math.max(prefs.width, 200),
                    height: Math.max(prefs.height, 200)
                });
            });
        }
        else if (request.cmd === "persist") {
            actions.persist(...request.params);
        }
    }
    createCtxMenus() {
        try {
            chrome.contextMenus.create({
                id: MenuInspectId,
                title: "Inspect Font on this Page",
                contexts: ["all"],
            });
        }
        catch { }
    }
    async onCtxClicked(info, tab) {
        const tabId = tab?.id;
        if (!tabId) {
            return;
        }
        await this.onFeatureActivated(tabId);
    }
    async onFeatureActivated(tabId) {
        tabId ??= await this.getActiveTabIdAsync();
        if (!tabId) {
            return;
        }
        await this.injectIfNotAsync(tabId);
        await this.injectScriptsAsync(tabId, "/data/inject/select.js");
        actions.setIcons(tabId);
    }
    async injectIfNotAsync(tabId) {
        let injected = false;
        try {
            injected = await new Promise((r, rej) => {
                chrome.tabs.sendMessage(tabId, { op: "confirm" }, (res) => {
                    const err = chrome.runtime.lastError;
                    if (err) {
                        rej(err);
                    }
                    r(res);
                });
            });
        }
        catch {
            injected = false;
        }
        if (injected) {
            return tabId;
        }
        await this.injectCssAsync(tabId, "/data/inject/select.css");
        await this.injectScriptsAsync(tabId, "/js/InjectionSignal.js");
        return tabId;
    }
    async getActiveTabIdAsync() {
        return (await chrome.tabs.query({
            active: true,
        }))[0]?.id;
    }
    async injectCssAsync(tabId, ...styles) {
        for (let style of styles) {
            await chrome.scripting.insertCSS({
                target: {
                    tabId,
                    allFrames: true,
                },
                files: [style,]
            });
        }
    }
    async injectScriptsAsync(tabId, ...scripts) {
        for (let script of scripts) {
            await chrome.scripting.executeScript({
                target: {
                    tabId,
                    allFrames: true,
                },
                files: [script,]
            });
        }
    }
}
new BackgroundPage().initialize();
//# sourceMappingURL=background.js.map