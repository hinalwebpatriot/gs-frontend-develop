// import {createSelector} from 'reselect'

export const deviceSelector = state => state.shared.device.isMobile;
export const deviceWidthSelector = state => state.shared.device.currentWidth;
