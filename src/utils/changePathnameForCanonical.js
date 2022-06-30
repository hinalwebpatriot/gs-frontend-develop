export const pagesWithFilters = ['engagement-rings', 'wedding-rings', 'diamonds'];

export default (pathname) => {
  const pathnameArr = pathname.split('/');
  const url1 = pathnameArr[1];
  const url2 = pathnameArr[2];
  const url3 = pathnameArr[3];
  if (url1 === 'jewellery') {
    if (url2 && url3) {
      return `/jewellery/${url2}/${url3}`;
    }
    if (url2) {
      return `/jewellery/${url2}`;
    }
    return '/jewellery';
  }
  if (url1 === 'wedding-rings' && url2 === 'diamonds') {
    return `/${url1}/`
  }
  if (pathname.includes('page-')) {
    return pathnameArr.filter((p) => !p.startsWith('page-')).join('/') + '/';
  }
  return pathname;
}

