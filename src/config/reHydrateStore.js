import localeStore from './LocalesStore'
import { settingsSelectedSelector } from '../components/_selectors/settingSelector';

const reHydrateStore = () => {
  let state = window.__PRELOADED_STATE__
    ? JSON.parse(decodeURIComponent(window.__PRELOADED_STATE__))
    : undefined

  try {
    const stateScript = document.getElementById('ssr-state');

    if (stateScript) {
      stateScript.parentNode.removeChild(stateScript);
    }

    delete window.__PRELOADED_STATE__

    if (state) {
      localeStore.updateState(settingsSelectedSelector(state));
    }
  } catch (err) {
    console.error(err)
  }

  return state;
}


export default reHydrateStore;
