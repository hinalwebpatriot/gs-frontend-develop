const cookieAge = 1000 * 60 * 60 * 24 * 30 * 6;

export default (req, res) => {
  res.cookie("cookie-accepted", 1, {
    maxAge: cookieAge
  });
  res.status(200);
  res.end();
};
