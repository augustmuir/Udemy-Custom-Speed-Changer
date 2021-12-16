chrome.storage.sync.get("udemyChangerSpeeds", function (data) {

  // get/set saved speeds
  var speeds = data['udemyChangerSpeeds'];
  if (speeds === undefined) {
      speeds = [0.50, 0.75, 1, 1.25, 1.5, 1.75, 2, 2.25, 2.5, 2.75, 3, 5, 7.5, 10, 13, 16];
      chrome.storage.sync.set({
  			udemyChangerSpeeds: speeds
  		});
  } else {
    speeds = data['udemyChangerSpeeds'];
  }

  //listen for specific udemy js file request and redirect to our own which is modified to use user speeds
  chrome.webRequest.onBeforeRequest.addListener(
    function(details) {
      if (details.url.includes("webpack/course-taking-app.") && details.url.includes(".js")){
        return { redirectUrl: chrome.extension.getURL("course-taking-app.udemyspeedchanger.js" )}
      }
    },
    { urls: ["*://www.udemy.com/*"] },
    ["blocking"]
  );
});
