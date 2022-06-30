import AssetsStore from "../utils/asssetStore";
import zlib from 'zlib'
import { generateGoogleTag } from '../utils/generateGoogleTag';

export default (req, res, next) => {
  res.set({ 'Content-Encoding': 'gzip' });

  // Add Hostname value
  // AssetsStore.preloadResources.forEach(hint => {
  //   res.append('Link', hint);
  // })

  const stream = zlib.createGzip();
  stream._flush = zlib.Z_SYNC_FLUSH;
  stream.pipe(res);

  res.stream = stream;

  let lang = req.locale;
  if (!lang || lang === 'en') {
      lang = "en-AU";
  }

  res.sendFirstChunk = () => {
    res.stream.write(`<!DOCTYPE html>
    <html lang="${lang}" class="no-js">
        <head>
        ${AssetsStore.headString}
        ${generateGoogleTag()}
  `);
    res.tracker.mark('FirstChunk', 'end');
  }

  next();
};
