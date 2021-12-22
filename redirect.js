/*
This File:
  - is served/redirected to instead of Udemy's 'course-taking-app.xxxxxx.js' file
*/

function sleep(milliseconds) {
  var start = new Date().getTime();
  for (var i = 0; i < 1e7; i++) {
    if ((new Date().getTime() - start) > milliseconds){
      break;
    }
  }
}

for(let i = 0; i < 10; i++){
  sleep(100);
  var code = document.getElementsByClassName("main-content-wrapper")[0].getAttribute("data");
  if(code != null){
      var s = document.createElement("script");
      s.setAttribute("type", "text/javascript");
      s.innerHTML = code;
      document.head.insertBefore(s, document.head.firstChild);
      break;
  }
}
