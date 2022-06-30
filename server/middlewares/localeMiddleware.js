const allowedLocales = ["en"];
// const allowedLocales = ["en", "zh", "cmn"];

export default (req, res, next) => {
  const url = req.url.split("/");
  const locale = url[1];

  if (locale === "en") {
    // res.redirect(url.slice(1).join('/'));
  }

  if (allowedLocales.includes(locale)) {
    req.locale = locale;
    req.url = `/${url.slice(2).join("/")}`;
  } else {
    req.locale = "en";
  }

  next();
};
