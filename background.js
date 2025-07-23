chrome.webNavigation.onCommitted.addListener(
  async (details) => {
    if (details.frameId === 0 && details.url.includes("udemy.com")) {
      await chrome.scripting.executeScript({
        target: { tabId: details.tabId },
        files: ["early-inject.js"],
      });
    }
  },
  { url: [{ hostSuffix: "udemy.com" }] }
);
