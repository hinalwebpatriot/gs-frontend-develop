import React, { Fragment } from "react";
import { PreloaderImg } from "../../../_common/Preloader";
import TextInputField from "../../../_common/TextInputField";
import api from "../../../../config/api";

export const Promocode = (props) => {
  const { isDisabled = false, isValid = true, errors, promo_code, handleApplyBeforeCall, 
    handleApplyCallBack, handleClearCallBack, promoCodeRef, textForPlaceholder = 'Enter promocode' } = props;

    const handleClear = () => {
      handleClearCallBack();
    }

    const handleApply = () => {
      const promoCode = promoCodeRef.current.value;
      if(!promoCode) return;

      handleApplyBeforeCall();

      const formData = new FormData();
      formData.append("code", promoCode);

      api.cart.checkPromocode(formData)
        .then((res) => {
          const { with_confirmation } = res.data.data;
          handleApplyCallBack('success', with_confirmation);
        })
        .catch((err) => {
          // const { promoCodeRef } = props;
          const { errors } = err && err.response && err.response.data;
          // promoCodeRef.current.value = '';
          handleApplyCallBack('error', null, errors);
        });
    }
    return (
    <div className="row promocode-block">
      <div className="col-9 nopadding">
        <TextInputField
            type="text"
            name="promocode"
            error={errors && errors.code}
            successText={promo_code ? 'Promo code applied' : ''}
            isValid={isValid}
            disabled={isDisabled || promo_code}
            forwardRef={promoCodeRef}
            placeholder={`${promo_code ? promo_code : textForPlaceholder}`}
        />
      </div>
      <div className="col-3 nopadding">
        <button
            type="button"
            disabled={isDisabled}
            onClick={!promo_code ? handleApply : handleClear}
            className="theme-btn--type2 promo-btn"
        >
          {isDisabled ? <PreloaderImg height="40px" /> : !promo_code ? "Apply" : "Clear"}
        </button>
      </div>
  </div>
)};