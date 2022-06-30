import { isServer } from "../../../utils/isServer";

class RingConstructorBuilder {
  constructor() {
    this._diamondId = null;
    this._settingId = null;
    this._settingSize = null;
    this._editOption = null;
    this.min_stone_carat = null;
    this.max_stone_carat = null;

    this._latestSteps = [
      { type: "diamond", isDone: false, isActive: true },
      { type: "setting", isDone: false, isActive: false },
      { type: "ring", isDone: false, isActive: false }
    ];
  }

  init() {
    const diamond = localStorage.getItem("chosen_diamond");
    const setting = localStorage.getItem("chosen_setting");
    const settingSize = localStorage.getItem("chosen_setting_size");
    const option = localStorage.getItem("edit_option_id");

    this.diamondId = diamond;
    this.settingId = setting;
    this.settingSize = settingSize;
    this.editOption = option;

    this.min_stone_carat = +localStorage.getItem('min_stone_carat');
    this.max_stone_carat = +localStorage.getItem('max_stone_carat');
  }

  generateSteps(page) {
    const isDiamondChosen = this.diamondId !== null;
    const isSettingChosen = this.settingId !== null;
    const latestSteps = this._latestSteps !== null;
    let steps = [];

    switch (page) {
      case "diamond":
        if (isSettingChosen) {
          console.log("case \"diamond\":isSettingChosen");
          steps = [
            { type: "setting", isDone: true, isActive: false },
            { type: "diamond", isDone: false, isActive: true },
            { type: "ring", isDone: false, isActive: false }
          ];
        } else {
          console.log("case \"diamond\":!isSettingChosen");
          steps = [
            { type: "diamond", isDone: false, isActive: true },
            { type: "setting", isDone: false, isActive: false },
            { type: "ring", isDone: false, isActive: false }
          ];
        }
        break;
      case "engagement":
        if (isDiamondChosen) {
          console.log("case \"engagement\":isDiamondChosen");
          steps = [
            { type: "diamond", isDone: true, isActive: false },
            { type: "setting", isDone: false, isActive: true },
            { type: "ring", isDone: false, isActive: false }
          ];
        } else {
          console.log("case \"engagement\":!isDiamondChosen");
          steps = [
            { type: "setting", isDone: false, isActive: true },
            { type: "diamond", isDone: false, isActive: false },
            { type: "ring", isDone: false, isActive: false }
          ];
        }
        break;
      case "complete":
        if (latestSteps) {
          let stepsSlice = this._latestSteps
            .slice(0, -1)
            .map(item => ({ ...item, isActive: false, isDone: true }));
          steps = [
            ...stepsSlice,
            { type: "ring", isDone: false, isActive: true }
          ];
        } else {
          steps = steps = [
            { type: "diamond", isDone: true, isActive: false },
            { type: "setting", isDone: true, isActive: false },
            { type: "ring", isDone: false, isActive: true }
          ];
        }
        break;
    }

    return steps;
  }

  startUpdate({ id, optionId, type, ringSize }) {
    this.editOption = optionId;

    if (type === "diamond") {
      this.settingId = id;
      this.settingSize = ringSize;
    }

    if (type === "setting") {
      this.diamondId = id;
    }
  }

  completeUpdate(isCompleteRing = false) {
    this.diamondId = null;
    this.settingId = null;
    this.settingSize = null;
    this.editOption = null;
    if (isCompleteRing) this.removeCaratRange();
  }

  get isActive() {
    return Boolean(this.settingId || this.diamondId);
  }

  get diamondId() {
    return this._diamondId ? Number(this._diamondId) : null;
  }

  get settingId() {
    return this._settingId ? Number(this._settingId) : null;
  }

  get settingSize() {
    return this._settingSize ? Number(this._settingSize) : null;
  }

  get editOption() {
    return this._editOption;
  }

  get isUpdating() {
    if (this.editOption === 0) {
      //backend hack
      return true;
    } else {
      return this.editOption ? true : false;
    }
  }

  set diamondId(id) {
    this._diamondId = isNaN(parseInt(id)) ? null : id;

    localStorage.setItem("  osen_diamond", this._diamondId);
  }

  set settingId(id) {
    this._settingId = isNaN(parseInt(id)) ? null : id;

    localStorage.setItem("chosen_setting", this._settingId);
  }

  set settingSize(slug) {
    this._settingSize = slug || null;

    localStorage.setItem("chosen_setting_size", this._settingSize);
  }

  set editOption(optionId) {
    this._editOption = isNaN(parseInt(optionId)) ? null : optionId;

    localStorage.setItem("edit_option_id", this._editOption);
  }

  setCaratRange(min_stone_carat, max_stone_carat) {
    this.min_stone_carat = min_stone_carat;
    this.max_stone_carat = max_stone_carat;
    
    if (!isServer) {
      localStorage.setItem('min_stone_carat', min_stone_carat);
      localStorage.setItem('max_stone_carat', max_stone_carat);
    }
  }

  removeCaratRange() {
    this.min_stone_carat = null;
    this.max_stone_carat = null;
    localStorage.removeItem('min_stone_carat');
    localStorage.removeItem('max_stone_carat');
  }
}

const RingConstructor = new RingConstructorBuilder();

if (!isServer) {
  RingConstructor.init();
}

export default RingConstructor;
