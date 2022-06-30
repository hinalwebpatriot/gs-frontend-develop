import * as actions from '../components/_common/CountryDropdown/CountryDropdownActions';
import localeStore from "./LocalesStore";

const reduxSettingsMiddleware = () => next => action => {
    const result = next(action);

    if (action.type === actions.fetchSettings.SUCCESS) {

        // const defaultLocation = 'AU';
        // const defaultCurrency = 'AUD';
        // const defaultLocale = 'en';

        // const settings = {
        //   location: payload.location.find(item => item.code === defaultLocation),
        //   currency: payload.currency.find(item => item.code === defaultCurrency),
        //   lang: payload.lang.find(item => item.code === defaultLocale)
        // }

        // 'updateState', settings)


        // actions.submitSettings(settings))

        // store.dispatch(actions.submitSettings(settings))
    }

    if (action.type === actions.submitSettings.SUCCESS) {
      localeStore.locale = action.payload.locale;
      localeStore.pushPathWithLocale()
    }

  return result;
};

export default reduxSettingsMiddleware;
