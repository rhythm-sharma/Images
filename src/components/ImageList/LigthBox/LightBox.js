import React, { Component } from "react";
import Lightbox from "react-image-lightbox";
import "react-image-lightbox/style.css";

export default class LightboxGallery extends Component {
  onMovePrevRequest = () => {
    const { photoIndex, images } = this.props;

    this.props.onMovePrevRequest(
      (photoIndex + images.length - 1) % images.length
    );
  };

  onMoveNextRequest = () => {
    const { photoIndex, images } = this.props;

    this.props.onMoveNextRequest(
      (photoIndex + images.length - 1) % images.length
    );
  };

  render() {
    const { images, photoIndex } = this.props;

    return (
      <div>
        <Lightbox
          mainSrc={images[photoIndex].download_url}
          nextSrc={images[(photoIndex + 1) % images.length].download_url}
          prevSrc={
            images[(photoIndex + images.length - 1) % images.length]
              .download_url
          }
          onCloseRequest={() => this.props.handleShowLightBox(false)}
          onMovePrevRequest={this.onMovePrevRequest}
          onMoveNextRequest={this.onMoveNextRequest}
          imageCaption={images[photoIndex].author}
        />
      </div>
    );
  }
}
