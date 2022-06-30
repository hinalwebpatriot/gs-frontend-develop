import getUrlParamsString from '../utils/getUrlParamsString';

export default (req, res, next) => {
  const keys = Object.keys(req.query);
  if (keys.length === 0) {
    next();
    return;
  }

  if (keys.length === 1 && req.query.gclid) {
    next();
    return
  }

  //paypal params
  if (req.query.token || req.query.PayerID || req.query.paymentId) {
    next();
    return;
  }

  //auth options
  if (req.query.email || req.query.signature || req.query.expires) {
    next();
    return
  }

  console.log('checkUrlParamsMiddleware other');
  next();
};
