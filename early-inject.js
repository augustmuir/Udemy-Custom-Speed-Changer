(function () {
  const defaultSpeeds = [0.5, 0.75, 1, 1.25, 1.5, 1.75, 2, 2.25, 2.5, 2.75, 3, 5, 7.5, 10, 13, 16];
  let userSpeeds = defaultSpeeds;
  try {
      const stored = window.localStorage.getItem('udemyChangerSpeeds');
      if (stored) {
          const arr = JSON.parse(stored);
          if (Array.isArray(arr)) userSpeeds = arr.map(Number);
      }
  } catch (e) {}


  const originalCreateElement = Document.prototype.createElement;
  Document.prototype.createElement = function (tagName, options) {
    const el = originalCreateElement.call(this, tagName, options);

    Object.defineProperty(el, "src", {
      set(value) {
        if (/\.js(\?.*)?$/.test(value)) {
          fetchAndInjectModifiedScript(value, el);
          return;
        }
        this.setAttribute("src", value);
      },
      get() {
        return this.getAttribute("src");
      },
      configurable: true,
    });

    return el;
  };

  async function fetchAndInjectModifiedScript(src, el) {
    try {
      const response = await fetch(src);
      const code = await response.text();

      const patched = code.replace(
        /\[0?\.5,0?\.75,1,1\.25,1\.5,1\.75,2\]/g,
        `[${userSpeeds.join(",")}]`
      );

      if (patched !== code) {
        const s = document.createElement("script");
        s.textContent = patched;
        document.head.appendChild(s);
      } else {
        el.setAttribute("src", src);
      }
    } catch (err) {
      console.log("Failed to patch Udemy script:", err);
      el.setAttribute("src", src);
    }
  }
})();
