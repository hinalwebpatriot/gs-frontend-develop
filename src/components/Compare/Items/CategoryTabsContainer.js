import { connect } from "react-redux";
import { get } from "lodash";
import selectors from "../../_selectors/compareSelectors";
import CategoryTabs from "../../_common/CompareAndFavorites/CategoryTabs";

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
  },
  productCategory: get(selectors.product(state), "items[0].category.name", null),
  ...props
});

export default connect(mapStateToProps)(CategoryTabs);
