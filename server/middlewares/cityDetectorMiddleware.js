import { fetchCity } from "../../src/components/_common/City/CityActions";

const cities = ['brisbane', 'melbourne', 'perth', 'adelaide', 'canberra'];

export default (req, res, next) => {
  let city = '';
  const cityFromUrl = req.url.split('/')[1];
  if (req.cookies.gs_city) {
    if (req.cookies.gs_city === cityFromUrl) {
      city = req.cookies.gs_city;
    } else {
      city = cities.includes(cityFromUrl) ? cityFromUrl : 'sydney';
    }
  } else {
    city = cities.includes(cityFromUrl) ? cityFromUrl : 'sydney';
  }
  req.city = city;
  res.cookie('gs_city', city, { path: '/' });
  res.store.dispatch(
    fetchCity.success(city)
  );
  next();
};
