/*
The original javascript file (course-taking-app.[dynamic].js) is redirected here.
The modified script is injected into the head of the document.
The unmodified script will be removed from the head if it exists.
*/

chrome.storage.local.get(["modifiedScript", "ogScriptSrc", "needsRefresh", "firstUse"], async function (data) {
  if(data.firstUse !== false){
    chrome.storage.local.set({
      firstUse: false
    });
    alert('Thanks for installing my extension! (Udemy Custom Speed Changer)\n\nIMPORTANT: You must clear the cache on first use. Do one of the following:\n\n-On a Udemy Video page, hard refresh the page twice by clicking CTRL + R + SHIFT\n(A normal CTRL+R refresh will not refresh the cache).\n\n-Or go to your Chrome history (CTRL+H) > Clear browsing data > Clear "Cached images and files" (All Time).\n\nYou can edit the speeds by clicking the extension icon then clicking "Options".\n\nPlease leave a good review if you like the extension, and create an issue on Github or email me if there are any problems for me to fix. Enjoy!');
    location.reload(true);
  }
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

