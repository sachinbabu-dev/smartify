export const actions = {
    persist: (left, top, width, height) => chrome.storage.local.set({
        width,
        height,
        left,
        top
    }),
    selection: (tab, info) => {
        if (!tab.id) {
            return;
        }
        chrome.scripting.executeScript({
            target: {
                tabId: tab.id,
            },
            files: ["/data/inject/analyze.js"]
        });
    },
    release: (tab) => {
        if (!tab.id) {
            return;
        }
        actions.setIcons(tab.id, false);
        chrome.tabs.sendMessage(tab.id, 'release');
        chrome.scripting.executeScript({
            target: {
                tabId: tab.id,
            },
            func: () => [...document.querySelectorAll('#font-finder-embedded-div')].forEach(d => d.remove()),
        });
    },
    setIcons: (tabId, inspected = true) => {
        const prefix = inspected ? "/img/inspect/" : "/";
        chrome.action.setIcon({
            tabId,
            path: {
                "512": prefix + "icon-512.png",
                "256": prefix + "icon-256.png",
                "192": prefix + "icon-192.png",
                "128": prefix + "icon-128.png",
                "96": prefix + "icon-96.png",
                "72": prefix + "icon-72.png",
                "64": prefix + "icon-64.png",
                "48": prefix + "icon-48.png",
                "32": prefix + "icon-32.png",
                "16": prefix + "icon-16.png"
            },
        });
    }
};
//# sourceMappingURL=BackgroundAction.js.map