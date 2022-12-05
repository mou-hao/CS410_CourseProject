let colors = {
    pBg: '',
    pFg: '',
    lpBg: '',
    lpFg: '',
    neuBg: '',
    neuFg: '',
    lnBg: '',
    lnFg: '',
    nBg: '',
    nFg: ''
}

chrome.storage.local.get([
    'pBg', 'pFg', 'lpBg', 'lpFg', 'neuBg', 'neuFg', 'lnBg', 'lnFg', 'nBg', 'nFg'
]).then((result) => {
    colors = result;
});

chrome.storage.onChanged.addListener((changes, namespace) => {
    for (let [key, { oldValue, newValue }] of Object.entries(changes)) {
        if (key.endsWith('Fg') || key.endsWith('Bg')) {
            colors[key] = newValue;
        }
    }
});

function genScoreHTML(score) {
    let backgroundColor = '';
    let foregroundColor = '';
    if (score < -0.6) {
        backgroundColor = colors.nBg;
        foregroundColor = colors.nFg;
    } else if (score < -0.2) {
        backgroundColor = colors.lnBg;
        foregroundColor = colors.lnFg
    } else if (score < 0.2) {
        backgroundColor = colors.neuBg;
        foregroundColor = colors.neuFg;
    } else if (score < 0.6) {
        backgroundColor = colors.lpBg;
        foregroundColor = colors.lpFg;
    } else {
        backgroundColor = colors.pBg;
        foregroundColor = colors.pFg;
    }

    const style = 'padding:0.15em;padding-left:0.3em;font-size:90%'
    return `<div style="background-color:${backgroundColor};color:${foregroundColor};${style}">${score}</div>`;
}

function hashCode(str) {
    let hash = 0;
    for (let i = 0, len = str.length; i < len; i++) {
        let chr = str.charCodeAt(i);
        hash = (hash << 5) - hash + chr;
        hash |= 0;
    }
    return hash;
}

function waitForElement(selector) {
    return new Promise(resolve => {
        if (document.querySelector(selector)) {
            return resolve(document.querySelector(selector));
        }

        const observer = new MutationObserver(mutations => {
            if (document.querySelector(selector)) {
                resolve(document.querySelector(selector));
                observer.disconnect();
            }
        });

        observer.observe(document.body, {
            childList: true,
            subtree: true
        });
    });
}

let nodeHash = '';
let observer = null;

chrome.runtime.onMessage.addListener((message, sender, sendReponse) => {
    if (message.isRedditComments) {
        waitForElement('[data-testid="comment"]').then((elem) => {
            if (observer) {
                observer.disconnect();
            }

            const targetNode = elem
                .parentElement.parentElement.parentElement.parentElement
                .parentElement.parentElement.parentElement;
            const config = { attributes: false, childList: true, subtree: true };

            let commentNodes = document.querySelectorAll('[data-testid="comment"]');
            commentNodes.forEach(n => {
                if (n.childElementCount > 1) return;
                let score = myBundle.score(n.textContent);
                n.firstChild.insertAdjacentHTML('beforebegin', genScoreHTML(score));
            });
            nodeHash = hashCode(targetNode.innerHTML);

            observer = new MutationObserver(mutations => {
                for (_ of mutations) {
                    let newHash = hashCode(targetNode.innerHTML);
                    if (nodeHash === newHash) {
                        continue;
                    } else {
                        nodeHash = newHash;
                    }
                    let commentNodes = document.querySelectorAll('[data-testid="comment"]');
                    commentNodes.forEach(n => {
                        if (n.childElementCount > 1) return;
                        let score = myBundle.score(n.textContent);
                        n.firstChild.insertAdjacentHTML('beforebegin', genScoreHTML(score));
                    });
                }
            });
            observer.observe(targetNode, config);
        });
    }
});