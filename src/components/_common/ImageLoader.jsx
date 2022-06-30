import React, { Fragment } from "react";
import { PreloaderImg } from "./Preloader";
import noImagePic from "../../img/no_image_placeholder.jpg";
import LazyLoadWithServer from "./LazyLoadWithServer";
import GoogleEE from './GoogleEE/GoogleEE';
import NoScript from './NoScript';

const NoImage = ({ src, alt = "" }) => (
  <Fragment>
    <img src={noImagePic} alt="empty" className="lazy-img"/>
    <NoScript>
      <img src={src} alt={alt} />
    </NoScript>
  </Fragment>
);

const Placeholder = (style) => (
  <div style={{ height: '100%', display: "flex", alignSelf: "center", alignItems: 'center' }}>
    <PreloaderImg {...style} />
  </div>
);

export default class ImageLoader extends React.Component {
  constructor(props) {
    super(props);

    this.timerId = null;
    this.delay = 250;

    this.state = {
      isLoaded: false,
      isError: false
    };
  }

  componentDidMount() {
    if (!this.state.isLoaded && !this.state.isError) {
      this.setState({
        isLoaded: true
      });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.src !== this.props.src) {
      this.timerId = setTimeout(() => {
        this.setState({
          isLoaded: false,
          isError: false
        });
      }, this.delay);
    }
  }

  componentWillUnmount() {
    if (this.timerId) {
      clearTimeout(this.timerId);
    }
  }

  handleLoad = () => {
    if (this.timerId) {
      clearTimeout(this.timerId);
    }

    this.setState({
      isLoaded: true
    });

    const { product, list, position } = this.props;

    if (product) {
      GoogleEE.productView({ product, list, position });
    }
  };

  handleError = () => {
    if (this.timerId) {
      clearTimeout(this.timerId);
    }
    this.setState({
      isError: true
    });
  };

  render() {
    const { src = "", alt = "", srcSetMin = "", preloadStyles = {}, style = {}, height, importance } = this.props;
    const { isLoaded, isError } = this.state;

    if (isError) {
      return <NoImage/>
    }

    return (
      <LazyLoadWithServer
        offset={75}
        height={ height || 0 }
        // placeholder={<NoImage/>}
        unmountIfInvisible={false}
        once={true}
        serverPlaceholder={<NoImage src={src} alt={alt}/>}
      >

        {!isLoaded && !isError && <Placeholder style={preloadStyles}/>}

        {/*/!* Hack for ssr *!/*/}
        {/*{!isLoaded && isError && (*/}
        {/*<img src={noImage} alt="no image" />*/}
        {/*)}*/}

      <picture>
        <source media="(max-width: 425px) " srcSet={srcSetMin}/>

        <source media="(max-width: 768px)" srcSet={src}/>
        <img
            src={src}
            alt={alt}
            style={{ ...style, display: isLoaded && !isError ? "" : "none" }}
            onLoad={this.handleLoad}
            onError={this.handleError}
            className="lazy-img"
            importance={importance}
        />
      </picture>
        <NoScript>
          <img src={src} alt={alt} />
        </NoScript>
      </LazyLoadWithServer>
    );
  }
}
