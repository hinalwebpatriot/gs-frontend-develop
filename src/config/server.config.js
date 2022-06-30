module.exports = {
  APP_DOMAIN: process.env.APP_DOMAIN,
  HOSTNAME: process.env.HOSTNAME,
  API_URL: process.env.API_URL,
  PORT: process.env.PORT,
  SITEMAP_PATH: process.env.SITEMAP_PATH,
  SEO_INDEX: process.env.SEO_INDEX === '1',
  PRERENDER_TOKEN: process.env.PRERENDER_TOKEN,
  REDIS_HOST: process.env.REDIS_HOST
};
