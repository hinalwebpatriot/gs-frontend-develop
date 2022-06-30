import { connect } from "react-redux";
import selectors from "../../_selectors/favoriteSelectors";
import CategoryTabs from "../../_common/CompareAndFavorites/CategoryTabs";
import {get} from "lodash";

const mapStateToProps = (state, props) => ({
  tabsCount: {
    diamond: selectors.tabCount(state, "diamond"),
    engagement: selectors.tabCount(state, "engagement"),
    wedding: selectors.tabCount(state, "wedding"),
    product: selectors.tabCount(state, "product"),
    pendant: selectors.tabCount(state, "pendant"),
    ring: selectors.tabCount(state, "ring"),
    earring: selectors.tabCount(state, "earring"),
    bracelet: selectors.tabCount(state, "bracelet"),
    'eternity-ring': selectors.tabCount(state, "eternity-ring"),
  },
  // type: "favorite",
  productCategory: get(selectors.product(state), "items[0].category.name", null),
  ...props
});

export default connect(mapStateToProps)(CategoryTabs);
