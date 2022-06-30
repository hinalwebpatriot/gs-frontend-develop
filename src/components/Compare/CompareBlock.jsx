import React from "react";
import CategoryTabsContainer from "./Items/CategoryTabsContainer";
import routing from "../../config/routing";
import CompareWrapper from "./Items/CompareWrapper";
import CompareSidebar from "./Items/CompareSidebar";
import CompareMain from "./Items/CompareMain";

 export default class CompareBlock extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      currentTab: props.matchParams.tab ? props.matchParams.tab : "diamond"
    };
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.matchParams.tab !== this.props.matchParams.tab) {
      this.setState({
        currentTab: this.props.matchParams.tab
          ? this.props.matchParams.tab
          : "diamond"
      });
    }
  }

  handleChangeTab = (tab) => {

    if (this.state.currentTab !== tab) {
      this.setState(
        {
          currentTab: tab
        },
        () => {
          this.props.history.push(routing(tab).compareTab);
        }
      );
    }
  };

  render() {
    const { currentTab } = this.state;
    return (
      <section className="fav-and-compare-section">
        <div className="container">
          <p className="section-title section-title--type2">
            Compare and choose
          </p>
          <CategoryTabsContainer
            currentTab={currentTab}
            handleChange={this.handleChangeTab}
          />
          <CompareWrapper>
            <CompareSidebar currentTab={currentTab} />
            <CompareMain currentTab={currentTab} />
          </CompareWrapper>
        </div>
      </section>
    );
  }
}
