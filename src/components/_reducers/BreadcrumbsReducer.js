import { handleActions } from "redux-actions";

import { setBreadcrumbs } from "../_common/Breadcrumbs/BreadcrumbsActions";

const breadcrumbs = handleActions(
  {
    [setBreadcrumbs.TRIGGER](state, { payload }) {
      return payload;
    },
    [setBreadcrumbs.FULFILL]() {
      return [];
    }
  },
  []
);

export default breadcrumbs;
