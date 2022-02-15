# Udemy Custom Speed Changer

This is a chrome extension which allows you to set any custom speed(s) for Udemy's video player.

To Install: [Open/Install via Chrome Webstore](https://chrome.google.com/webstore/detail/udemy-custom-speed-change/mfinfiagnpnbijihonbeadgnfbihhpcf/), or clone the repo and [load it unpacked](https://developer.chrome.com/docs/extensions/mv3/getstarted/#unpacked).

Note:
-Only supports desktop video player (which shows the current speed on the bottom toolbar near the play button).
-May need a page refresh on first use due to cached files.


![Screenshot](/media/screenshot.jpg)

If you're curious how it works: 

Udemy's Javascript file "course-taking-app.xxxxxxxxx.js" is intercepted and this line `Object.freeze([.5,.75,1,1.25,1.5,1.75,2])` is replaced with the users custom values. At the core it is very simple, most of this code is just for managing/injecting user options.
