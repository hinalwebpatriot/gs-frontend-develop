const flatCache = require('flat-cache');
const path = require('path');
const md5 = require('md5');

let CacheService = {
    cache: null,
    name: null,
    activeKey: null,
    cacheKey: 'content',

    load: function (name, params) {
        name = this.createKey(name, params);
        this.debug('load: ' + name + ' | current: ' + this.activeKey);

        //if (name !== this.activeKey) {
            this.debug('init');
            this.name = name;
            this.path = path.resolve('./cache');
            this.cache = flatCache.load(name, this.path);
            this.activeKey = name;
        //}
    },

    get: function (key, params) {
        this.load(key, params);

        this.debug('beforeGetCache');

        var value = this.cache.getKey(this.cacheKey);

        this.debug('afterGetCache');

        if (value === undefined || (value.expire !== false && value.expire < new Date().getTime())) {
            if (value) {
                this.remove(key, params);
            }
            this.debug('NoCacheData');

            return null;
        } else {
            this.debug('returnCachedData');

            return value.data
        }
    },

    set: function (key, value, expire, keyParams) {
        this.load(key, keyParams);

        this.debug('beforeSetCache');

        this.cache.setKey(this.cacheKey, {
            expire: new Date().getTime() + (expire * 1000),
            data: value
        });

        this.debug('afterSetCache');

        this.save();
    },

    createKey: function(key, params) {
        var cacheKey = key + '_' + md5(JSON.stringify(params));
        this.debug('cache key: ' + cacheKey);

        return cacheKey;
    },

    remove: function(key, params) {
        this.load(key, params);

        this.cache.removeKey(this.cacheKey);
        this.save();
    },

    save: function() {
        this.cache.save(true);
    },

    debug: function(message) {
    }
};

module.exports = CacheService;
