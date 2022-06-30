import ReactDOMServer from "react-dom/server";
import { HelmetProvider } from "react-helmet-async";
import { Provider } from "react-redux";
import React from "react";
import App from "../../src/components/App";
import AppWrapper from "../../src/components/Wrapper/AppWrapper";
import AdvancedRouter from "../../src/components/Wrapper/AdvancedRouter";
import { generateBreadcrumbsData } from "../utils/generateBreadcrumbsData";
import { generateProductData } from "../utils/generateProductData";
import { generateCanonicalUrl } from "../utils/generateCanonicalUrl";
import { generateGoogleTag } from "../utils/generateGoogleTag";
import { generateNoIndexTag } from "../utils/generateNoIndexTag";
import AssetsStore from "../utils/asssetStore";
import { ChunkExtractor } from "@loadable/server";
import { HOSTNAME, SEO_INDEX } from "../../src/config/server.config";
import { generateLocaleBusinessScript } from "../utils/generateLocaleBusinessScript";
import { generatePreconnect } from "../utils/generatePreconnect";
import { generateFAQ } from "../utils/generateFAQ";

export default (req, res, next) => {
  res.render = render.bind(this, req, res);
  next();
};

function render(req, res) {
  res.tracker.mark("API", "end");
  res.tracker.mark("Render", "start");

  const chunkExtractor = new ChunkExtractor({
    statsFile: AssetsStore.manifestLink
  });

  let routerContext = {};
  let helmetContext = {};
  let reactChunks = [];

  const rootElement = (
    <HelmetProvider context={helmetContext}>
      <Provider store={res.store}>
        <AdvancedRouter
          location={req.url || "/"}
          basename={req.locale !== "en" ? `/${req.locale}` : undefined}
          context={routerContext}
          isServer
        >
          <AppWrapper>
            <App city={req.city} />
          </AppWrapper>
        </AdvancedRouter>
      </Provider>
    </HelmetProvider>
  );

  const jsx = chunkExtractor.collectChunks(rootElement);

  const reactStream = ReactDOMServer.renderToNodeStream(jsx);

  reactStream.on("data", chunk => reactChunks.push(chunk));

  reactStream.on("end", () => {
    const updatedState = res.store.getState();
    const jsonState = encodeURIComponent(JSON.stringify(updatedState));
    const scripts = chunkExtractor
      .getScriptTags()
      .replace(/src="/gi, `src="${process.env.NODE_ENV === 'production' ? HOSTNAME : ""}`)
      .replace(/\sasync\s/gi, ` defer="true" `);

    let footerCodes = res.footerCodes || '';

    // footerCodes += ratingBadge();

    res.stream.write(`
      ${generateCanonicalUrl(req)}
      ${generateNoIndexTag(req)}
      ${generatePreconnect()}
      ${
        res.productType
          ? generateProductData({
              type: res.productType,
              state: res.store.getState()
            })
          : ""
      }
      ${generateFAQ(req, res.store.getState())}
      ${generateLocaleBusinessScript(req.city)}
      ${generateBreadcrumbsData(updatedState.breadcrumbs)}
      ${helmetContext.helmet.title.toString()}
      ${helmetContext.helmet.meta.toString()}
      <script id="ssr-state">window.__PRELOADED_STATE__="${jsonState}"</script>
      </head>
      `);

    res.stream.end(`
      <body>
        ${AssetsStore.bodyString}
        ${generateGoogleTag(true)}
        <div id="root">
            ${reactChunks.join("")}
        </div>
        ${scripts}
        ${footerCodes}
        </body>
       </html>
      `);

    // const chunks = chunkExtractor.getScriptTags().replace(/\sasync\s/gi, ' defer="true" ');
    // console.log(chunks);
    // console.log('---');
    // console.log(chunkExtractor.getScriptTags().replace(/\sasync\s/gi, ' async="true" '));
    // Chunk #3
    // res.stream.end(`
    //
    //
    // `);

    // const endCompressTime = new Date() - compressTime ;

    // Chunk #6 [Final]
    // injectAdditionalBody(req, res);

    // const end = new Date() - start;
    res.tracker.mark("Render", "end");
    res.tracker.mark("Total", "end");

    // console.log(req.headers['x-forwarded-for']);
    // console.log(req.headers['x-real-ip']);
    // console.log(req.connection.remoteAddress);

    const label = `[${req.headers["x-forwarded-for"]}][=]: ${req.url}, --> ${
      req.headers["user-agent"]
    }`;

    console.info(res.tracker.info(label));
  });
}

function ratingBadge()
{
  return `<!-- BEGIN GCR Badge Code -->
        <script src="https://apis.google.com/js/platform.js?onload=renderBadge" async defer></script>
        
        <script>
            window.renderBadge = function() {
                var ratingBadgeContainer = document.createElement("div");
                document.body.appendChild(ratingBadgeContainer);
                window.gapi.load('ratingbadge', function() {
                    window.gapi.ratingbadge.render(
                    ratingBadgeContainer, {
                        "merchant_id": 137104105,
                        "position": "BOTTOM_LEFT"
                    });
                });
            };
            
            window.___gcfg = {
                lang: 'en-AU'
            };
            
        </script>
        <!-- END GCR Badge Code -->`;
}
