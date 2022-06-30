import MobileDetect from "mobile-detect";
import { deviceChange } from "../../src/components/_common/HOC/ResizeWatcherActions";

export default (req, res, next) => {
  // const start = new Date();
  req.md = new MobileDetect(req.header("User-Agent"));
  // const end = new Date() - start;

  req.isMobile = req.md.mobile();
  // console.log('Mobile detect %dms', end);

  res.store.dispatch(
    deviceChange.success({
      isMobile: req.isMobile,
      currentWidth: req.isMobile ? 600 : 1980
    })
  );
  next();
};
