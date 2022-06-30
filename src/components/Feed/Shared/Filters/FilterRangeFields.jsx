import React from "react";
import { formatFilterInput } from "../../../../utils/formatFilterInput";
import { faCaretLeft } from "@fortawesome/free-solid-svg-icons/faCaretLeft";
import { faCaretRight } from "@fortawesome/free-solid-svg-icons/faCaretRight";
import IconFA from '../../../_common/IconFA';

const sendByEnter = (e, callback, ...args) => {
  if (e.key === "Enter") {
    callback.apply(this, args);
  }
};

const FilterRangeFields = ({
  value = [0, 0],
  min,
  max,
  handleChange,
  handleInputBlur,
  isDisabled,
  sign,
  accuracy,
  minInputRef,
  maxInputRef
}) => (
  <div className="range-fields">
    <div className="range-field">
      {value[0] !== min && (
        <button aria-label="diamond"
          className="range-field__btn"
          onClick={() => handleChange({ type: "min", action: "decrement" })}
          disabled={isDisabled}
        >
          <IconFA icon={faCaretLeft}/>
        </button>
      )}

      <input aria-label="diamond"
        type="text"
        className="range-field__item"
        // value={formatFilterInput(sign, value[0], accuracy)}
        disabled={isDisabled}
        onBlur={() => handleInputBlur({ type: "min" })}
        onKeyPress={e => sendByEnter(e, handleInputBlur, { type: "min" })}
        ref={minInputRef}
        defaultValue={formatFilterInput(sign, value[0], accuracy)}
      />

      {value[0] < value[1] && (
        <button aria-label="diamond"
          className="range-field__btn range-field__btn--type2"
          onClick={() => handleChange({ type: "min", action: "increment" })}
          disabled={isDisabled}
        >
          <IconFA icon={faCaretRight}/>
        </button>
      )}
    </div>
    <div className="range-field">
      {value[0] !== value[1] && (
        <button aria-label="diamond"
          className="range-field__btn"
          onClick={() => handleChange({ type: "max", action: "decrement" })}
          disabled={isDisabled}
        >
          <IconFA icon={faCaretLeft}/>
        </button>
      )}
      <input aria-label="diamond"
        type="text"
        className="range-field__item"
        disabled={isDisabled}
        onBlur={() => handleInputBlur({ type: "max" })}
        onKeyPress={e => sendByEnter(e, handleInputBlur, { type: "max" })}
        ref={maxInputRef}
        defaultValue={formatFilterInput(sign, value[1], accuracy)}
      />
      {value[1] < max && (
        <button aria-label="diamond"
          className="range-field__btn range-field__btn--type2"
          data-type="max"
          onClick={() => handleChange({ type: "max", action: "increment" })}
          disabled={isDisabled}
        >
          <IconFA icon={faCaretRight}/>
        </button>
      )}
    </div>
  </div>
);

export default FilterRangeFields;
