import React from "react";

const CartServicesHeader = ({ total }) => (
    <div className="d-flex cart-header">
        <p className="cart-header__total">
            Your secure cart total:
            <span> {total}</span>
        </p>
    </div>
);

export default CartServicesHeader;