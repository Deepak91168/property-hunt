import React from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

export default function ImageCarousel(props) {
  const carouselSettings = {
    showThumbs: false,
    showStatus: false,
    infiniteLoop: true,
    autoPlay: true,
    interval: 3000,
    stopOnHover: true,
    swipeable: true,
    emulateTouch: true,
    dynamicHeight: true,
    width: "100%",
    

  };
  return (
    <section>
      <Carousel {...carouselSettings}>
        {props.images.map((url, index) => (
          <div key={index} className="relative">
            <div className="w-full h-96 p-0 m-0">
              <img
                src={url}
                alt={`${index}`}
                className="mx-auto h-full object-contain"
              />
            </div>
            
          </div>
        ))}
      </Carousel>
    </section>
  );
}
