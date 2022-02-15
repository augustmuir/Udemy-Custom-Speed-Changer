/*
The original javascript file (course-taking-app.[dynamic].js) is redirected here.
The modified script is injected into the head of the document.
The unmodified script will be removed from the head if it exists.
*/

chrome.storage.local.get(["modifiedScript", "ogScriptSrc", "needsRefresh"], async function (data) {
  if(data.needsRefresh){
    await chrome.storage.local.set({
      needsRefresh: false
    });
    location.reload(true);
  }

  //add our modified script to the document head
  var s = document.createElement("script");
  s.setAttribute("type", "text/javascript");
  s.setAttribute("charset", "utf-8");
  s.innerHTML = data.modifiedScript;
  document.head.appendChild(s);

  //remove the original script
  var unmodified = document.querySelectorAll('[src="'+data.ogScriptSrc+'"]')
  unmodified.forEach((el) => {
    el.remove();
  });
});

