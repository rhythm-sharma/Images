import React, { useEffect, useState } from "react";
import "./LazyImage.scss";

import LazyLoad from "react-lazyload";

const LazyImage = ({ index, data, alt, getCurrentPhotoIndex }) => {
  const refPlaceholder = React.useRef();

  const [showAuthor, setShowAuthor] = useState(false);

  const getRandomInt = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1) + min);
  };

  const [src, setSrc] = useState("");
  const [width] = useState(getRandomInt(200, 400));
  const [height] = useState(getRandomInt(130, 180));

  useEffect(() => {
    let src = data.download_url.split("/").slice(0, -2);
    src = src.join("/");
    src = src + `/${width}/${height}`;
    setSrc(src);
  }, []);

  const imageOnLoad = () => {
    setShowAuthor(true);
    refPlaceholder.current.remove();
  };

  const imageOnError = () => {
    refPlaceholder.current.remove();
  };

  const getRandomBackground = () => {
    let rgb = [
      [58, 96, 192],
      [122, 122, 128],
      [16, 16, 16],
      [34, 53, 72],
      [186, 189, 192],
      [146, 152, 152],
      [248, 56, 62],
      [200, 85, 78],
      [144, 118, 106],
      [192, 192, 192],
      [232, 94, 59],
      [83, 128, 90],
      [58, 164, 122],
      [75, 88, 88],
      [18, 24, 24],
    ];
    const randomColor = rgb[Math.floor(Math.random() * rgb.length)];
    return `rgb(${randomColor.join(",")})`;
  };

  const currentPhotoIndex = () => {
    getCurrentPhotoIndex(index);
  };

  return (
    <React.Fragment>
      <div className="image-wrapper" style={{ width: width }}>
        <div
          className="placeholder"
          ref={refPlaceholder}
          style={{ backgroundColor: getRandomBackground() }}
        />
        <LazyLoad style={{ width: width }}>
          <img
            className="styled-image"
            onLoad={imageOnLoad}
            onError={imageOnError}
            src={src}
            alt={alt}
            onClick={currentPhotoIndex}
          />
        </LazyLoad>
        {showAuthor && (
          <div className="author-container">
            <a target="_blank" className="author-url" href={`${data.url}`}>
              <p className="author break-words break-all whitespace-pre-wrap">
                {data.author}
              </p>
            </a>
          </div>
        )}
      </div>
    </React.Fragment>
  );
};

export default LazyImage;
