z# Udemy Custom Speed Changer

This is a chrome extension which allows you to set any custom speed(s) for Udemy's video player.

To Install: [Open/Install via Chrome Webstore](https://chrome.google.com/webstore/detail/udemy-custom-speed-change/mfinfiagnpnbijihonbeadgnfbihhpcf/).


![Screenshot](/media/screenshot.jpg)

If you're curious how it works:

%95 of the code in this repo is only used for user options / injecting user options. At the core this simply redirects a specific Udemy Javascript file request to our own file (course-taking-app.udemyspeedchanger.js). This file is a clone of Udemy's, only modifying this line `var Hr = Object.freeze([0.5, 0.75, 1, 1.25, 1.5, 1.75, 2])` to our custom values. Due to the nature of the mod, it may break on major Udemy updates; if this is the case please create a issue and it will be updated.
