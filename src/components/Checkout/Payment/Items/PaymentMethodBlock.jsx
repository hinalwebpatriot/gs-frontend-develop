import React from 'react';
import PaymentSecureCard from './PaymentSecureCard';
import { Preloader } from '../../../_common/Preloader';

export default class PaymentMethodBlock extends React.Component {
  state = {
    tab: 'credit_card'
  };

  handleChangeTab = tab => {
    if (tab !== this.state.tab) {
      const { handleChangeMethod, data } = this.props;
      this.setState(
        {
          tab
        },
        () => {
          const method = data.find(item => item.type === tab);
          if (method) {
            handleChangeMethod(method);
          }
        }
      );
    }
  };

  moveInArrayPayments = arr => {
    const cloneArr = arr.map(el => ({ ...el }));
    const bankTransferIndex = cloneArr.findIndex(el => el.name === 'Bank transfer');
    const fromItem = cloneArr.splice(bankTransferIndex, 1);
    cloneArr.splice(0, 0, fromItem[0]);
    return cloneArr;
  };

  render() {
    const { tab } = this.state;
    const { data, status, method, handleSelect, handleChangeMethod, replace } = this.props;

    if (status !== 'success') {
      return (
        <div className="cart-right-block cart-right-block--type2">
          <p className="theme-subtitle theme-subtitle--medium" style={{ fontSize: '27px' }}>
            Please select payment method
          </p>
          <Preloader withMargin />
        </div>
      );
    }

    const sortedData = this.moveInArrayPayments(data);

    const options = sortedData.map(item => {
      return (
        <div className="fill-card__item" key={`method_${item.id}`}>
          <div className="card-radio">
            <input
              type="radio"
              className="radio"
              id={`r_${item.id}`}
              name="card"
              onChange={() => handleChangeMethod(item)}
              checked={method.id === item.id}
            />
            <label htmlFor={`r_${item.id}`}>
              {item.name === 'Bank transfer' ? (
                <span>
                  <span style={{ marginRight: '10px' }}>{item.name}</span>
                  <span className="cart-prod-discount-span">1% discount</span>
                </span>
              ) : (
                <span>{item.name}</span>
              )}
            </label>
          </div>
        </div>
      );
    });

    return (
      <div className="cart-right-block cart-right-block--type2">
        <p className="theme-subtitle theme-subtitle--medium" style={{ fontSize: '27px' }}>
          Please select payment method
        </p>

        <div className="choose-payment fill-card">{options}</div>

        <div className="cart-actions">
          <button className="theme-btn theme-btn--type2" onClick={() => handleSelect({ replace: replace })}>
            Select
          </button>
        </div>
        <PaymentSecureCard />
      </div>
    );
  }
}
