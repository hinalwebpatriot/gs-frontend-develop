import React from "react";
import { connect } from "react-redux";
import { deviceSelector } from "../../../_selectors/deviceSelector";
import selector from "../../../_selectors/weddingFeedSelectors";
import {
  fetchWeddingFeed,
  fetchWeddingFeedNextPage
} from "../WeddingFeedActions";
// import { FeedListNextPageButton } from "../../../_common/Buttons/FeedListItemButtons";
import WeddingResultPanel from "./Items/WeddingResultPanel";
import WeddingListBody from "./Items/WeddingListBody";
import WeddingYourPicks from "./Items/WeddingYourPicks";
import { isEqual } from "lodash";
import MetaH1 from "../../../_common/SEO/MetaH1";
import Paginator from "../../../_common/Paginator";
import { openHubspotChat } from "../../../../config/hubspot";
import routing from '../../../../config/routing';

class WeddingFeedListContainer extends React.Component {
  constructor(props) {
    super(props);

    this.mobilePerPage = 24;
    this.desktopPerPage = 24;

    this.state = {
      view: "pane"
    };
  }

  handleChangeView = view => {
    this.setState({
      view: view
    });
  };

  componentDidUpdate(prevProps) {
    const { isMobile, inputData, match } = this.props;

    if (!isEqual(inputData, prevProps.inputData) || prevProps.match.params.pageNumber !== match.params.pageNumber) {
      this.props.fetch({
        page: match.params.pageNumber || 1,
        perPage: isMobile ? this.mobilePerPage : this.desktopPerPage
      });
    }
  }

  // componentWillUnmount() {
  //   this.props.clearData();
  // }

  loadNextPage = () => {
    const { pagination, isMobile } = this.props;

    this.props.fetchNext({
      page: pagination.currentPage + 1,
      perPage: isMobile ? this.mobilePerPage : this.desktopPerPage
    });
  };

  loadPage = (pageNumber) => {
    const { history, match } = this.props

    if (match.path === routing().weddingFeed || match.path === routing().weddingFeedPagination) {
      if (pageNumber === 1) {
        history.push(routing().weddingFeed)
      } else {
        history.push(routing(pageNumber).weddingFeedPagination)
      }
    }

    if (match.path === routing().weddingFeedWithFilter || match.path === routing().weddingFeedWithFilterPagination) {
      if (pageNumber === 1) {
        history.push(routing(match.params.filter).weddingFeedWithFilter)
      } else {
        history.push(routing({ filter: match.params.filter, pageNumber }).weddingFeedWithFilterPagination)
      }
    }

    if (match.path === routing().weddingFeedWithGenderFilter || match.path === routing().weddingFeedWithGenderFilterPagination) {
      if (pageNumber === 1) {
        history.push(routing({ ...match.params }).weddingFeedWithGenderFilter)
      } else {
        history.push(routing({ ...match.params, pageNumber }).weddingFeedWithGenderFilterPagination)
      }
    }
  }

  paginationHrefBuilder = (pageIndex) => {
    const { match } = this.props;

    if (match.path === routing().weddingFeed || match.path === routing().weddingFeedPagination) {
      if (pageIndex === 1) {
        return routing().weddingFeed
      } else {
        return routing(pageIndex).weddingFeedPagination
      }
    }

    if (match.path === routing().weddingFeedWithFilter || match.path === routing().weddingFeedWithFilterPagination) {
      if (pageIndex === 1) {
        return routing(match.params.filter).weddingFeedWithFilter
      } else {
        return routing({ filter: match.params.filter, pageNumber: pageIndex }).weddingFeedWithFilterPagination
      }
    }

    if (match.path === routing().weddingFeedWithGenderFilter || match.path === routing().weddingFeedWithGenderFilterPagination) {
      if (pageIndex === 1) {
        return routing({ ...match.params }).weddingFeedWithGenderFilter
      } else {
        return routing({ ...match.params, pageNumber: pageIndex }).weddingFeedWithGenderFilterPagination
      }
    }
  }

  render() {
    const { view } = this.state;
    const {
      status,
      pagination,
      data,
      isMobile,
      newItemsStatus,
      itemsSku,
      currentSize,
      handleModal,
      forwardRef,
      metaSlug,
      match
    } = this.props;

    const metaH1PageNumber = match.params.pageNumber > 1 ? match.params.pageNumber : null;

    return (
      <div className="col-lg-8 col-xl-9" ref={forwardRef}>
        <MetaH1
          className="section-title section-title--type2"
          slug={metaSlug}
          pageNumber={metaH1PageNumber}
        />
        <div className="expert-btn sm-show">
          <button className="theme-btn " onClick={handleModal}>
            Filter
          </button>
          <button className="theme-btn theme-btn--chat" onClick={() => openHubspotChat()}>
            Chat with expert
          </button>
        </div>
        <WeddingResultPanel
          total={pagination.total}
          view={view}
          changeView={this.handleChangeView}
        />
        <div className="listings-wrap">
          <div className="list-body" style={{minHeight: '700px'}}>
            <WeddingListBody
              view={view}
              data={data}
              itemsSku={itemsSku}
              status={status}
              newItemsStatus={newItemsStatus}
              currentSize={currentSize}
            />
            {/* {pagination.currentPage < pagination.lastPage && (
              <FeedListNextPageButton
                title="rings"
                handleClick={this.loadNextPage}
                isMobile={isMobile}
                countMobile={this.mobilePerPage}
                count={this.desktopPerPage}
                newItemsStatus={newItemsStatus}
                status={status}
              />
            )} */}
            <Paginator
              status={status}
              pagination={pagination}
              onPageChange={this.loadPage}
              paginationHrefBuilder={this.paginationHrefBuilder}
            />
          </div>
          <WeddingYourPicks />
        </div>
      </div>
    );
  }
}

const clearData = fetchWeddingFeed.fulfill;

const mapStateToProps = (state, props) => ({
  itemsSku: selector.getItemsGroupSku(state),
  status: selector.dataStatus(state),
  newItemsStatus: selector.newDataStatus(state),
  filtersStatus: selector.filterStatus(state),
  data: selector.feedDataObject(state),
  pagination: selector.pagination(state),
  isMobile: deviceSelector(state),
  inputData: selector.filterInput(state),
  currentSize: selector.filterSizeInput(state),
  handleModal: props.handleModal,
  forwardRef: props.forwardRef,
  metaSlug: props.metaSlug
});

const mapDispatchToProps = {
  fetch: fetchWeddingFeed,
  fetchNext: fetchWeddingFeedNextPage,
  clearData
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WeddingFeedListContainer);
