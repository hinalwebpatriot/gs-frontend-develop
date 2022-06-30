import { connect } from "react-redux";
import { pushLogin } from "./LoginModalActions";
import LoginModal from "./LoginModal";
import {
  authCheckVerifySelector,
  authErrorsSelector,
  modalAuthStatusSelector
} from "../../_selectors/authSelectors";

const mapStateToProps = (state, props) => ({
  status: modalAuthStatusSelector(state),
  backendErrors: authErrorsSelector(state),
  verify: authCheckVerifySelector(state),
  verifyError: authErrorsSelector(state).resend_label,
  ...props
});

const resetState = pushLogin.fulfill;

export default connect(
  mapStateToProps,
  {
    pushLogin,
    resetState
  }
)(LoginModal);
