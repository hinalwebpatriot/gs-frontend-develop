import React from "react";
import DeliveryInputField from "./DeliveryTextInput";
import { connect } from "react-redux";
import selectors from "../../../_selectors/deliverySelectors";
import { saveDeliveryField} from "../DeliveryActions";

class DeliveryShowroomTab extends React.Component {
  constructor(props) {
    super(props);

    this.tab = "showroom";
  }

  handleSave = (field, value) => {
    this.props.save({
      type: this.tab,
      field,
      value
    });
  };

  handleSaveShared = (field, value) => {
    this.props.save({
      type: "shared",
      field,
      value
    });
  };

  render() {
    const { input, shared, errors = {}, status } = this.props;
    const isValid = errors.isValid[this.tab];
    const disabled = status === "request";
    return (
      <div className="delivery-form__group">
        <p className="theme-subtitle theme-subtitle--medium">
          Where we are delivering to?
        </p>
        <div className="row">
          <DeliveryInputField
            indent={false}
            label="Email"
            type="email"
            isValid={isValid}
            error={errors.shared.email}
            defaultValue={shared.email}
            onBlur={({ currentTarget }) =>
              this.handleSaveShared("email", currentTarget.value)
            }
            disabled={disabled}
          >
            <div className="field-hint">We send order copy</div>
          </DeliveryInputField>
        </div>
        <div className="row">
          <DeliveryInputField
            label="First name"
            type="text"
            isValid={isValid}
            error={errors[this.tab].firstName}
            defaultValue={input.firstName}
            onBlur={({ currentTarget }) =>
              this.handleSave("firstName", currentTarget.value)
            }
            disabled={disabled}
          />
          <DeliveryInputField
            label="Last name"
            type="text"
            isValid={isValid}
            error={errors[this.tab].lastName}
            defaultValue={input.lastName}
            onBlur={({ currentTarget }) =>
              this.handleSave("lastName", currentTarget.value)
            }
            disabled={disabled}
          />
          <DeliveryInputField
            label="Address (PO Boxes not allowed)"
            type="text"
            value="455 George Street"
            readOnly
            isValid="none"
          />
          <DeliveryInputField
            label="Company name"
            type="text"
            value="GS Diamond"
            readOnly
            isValid="none"
          />
          <DeliveryInputField
            label="Town / City"
            type="text"
            value="Sydney"
            readOnly
            isValid="none"
          />
          <DeliveryInputField
            label="ZIP / Postal Code"
            type="text"
            value="NSW 2000"
            readOnly
            isValid="none"
          />

          <DeliveryInputField
            label="Country"
            type="text"
            value="Australia"
            readOnly
            isValid="none"
          />
        </div>

        <div className="row">
          <DeliveryInputField
            label="Phone number"
            type="text"
            isValid={isValid}
            error={errors[this.tab].phoneNumber}
            defaultValue={input.phoneNumber}
            // placeholder="+61 123 456 789"
            onBlur={({ currentTarget }) =>
              this.handleSave("phoneNumber", currentTarget.value)
            }
            disabled={disabled}
          >
            {/*<div className="field-hint">For delivery info</div>*/}
          </DeliveryInputField>

          <DeliveryInputField
            label="Additional phone number"
            type="text"
            isValid={isValid}
            error={errors[this.tab].secondPhoneNumber}
            defaultValue={input.secondPhoneNumber}
            // placeholder="+61 123 456 789"
            onBlur={({ currentTarget }) =>
              this.handleSave("secondPhoneNumber", currentTarget.value)
            }
            disabled={disabled}
          />
        </div>

        <div className="row">
          <div className="col-lg-6">
            <div className="additional-comment">
              <span className="arrow-link arrow-link--type2 additional-comment__link">
                Additional comment to order
              </span>
            </div>
          </div>
          <DeliveryInputField
            textArea
            isValid="none"
            style={{ height: "150px" }}
            defaultValue={shared.comment}
            onBlur={({ currentTarget }) =>
              this.handleSaveShared("comment", currentTarget.value)
            }
            disabled={disabled}
          />
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  status: selectors.status(state),
  input: selectors.inputByTab(state, "showroom"),
  shared: selectors.inputByTab(state, "shared"),
  errors: selectors.errors(state)
});

const mapDispatchToProps = {
  save: saveDeliveryField
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DeliveryShowroomTab);
