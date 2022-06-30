import path from "path";
import { SEO_INDEX } from '../../src/config/server.config';

export default (req, res) => {
  if (SEO_INDEX) {
    res.sendFile(
      path.resolve(__dirname, "..", '..', "public", "robots.txt"),
      {},
      err => {
        res.status(404);
        res.end("File not found");
      }
    );
  } else {
    res.sendFile(
      path.resolve(__dirname, "..", '..', "public", "robots_no_index.txt"),
      {},
      err => {
        // res.status(404);
        res.end(`
          User-agent: *
          Disallow: /
        `);
      }
    )
  }
};
