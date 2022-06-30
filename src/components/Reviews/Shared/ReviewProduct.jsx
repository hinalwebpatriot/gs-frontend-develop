import React, { Fragment } from "react";
import Rating from "../../_common/Rating";
import redArrow from "../../../img/svg/red_arrow.svg";
import LinkSvg from "../../../img/jsSvg/LinkSvg";
import { Link } from "react-router-dom";
import ImageLoader from "../../_common/ImageLoader";
import { isServer } from "../../../utils/isServer";
import { format } from 'date-fns';
import LightboxWrapper from '../../_common/Lightbox/LightboxWrapper';

export default class ReviewProduct extends React.Component {
  constructor(props) {
    super(props);

    this.textLimit = 340;

    this.state = {
      isTextExpanded: false,
      photoIndex: 0,
      isOpen: false,
      preloadedImages: !isServer ? this.handlePreload(props.data.photos) : []
    };
  }

  componentDidMount() {
    const { photos } = this.props.data;
    if (this.state.preloadedImages.length !== photos.length) {
      //because of ssr
      this.setState({
        preloadedImages: this.handlePreload(photos)
      });
    }
  }

  handlePreload = images => {
    const preloadedImages = images.map(link => {
      let preloadImg = new Image();
      preloadImg.src = link;
      return preloadImg;
    });

    return preloadedImages;
  };

  handleOpenLightbox = index => {
    this.setState({
      photoIndex: index,
      isOpen: true
    });
  };

  handleCloseLightBox = () => {
    this.setState({
      photoIndex: 0,
      isOpen: false
    });
  };

  handleExpandText = () => {
    this.setState({
      isTextExpanded: true
    });
  };

  render() {
    const { photoIndex, isOpen, preloadedImages, isTextExpanded } = this.state;
    const { data, link } = this.props;
    const { title, author_name, text, date_created, rate, photos, id } = data;
    const { slug } = data.product;
    // const date = moment.unix(date_created).format("MMMM D, YYYY");
    const date = format(new Date(date_created * 1000), 'MMMM d, yyyy');

    const imagesCallback = (photo, index) => (
      <div
        className="review-gallery__item"
        key={`gallery_${id}_${index}`}
        onClick={() => this.handleOpenLightbox(index)}
      >
        <ImageLoader
          src={isServer ? photo : photo.src}
          preloadStyles={{ height: "40px", margin: "15px auto" }}
          alt={`Review galery item: ${title}`}
        />
      </div>
    );

    const images = isServer
      ? photos.map(imagesCallback)
      : preloadedImages.map(imagesCallback);

    return (
      <div className="review">
        {isOpen && (
          <LightboxWrapper
            mainSrc={preloadedImages[photoIndex].src}
            onCloseRequest={this.handleCloseLightBox}
            nextSrc={
              preloadedImages[(photoIndex + 1) % preloadedImages.length].src
            }
            prevSrc={
              preloadedImages[
                (photoIndex + photos.length - 1) % preloadedImages.length
              ].src
            }
            onMovePrevRequest={() =>
              this.setState({
                photoIndex:
                  (photoIndex + photos.length - 1) % preloadedImages.length
              })
            }
            onMoveNextRequest={() =>
              this.setState({
                photoIndex: (photoIndex + 1) % photos.length
              })
            }
            imageLoadErrorMessage={""}
          />
        )}

        <p className="theme-subtitle">{author_name}</p>
        <div className="review-header d-flex">
          <p className="theme-subtitle theme-subtitle--smaller">{title}</p>
          <Rating rate={rate} readOnly />
        </div>
        <p className="info-p info-p--type2 info-p--type2--grey">
          {date}
        </p>
        <div className="review-text">
          <p>
            {text.slice(0, this.textLimit)}
            {text.length > this.textLimit && !isTextExpanded ? (
              <Fragment>
                {`... `}
                <button
                  type="button"
                  className="review-link"
                  onClick={this.handleExpandText}
                >
                  Read more
                </button>
              </Fragment>
            ) : (
              text.slice(this.textLimit)
            )}
          </p>
        </div>
        <div className="review-gallery">{images}</div>

        {link && slug && (
          <Link to={link} className="review-link">
            <span className="review-link__icon">
              <LinkSvg />
            </span>
            <span className="review-link__text">link to the product</span>
            <span className="review-link__icon review-link__icon--arrow">
              <img className="red-arrow" src={redArrow} alt="red arrow" />
            </span>
          </Link>
        )}
      </div>
    );
  }
}
