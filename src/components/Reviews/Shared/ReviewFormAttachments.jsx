import React from "react";
import CloseAttachSvg from "../../../img/jsSvg/CloseAttachSvg";
import notification from "../../../utils/notification";

export default class ReviewFormAttachments extends React.Component {
  shouldComponentUpdate(nextProps, nextState, nextContext) {
    return (
      nextProps.images.length !== this.props.images.length ||
      nextProps.disabled !== this.props.disabled
    );
  }

  handleRead = e => {
    const {
      images,
      fileCountLimit,
      fileSizeLimit,
      handleChangeImages
    } = this.props;
    const files = [...e.target.files];
    let slicedFiles = files;

    if (images.length + files.length > fileCountLimit) {
      notification("info", "The limit of uploaded files is 4");
      const availableCount = fileCountLimit - images.length;
      if (availableCount) {
        slicedFiles = files.slice(0, availableCount);
      } else {
        return;
      }
    }
    let newImages = [];
    slicedFiles.forEach(file => {
      try {
        if (!/image/.test(file.type)) {
          notification("error", `File ${file.name} doesn't contain an image`);
          return;
        }

        if (file.size > fileSizeLimit) {
          notification("error", `File ${file.name} is bigger than 10mb`);
          return;
        }

        const uniqueKey = (Math.random() * 100000).toFixed();

        newImages.push({
          file: file,
          fileName: file.name,
          id: `${uniqueKey}_${file.name}`
        });
      } catch (e) {

      }
    });

    if (newImages.length) {
      handleChangeImages([...images, ...newImages]);
    }
  };

  handleDelete = id => {
    const { handleChangeImages, images } = this.props;
    handleChangeImages(images.filter(item => item.id !== id));
  };

  render() {
    const { images, forwardRef, disabled } = this.props;

    const preview = images.map(item => {
      const img = new Image();
      img.src = window.URL.createObjectURL(item.file);
      img.onload = () => window.URL.revokeObjectURL(item.file);

      return (
        <div className="review-gallery__item">
          <button
            className="remove-attach"
            onClick={() => this.handleDelete(item.id)}
            type="button"
            disabled={disabled}
          >
            <span>
              <CloseAttachSvg />
            </span>
          </button>
          <img src={img.src} alt="" />
        </div>
      );
    });

    return (
      <div className="review-form__attachments">
        <div className="review-gallery">{preview}</div>
        <div className="add-file">
          <input
            type="file"
            className="add-file__item"
            accept="image/*"
            multiple
            onChange={this.handleRead}
            ref={forwardRef}
            disabled={disabled}
          />
          <button
            type="button"
            className="add-file__text"
            onClick={() => forwardRef.current.click()}
            disabled={disabled}
          >
            Add a photo
          </button>
        </div>
      </div>
    );
  }
}
