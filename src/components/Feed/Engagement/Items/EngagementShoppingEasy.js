import ShoppingEasyBlock from "../../Shared/ShoppingEasyBlock";
import { connect } from 'react-redux';
import selectors from '../../../_selectors/engagementFeedSelectors';
import { fetchEngagementShoppingEasy } from '../EngagementFeedActions';

const mapStateToProps = (state) => {
  const { status, data } = selectors.shoppingEasy(state);

  return { status, data }
}

const mapDispatchToProps = {
  fetchData: fetchEngagementShoppingEasy
}

export default connect(mapStateToProps, mapDispatchToProps)(ShoppingEasyBlock);
