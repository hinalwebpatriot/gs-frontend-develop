const Redis = require('ioredis');
const {REDIS_HOST} = require('../../src/config/server.config');
const {QueueScheduler, Queue, Worker} = require('bullmq');

exports.initPrerenderCacheFlow = function (prerenderMiddleware, prerenderReCacheMiddleware) {
    const redisClient = new Redis(`redis://${REDIS_HOST}/3`); // backend API use first 2.

    redisClient.on('end', function () {
        console.error('Redis client disconnected, prerender cache disabled');
        prerenderMiddleware.set('beforeRender', undefined).set('afterRender', undefined);
    });

    redisClient.on('error', function (err) {
        console.error('Redis client error, prerender cache disabled', err);
        prerenderMiddleware.set('beforeRender', undefined).set('afterRender', undefined);
    });

    redisClient.on('ready', function () {
        console.log('Connected to Redis host:', REDIS_HOST, '| Prerender cache enabled');

        prerenderMiddleware
            .set('beforeRender', function (req, done) {
                try {
                    redisClient.get(req.url).then(function (result) {
                        done(undefined, result);
                    }).catch(done);
                } catch (err) {
                    console.error({
                        url: req.url,
                        message: "Error occurred on get cache from redis for prerender",
                        err
                    });
                    done();
                }
            }).set('afterRender', afterRender);
    });

    let afterRender = function (err, req, prerender_res) {
        if (err || prerender_res.statusCode !== 200) {
            return;
        }

        try {
            redisClient.set(req.url, prerender_res.body, "EX", 60 * 60 * 24 * 10)
        } catch (err) {
            console.error({
                url: req.url,
                message: "Error occurred on set cache in redis for prerender",
                err
            })
        }
    }

    reCacheFlow(prerenderReCacheMiddleware, afterRender);
}

function reCacheFlow(prerenderReCacheMiddleware, afterRender) {
    let connection = {
        host: `${REDIS_HOST}`,
        db: 3
    };

    /**
     * For delayed jobs sync.
     */
    new QueueScheduler('prerender', {connection});

    /**
     * To send queue tasks from middleware.
     */
    prerenderReCacheMiddleware.set('queue', new Queue('prerender', {
        connection,
        defaultJobOptions: {
            attempts: 3,
            backoff: {
                type: "exponential",
                delay: 1000
            }
        }
    }));

    /**
     * Worker to proceed prerender queue cache tasks.
     * @type {Worker<any, any, string>}
     */
    const prerenderWorker = new Worker('prerender', async (job) => {
        if (job.name !== 'cache') {
            return;
        }

        prerenderReCacheMiddleware.getPrerenderedPageResponse(job.data, function (err, prerenderedResponse) {
            if (err || !prerenderedResponse) {
                return;
            }

            afterRender(err, job.data, prerenderedResponse);
        });
    }, {connection});

    prerenderWorker.on('error', err => console.error(err));
}