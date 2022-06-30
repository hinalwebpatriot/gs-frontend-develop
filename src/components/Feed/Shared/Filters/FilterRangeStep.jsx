import React from "react";
import FilterWrapper from "./FilterWrapper";
import { Slider } from "antd";
import generateFiltersLabels from "../../../../utils/generateFiltersLabels";
import { isEqual } from "lodash";

export default class FilterRangeStep extends React.Component {
  constructor(props) {
    super(props);

    this.slider = React.createRef();

    this.state = {
      value: [0, props.marks.length],
      labels: generateFiltersLabels(
        props.marks,
        [1, props.marks.length],
        props.marginLeft
      )
    };
  }

  shouldComponentUpdate(nextProps, nextState, nextContext) {
    return (
      nextProps.input.max !== this.props.input.max ||
      nextProps.input.min !== this.props.input.min ||
      nextProps.input.isDisabled !== this.props.input.isDisabled ||
      !isEqual(nextState.value, this.state.value)
    )
  }

  static getDerivedStateFromProps(props, state) {
    if (props.input.min === null || props.input.max === null) {
      return {
        value: [0, props.marks.length],
        labels: generateFiltersLabels(
          props.marks,
          [1, props.marks.length],
          props.marginLeft
        )
      };
    }

    //This is logic for triple excellent checkbox. Created to sync local state and redux
    const newValue = [props.input.min - 1, props.input.max];
    const newMarksRange = [props.input.min, props.input.max];
    if (newValue[0] !== state.value[0] || newValue[1] !== state.value[1]) {
      return {
        labels: generateFiltersLabels(
          props.marks,
          newMarksRange,
          props.marginLeft
        ),
        value: newValue
      };
    }

    return false;
  }

  handleChange = value => {
    if (value[0] !== value[1]) {
      const actualValues = [value[0] + 1, value[1]];
      this.setState(
        {
          value,
          labels: generateFiltersLabels(
            this.props.marks,
            actualValues,
            this.props.marginLeft
          )
        },
        () =>
          this.props.save({
            type: this.props.type,
            value: actualValues
          })
      );
    }
  };

  handleDisable = () => {
    // let value;
    const { input, type } = this.props;
    //
    // if (input.min === null || input.max === null) {
    //   value = [0, marks.length];
    // }

    this.props.toggle({
      type: type,
      isDisabled: !input.isDisabled
      // value,
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

  render() {
    const { value, labels } = this.state;
    const { title, marks, wrapper, video } = this.props;
    const { isDisabled } = this.props.input;

    return (
      <FilterWrapper
        title={title}
        wrapper={wrapper}
        isDisabled={isDisabled}
        onCancel={this.handleDisable}
        video={video}
      >
        <div onClick={this.handleEnable}>
          <Slider
            range
            marks={labels}
            value={value}
            min={0}
            max={marks.length}
            onChange={this.handleChange}
            // onAfterChange={this.handleAfterChange}
            tooltipVisible={false}
            disabled={isDisabled}
          />
        </div>
      </FilterWrapper>
    );
  }
}
