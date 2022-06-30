import qs from 'qs';

export default function getUrlParamsString({ gclid }) {
  if (gclid) {
    return '?' + qs.stringify({ gclid });
  } else {
    return ''
  }
}
