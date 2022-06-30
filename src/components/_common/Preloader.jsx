import React from "react";
import Spinner from "../../img/svg/preloader.svg";

export function PreloaderImg({ height, margin, style }) {
  return (
    <img
      style={{
        height: height ? height : "100px",
        width: height ? height : "100px",
        margin: margin ? margin : "0 auto",
        ...style
      }}
      src={Spinner}
      alt="Loading"
      draggable={false}
    />
  );
}

export function Preloader({ withMargin, height, margin }) {
  if (withMargin) {
    return (
      <div
        style={{
          margin: "0 auto"
        }}
      >
        <img
          style={{
            height: height ? height : "100px",
            margin: margin ? margin : "none"
          }}
          src={Spinner}
          alt="Loading"
        />
      </div>
    );
  }

  return (
    <div className="d-flex justify-content-center flex-center height100" style={{ width: "100%" }}>
      <img
        style={{
          height: height ? height : "100px",
          margin: margin ? margin : "none"
        }}
        src={Spinner}
        alt="Loading"
      />
    </div>
  );
}

export function PreloaderComponent({ error, retry, pastDelay, timedOut }) {
  if (error) {
    return (
      <div>
        Error! <button onClick={retry}>Retry</button>
      </div>
    );
  } else if (timedOut) {
    return (
      <div>
        Taking a long time... <button onClick={retry}>Retry</button>
      </div>
    );
  } else if (pastDelay) {
    return (
      <section
        style={{
          height: "100vh",
          width: "100%",
          margin: "0 auto",
          padding: "40vh",
          display: "flex"
        }}
      >
        <PreloaderImg />
      </section>
    );
  } else {
    return (
      <section
        style={{
          height: "100vh",
          width: "100%",
          margin: "0 auto",
          padding: "40vh",
          display: "flex"
        }}
      >
      </section>
    );
  }
}
