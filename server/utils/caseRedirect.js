import getUrlParamsString from './getUrlParamsString';

export default (req, res, next) => {
    // console.log("1.1 caseRedirect");
  const originalUrl = req.url;
  const routePath = req.route.path;

  const normalizedUrl = routePath.replace(/:\w*/gi, (match) => {
    return req.params[match.slice(1)];
  }).replace(/\\/g, '') + getUrlParamsString(req.query);

  // console.log("1.2 getUrlParamsString next", routePath.replace(/:\w*/gi, (match) => {
  //   return req.params[match.slice(1)];
  // }).replace(/\\/g, ''), getUrlParamsString(req.query));

  if (originalUrl !== normalizedUrl) {
    // console.log('1.2 Normalize url:', originalUrl, '->', normalizedUrl);
    res.redirect(301, normalizedUrl);
    return;
  }

  console.log("1.3 caseRedirect next, originalUrl = ", originalUrl);

  next();
};
