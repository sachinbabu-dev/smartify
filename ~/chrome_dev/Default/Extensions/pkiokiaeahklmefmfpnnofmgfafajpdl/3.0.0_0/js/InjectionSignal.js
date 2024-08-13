"use strict";
const extId = chrome.runtime.id;
class InjectionScript {
    init() {
        chrome.runtime.onMessage.addListener((...params) => this.onMessage(...params));
    }
    onMessage(msg, sender, sendRes) {
        if (sender.id != extId || !msg?.op) {
            return;
        }
        switch (msg.op) {
            case "confirm":
                console.debug("Already injected");
                return void sendRes(true);
            default:
                console.error("Unknown OP: " + msg.op);
        }
    }
}
new InjectionScript().init();
//# sourceMappingURL=InjectionSignal.js.map