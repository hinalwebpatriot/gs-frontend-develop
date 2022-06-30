import React, { Fragment } from 'react';
import errorImg from '../../../img/svg/error_img.svg';
import { isServer } from '../../../utils/isServer';

export default function FallbackUI() {
  if (!isServer) {
    if (localStorage.getItem('prodWasUpdated') !== 'true') {
      localStorage.setItem('prodWasUpdated', 'true');
      window.location.reload();
    }
    setTimeout(() => {localStorage.removeItem('prodWasUpdated')}, 15000);
  }
  return (
    <Fragment>
      <div className="container error-boundary">
        <div className="col-12">
          <h1 className="section-title text-center">Something went wrong</h1>
          <div className="static-page-img">
            <img src={errorImg} className="error-boundary-img" alt="Error boundary img" />
          </div>
          <p className="error-boundary-text">
            An error occurred. Please reload page and try again
          </p>
          <div className="list-next d-flex justify-content-center">
            <button className="theme-btn" type="button" onClick={() => document.location.reload(true)}>Reload</button>
          </div>
        </div>
      </div>
    </Fragment>
  )
}
