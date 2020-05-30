import React from "react";
import { Box } from "@material-ui/core";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import "./ImageSlider.css";

function ImageSlider({ images, showThumbs }) {
  return (
    <Carousel
      autoPlay
      infiniteLoop
      swipeable
      useKeyboardArrows
      showArrows
      showStatus={false}
      emulateTouch
      showThumbs={showThumbs}
    >
      {images.map((image, index) => {
        return (
          <img
            src={`/api/${image}`}
            style={{
              height: "100%",
            }}
            key={image}
            alt={image}
          />
        );
      })}
    </Carousel>
  );
}

export default ImageSlider;
