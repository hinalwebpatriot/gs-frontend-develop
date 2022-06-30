import React from "react";
import DeliveryTabs from "./DeliveryTabs";
import DeliveryOfficeTab from "./DeliveryOfficeTab";
import DeliveryHomeTab from "./DeliveryHomeTab";
import { connect } from "react-redux";
import selectors from "../../../_selectors/deliverySelectors";
import { setDeliveryTab} from "../DeliveryActions";
import DeliveryShowroomTab from "./DeliveryShowroomTab";

class DeliveryForm extends React.Component {
  state = {
    tab: "office"
  };

  handleChange = tab => {
    this.setState({
      tab: tab
    });
  };

  render() {
    const { setDeliveryTab, showHome, currentTab } = this.props;
    return (
      <div className="col-lg-6">
        <div className="delivery-form">
          <p className="theme-subtitle theme-subtitle--medium">
            Just 2 steps to finalize your order
          </p>
        </div>
        <DeliveryTabs
          showHome={showHome}
          currentTab={currentTab}
          handleChange={setDeliveryTab}
        />

        {currentTab === "office" && <DeliveryOfficeTab />}
        {currentTab === "home" && <DeliveryHomeTab />}
        {currentTab === "showroom" && <DeliveryShowroomTab />}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  showHome: selectors.showHome(state),
  currentTab: selectors.currentTab(state)
});

const mapDispatchToProps = {
  setDeliveryTab
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DeliveryForm);
