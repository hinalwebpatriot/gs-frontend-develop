import React, { Fragment } from "react";
import Breadcrumbs from "../../_common/Breadcrumbs/Breadcrumbs";
import ContactUsLabels from "./ContactUsLabels";
import ContactUsSupport from "./ContactUsSupport";
import { connect } from "react-redux";
import {
  setShowroomTab,
  fetchShowroomData,
  fetchContactData
} from "../../_common/ShowroomBlock/ShowroomBlockActions";
import {
  showroomStatusSelector,
  showroomCurrentBlockSelector,
  showroomTabsSelector,
  showroomTabSelector,
  contactBlockStatusSelector,
  contactBlockDataSelector
} from "../../_selectors/showroomBlockSelectors";
import ContactUsShowrooms from "./ContactUsShowrooms";
import ContactUsSeoBlock from "./ContactUsSeoBlock";
import ContactUsFollow from "./ContactUsFollow";
import { Preloader } from "../../_common/Preloader";
import MetaTags from '../../_common/SEO/MetaTags';
import { dataLayerPush } from '../../../utils/dataLayer';

class ContactUsPage extends React.Component {
  componentDidMount() {
    if (this.props.status !== "success" && this.props.status !== "request") {
      this.props.fetchShowroomData();
    }

    if (this.props.contactStatus !== "success") {
      this.props.fetchContactData();
    }

    dataLayerPush({
      'dynx_itemid': '',
      'dynx_totalvalue': '',
      'dynx_pagetype': 'other'
    });
  }

  render() {
    const {
      status,
      showroom,
      currentTab,
      tabs,
      setShowroomTab,
      contactStatus,
      contactData,
    } = this.props;

    return (
      <Fragment>
        <MetaTags page="contact-us" h1="Contact us"/>
        <Breadcrumbs marks={[{ title: "Contact us" }]} />
        <div className="contact-section">
          <div className="container">
            <h1 className="section-title section-title--type2">
              GS Diamonds. We are glad to help you
            </h1>
            <div className="contact-container">
              <div className="row">
                <div className="col-lg-3">
                  {contactStatus === "success" && (
                    <Fragment>
                      <ContactUsLabels data={contactData.tags} />
                      <ContactUsSupport data={contactData} />
                    </Fragment>
                  )}
                </div>
                <div className="col-lg-8">
                  {
                    status === "success" ? showroom.map(( showroom, index) => (
                        <div key={`${showroom.title}_${index}`} style={{marginBottom: '10px'}}>
                          <ContactUsShowrooms
                              currentTab={currentTab}
                              tabs={tabs}
                              showroom={showroom}
                              changeTab={setShowroomTab}
                              indexTab={index}
                          />
                        </div>
                    )) : <Preloader />
                  }
                </div>
              </div>
            </div>
          </div>
        </div>
        {status === "success" && (
          <ContactUsSeoBlock data={showroom[0].expert} />
        )}
        <ContactUsFollow />
      </Fragment>
    );
  }
}

const mapStateToProps = state => ({
  status: showroomStatusSelector(state),
  showroom: showroomCurrentBlockSelector(state),
  currentTab: showroomTabSelector(state),
  tabs: showroomTabsSelector(state),

  contactStatus: contactBlockStatusSelector(state),
  contactData: contactBlockDataSelector(state)
});

const mapDispatchToProps = {
  setShowroomTab,
  fetchShowroomData,
  fetchContactData
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ContactUsPage);
