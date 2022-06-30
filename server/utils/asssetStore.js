import fs from "fs";
import path from "path";
import { JSDOM } from "jsdom";
import { SEO_INDEX, HOSTNAME } from "../../src/config/server.config";

class AssetsStoreBuilder {
  constructor() {
    this.preloadResources = null;
    this.headString = null;
    this.bodyString = null;
    this.manifestLink = null;
  }

  parseHtml(html, resolve) {
    const dom = new JSDOM(html);
    const document = dom.window.document;
    const head = document.head;
    const body = document.body;

    let preloadHeaders = [
      "<https://fonts.gstatic.com>; rel=preconnect; crossorigin=anonymous",
      "<https://google-analytics.com>; rel=preconnect; crossorigin=anonymous",
      "<https://js.hs-scripts.com/>; rel=preconnect; crossorigin=anonymous",
      SEO_INDEX
        ? "<https://diamond-media-sydney.s3.amazonaws.com>; rel=preconnect; crossorigin=anonymous"
        : "<https://develop-diamond-media.s3.amazonaws.com>; rel=preconnect; crossorigin=anonymous>"
    ];

    let headElements = [];

    const bodyElements = [...body.childNodes]
      .filter(elem => elem.id !== "root" && elem.tagName !== "SCRIPT")
      .map(elem => elem.outerHTML);

    [...head.childNodes].forEach(elem => {
      if (
        elem.tagName === "LINK" &&
        elem.getAttribute("rel") === "stylesheet"
      ) {
        const href = elem.getAttribute("href");

        if (!href.includes("google")) {

          if (process.env.NODE_ENV === 'production') {
            //update path to absolute for google bot
            elem.setAttribute('href', `${HOSTNAME}${href}`)
          }

          const styleHint = `<${href}>; rel=preload; as=style`;
          preloadHeaders.push(styleHint);
        }
      }


      headElements.push(elem.outerHTML);
    });

    this.preloadResources = preloadHeaders;
    this.headString = headElements.join("\n");
    this.bodyString = bodyElements.join("\n");

    console.log("4. Successfully parsed index.html");
    resolve();
  }

  init() {
    return new Promise((resolve, reject) => {
      console.log("1. Creating manifest link");
      this.manifestLink = path.resolve(__dirname,'..', '..', 'build','loadable-stats.json')
      console.log("2. Loading index.html");

      fs.readFile(path.resolve("./build/index.html"), "utf8", (err, data) => {
        if (err) {
          console.error("index.html not available. Check application build.");
          reject(err);
        }

        console.log("3. Parsing index.html");
        this.parseHtml(data.toString(), resolve);
      });
    });
  }
}

const AssetsStore = new AssetsStoreBuilder();

export default AssetsStore;
