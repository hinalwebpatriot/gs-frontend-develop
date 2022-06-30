import React from "react";
import noImage from "../../../img/no_image_placeholder.jpg";
import ProductImageRotateSprite from "./ProductImageRotateSprite";
import ProductImageRotateArrayImages from "./ProductImageRotateArrayImages";
import LazyLoadWithServer from "../LazyLoadWithServer";

const NewProductImageRotate = props => {
  if (!props.images) {
    return (
      <div className={props.className}>
        <img src={noImage} alt={props.alt ? props.alt : ''} />
      </div>
    );
  }

  return (
    <LazyLoadWithServer once={true} offset={300} height={540} forceLoad>
      {props.images.length === 1 ? (
        <ProductImageRotateSprite {...props} />
      ) : (
        <ProductImageRotateArrayImages {...props} />
      )}
    </LazyLoadWithServer>
  );
};

export default NewProductImageRotate;
