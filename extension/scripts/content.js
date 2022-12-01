const targetNode = document.querySelector('[data-testid="comment"]')
                           .parentElement.parentElement.parentElement.parentElement.parentElement
                           .parentElement.parentElement;
const config = { attributes: false, childList: true, subtree: true }

function genScoreHTML(score) {
    const negativeColor = 'indianred';
    const leanNegativeColor = 'lightsalmon';
    const neutralColor = 'khaki';
    const leanPositiveColor = 'lightgreen';
    const positiveColor = 'seagreen';
    const textColor = 'white';

    let backgroundColor = '';
    if (score < -0.6) {
        backgroundColor = negativeColor;
    } else if (score < -0.2) {
        backgroundColor = leanNegativeColor;
    } else if (score < 0.2) {
        backgroundColor = neutralColor;
    } else if (score < 0.6) {
        backgroundColor = leanPositiveColor;
    } else {
        backgroundColor = positiveColor;
    }

    const style='padding:0.15em;padding-left:0.3em;font-size:90%'
    return `<div style="background-color:${backgroundColor};color:${textColor};${style}">${score}</div>`;
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

let nodeHash = '';

const callback = (mutationList, _) => {
    for (const _ of mutationList) {
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
}

const observer = new MutationObserver(callback);
observer.observe(targetNode, config);