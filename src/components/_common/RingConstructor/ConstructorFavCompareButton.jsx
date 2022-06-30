import React from "react";
import withRingConstructor from "./WithRingConstructor";
import { Preloader } from "../Preloader";

const ConstructorFavCompareButton = ({
  type,
  status,
  handleCheck,
  isComplete,
  handleSave,
  isUpdating,
  className,
  children
}) => {
  if (isComplete) {
    return (
      <div className={`${className ? className : "slide__btns"}`}>
        <button
          className="theme-btn"
          onClick={handleCheck}
          disabled={status === "request"}
        >
          {status === "request" ? (
            <Preloader height="24px" margin="10px auto" />
          ) : isUpdating ? (
            "Update ring"
          ) : (
            "Complete ring"
          )}
        </button>
        {children}
      </div>
    );
  }

  return (
    <div className={`${className ? className : "slide__btns"}`}>
      <button className="theme-btn" onClick={handleSave}>
        {type === "diamond" ? "Choose setting" : "Choose diamond"}
      </button>
      {children}
    </div>
  );
};

export default withRingConstructor(ConstructorFavCompareButton);
