const mainSliderStatus = state => state.main.mainSlider.status;
const mainSliderData = state => state.main.mainSlider.data;

const shapesBlockStatus = state => state.main.shapesBlock.status;
const shapesBlockData = state => state.main.shapesBlock.data;

const occasionSliderStatus = state => state.main.occasionSlider.status;
const occasionSliderData = state => state.main.occasionSlider.data;

const youHaveSeenSliderStatus = state => state.main.youHaveSeenSlider.status;
const youHaveSeenSliderData = state => state.main.youHaveSeenSlider.data;

const weddingRingsSliderStatus = state => state.main.weddingRingsSlider.status;
const weddingRingsSliderData = state => state.main.weddingRingsSlider.data;

const customJewelryStatus = state => state.main.customJewelry.status;
const customJewelryData = state => state.main.customJewelry.data;

const isPageViewed = state => state.main.isPageViewed;
const deviceSelector = state => state.shared.device.isMobile;

export default {
  isPageViewed,

  mainSliderStatus,
  mainSliderData,

  shapesBlockStatus,
  shapesBlockData,

  youHaveSeenSliderStatus,
  youHaveSeenSliderData,

  occasionSliderStatus,
  occasionSliderData,

  weddingRingsSliderStatus,
  weddingRingsSliderData,

  customJewelryStatus,
  customJewelryData,
  deviceSelector
};
