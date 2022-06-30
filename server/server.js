import process from 'process';
import express from "express";
import cookieParser from "cookie-parser";
import compression from "compression";
import localeMiddleware from "./middlewares/localeMiddleware";
import path from "path";
import {API_URL, APP_DOMAIN, PORT, PRERENDER_TOKEN, REDIS_HOST} from "../src/config/server.config";
import proxy from "http-proxy-middleware";
import indexSitemapController from "./controllers/indexSitemapController";
import sitemapsController from "./controllers/sitemapsController";
import robotsTxtController from "./controllers/robotsTxtController";
import AssetsStore from './utils/asssetStore';
import prerender from 'prerender-node';
import prerenderReCache from './middlewares/prerenderReCacheMiddleware';
import prerenderWhitelist from './utils/prerenderWhitelist';
import {initPrerenderCacheFlow} from './utils/prerenderCacheFlow';

export const app = express();
const router = require("./router/router");
const redirectRouter = require("./router/redirectRouter");

app.enable("strict routing");

app.use(compression());
app.use(cookieParser());

app.use("/api", proxy({target: API_URL, changeOrigin: true}));
app.use("/robots.txt", robotsTxtController);
app.use("/sitemap.xml", indexSitemapController);
app.use("/sitemap/:path/:file", sitemapsController);

app.use('/lib/js',
    express.static(path.resolve(__dirname, "..", 'public', 'libs'), {
        maxAge: "60d",
        index: false
    }))

app.use(
    express.static(path.resolve(__dirname, "..", "build"), {
        maxAge: "60d",
        index: false
    })
);

app.use(localeMiddleware);
app.use(redirectRouter);

let prerenderMiddleware = prerender
    .set('host', APP_DOMAIN)
    .set('protocol', 'https')
    .set('prerenderToken', PRERENDER_TOKEN)
    .whitelisted(prerenderWhitelist);

let prerenderReCacheMiddleware = prerenderReCache
    .set('host', APP_DOMAIN)
    .set('protocol', 'https')
    .set('prerenderToken', PRERENDER_TOKEN)
    .whitelisted(prerenderWhitelist);

if (REDIS_HOST) {
    initPrerenderCacheFlow(prerenderMiddleware, prerenderReCacheMiddleware)
}

app.use(prerenderMiddleware);
app.use(prerenderReCacheMiddleware);

app.use(router);

let server;

AssetsStore.init()
    .then(() => {
        server = app.listen(PORT || 3010, () => {
            console.log(`API_URL = ${API_URL}`);
            console.log(`APP_DOMAIN = ${APP_DOMAIN}`);
            console.log(`REDIS HOST = ${REDIS_HOST}`);
            console.log(`PRERENDER_TOKEN ${PRERENDER_TOKEN ? 'OK' : 'NOT SET'}`);
            console.log(`SSR running on port ${PORT || 3010}`);
        });
    })


app.on("error", error => {
    if (error.syscall !== "listen") {
        throw error;
    }

    const bind = typeof PORT === "string" ? "Pipe " + PORT : "Port " + PORT;

    switch (error.code) {
        case "EACCES":
            console.error(bind + " requires elevated privileges");
            process.exit(1);
            break;
        case "EADDRINUSE":
            console.error(bind + " is already in use");
            process.exit(1);
            break;
        default:
            throw error;
    }
});

process.on("SIGINT", () => {
    console.info("SIGINT signal received.");
    // Stops the server from accepting new connections and finishes existing connections.
    server.close(function (err) {
        if (err) {
            console.error(err);
            process.exit(1);
        }
    });
});