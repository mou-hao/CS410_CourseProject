chrome.runtime.onInstalled.addListener(() => {
    chrome.storage.local.set({
        pBg: '#2E8B57',
        pFg: '#FFFFFF',
        lpBg: '#90EE90',
        lpFg: '#FFFFFF',
        neuBg: '#F0E68C',
        neuFg: '#FFFFFF',
        lnBg: '#FFA07A',
        lnFg: '#FFFFFF',
        nBg: '#CD5C5C',
        nFg: '#FFFFFF',
        on: true
    });
});

let on = false;

chrome.storage.local.get('on').then((result) => {
    on = result.on;
});

chrome.storage.onChanged.addListener((changes, namespace) => {
    for (let [key, { oldValue, newValue }] of Object.entries(changes)) {
        if (key === 'on') {
            on = newValue;
        }
    }
});

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if (on && /.+\:\/\/www\.reddit\.com\/r\/.+\/comments\/.+/.test(tab.url)
    ) {
        chrome.tabs.sendMessage(tabId, { isRedditComments: true });
    }
});