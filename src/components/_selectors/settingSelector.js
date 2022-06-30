// import {createSelector} from 'reselect'

export const settingsStatusSelector = state => state.settings.status;
export const settingsOptionsSelector = state => state.settings.options;
export const settingsSelectedSelector = state => state.settings.selected;
export const countrySelected = state => state.settings.selected.location.name;
export const settingsUnsavedSelector = state => state.settings.unsaved;

export const settingsLocationOptionsSelector = state =>
  state.settings.options.location;

export const isCookieAcceptedSelector = state => state.shared.isCookieAccepted;
