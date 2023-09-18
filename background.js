/*
This file:
  -loads custom user speeds
  -intercepts & modifies the original javascript file (course-taking-app.[dynamic].js)
  -redirects the original javascript file request to injector.js where the modified script is added to the wbepage
*/


async function userSpeeds() {
  var promise = new Promise(function (resolve, reject) {
    chrome.storage.sync.get("udemyChangerSpeeds", async function (d) { resolve(d); });
  });
  var data = await promise;
  if (!data.udemyChangerSpeeds) { //first use - set defaults and return null to refresh to page
    data.udemyChangerSpeeds = [0.50, 0.75, 1, 1.25, 1.5, 1.75, 2, 2.25, 2.5, 2.75, 3, 5, 7.5, 10, 13, 16];
    await chrome.storage.sync.set({ "udemyChangerSpeeds": data.udemyChangerSpeeds });
    return;
  }
  return data.udemyChangerSpeeds.toString();
}


chrome.webRequest.onBeforeRequest.addListener(
  async function (details) {
    if ((details.url.includes("course-taking-app.") || details.url.includes("course-taking-udlite-app.")) && details.url.includes(".js")) {
      var noCache = Math.floor(Math.random() * 9999).toString();

      if (details.url.includes("?giveOrig=true")) { // serve original file
        return { redirectUrl: details.url + "&rnd=" + noCache }
      }
      else { // fetch original file and modify it, serve injector.js in it's place.
        var speeds = await userSpeeds();
        if (speeds) {
          var script = await fetch(details.url + "?giveOrig=true" + "&rnd=" + noCache);
          await chrome.storage.local.set({
            modifiedScript: (await script.text()).replace(/\[\.5,\.75,1,1\.25,1\.5,1\.75,2\]/g, "[" + speeds + "]"),
            ogScriptSrc: details.url.split('udemy.com')[1],
            needsRefresh: false
          });
          return { redirectUrl: chrome.extension.getURL("injector.js?rnd=" + noCache) }
        } else {
          await chrome.storage.local.set({
            needsRefresh: true
          });
          return { redirectUrl: chrome.extension.getURL("injector.js?rnd=" + noCache) }
        }
      }
    }
  },
  {
    urls: ["*://*.udemy.com/*"]
  },
  ["blocking"]
);

