const targetNode = document.querySelector('[data-testid="comment"]')
                           .parentElement.parentElement.parentElement.parentElement.parentElement
                           .parentElement.parentElement;
const config = { attributes: false, childList: true, subtree: true}

let numComment = 0;

const callback = (mutationList, observer) => {
    for (const mutation of mutationList) {
        let commentNodes = document.querySelectorAll('[data-testid="comment"]');
        if (commentNodes.length === numComment) {
            continue;
        }
        numComment = commentNodes.length;
        commentNodes.forEach(n => {
            if (n.childElementCount > 1) return;
            let score = myBundle.score(n.textContent);
            // console.log("- " + text);
            // console.log("  " + myBundle.score(text));
            n.firstChild.insertAdjacentHTML('afterend', '<div hidden>'+score+'</div>');
        });
    }
}

const observer = new MutationObserver(callback);
observer.observe(targetNode, config);