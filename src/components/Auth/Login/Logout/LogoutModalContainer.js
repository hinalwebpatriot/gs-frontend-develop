import { connect } from "react-redux";
import { pushLogout } from "../LoginModalActions";
import LogoutModal from "./LogoutModal";

export default connect(
  null,
  {
    pushLogout
  }
)(LogoutModal);
