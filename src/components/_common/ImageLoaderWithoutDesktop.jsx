import React from "react";
import { connect } from "react-redux";
import { deviceSelector } from "../_selectors/deviceSelector";

const ImageLoaderWithoutDesktop = ({src, alt, style, isMobile}) => {
  return (
    <>
      {typeof isMobile === 'boolean' && isMobile && <img src={src} alt={alt} style={style}/>}
    </>
  )
}

const mapStateToProps = state => ({
  isMobile: deviceSelector(state),
})

export default connect(mapStateToProps)(ImageLoaderWithoutDesktop)