// OrderSuccess.js
import React from 'react';
import './OrderSuccess.scss';

const OrderSuccess = () => {
  return (
    <div className="order-success">
      <div className="success-container">
        <div className="success-icon">&#10004;</div>
        <h1 className="success-heading">Your Order Was Successful!</h1>
        <p className="success-message">Thank you for your purchase. You will receive an email confirmation shortly.</p>
      </div>
    </div>
  );
};

export default OrderSuccess;
