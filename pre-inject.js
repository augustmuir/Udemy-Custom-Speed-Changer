// pre-inject.js
chrome.storage.sync.get("udemyChangerSpeeds", (data) => {
    if (Array.isArray(data.udemyChangerSpeeds)) {
        try {
            localStorage.setItem('udemyChangerSpeeds', JSON.stringify(data.udemyChangerSpeeds));
        } catch(e) {}
    }
});
