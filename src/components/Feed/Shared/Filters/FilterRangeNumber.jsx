import React from "react";
import FilterWrapper from "./FilterWrapper";
import { Slider } from "antd";
import FilterRangeFields from "./FilterRangeFields";
import {
  getLogFromPosition,
  getPositionFromLog
} from "../../../../utils/logSlider";
import { formatFilterInput } from "../../../../utils/formatFilterInput";

export default class FilterRangeNumber extends React.Component {
  constructor(props) {
    super(props);

    this.minInput = React.createRef();
    this.maxInput = React.createRef();

    this.basis =
      this.props.accuracy > 0 ? Math.pow(10, this.props.accuracy) : 1;

    this.configMin = Number(props.min);
    this.configMax = Number(props.max);

    this.min = this.configMin * this.basis;
    this.max = this.configMax * this.basis;
  }

  shouldComponentUpdate(nextProps, nextState, nextContext) {
    return (
      nextProps.input.max !== this.props.input.max ||
      nextProps.input.min !== this.props.input.min ||
      nextProps.input.isDisabled !== this.props.input.isDisabled
    )
  }

  getPosition = value => {
    return getPositionFromLog(value, this.min, this.max);
  };

  getValue = position => {
    return getLogFromPosition(position, this.min, this.max);
  };

  handleSave = value => {
    const { logarithm } = this.props;

    let realValue;

    if (logarithm) {
      realValue = [
        this.getValue(value[0]) / this.basis,
        this.getValue(value[1]) / this.basis
      ];
    } else {
      realValue = [value[0] / this.basis, value[1] / this.basis];
    }
    console.log('save1');
    this.props.save({
      type: this.props.type,
      value: realValue
    });
    this.props.filterChange && this.props.filterChange()
  };

  handleChange = ({ type, action }) => {
    const { accuracy, step } = this.props;
    const { min, max } = this.props.input;

    let value = [min, max];

    const sign = action === "increment" ? 1 : -1;
    const index = type === "min" ? 0 : 1;

    if (accuracy) {
      value[index] = Number((value[index] + step * sign).toFixed(accuracy));
    } else {
      value[index] = value[index] + step * sign;
    }

    if (value[index] < this.configMin) {
      value[index] = 0;
    }

    if (value[index] > this.configMax) {
      value[index] = this.configMax;
    }

    console.log('save2');
    this.props.save({
      type: this.props.type,
      value: value
    });
    this.props.filterChange && this.props.filterChange()
  };

  handleInput = () => {
    //if correct -> format
  };

  handleInputBlur = ({ type }) => {
    const inputValue = Number(
      this[`${type}Input`].current.value.replace(/[^0-9.]/g, "")
    );
    const { min, max } = this.props.input;
    const { sign, accuracy, save } = this.props;

    if (
      !isNaN(parseFloat(inputValue)) &&
      inputValue <= this.configMax &&
      inputValue >= this.configMin
    ) {
      const croppedValue = (inputValue * this.basis).toFixed() / this.basis;
      console.log('save');
      save({
        type: this.props.type,
        value: type === "min" ? [croppedValue, max] : [min, croppedValue]
      });
      this.props.filterChange && this.props.filterChange()
    } else {
      this[`${type}Input`].current.value = formatFilterInput(
        sign,
        type === "min" ? min : max,
        accuracy
      );
    }

    //save value
  };

  handleDisable = () => {
    const { input, type } = this.props;
    this.props.toggle({
      type: type,
      isDisabled: !input.isDisabled
    });
  };

  handleEnable = () => {
    const { input, type } = this.props;
    if (input.isDisabled) {
      this.props.toggle({
        type: type,
        isDisabled: false
      });
    }
  };

  componentDidUpdate(prevProps, prevState, snapshot) {
    //write actual value to input with ref
    const { sign, accuracy, input } = this.props;
    this.minInput.current.value = formatFilterInput(
      sign,
      (input.min * this.basis).toFixed() / this.basis,
      accuracy
    );
    this.maxInput.current.value = formatFilterInput(
      sign,
      (input.max * this.basis).toFixed() / this.basis,
      accuracy
    );
  }

  render() {
    const {
      title,
      video,
      wrapper,
      input,
      sign,
      accuracy,
      logarithm
    } = this.props;
    const { isDisabled } = input;

    let value;

    if (logarithm) {
      value = [
        this.getPosition(input.min * this.basis),
        this.getPosition(input.max * this.basis)
      ];
    } else {
      value = [input.min * this.basis, input.max * this.basis];
    }

    const displayValue = [
      (input.min * this.basis).toFixed() / this.basis,
      (input.max * this.basis).toFixed() / this.basis
    ];

    return (
      <FilterWrapper
        title={title}
        wrapper={wrapper}
        onCancel={this.handleDisable}
        isDisabled={isDisabled}
        video={video}
      >
        <div onClick={this.handleEnable}>
          <Slider
            range
            defaultValue={[this.min, this.max]}
            value={value}
            min={this.min}
            max={this.max}
            onChange={this.handleSave}
            disabled={isDisabled}
            tooltipVisible={false}
          />
          <FilterRangeFields
            accuracy={accuracy}
            sign={sign}
            min={this.configMin}
            max={this.configMax}
            value={displayValue}
            handleChange={this.handleChange}
            isDisabled={isDisabled}
            handleInput={this.handleInput}
            handleInputBlur={this.handleInputBlur}
            minInputRef={this.minInput}
            maxInputRef={this.maxInput}
          />
        </div>
      </FilterWrapper>
    );
  }
}
