const script = document.createElement("script");
script.src = chrome.runtime.getURL("early-inject.js");
script.onload = () => script.remove();
(document.head || document.documentElement).prepend(script);