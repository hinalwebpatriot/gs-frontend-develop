const register = require("ignore-styles").default;
const path = require("path");
const fs = require("fs");
const mimeTypes = require("mime-types");
const md5File = require("md5-file");

require("@babel/polyfill");
require("@babel/register")({
  ignore: [/\/(build|node_modules)\//],
  presets: ["@babel/preset-env", "@babel/preset-react"],
  plugins: [
    "@babel/plugin-proposal-class-properties",
    "@babel/plugin-syntax-dynamic-import",
    // "dynamic-import-node",
    // "react-loadable/babel",
    'babel-plugin-dynamic-import-node',
    'lodash'
    // 'dynamic-import-node'
  ]
});

register(undefined, (mod, filename) => {
  const ext = [".png", ".jpg", ".jpeg", ".svg"].find(f => filename.endsWith(f));
  if (!ext) return;

  if (fs.statSync(filename).size < 10000) {
    const file = fs.readFileSync(filename).toString("base64");
    const mimeType = mimeTypes.lookup(ext) || "image/jpg";
    mod.exports = `data:${mimeType};base64,${file}`;
  } else {
    const hash = md5File.sync(filename).slice(0, 8);
    const bn = path.basename(filename).replace(/(\.\w{3})$/, `.${hash}$1`);
    mod.exports = `/static/media/${bn}`;
  }
});

if (process.env.NEW_RELIC_LICENSE_KEY) {
  require('newrelic');
}

require("./server");
