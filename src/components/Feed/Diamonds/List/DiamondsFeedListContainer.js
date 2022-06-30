import React, { Fragment } from "react";
import DiamondsResultPanel from "./Items/DiamondsResultPanel";
import DiamondsListHeader from "./Items/DiamondsListHeader";
import DiamondsListBody from "./Items/DiamondsListBody";
import { connect } from "react-redux";
import { deviceSelector } from "../../../_selectors/deviceSelector";
import {
  diamondsFeedDataObjectSelector,
  diamondsFeedInputDataSelector,
  diamondsFeedNextStatusSelector,
  diamondsFeedPaginationSelector,
  diamondsFeedStatusSelector,
  getDiamondsFeedFilterInputIsActive,
  getDiamondsItemIdSelector
} from "../../../_selectors/diamondsFeedSelectors";
import {
  fetchDiamondsFeed,
  fetchDiamondsFeedNextPage,
} from "../DiamondsFeedActions";
import { FeedListNextPageButton } from "../../../_common/Buttons/FeedListItemButtons";
import { isEqual } from "lodash";
import MetaH1 from "../../../_common/SEO/MetaH1";
import MetaTags from '../../../_common/SEO/MetaTags';
import RingConstructor from '../../../_common/RingConstructor/RingConstructor';
import { withRouter } from 'react-router-dom';

class DiamondsFeedListContainer extends React.Component {
  constructor(props) {
    super(props);

    this.mobilePerPage = 25;
    this.desktopPerPage = 50;



  }

  componentDidMount() {
    if (RingConstructor.settingId) {
      const { fetchDiamondsFeed, isMobile, isSpecial } = this.props;
      fetchDiamondsFeed({
        page: 1,
        perPage: isMobile ? this.mobilePerPage : this.desktopPerPage,
        offline: isSpecial ? 1 : 0,
      });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const { fetchDiamondsFeed, isMobile, inputData , isSpecial} = this.props;
    if (!isEqual(inputData, prevProps.inputData) || !isEqual(isSpecial, prevProps.isSpecial)) {
      fetchDiamondsFeed({
        page: 1,
        perPage: isMobile ? this.mobilePerPage : this.desktopPerPage,
        offline: isSpecial ? 1 : 0,
      });
    }
  }

  // componentWillUnmount() {
  //   if ()
  //   this.props.clearData();
  // }

  loadNextPage = () => {
    const { fetchDiamondsFeedNextPage, pagination, isMobile } = this.props;

    fetchDiamondsFeedNextPage({
      page: pagination.currentPage + 1,
      perPage: isMobile ? this.mobilePerPage : this.desktopPerPage
    });
  };

  render() {
    const {
      status,
      pagination,
      data,
      isMobile,
      newItemsStatus,
      itemsId,
      filterKeys,
      wrapperRef,
      headerRef,
      metaSlug,
    } = this.props;
    
    return (
      <Fragment>
        <MetaTags page={metaSlug} h1="Diamonds" />
        <MetaH1
          slug={metaSlug}
          defaultTitle="Diamonds"
          className="seo-filter-title"
        />
        <DiamondsResultPanel total={pagination.total} />
        <div
          className="listings-wrap"
          style={{ marginTop: "30px" }}
          ref={wrapperRef}
        >
          <DiamondsListHeader filterKeys={filterKeys} headerRef={headerRef} />
          <DiamondsListBody
            data={data}
            itemsId={itemsId}
            status={status}
            newItemsStatus={newItemsStatus}
            filterKeys={filterKeys}
          />
          {pagination.currentPage < pagination.lastPage && (
            <FeedListNextPageButton
              title="diamonds"
              handleClick={this.loadNextPage}
              isMobile={isMobile}
              countMobile={this.mobilePerPage}
              count={this.desktopPerPage}
              newItemsStatus={newItemsStatus}
              status={status}
            />
          )}
        </div>
      </Fragment>
    );
  }
}

const clearData = fetchDiamondsFeed.fulfill;

const mapStateToProps = (state, props) => ({
  itemsId: getDiamondsItemIdSelector(state),
  status: diamondsFeedStatusSelector(state),
  newItemsStatus: diamondsFeedNextStatusSelector(state),
  data: diamondsFeedDataObjectSelector(state),
  pagination: diamondsFeedPaginationSelector(state),
  isMobile: deviceSelector(state),
  inputData: diamondsFeedInputDataSelector(state),

  filterKeys: getDiamondsFeedFilterInputIsActive(state),
  metaSlug: props.metaSlug,
  ...props
});

const mapDispatchToProps = {
  fetchDiamondsFeed,
  fetchDiamondsFeedNextPage,
  clearData
};

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(DiamondsFeedListContainer));
