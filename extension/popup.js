const pBg = document.querySelector('#pBg');
const pFg = document.querySelector('#pFg');
const lpBg = document.querySelector('#lpBg');
const lpFg = document.querySelector('#lpFg');
const neuBg = document.querySelector('#neuBg');
const neuFg = document.querySelector('#neuFg');
const lnBg = document.querySelector('#lnBg');
const lnFg = document.querySelector('#lnFg');
const nBg = document.querySelector('#nBg');
const nFg = document.querySelector('#nFg');

const onRadioButton = document.querySelector('#on');
const offRadioButton = document.querySelector('#off');

chrome.storage.local.get('init').then((result) => {
    if (!result.init) {
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
            on: true,
            init: true
        });

        pBg.value = '#2E8B57';
        pFg.value = '#FFFFFF';
        lpBg.value = '#90EE90';
        lpFg.value = '#FFFFFF';
        neuBg.value = '#F0E68C';
        neuFg.value = '#FFFFFF';
        lnBg.value = '#FFA07A';
        lnFg.value = '#FFFFFF';
        nBg.value = '#CD5C5C';
        nFg.value = '#FFFFFF';
    
        onRadioButton.checked = true;
        offRadioButton.checked = false;
    } else {
        chrome.storage.local.get([
            'pBg', 'pFg', 'lpBg', 'lpFg', 'neuBg', 'neuFg', 'lnBg', 'lnFg', 'nBg', 'nFg', 'on'
        ]).then((result) => {
            pBg.value = result.pBg;
            pFg.value = result.pFg;
            lpBg.value = result.lpBg;
            lpFg.value = result.lpFg;
            neuBg.value = result.neuBg;
            neuFg.value = result.neuFg;
            lnBg.value = result.lnBg;
            lnFg.value = result.lnFg;
            nBg.value = result.nBg;
            nFg.value = result.nFg;
        
            onRadioButton.checked = result.on;
            offRadioButton.checked = !result.on;
        });
    }
});

pBg.addEventListener('input', (event) => {
    chrome.storage.local.set({ pBg: event.target.value });
});
pFg.addEventListener('input', (event) => {
    chrome.storage.local.set({ pFg: event.target.value });
});
lpBg.addEventListener('input', (event) => {
    chrome.storage.local.set({ lpBg: event.target.value });
});
lpFg.addEventListener('input', (event) => {
    chrome.storage.local.set({ lpFg: event.target.value });
});
neuBg.addEventListener('input', (event) => {
    chrome.storage.local.set({ neuBg: event.target.value });
});
neuFg.addEventListener('input', (event) => {
    chrome.storage.local.set({ neuFg: event.target.value });
});
lnBg.addEventListener('input', (event) => {
    chrome.storage.local.set({ lnBg: event.target.value });
});
lnFg.addEventListener('input', (event) => {
    chrome.storage.local.set({ lnFg: event.target.value });
});
nBg.addEventListener('input', (event) => {
    chrome.storage.local.set({ nBg: event.target.value });
});
nFg.addEventListener('input', (event) => {
    chrome.storage.local.set({ nFg: event.target.value });
});

onRadioButton.addEventListener('click', (event) => {
    chrome.storage.local.set({ on: true });
});
offRadioButton.addEventListener('click', (event) => {
    chrome.storage.local.set({ on: false });
});