import React, { useEffect } from "react";
import img from "../../img/referral.jpg";
import { connect, useFormik } from 'formik';
import { checkEmail, requiredFields } from "../../utils/formUtil";
import notification from "../../utils/notification";
import { useSelector } from 'react-redux';
import ImageLoader from "../_common/ImageLoader";
import MetaTags from "../_common/SEO/MetaTags";
import BreadcrumbSeparator from "antd/lib/breadcrumb/BreadcrumbSeparator";
import Breadcrumbs from "../_common/Breadcrumbs/Breadcrumbs";
import routing from "../../config/routing";
import { Link } from "react-router-dom";
import { dataLayerPush } from '../../utils/dataLayer';

const ReferralPage = (props) => {
  const sendData = (values, { setFieldValue, setSubmitting }) => {
    const data = {
      ...values,
      recipients: [values.recipients]
    }

    fetch('/api/v1/referral/send', {
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
        'Accept': 'application/json'
       },
      method: 'PUT',
      body: JSON.stringify(data)
    }).then(res => {
        if (res.status === 200) {
          const receiverEmail = values.recipients && values.recipients.email 
          ? `to the ${values.recipients.email}`
          : ''
          notification('success', `Promo code was successfully sent ${receiverEmail}!`);
          setFieldValue('recipients.email', '');
          setSubmitting(false);
        };
        return res.json()})
      .then(res => {
        if (!res) return;
        if (res.message) {
          notification('error', res.message);
        };
      })
      .catch(() => console.log('error'));
  }
  let p = `This offer valid for new customers only. You cannot refer yourself. The promo code can be used only at the first purchase. Minimum spend is A$3,000. Each personal promotion code is unique and can be used only once. Offer can be combined with other discounts. Promotional discounts applied to an order are only valid for the item purchased and will not be applied to future purchases or exchanges. Benefits can be redeemed only after the referee’s money-back guarantee period is over. Benefits will be provided in a form of a gift card. By accepting this offer you agree to the Terms and Conditions and Privacy Policy\.We respect your friend\'s privacy. Under no circumstances will GS Diamonds use your friend\'s personal information for any purpose other than informing them about this program.`;
  const formik = useFormik({
    initialValues: {
      sender: '',
      sender_first_name: '',
      sender_last_name: '',
      comment: `I thought you’d love GS Diamonds as much as I do! They have a dazzling selection of engagement rings and jewellery with conflict-free and ethical diamonds, so you can be confident that you're making the right choice. Enter the promo code below at checkout and get a discount with your first purchase of A$3,000!`,
      subscribe: true,
      recipients: 
      {
        email: '',
        first_name: '',
        last_name: ''
      }
    },
    validate: (values) => {      
      const errors = {};
      errors.recipients = {};
      requiredFields(values, ['sender_first_name', 'sender_last_name'], errors);
      requiredFields(values['recipients'], ['first_name'], errors.recipients);
      checkEmail(values, 'sender', errors);
      checkEmail(values['recipients'], 'email', errors.recipients);
      if (Object.keys(errors.recipients).length === 0) {
        delete errors.recipients;
      }
      return errors;
    },
    onSubmit: sendData,
    validateOnBlur: true,    
    validateOnChange: false
  });
  const h1 = 'Refer a friend';
  const description = "If you have a friend who has never ordered from GS Diamonds, just enter their name and e-mail address, and we will send them a discount code on the first purchase. When they will make their purchase following our instructions, we'll e-mail you how and when you can redeem your benefits.";

  useEffect(() => {
    dataLayerPush({
      'dynx_itemid': '',
      'dynx_totalvalue': '',
      'dynx_pagetype': 'other'
    });
  }, [])
  return (
    <div>
      <MetaTags page="referral" h1={h1} description={description} />
      <Breadcrumbs marks={[{ title: 'Refer a friend', path: routing().referral }]} />
      <div className="container container1600 container-referall relative">
        <div className="wrapper_referral_img">
          <ImageLoader src={img} alt="referral"></ImageLoader>
        </div>
        <div className="main_wrapper_referral">
          <form className="right-wrapper" onSubmit={formik.handleSubmit}>
            <div className="mob_frame">
              <h1 className="gold_referral">Refer a friend</h1>
              <h2 className="gold_referral">share the love and earn together!</h2>
              <p className="about_ref">
                If you have a friend who has never ordered from GS Diamonds, just enter their name and e-mail address, and we will send them a discount code on the first purchase. When they will make their purchase following our instructions, we'll e-mail you how and when you can redeem your benefits.
              </p>
              <ul className="ref_list">
                <li>earn A$100 if they spend A$3000 or more</li>
                <li>earn A$150 if they spend A$6000 or more</li>
                <li>earn A$200 if they spend A$10000 or more</li>
                <li>earn A$250 if they spend A$15000 or more</li>
                <li>earn A$300 if they spend A$20000 or more</li>
              </ul>
              <p className="about_ref">Your friends will receive a discount equal to your benefit!</p>
            </div>
            <div className="block__forms_wrapper">
              <div className="mob_frame">
                <div className="your_info_col">
                  <h3>Please enter your information</h3>
                  <div className="form">
                    <div className="referal_row">
                      <div className="control">
                        <input type="text" id="sender_first_name" name="sender_first_name" value={formik.values.sender_first_name} onChange={formik.handleChange} onBlur={formik.handleBlur} placeholder="first name" className="ref_inputs"/>
                        <div className="control__error">{formik.touched.sender_first_name && formik.errors.sender_first_name}</div>
                      </div>
                      <div className="control">
                        <input type="text" id="sender_last_name" name="sender_last_name" value={formik.values.sender_last_name} onChange={formik.handleChange} onBlur={formik.handleBlur} placeholder="last name" className="ref_inputs "/>
                        <div className="control__error">{formik.touched.sender_last_name && formik.errors.sender_last_name}</div>
                      </div>
                    </div>
                    <div className="control control_b">
                      <input type="text" id="sender" name="sender" value={formik.values.sender} onChange={formik.handleChange} onBlur={formik.handleBlur} placeholder="your e-mail"className="ref_inputs ref_inputs_b"/>
                      <div className="control__error">{formik.touched.sender && formik.errors.sender}</div>
                    </div>
                    <div className="radio-ref">
                      <input className="ref_checkbox" type="checkbox" id="subscribe" defaultChecked name="subscribe" value={formik.values.subscribe} onChange={formik.handleChange} />
                      <label htmlFor="subscribe" className="radio-label">Subscribe <br/>to our news &amp; offers</label>
                    </div>
                    <div className="h3_terms">Terms and conditions</div> 
                    <p className="information">This offer valid for new customers only. You cannot refer yourself. The promo code can be used only at the first purchase. Minimum spend is A$3,000. Each personal promotion code is unique and can be used only once. Offer can be combined with other discounts. Promotional discounts applied to an order are only valid for the item purchased and will not be applied to future purchases or exchanges. Benefits can be redeemed only after the referee’s money-back guarantee period is over. Benefits will be provided in a form of a gift card. By accepting this offer you agree to 
                    the <Link to={routing().terms}> Terms and Conditions</Link> and <Link to={routing().privacyPolicy}> Privacy Policy</Link>. <br/> <br/> 
                    We respect your friend's privacy. Under no circumstances will GS Diamonds use your friend's personal information for any purpose other than informing them about this program.</p>
                  </div>
                </div>
              </div>
              <div className="friend_info_col form_radio mob_frame mob_frame_last">
                <h3>Please enter your friend’s information</h3>
                  <div className="referal_row"> 
                    <div className="control">
                      <input type="text" id="recipients.first_name" name="recipients.first_name" value={formik.values.recipients.first_name} onChange={formik.handleChange} onBlur={formik.handleBlur} placeholder="first name" className="ref_inputs"/>
                      <div className="control__error">{formik.errors.recipients && formik.touched.recipients && formik.touched.recipients.first_name && formik.errors.recipients.first_name}</div>
                    </div>
                    <div className="control">
                      <input type="text" id="recipients.last_name" name="recipients.last_name" value={formik.values.recipients.last_name} onChange={formik.handleChange} onBlur={formik.handleBlur} placeholder="last name" className="ref_inputs "/>
                      <div className="control__error">{formik.errors.recipients && formik.touched.recipients && formik.touched.recipients.last_name && formik.errors.recipients.last_name}</div>
                    </div>
                  </div>
                  <div className="control control_b">
                    <input type="text" id="recipients.email" name="recipients.email" value={formik.values.recipients.email} onChange={formik.handleChange} onBlur={formik.handleBlur} placeholder="e-mail address" className="ref_inputs ref_inputs_b"/>
                    <div className="control__error">{formik.errors.recipients && formik.touched.recipients && formik.touched.recipients.email && formik.errors.recipients.email}</div>
                  </div>
                <div className="name_box_check referal_row">
                  <h3>Leave a note</h3>
                  {/* <div className="radio-ref">
                    <input type="checkbox" id="reminder"/>
                    <label htmlFor="reminder" className="radio-label">send a reminder <br/>to my friend in 3 days</label><br/>
                  </div> */}
                </div>
                <textarea id="comment" name="comment" value={formik.values.comment} onChange={formik.handleChange} onBlur={formik.handleBlur} className="information-box" placeholder="LEAVE A NOTE"/>
                <button type="submit" className="ref-btn">send e-mail</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>);
};

export default ReferralPage;