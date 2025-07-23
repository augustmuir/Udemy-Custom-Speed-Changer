(function () {
  const defaultSpeeds = [
    0.5, 0.75, 1, 1.25, 1.5, 1.75, 2, 2.25, 2.5, 2.75, 3, 5, 7.5, 10, 13, 16,
  ];
  let userSpeeds = defaultSpeeds;

  try {
    window.chrome?.storage?.sync.get("udemyChangerSpeeds", (data) => {
      if (Array.isArray(data.udemyChangerSpeeds)) {
        userSpeeds = data.udemyChangerSpeeds;
      }
    });
  } catch (e) {}

  const originalCreateElement = Document.prototype.createElement;
  Document.prototype.createElement = function (tagName, options) {
    const el = originalCreateElement.call(this, tagName, options);

    Object.defineProperty(el, "src", {
      set(value) {
        if (/.*course-taking.*\.js/.test(value)) {
          fetchAndInjectModifiedScript(value);
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

  async function fetchAndInjectModifiedScript(src) {
    try {
      const response = await fetch(src);
      let code = await response.text();

      code = code.replace(
        /\[\.5,\.75,1,1\.25,1\.5,1\.75,2\]/g,
        `[${userSpeeds.join(",")}]`
      );

      const s = document.createElement("script");
      s.textContent = code;
      document.head.appendChild(s);
    } catch (err) {
      console.log("Failed to patch Udemy script:", err);
    }
  }
})();
