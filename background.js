/*
This File:
  - creates the modified Udemy javascript file "redirect.js" and injects the users speeds (if needed)
  - redirects all requests to the original file "course-taking-app.xxxxxxx.js" to the new "redirect.js"
*/


async function userSpeeds(){
  var promise = new Promise(function(resolve, reject){
    chrome.storage.sync.get("udemyChangerSpeeds", async function (d){ resolve(d); });
  });
  var data = await promise;
  if(!data["udemyChangerSpeeds"]){ //first use, set defaults
    data["udemyChangerSpeeds"] = [0.50, 0.75, 1, 1.25, 1.5, 1.75, 2, 2.25, 2.5, 2.75, 3, 5, 7.5, 10, 13, 16];
  }
  await chrome.storage.sync.set({"udemyChangerSpeeds": data["udemyChangerSpeeds"]});
  return data["udemyChangerSpeeds"];
}


async function setJstring(ogUrl){
  var file = await fetch(ogUrl + "?giveOrig=true"); //marker to bypass redirect
  var contents = await file.text();
  var speeds = "[" + (await userSpeeds()).toString() + "]";
  contents = contents.replace("[.5,.75,1,1.25,1.5,1.75,2]", speeds);
  await chrome.storage.local.set({jstring: contents, needsRefresh: true});
}


chrome.storage.local.get(["jstring", "needsRefresh"], async function (data) {
  var jstring = data["jstring"];
  var jstringValid = !(jstring == undefined || jstring == null);
  if(data["needsRefresh"]){
    await userSpeeds();
    jstringValid = false;
  }
  chrome.webRequest.onBeforeRequest.addListener(
    function(details) {
      if(details.url.includes("course-taking-app.") && details.url.includes(".js")){
        if(jstringValid == false){
          setJstring(details.url)
          jstringValid = true;
        }
        else if(!details.url.includes("?giveOrig=true")){
          return {redirectUrl: chrome.extension.getURL("redirect.js")}
        }
      }
    },
    {
      urls: ["*://www.udemy.com/*"]
    },
    ["blocking"]
  );
});
