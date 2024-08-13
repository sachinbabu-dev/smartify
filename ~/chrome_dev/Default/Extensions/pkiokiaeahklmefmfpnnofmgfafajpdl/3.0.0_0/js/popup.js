"use strict";
class PopupPage {
    init() {
        this.initRateUs();
        document.body.loc();
    }
    initRateUs() {
        const updateUrl = chrome.runtime.getManifest().update_url?.toLowerCase();
        const id = chrome.runtime.id;
        const storeUrl = (updateUrl && updateUrl.includes("microsoft")) ?
            `https://microsoftedge.microsoft.com/addons/detail/` + id :
            "https://chrome.google.com/webstore/detail/" + id;
        document.querySelectorAll(".btn-rate").forEach(el => el.setAttribute("href", storeUrl));
    }
}
new PopupPage().init();
//# sourceMappingURL=popup.js.map