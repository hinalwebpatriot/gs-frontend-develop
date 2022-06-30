import { HOSTNAME } from '../../src/config/server.config';

export default (req, res) => {
  console.log('noSlashRedirect');
  const oldUrl = new URL(req.url, HOSTNAME);
  const correctUrl = oldUrl.pathname.slice(0, -1) + oldUrl.search;
  console.log('Redirect' + req.url + ' -> ' + correctUrl);
  res.redirect(301, correctUrl);
}
