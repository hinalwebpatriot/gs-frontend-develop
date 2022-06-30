import React from "react";
import ShoppingEasyBlock from "../../Shared/ShoppingEasyBlock";
import selectors from '../../../_selectors/weddingFeedSelectors';
import { fetchWeddingShoppingEasy } from '../../Wedding/WeddingFeedActions';
import { connect } from 'react-redux';

const mapStateToProps = (state) => {
  const { status, data } = selectors.shoppingEasy(state);

  return { status, data }
}

const mapDispatchToProps = {
  fetchData: fetchWeddingShoppingEasy
}

export default connect(mapStateToProps, mapDispatchToProps)(ShoppingEasyBlock);
