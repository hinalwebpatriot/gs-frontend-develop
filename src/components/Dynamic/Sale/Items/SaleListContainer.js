import React from "react";
import { connect } from "react-redux";
import { deviceSelector } from "../../../_selectors/deviceSelector";
import selector from "../SaleSelectors";
import {
  fetchSaleEngagementFeed,
  fetchSaleEngagementFeedNextPage
} from "../SaleActions";
import { FeedListNextPageButton } from "../../../_common/Buttons/FeedListItemButtons";
import SaleList from './SaleList';


class SaleListContainer extends React.Component {
  constructor(props) {
    super(props);

    this.mobilePerPage = 8;
    this.desktopPerPage = 8;
  }


  componentDidMount() {
    const { isMobile, status } = this.props;

    if (status !== "success") {
      this.props.fetch({
        page: 1,
        perPage: isMobile ? this.mobilePerPage : this.desktopPerPage
      });
    }
  }

  componentWillUnmount() {
    this.props.clearData();
  }

  loadNextPage = () => {
    const { pagination, isMobile } = this.props;

    this.props.fetchNext({
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
      itemsSku,
    } = this.props;

    return (
      <div className="landing-products listing">
        <div className="row ring-row">
          <SaleList
            data={data}
            itemsSku={itemsSku}
            status={status}
            newItemsStatus={newItemsStatus}
          />

        </div>
          {pagination.currentPage < pagination.lastPage && (
            <FeedListNextPageButton
              title="rings"
              handleClick={this.loadNextPage}
              isMobile={isMobile}
              countMobile={this.mobilePerPage}
              count={this.desktopPerPage}
              newItemsStatus={newItemsStatus}
              status={status}
            />
          )}
      </div>
    );
  }
}

const clearData = fetchSaleEngagementFeed.fulfill;

const mapStateToProps = state => ({
  itemsSku: selector.getItemsGroupSku(state),
  status: selector.dataStatus(state),
  newItemsStatus: selector.newDataStatus(state),
  data: selector.feedDataObject(state),
  pagination: selector.pagination(state),
  isMobile: deviceSelector(state),
});

const mapDispatchToProps = {
  fetch: fetchSaleEngagementFeed,
  fetchNext: fetchSaleEngagementFeedNextPage,
  clearData
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SaleListContainer);
