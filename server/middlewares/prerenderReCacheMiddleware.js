let http = require('http')
    , https = require('https')
    , zlib = require('zlib');

const prerenderCacheFetchDelay = 60000; //1 min
const adapters = {'http:': http, 'https:': https};

let prerenderReCache = module.exports = function (req, res, next) {
    if (!prerenderReCache.shouldRefreshCache(req)) return next();
    if (!prerenderReCache.queue) return next();

    res.on('finish', function () {
        prerenderReCache.queue.add('cache', {
            url: req.url,
            encrypted: req.connection.encrypted,
            headers: req.headers
        }, {
            delay: prerenderCacheFetchDelay
        }).catch(function (err) {
            console.error("Can't add job to the prerender queue.", err);
        });
    });

    next();
};

prerenderReCache.extensionsToIgnore = [
    '.js',
    '.css',
    '.xml',
    '.less',
    '.png',
    '.jpg',
    '.jpeg',
    '.gif',
    '.pdf',
    '.doc',
    '.txt',
    '.ico',
    '.rss',
    '.zip',
    '.mp3',
    '.rar',
    '.exe',
    '.wmv',
    '.doc',
    '.avi',
    '.ppt',
    '.mpg',
    '.mpeg',
    '.tif',
    '.wav',
    '.mov',
    '.psd',
    '.ai',
    '.xls',
    '.mp4',
    '.m4a',
    '.swf',
    '.dat',
    '.dmg',
    '.iso',
    '.flv',
    '.m4v',
    '.torrent',
    '.woff',
    '.ttf',
    '.svg',
    '.webmanifest'
];

prerenderReCache.whitelisted = function (whitelist) {
    prerenderReCache.whitelist = typeof whitelist === 'string' ? [whitelist] : whitelist;
    return this;
};


prerenderReCache.blacklisted = function (blacklist) {
    prerenderReCache.blacklist = typeof blacklist === 'string' ? [blacklist] : blacklist;
    return this;
};


prerenderReCache.shouldRefreshCache = function (req) {
    if (!req.headers) return false;
    if (req.method != 'GET' && req.method != 'HEAD') return false;

    //if it is a bot and is requesting a resource...dont re-cache
    if (prerenderReCache.extensionsToIgnore.some(function (extension) {
        return req.url.toLowerCase().indexOf(extension) !== -1;
    })) return false;

    //if it is a bot and not requesting a resource and is not whitelisted...dont re-cache
    if (Array.isArray(this.whitelist) && this.whitelist.every(function (whitelisted) {
        return (new RegExp(whitelisted)).test(req.url) === false;
    })) return false;

    //if it is a bot and not requesting a resource and is blacklisted(url or referer)...dont re-cache
    if (Array.isArray(this.blacklist) && this.blacklist.some(function (blacklisted) {
        let blacklistedUrl, blacklistedReferer = false, regex = new RegExp(blacklisted);

        blacklistedUrl = regex.test(req.url) === true;
        if (req.headers['referer']) blacklistedReferer = regex.test(req.headers['referer']) === true;

        return blacklistedUrl || blacklistedReferer;
    })) return false;

    return !!req.headers['x-prerender'];
};

prerenderReCache.getPrerenderedPageResponse = function (reqOptions, callback) {
    let options = {
        headers: {}
    };

    options.headers['User-Agent'] = reqOptions.headers['user-agent'];
    options.headers['Accept-Encoding'] = 'gzip';
    if (this.prerenderToken || process.env.PRERENDER_TOKEN) {
        options.headers['X-Prerender-Token'] = this.prerenderToken || process.env.PRERENDER_TOKEN;
    }

    const url = new URL(prerenderReCache.buildApiUrl(reqOptions));
    // Dynamically use "http" or "https" module, since process.env.PRERENDER_SERVICE_URL can be set to http protocol
    adapters[url.protocol].get(url, options, (response) => {
        if (response.headers['content-encoding'] && response.headers['content-encoding'] === 'gzip') {
            prerenderReCache.gunzipResponse(response, callback);
        } else {
            prerenderReCache.plainResponse(response, callback);
        }
    }).on('error', function (err) {
        callback(err);
    });

};

prerenderReCache.gunzipResponse = function (response, callback) {
    let gunzip = zlib.createGunzip()
        , content = '';

    gunzip.on('data', function (chunk) {
        content += chunk;
    });
    gunzip.on('end', function () {
        response.body = content;
        delete response.headers['content-encoding'];
        delete response.headers['content-length'];
        callback(null, response);
    });
    gunzip.on('error', function (err) {
        callback(err);
    });

    response.pipe(gunzip);
};

prerenderReCache.plainResponse = function (response, callback) {
    let content = '';

    response.on('data', function (chunk) {
        content += chunk;
    });
    response.on('end', function () {
        response.body = content;
        callback(null, response);
    });
};


prerenderReCache.buildApiUrl = function (reqOptions) {
    let prerenderUrl = prerenderReCache.getPrerenderServiceUrl();
    let forwardSlash = prerenderUrl.indexOf('/', prerenderUrl.length - 1) !== -1 ? '' : '/';

    let protocol = reqOptions.encrypted ? "https" : "http";
    if (reqOptions.headers['cf-visitor']) {
        let match = reqOptions.headers['cf-visitor'].match(/"scheme":"(http|https)"/);
        if (match) protocol = match[1];
    }
    if (reqOptions.headers['x-forwarded-proto']) {
        protocol = reqOptions.headers['x-forwarded-proto'].split(',')[0];
    }
    if (this.protocol) {
        protocol = this.protocol;
    }
    let fullUrl = protocol + "://" + (this.host || reqOptions.headers['x-forwarded-host'] || reqOptions.headers['host']) + reqOptions.url;
    return prerenderUrl + forwardSlash + fullUrl;
};

prerenderReCache.getPrerenderServiceUrl = function () {
    return this.prerenderServiceUrl || process.env.PRERENDER_SERVICE_URL || 'https://service.prerender.io/';
};

prerenderReCache.set = function (name, value) {
    this[name] = value;
    return this;
};
