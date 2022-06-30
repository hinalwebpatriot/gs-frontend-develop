import { SEO_INDEX } from '../../src/config/server.config';

const indexFollowPaths = [
  '/brisbane/jewellery',
  '/melbourne/jewellery',
  '/perth/jewellery',
  '/adelaide/jewellery',
  '/canberra/jewellery',
]

export function generateNoIndexTag(req) {
  if (indexFollowPaths.includes(req.path)) {
    return '<meta name="robots" content="index, follow" />'
  } else if (req.path.includes('page-')) {
    return '<meta name="robots" content="noindex, follow" />'
  } else if (!SEO_INDEX || req.noIndexPage) {
    return '<meta name="robots" content="noindex, nofollow" />'
  } else {
    return ''
  }
}
