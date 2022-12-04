let on = false;

chrome.storage.local.get('on').then((result) => {
    on = result.on;
    chrome.storage.onChanged.addListener((changes, namespace) => {
        for (let [key, { oldValue, newValue }] of Object.entries(changes)) {
            if (key === 'on') {
                on = newValue;
            }
        }
    });
});

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if (on && changeInfo.status === 'complete' &&
        /.+\:\/\/www\.reddit\.com\/r\/.+\/comments\/.+/.test(tab.url)
    ) {
        chrome.tabs.sendMessage(tabId, { isRedditComments: true });
    }
});