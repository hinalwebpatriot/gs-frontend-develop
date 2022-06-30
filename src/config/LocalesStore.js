import { client } from './api';
import { isServer } from "../utils/isServer";

class LocalesStore {
  constructor() {
    const defaultState = {
      location: {
        code: 'AU',
        name: 'Australia',
        vat_percent: 10.5,
        can_ship: true
      },
      currency: {
        code: 'AUD',
        name: 'AUD',
      },
      locale: {
        code: 'en',
        name: 'English',
      },
    };


    this._locale = defaultState.locale;
    this._localesWithName = {
      en: 'English',
      // zh: 'Cantonese Chinese',
      // cmn: 'Mandarin Chinese',
    };

    this._localesList = Object.keys(this._localesWithName);

    this._currency = defaultState.currency;
    this._currencyFormat = new Intl.NumberFormat(defaultState.locale.code, {
      style: 'currency',
      currency: defaultState.currency.code,
    });

    this._location = defaultState.location;
    this._includeGST = this._location.code === 'AU';
    this._taxSting = this._includeGST ? 'INC.GST' : 'EXCL.GST';
    this._taxPercent = `${this._location.vat_percent} %`;
  }

  get includeGST() {
    return this._includeGST;
  }

  get taxString() {
    return this._taxSting;
  }

  get taxPercent() {
    return this._taxPercent;
  }

  get location() {
    return this._location;
  }

  get currency() {
    return this._currency;
  }

  get locale() {
    return this._locale;
  }

  get localeCode() {
    return this._locale.code;
  }

  get pathLocale() {
    if (this._locale.code === 'en') {
      return '';
    } else {
      return this._locale.code;
    }
  }

  get localeName() {
    return this._localesWithName[this._locale.code];
  }

  static get localesList() {
    return this._localesList;
  }


  set location(locationObj) {
    this._location = locationObj;
    this._includeGST = this._location.code === 'AU';
    this._taxSting = this._includeGST ? 'INC.GST' : 'EXCL.GST';
    this._taxPercent = `${this._location.vat_percent} %`;
    this.setHeaders();
  }

  set currency(currency) {
    this._currency = currency;
    this._currencyFormat = new Intl.NumberFormat(this._locale.code, { style: 'currency', currency: currency.code });
    this.setHeaders();
  }

  set locale(locale) {
    const isMatch = this._localesList.includes(locale.code);
    if (isMatch) {
      this._locale = {
        code: locale.code,
        name: this._localesWithName[locale.code],
      };
    } else {
      this._locale = {
        code: 'en',
        name: this._localesWithName['en'],
      };
    }

    this.setHeaders();
  }

  get list() {
    return this._localesList;
  }

  commitDefaultLocale(url) {
    const { isMatch, localeFromUrl } = this.isUrlContainsLocale(url);
    let localeObj;

    if (isMatch) {
      localeObj = {
        code: localeFromUrl,
        name: this._localesWithName[localeFromUrl]
      }
    } else {
      localeObj = {
        code: 'en',
        name: this._localesWithName['en']
      }
    }

    this.locale = localeObj;

    return localeObj
  }

  formatPrice(number, currency) {
    if (number === 0) {
      return 0;
    }
    if (number === null || number === undefined) {
      return ''
    }

    if (currency) {
      return Number(number).toLocaleString(this._locale.code, {
        style: 'currency',
        currency: currency,
      }).slice(0, -3);
    }
    return this._currencyFormat.format(number).slice(0, -3);
  }

  isUrlContainsLocale(url) {
    const localeFromUrl = url || document.location.pathname.split('/')[1];

    const isMatch = this._localesList.includes(localeFromUrl);

    if (!isMatch) {
      this.locale = {
        code: 'en',
        name: 'English',
      };
    }
    return { isMatch, localeFromUrl };
  }

  pushPathWithLocale(reload = false) {
    const pathname = document.location.pathname;
    const search = document.location.search;
    let urlArray = pathname.split('/');
    const localeFromUrl = urlArray[1];
    const isMatch = this._localesList.includes(localeFromUrl);

    let urlString;

    if (isMatch) {
      urlString = urlArray.slice(2).join('/');
    } else {
      urlString = urlArray.filter(item => item.length !== 0).join('/');
    }

    const pathLocale = this.pathLocale ? `${this.pathLocale}/` : '';


    const newPath = `/${pathLocale}${urlString}${search}`;

    if (newPath !== `${pathname}${search}`) {
      document.location.assign(newPath);
    } else if (reload) {
      document.location.reload();
    }
  }

  updateState(settings) {
    if (settings.locale) {
      this.locale = settings.locale;
    }

    if (settings.currency) {
      this.currency = settings.currency;
    }

    if (settings.location) {
      this.location = settings.location;
    }
  }

  setHeaders() {
    if (!isServer) {
      client.axios.defaults.headers.common['X-DIAMONDS-CURRENCY'] = this._currency.code; // 'USD'
      client.axios.defaults.headers.common['X-DIAMONDS-COUNTRY'] = this._location.code; // 'JP'
      client.axios.defaults.headers.common['Accept-Language'] = this._locale.code; // 'en'
    }
  }
}

const localeStore = new LocalesStore();

export default localeStore;
