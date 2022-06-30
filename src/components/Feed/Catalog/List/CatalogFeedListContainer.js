import React from "react";
import { connect } from "react-redux";
import { withRouter } from 'react-router-dom';
import { flowRight as compose } from "lodash";
import { deviceSelector } from "../../../_selectors/deviceSelector";
import selector from "../../../_selectors/catalogFeedSelectors";
import {
  fetchCatalogFeed,
  fetchCatalogFeedNextPage, setCatalogCategory
} from "../CatalogFeedActions";
import CatalogResultPanel from "./Items/CatalogResultPanel";
import CatalogListBody from "./Items/CatalogListBody";
// import CatalogYourPicks from "./Items/CatalogYourPicks";
import { isEqual } from "lodash";
import MetaH1 from "../../../_common/SEO/MetaH1";
import RingConstructor from '../../../_common/RingConstructor/RingConstructor';
// import { FeedListNextPageButton } from "../../../_common/Buttons/FeedListItemButtons";
import Paginator from '../../../_common/Paginator'
import routing from '../../../../config/routing';

class CatalogFeedListContainer extends React.Component {
  constructor(props) {
    super(props);

    this.mobilePerPage = 24;
    this.desktopPerPage = 24;

    this.state = {
      view: "pane",
    };
  }

  handleChangeView = view => {
    this.setState({
      view: view
    });
  };

  componentDidMount() {
    const {filtersStatus, inputData, isMobile, status, match, lastCategory} = this.props;
    if (lastCategory !== match.params.catalog) {
      console.log('match.params.catalog', match.params.catalog);
      this.props.fetch({
        slug: match.params.catalog === 'cluster-rings' ? 'rings' : match.params.catalog,
        input: inputData,
        page: match.params.pageNumber || 1,
        perPage: isMobile ? this.mobilePerPage : this.desktopPerPage
      });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const { isMobile, inputData, match } = this.props;

    if (!isEqual(inputData, prevProps.inputData) ||
      prevProps.match.params.catalog !== match.params.catalog || prevProps.match.params.pageNumber !== match.params.pageNumber) {
      this.props.fetch({
        slug: match.params.catalog === 'cluster-rings' ? 'rings' : match.params.catalog,
        page: match.params.pageNumber || 1,
        perPage: isMobile ? this.mobilePerPage : this.desktopPerPage
      });

    }
  }

  componentWillUnmount() {
    if (RingConstructor.diamondId) {
      this.props.clearData();
    }
  }

  loadNextPage = () => {
    const { pagination, isMobile, match } = this.props;

    this.props.fetchNext({
      slug: match.params.catalog,
      page: pagination.currentPage + 1,
      perPage: isMobile ? this.mobilePerPage : this.desktopPerPage
    });
  };

  loadPage = (pageNumber) => {
    const { history, match } = this.props

    if (pageNumber === 1) {
      history.push(routing(match.params.catalog).catalogFeed)
    } else {
      history.push(routing({catalog: match.params.catalog, pageNumber}).catalogFeedPagination)
    }
  }

  paginationHrefBuilder = (pageIndex) => {
    const { match } = this.props;

    if (pageIndex === 1) {
      return routing(match.params.catalog).catalogFeed
    } else {
      return routing({catalog: match.params.catalog, pageNumber: pageIndex}).catalogFeedPagination
    }
  }

  render() {
    const { view } = this.state;
    const {
      status,
      pagination,
      match,
      data,
      isMobile,
      newItemsStatus,
      itemsSku,
      currentSize,
      handleModal,
      forwardRef,
      metaSlug,
      catalogType,
      setCatalogCategory
    } = this.props;

    const metaH1PageNumber = match.params.pageNumber > 1 ? match.params.pageNumber : null;
    let parseType = catalogType.includes('s') ? catalogType.slice(0, catalogType.length - 1) : catalogType;
    return (
      <div className="col-lg-8 col-xl-9" ref={forwardRef}>
        <MetaH1
          slug={metaSlug}
          defaultTitle={catalogType}
          catalogType={catalogType}
          pageNumber={metaH1PageNumber}
          type="product"
          className="section-title section-title--type2"
          match={match}
        />
        <div className="expert-btn sm-show">
          <button className="theme-btn " onClick={handleModal}>
            Filter
          </button>
          <button className="theme-btn theme-btn--chat">
            Chat with expert
          </button>
        </div>
        <CatalogResultPanel
          total={pagination.total}
          view={view}
          changeView={this.handleChangeView}
          type={parseType}
        />
        <div className="listings-wrap">
          <div className="list-body" style={{minHeight: '700px'}}>
            <CatalogListBody
              view={view}
              data={data}
              itemsSku={itemsSku}
              status={status}
              newItemsStatus={newItemsStatus}
              currentSize={currentSize}
              setCatalogCategory={setCatalogCategory}
              catalogType={parseType}
            />
            {/* {pagination.currentPage < pagination.lastPage && (
              <FeedListNextPageButton
                title={`${catalogType}${catalogType === 'pendant' ? 's' : ''}`}
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
          {/*<CatalogYourPicks currentSize={currentSize} />*/}
        </div>
      </div>
    );
  }
}

const clearData = fetchCatalogFeed.fulfill;

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
  metaSlug: props.metaSlug,
  lastCategory: selector.lastCategory(state)
  // filterKeys: getDiamondsFeedFilterInputIsActive(state),
});

const mapDispatchToProps = {
  fetch: fetchCatalogFeed,
  fetchNext: fetchCatalogFeedNextPage,
  clearData,
  setCatalogCategory
};

export default compose(
  withRouter,
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(CatalogFeedListContainer);
