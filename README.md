# Udemy Custom Speed Changer

This is a chrome extension which allows you to set any custom speed(s) for Udemy's video player.

## 👨‍💻 How to install

#### 1. Chrome webstore
[Open/Install via Chrome Webstore](https://chrome.google.com/webstore/detail/udemy-custom-speed-change/mfinfiagnpnbijihonbeadgnfbihhpcf/)

#### Or, 2. Clone Repo and load it unpacked
[loading Unpacked extension Getting Started Guide](https://developer.chrome.com/docs/extensions/mv3/getstarted/#unpacked).

> 🚩 You must clear the cache for the video player on first use. Either do a hard refresh from the video player page `(CTRL + SHIFT + R)`, or go to your Chrome history `(CTRL+H)` > Clear browsing data > Clear "Cached images and files" (All Time).

This only supports the desktop video player (which shows the current speed on the bottom toolbar near the play button).  


## 🧐 How it works:

The extension intercepts Udemy's Javascript file `course-taking-app.xxxxxxxxx.js` and changes the following line:
```
Object.freeze([.5,.75,1,1.25,1.5,1.75,2])
```
and replaces it with the user's custom values.

It is very simple at its core, most of this code is just for managing/injecting user options.


![Screenshot](/media/screenshot.jpg)
