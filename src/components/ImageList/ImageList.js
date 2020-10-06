import React, { Component } from "react";
import axios from "axios";
import CircularProgress from "@material-ui/core/CircularProgress";

import LazyImage from "./LazyImage/LazyImage";
import LightboxGallery from "./LigthBox/LightBox";

import "./ImageList.scss";

class ImageList extends Component {
  constructor() {
    super();
    this.state = {
      images: [],
      page: 1,
      imagesFetchState: "",
      photoIndex: 0,
      showLightBox: false,
    };
  }

  componentDidMount() {
    this.fetchImages(1, 50);

    window.addEventListener("scroll", () => {
      if (
        window.innerHeight + document.documentElement.scrollTop >=
        document.scrollingElement.scrollHeight - 250
      ) {
        let page = this.state.page + 1;
        this.setState({
          page: page,
        });
        this.fetchImages(page);
      }
    });
  }

  componentWillUnmount() {
    window.removeEventListener("scroll", this.fetchImages);
  }

  fetchImages = async (page = 1, limit = 50) => {
    if (page) {
      this.setState({
        imagesFetchState: "loading",
      });

      try {
        const result = await axios(
          `https://picsum.photos/v2/list?page=${page}&limit=${limit}`
        );
        let tempImages = this.state.images;
        tempImages.push(...result.data);
        this.setState({
          images: tempImages,
          imagesFetchState: "successful",
        });

        if (result.data.length === 0) {
          let page = this.state.page + 1;
          this.setState({
            page: page - 1,
          });
        }
      } catch (error) {
        console.log("error: ", error);
        this.setState({
          imagesFetchState: "error",
        });
      }
    }
  };

  getCurrentPhotoIndex = (i) => {
    this.setState({
      photoIndex: i,
      showLightBox: true,
    });
  };

  handleShowLightBox = (status) => {
    this.setState({
      showLightBox: status,
    });
  };

  onMovePrevRequest = (updatedPhotoIndex) => {
    this.setState({
      photoIndex: updatedPhotoIndex,
    });
  };

  onMoveNextRequest = (updatedPhotoIndex) => {
    this.setState({
      photoIndex: updatedPhotoIndex,
    });
  };

  render() {
    const { images, imagesFetchState, photoIndex, showLightBox } = this.state;
    return (
      <React.Fragment>
        <section className="grid">
          {images.length > 0 &&
            images.map((item, index) => (
              <LazyImage
                key={index}
                index={index}
                data={item}
                alt={`Random image ${index}`}
                getCurrentPhotoIndex={(i) => this.getCurrentPhotoIndex(i)}
              />
            ))}
        </section>
        {imagesFetchState === "loading" && (
          <div className="text-box">
            <CircularProgress />
          </div>
        )}
        {imagesFetchState === "successful" && (
          <div className="text-box">
            <div>Looks like you've reached the end</div>
          </div>
        )}
        {showLightBox && (
          <LightboxGallery
            photoIndex={photoIndex}
            images={images}
            showLightBox={showLightBox}
            handleShowLightBox={(status) => this.handleShowLightBox(status)}
            onMovePrevRequest={(i) => this.onMovePrevRequest(i)}
            onMoveNextRequest={(i) => this.onMoveNextRequest(i)}
          />
        )}
      </React.Fragment>
    );
  }
}

export default ImageList;
