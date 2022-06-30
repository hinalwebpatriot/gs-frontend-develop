module.exports = {
  apps: [
    {
      name: "ssr",
      script: "server/index.js",
      // Options reference: https://pm2.io/doc/en/runtime/reference/ecosystem-file/
      args: "-r d",
      instances: "max",
      autorestart: true,
      watch: false,
      // log_type: "json",
      ignore_watch: "node_modules",
      max_memory_restart: "3G",
      env: {
        PORT: 3010,
        NODE_ENV: "production",
        API_URL: "https://gsapi.dev.nsdigital.agency",
        HOSTNAME: "https://www.dev.nsdigital.agency",
        APP_DOMAIN: "www.gsdiamonds.com.au",
        SITEMAP_PATH: 'https://gsdiamonds-media-sydney-dev.s3-ap-southeast-2.amazonaws.com/sitemap',
        SEO_INDEX: 0,
        PRERENDER_TOKEN: '',
        REDIS_HOST: ''
      },
      env_production: {
        PORT: 3000,
        NODE_ENV: "production",
        API_URL: "https://api.gsdiamonds.com.au",
        HOSTNAME: "https://www.gsdiamonds.com.au",
        APP_DOMAIN: "www.gsdiamonds.com.au",
        SITEMAP_PATH: 'https://gsdiamonds-media-sydney.s3-ap-southeast-2.amazonaws.com/sitemap',
        SEO_INDEX: 1,
        PRERENDER_TOKEN: '',
        NEW_RELIC_LICENSE_KEY: '003dbdfe13102bea478084b9f1178c3eea96783e',
        NEW_RELIC_APP_NAME: 'Diamonds Front [Production]',
        REDIS_HOST: ''
      },
      env_development: {
        PORT: 3000,
        NODE_ENV: "production",
        API_URL: "http://api.gsdevelop.run",
        HOSTNAME: "https://gsdevelop.run",
        APP_DOMAIN: "www.gsdiamonds.com.au",
        SITEMAP_PATH: 'https://s3.eu-central-1.amazonaws.com/develop-diamond-media/sitemap',
        SEO_INDEX: 0,
        PRERENDER_TOKEN: '',
        NEW_RELIC_LICENSE_KEY: '003dbdfe13102bea478084b9f1178c3eea96783e',
        NEW_RELIC_APP_NAME: 'Diamonds Front [Development]',
        REDIS_HOST: ''
      },
      env_test: {
        PORT: 3000,
        NODE_ENV: "production",
        API_URL: "http://api.gsproduction.net.ua",
        HOSTNAME: "https://gsproduction.net.ua",
        APP_DOMAIN: "www.gsdiamonds.com.au",
        SITEMAP_PATH: 'https://gsproduction-media-sydney.s3-ap-southeast-2.amazonaws.com/sitemap',
        SEO_INDEX: 0,
        PRERENDER_TOKEN: '',
        NEW_RELIC_LICENSE_KEY: '003dbdfe13102bea478084b9f1178c3eea96783e',
        NEW_RELIC_APP_NAME: 'Diamonds Front [Test]',
        REDIS_HOST: ''
      }
    }
  ],
  deploy: {
    production: {
      user: "deployer",
      host: "52.65.234.48",
      ref: "origin/master",
      repo: "git@gitlab.com:lenalltd/gsdiamonds/frontend_ssr.git",
      path: "/var/www/app",
      "post-deploy":
        "npm install && npm run build && pm2 stop all && pm2 delete all && pm2 start ecosystem.config.js --env production"
    },
    development: {
      user: "deployer",
      host: "3.121.28.166",
      ref: "origin/develop",
      repo: "git@gitlab.com:lenalltd/gsdiamonds/frontend_ssr.git",
      path: "/var/www/app",
      "post-deploy":
        "npm install && npm run build && pm2 stop all && pm2 delete all && pm2 start ecosystem.config.js --env development"
    }
  }
};
