import React, { Fragment } from 'react';

const DeliveryBlock = ({ input, shared }) => (
  <div className="col-lg-4">
    <div className="order-info">
      <p className="theme-subtitle theme-subtitle--medium">Delivery address</p>
      <div className="order-details">
        <p className="theme-subtitle order-details__title">
          {shared.first_name} {shared.last_name}
        </p>
        <div className="order-details__block">
          <p>{input.address}</p>
          <p>
            {input.town_city}, {input.zip_postal_code}, {input.country}
          </p>
          <p>
            <span className="bold">Phone:</span> {shared.phone_number}
          </p>
        </div>
      </div>
    </div>
  </div>
);

const BillingBlock = ({ home, office, shared, sameBillingAddress }) => {
  const input = sameBillingAddress ? office : home;
  return (
    <div className="col-lg-4">
      <div className="order-info">
        <p className="theme-subtitle theme-subtitle--medium">Billing details</p>
        <div className="order-details">
          <p className="theme-subtitle order-details__title">
            {sameBillingAddress ? `${shared.first_name} ${shared.last_name}` : `${input.first_name} ${input.last_name}`}
          </p>
          <div className="order-details__block">
            <p>{input.address}</p>
            <p>
              {input.town_city}, {input.zip_postal_code}, {input.country}
            </p>
            <p>
              <span className="bold">Phone:</span> {sameBillingAddress ? shared.phone_number : input.phone_number}
            </p>
            <p>
              <span className="bold">Email:</span> {shared.email}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

const DeliveryMethod = () => (
  <div className="col-lg-4">
    <div className="order-info">
      <p className="theme-subtitle theme-subtitle--medium">Delivery method</p>
      <div className="order-details">
        <div className="order-details__block">
          <p>Standard delivery: Free</p>
          <p>
            <span className="bold">(1-5 business days)</span>
          </p>
        </div>
      </div>
    </div>
  </div>
);

const CheckoutOrderData = ({ data }) => {
  const { Office, Home, Showroom, Shared } = data;
  let type;
  let sameBillingAddress = true;

  if (Office && Home) {
    type = 'office';
    sameBillingAddress = false;
  }

  if (Office) {
    type = 'office';
  }

  if (Showroom) {
    type = 'showroom';
  }

  return (
    <div className="order-info-wrap xs-hide">
      <div className="row">
        {type === 'showroom' ? (
          `Showroom id: ${Showroom.id_showroom}`
        ) : (
          <Fragment>
            <DeliveryBlock input={Office} shared={Shared} />
            <BillingBlock office={Office} home={Home} shared={Shared} sameBillingAddress={sameBillingAddress} />
            <DeliveryMethod />
          </Fragment>
        )}
      </div>
    </div>
  );
};

export default CheckoutOrderData;
