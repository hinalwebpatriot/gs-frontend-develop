import React from "react";

export default class SubscribeBlock extends React.Component {
  constructor(props) {
    super(props);

    this.input = React.createRef();
  }

  handleCheckboxChange = ({ currentTarget }) => {
    const value = currentTarget.dataset.value;

    if (value) {
      this.props.changeSubscribeType(value);
    }
  };

  handleSend = ({ currentTarget }) => {
    this.props.handleSend({
      email: this.input.current.value,
      gender: currentTarget.dataset.value
    });
    this.input.current.value = "";
  };

  render() {
    const { checkboxes = [], isMain } = this.props;

    return (
        <div className={`saving-section ${isMain ? 'with-bg-img' : ''}`}>
          <div className="container">
            <div className="row justify-content-end ">
              <div className="col-lg-6 col-xl-6">
                <form
                  className="saving-form"
                  onSubmit={e => e.preventDefault()}
                  >
                  <div className="saving-form__inner">
                    <p className="section-title">Save more with GS Diamonds</p>
                    <p className="form-subtitle">
                      Wholesale diamonds and engagement rings direct to public
                    </p>
                    <div className="form-label">
                      <button
                        className={`form-label__item ${
                          checkboxes.includes("sale") ? "active" : ""
                        }`}
                        onClick={this.handleCheckboxChange}
                        data-value="sale"
                      >
                        Sale
                      </button>
                      <button
                        className={`form-label__item ${
                          checkboxes.includes("discounts") ? "active" : ""
                        }`}
                        onClick={this.handleCheckboxChange}
                        data-value="discounts"
                      >
                        Discounts
                      </button>
                      <button
                        className={`form-label__item ${
                          checkboxes.includes("new_collection") ? "active" : ""
                        }`}
                        onClick={this.handleCheckboxChange}
                        data-value="new_collection"
                      >
                        New collections
                      </button>
                    </div>
                    <div className="saving-subscribe">
                      <div className="subscribe">
                        <input aria-label="subscribe" 
                          type="text"
                          className="subscribe__field"
                          placeholder="Email"
                          ref={this.input}
                        />
                        <button aria-label="subscribe" 
                          className="subscribe__btn"
                          data-value="woman"
                          onClick={this.handleSend}
                        >
                          Woman
                        </button>
                        <button aria-label="subscribe" 
                          className="subscribe__btn"
                          data-value="man"
                          onClick={this.handleSend}
                        >
                          Man
                        </button>
                      </div>
                      {/*<a href="#" className="intouch-btn">*/}
                      {/*Stay in touch*/}
                      {/*<span>*/}
                      {/*<img src={slideArrow} alt="" />*/}
                      {/*</span>*/}
                      {/*</a>*/}
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
    );
  }
}
