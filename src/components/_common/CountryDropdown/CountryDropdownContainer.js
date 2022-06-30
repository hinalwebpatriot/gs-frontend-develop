import React from "react";
import CountryDropdown from "./CountryDropdown";
import { connect } from "react-redux";
import {
  setSettings,
  submitSettings
} from "./CountryDropdownActions";
import {
  settingsOptionsSelector,
  settingsSelectedSelector,
  settingsStatusSelector,
  settingsUnsavedSelector
} from "../../_selectors/settingSelector";

class CountryDropdownContainer extends React.Component {
  state = {
    isOpen: false
  };

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevState.isOpen !== this.state.isOpen) {
      if (this.state.isOpen) {
        document.body.classList.add("country-tab-open");
      } else {
        document.body.classList.remove("country-tab-open");
      }
    }
  }

  // componentDidMount() {
  //   this.props.fetchSettings();
  // }

  handleOpen = () => {
    this.setState({
      isOpen: true
    });
  };

  handleClose = () => {
    this.setState({
      isOpen: false
    });
  };

  handleSubmit = () => {
    this.handleClose();
    this.props.submitSettings(this.props.unsaved);
  };

  render() {
    const { status, options, selected, unsaved, setSettings } = this.props;
    const { isOpen } = this.state;
    return (
      <CountryDropdown
        isOpen={isOpen}
        status={status}
        options={options}
        selected={selected}
        unsaved={unsaved}
        handleOpen={this.handleOpen}
        handleClose={this.handleClose}
        setSettings={setSettings}
        handleSubmit={this.handleSubmit}
      />
    );
  }
}

const mapStateToProps = (state, props) => ({
  status: settingsStatusSelector(state),
  options: settingsOptionsSelector(state),
  selected: settingsSelectedSelector(state),
  unsaved: settingsUnsavedSelector(state)
});

export default connect(
  mapStateToProps,
  {
    // fetchSettings,
    setSettings,
    submitSettings
  }
)(CountryDropdownContainer);
