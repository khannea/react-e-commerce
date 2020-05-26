import React from "react";
import { CardMedia, Box } from "@material-ui/core";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

function ImageSlider({ images }) {
  return (
    <Box style={{ overflow: "hidden", height: "200px", width: "100%" }}>
      <Carousel
        autoPlay
        infiniteLoop
        swipeable
        useKeyboardArrows
        showArrows
        showStatus={false}
        emulateTouch
      >
        {images.map((image, index) => {
          return (
            <img
              src={`http://localhost:5000/${image}`}
              style={{ width: "100%" }}
              key={image}
            />
          );
        })}
      </Carousel>
    </Box>
  );
}

export default ImageSlider;
