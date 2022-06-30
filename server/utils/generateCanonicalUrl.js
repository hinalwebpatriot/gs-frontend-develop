import { HOSTNAME } from "../../src/config/server.config";

export function generateCanonicalUrl(req) {
  const canonical = req.canonicalUrl ? HOSTNAME + req.canonicalUrl : HOSTNAME + req.path.toLowerCase();
  if (req.path.includes('page-')) {
    return ''
  }
  return `<link rel="canonical" href="${canonical}" />`;
}
