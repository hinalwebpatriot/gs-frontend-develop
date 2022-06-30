const clientConfig = {
  isProduction: Boolean(process.env.REACT_APP_PRODUCTION),
  googleAnalytics: {
    key: process.env.REACT_APP_GOOGLE_ANALYTICS_KEY,
  },
  googleMaps: {
    key: process.env.REACT_APP_GOOGLE_MAPS_KEY 
  },
  facebook: {
    appId: process.env.REACT_APP_FACEBOOK_APP_ID ,
    page: process.env.REACT_APP_FACEBOOK_PAGE ,
  },
  adyen: {
    publicKey: process.env.REACT_APP_ADYEN_PUBLIC_KEY 
  },
  orderSecret: {
    key: process.env.REACT_APP_ORDER_SECRET_KEY || 'GSD-FRONT-JDY4ENC24HX6O3IE4MJ3HGF'
  }
}

//AIzaSyB5sO9-UA9zLvvLpLKEMq8Az5VlimOoRA4
// const devKeys = {
//   googleMaps: {
//     key: 'AIzaSyCej-9rvTZMYkbCgWWInPxk9avFmWz5SDo' //denis key
//   },
//   facebook: {
//     appId: '401212080429636',
//     page: '422706705154707'
//   }
// }

// if (process.env.NODE_ENV === 'production') {
//   apiKeys = prodKeys;
// } else {
//   apiKeys = devKeys;
// }

export default clientConfig
