/*
Injector and Injectee files are a work around used purely for accessing user options (udemyChangerSpeeds) in the redirected javascript file which doesn't have access to chrome.storage
*/

chrome.storage.sync.get("udemyChangerSpeeds", function (data) {
  function injectScript(file, node, callback) {
    var th = document.getElementsByTagName(node)[0];
    var s = document.createElement('script');
    s.setAttribute('id', 'speedInjection');
    s.setAttribute('speeds', JSON.stringify(data['udemyChangerSpeeds']));
    s.setAttribute('type', 'text/javascript');
    s.setAttribute('src', file);
    if (typeof callback == "function") {
      s.onload = function() { callback(); };
    }
    th.appendChild(s);
  }

  injectScript( chrome.extension.getURL('/injectee.js'), 'body', function() {
    injectScript( chrome.extension.getURL('/injectee.js'), 'body');
  });
});
