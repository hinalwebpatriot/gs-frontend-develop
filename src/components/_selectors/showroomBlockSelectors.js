import { createSelector } from "reselect";

export const showroomStatusSelector = state =>
  state.shared.showroomBlock.status;
export const showroomTabSelector = state =>
  state.shared.showroomBlock.currentTab;

export const contactBlockStatusSelector = state =>
  state.shared.contactBlock.status;
export const contactBlockDataSelector = state => state.shared.contactBlock.data;

export const getContactByKey = (state, key) =>
  state.shared.contactBlock.plainContacts[key];

export const showroomTabsSelector = createSelector(
  state => state.shared.showroomBlock.data,
  data => {
    const tabs = [];
    data.map(item => {
      item.show_rooms.forEach(() => {
        tabs.push({
          title: item.country_title,
          count: item.show_rooms.length,
          code: item.country_code
        });
      });
    });

    return tabs;
  }
);

export const showroomDataSelector = createSelector(
  state => state.shared.showroomBlock.data,
  data => {
    let showrooms = {};

    data.forEach(item => {
      if (showrooms[item.country_code]) {
        showrooms[item.country_code] = showrooms[item.country_code].concat(item.show_rooms);
      } else {
       showrooms[item.country_code] = item.show_rooms;
      }  
    });
    
    return showrooms;
  }
);

export const showroomBlockSelector = createSelector(
  [
    state => state.shared.showroomBlock.status,
    showroomDataSelector,
    showroomTabsSelector
  ],
  (status, showrooms, tabs) => ({
    status,
    showrooms,
    tabs
  })
);

export const showroomCurrentBlockSelector = createSelector(
  [showroomTabSelector, showroomDataSelector],
  (tab, data) => data[tab]
);
