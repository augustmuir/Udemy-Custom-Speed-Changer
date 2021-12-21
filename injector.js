/*
This File:
  - sends redirect.js the modified javascript code (redirect.js can't access chrome.storage.local)
*/

chrome.storage.local.get(["jstring", "needsRefresh"], async function (data) {
  var jstring = data["jstring"];
  var needsRefresh = data["needsRefresh"];
  if(needsRefresh){
    await chrome.storage.local.set({needsRefresh: false});
    location.reload(true);
  }
  var mainDiv = document.getElementsByClassName("main-content-wrapper")[0];
  mainDiv.setAttribute("data", jstring)
});
