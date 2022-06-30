import React from "react";
import FilterPanelContainer from "./Filters/FilterPanelContainer";
import DiamondsFeedWrapper from "./Items/DiamondsFeedWrapper";
import DiamondsFeedListContainer from "./List/DiamondsFeedListContainer";

export default class DiamondsFeed extends React.Component {
  render() {
    const {
      showMobileFilters,
      handleModal,
      headerRef,
      wrapperRef,
      metaSlug,
        isSpecial
    } = this.props;
    return (
      <DiamondsFeedWrapper>
        <FilterPanelContainer
          handleModal={handleModal}
          showMobileFilters={showMobileFilters}
        />
        <DiamondsFeedListContainer
          headerRef={headerRef}
          wrapperRef={wrapperRef}
          metaSlug={metaSlug}
          isSpecial={isSpecial}
        />
      </DiamondsFeedWrapper>
    );
  }
}
