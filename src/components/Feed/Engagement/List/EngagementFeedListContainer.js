import React from 'react'
import { connect } from 'react-redux'
import { deviceSelector } from '../../../_selectors/deviceSelector'
import selector from '../../../_selectors/engagementFeedSelectors'
import { fetchEngagementFeed, fetchEngagementFeedNextPage } from '../EngagementFeedActions'
// import { FeedListNextPageButton } from '../../../_common/Buttons/FeedListItemButtons'
import EngagementResultPanel from './Items/EngagementResultPanel'
import EngagementListBody from './Items/EngagementListBody'
import EngagementYourPicks from './Items/EngagementYourPicks'
import { isEqual } from 'lodash'
import MetaH1 from '../../../_common/SEO/MetaH1'
import Paginator from '../../../_common/Paginator'
import RingConstructor from '../../../_common/RingConstructor/RingConstructor'
import { openHubspotChat } from '../../../../config/hubspot'
import routing from '../../../../config/routing';

class EngagementFeedListContainer extends React.Component {
  constructor(props) {
    super(props)

    this.mobilePerPage = 24
    this.desktopPerPage = 24

    this.state = {
      view: 'pane'
    }
  }

  handleChangeView = view => {
    this.setState({
      view: view
    })
  }

  componentDidMount() {
    const { filtersStatus, inputData, isMobile, status, match } = this.props

    if ((filtersStatus === 'success' && status !== 'success') || RingConstructor.diamondId) {
      this.props.fetch({
        input: inputData,
        page: match.params.pageNumber || 1,
        perPage: isMobile ? this.mobilePerPage : this.desktopPerPage
      })
    }
  }

  componentDidUpdate(prevProps) {
    const { isMobile, inputData, match  } = this.props

    if (!isEqual(inputData, prevProps.inputData) || prevProps.match.params.pageNumber !== match.params.pageNumber) {
      this.props.fetch({
        page: match.params.pageNumber || 1,
        perPage: isMobile ? this.mobilePerPage : this.desktopPerPage
      })
    }
  }

  componentWillUnmount() {
    if (RingConstructor.diamondId) {
      this.props.clearData()
    }
  }

  loadNextPage = () => {
    const { pagination, isMobile } = this.props

    this.props.fetchNext({
      page: pagination.currentPage + 1,
      perPage: isMobile ? this.mobilePerPage : this.desktopPerPage
    })
  }

  loadPage = (pageNumber) => {
    const { history, match } = this.props

    if (match.path === routing().engagementFeed || match.path === routing().engagementFeedPagination) {
      if (pageNumber === 1) {
        history.push(routing().engagementFeed)
      } else {
        history.push(routing(pageNumber).engagementFeedPagination)
      }
    }

    if (match.path === routing().engagementFeedWithFilter || match.path === routing().engagementFeedWithFilterPagination) {
      if (pageNumber === 1) {
        history.push(routing(match.params.filter).engagementFeedWithFilter)
      } else {
        history.push(routing({ filter: match.params.filter, pageNumber }).engagementFeedWithFilterPagination)
      }
    }
  }

  paginationHrefBuilder = (pageIndex) => {
    const { match } = this.props;

    if (match.path === routing().engagementFeed || match.path === routing().engagementFeedPagination) {
      if (pageIndex === 1) {
        return routing().engagementFeed
      } else {
        return routing(pageIndex).engagementFeedPagination
      }
    }

    if (match.path === routing().engagementFeedWithFilter || match.path === routing().engagementFeedWithFilterPagination) {
      if (pageIndex === 1) {
        return routing(match.params.filter).engagementFeedWithFilter
      } else {
        return routing({ filter: match.params.filter, pageNumber: pageIndex }).engagementFeedWithFilterPagination
      }
    }
  }

  render() {
    const { view } = this.state
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
      shortDescription,
    } = this.props
    const metaH1PageNumber = match.params.pageNumber > 1 ? match.params.pageNumber : null;

    return (
      <div className="col-lg-8 col-xl-9" ref={forwardRef}>
        <MetaH1 slug={metaSlug} pageNumber={metaH1PageNumber} className="section-title section-title--type2" />
        <div className="expert-btn sm-show">
          <button className="theme-btn " onClick={handleModal}>
            Filter
          </button>
          <button className="theme-btn theme-btn--chat" onClick={() => openHubspotChat()}>Chat with expert</button>
        </div>
        <EngagementResultPanel total={pagination.total} view={view} changeView={this.handleChangeView} />
        <div className="listings-wrap">
          <div className="list-body" style={{ minHeight: '700px' }}>
            <EngagementListBody
              view={view}
              data={data}
              itemsSku={itemsSku}
              status={status}
              newItemsStatus={newItemsStatus}
              currentSize={currentSize}
              metaSlug={metaSlug}
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
            {shortDescription && (
              <div className="short-description" dangerouslySetInnerHTML={{ __html: shortDescription }}></div>
            )}
          </div>
          <EngagementYourPicks currentSize={currentSize} />
        </div>
      </div>
    )
  }
}

const clearData = fetchEngagementFeed.fulfill

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
  // filterKeys: getDiamondsFeedFilterInputIsActive(state),
})

const mapDispatchToProps = {
  fetch: fetchEngagementFeed,
  fetchNext: fetchEngagementFeedNextPage,
  clearData
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EngagementFeedListContainer)
