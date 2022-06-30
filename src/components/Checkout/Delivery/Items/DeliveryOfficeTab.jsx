import React from "react";
import DeliveryInputField from "./DeliveryTextInput";
import DeliveryCountryDropdown from "./DeliveryCountryDropdown";
import { connect } from "react-redux";
import selectors from "../../../_selectors/deliverySelectors";
import { saveDeliveryField, setSameBillingAddress } from "../DeliveryActions";

class DeliveryOfficeTab extends React.Component {
  constructor(props) {
    super(props);

    this.tab = "office";
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
    const {
      setSameBillingAddress,
      input,
      shared,
      errors = {},
      status
    } = this.props;
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
            isValid={isValid}
            error={errors[this.tab].address}
            defaultValue={input.address}
            onBlur={({ currentTarget }) =>
              this.handleSave("address", currentTarget.value)
            }
            disabled={disabled}
          />
          <DeliveryInputField
            label="Company name"
            type="text"
            isValid={isValid}
            error={errors[this.tab].companyName}
            defaultValue={input.companyName}
            onBlur={({ currentTarget }) =>
              this.handleSave("companyName", currentTarget.value)
            }
            disabled={disabled}
          />
          <DeliveryInputField
            label="Town / City"
            type="text"
            isValid={isValid}
            error={errors[this.tab].city}
            defaultValue={input.city}
            onBlur={({ currentTarget }) =>
              this.handleSave("city", currentTarget.value)
            }
            disabled={disabled}
          />
          <DeliveryInputField
            label="ZIP / Postal Code"
            type="text"
            isValid={isValid}
            error={errors[this.tab].postalCode}
            defaultValue={input.postalCode}
            onBlur={({ currentTarget }) =>
              this.handleSave("postalCode", currentTarget.value)
            }
            disabled={disabled}
          />

          <DeliveryCountryDropdown
            save={this.handleSave}
            error={errors[this.tab].country}
            value={input.country}
            disabled={disabled}
          >
            <div className="delivery-check">
              <input
                type="checkbox"
                className="checkbox checkbox--type3"
                id="id1"
                onChange={() =>
                  setSameBillingAddress(!shared.sameBillingAddress)
                }
                defaultChecked={shared.sameBillingAddress}
                disabled={disabled}
              />
              <label htmlFor="id1">
                <span>The same as billing address</span>
              </label>
            </div>
          </DeliveryCountryDropdown>

          <DeliveryInputField
            label="State"
            type="text"
            isValid={isValid}
            error={errors[this.tab].state}
            defaultValue={input.state}
            onBlur={({ currentTarget }) =>
              this.handleSave("state", currentTarget.value)
            }
            disabled={disabled}
          >
            <div className="delivery-check">
              <input
                type="checkbox"
                className="checkbox checkbox--type3"
                id="id2"
                defaultChecked={shared.specialPackage}
                onChange={({ currentTarget }) =>
                  this.handleSaveShared("specialPackage", currentTarget.value)
                }
                disabled={disabled}
              />
              <label htmlFor="id2">
                <span>Wrap in special package</span>
              </label>
            </div>
          </DeliveryInputField>

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
            <div className="field-hint">
              {shared.sameBillingAddress
                ? "For billing and delivery info"
                : "For delivery info"}
            </div>
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
  input: selectors.inputByTab(state, "office"),
  shared: selectors.inputByTab(state, "shared"),
  errors: selectors.errors(state)
});

const mapDispatchToProps = {
  save: saveDeliveryField,
  setSameBillingAddress
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DeliveryOfficeTab);
