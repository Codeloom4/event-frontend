import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import wedding from "../../assets/image/slider/wedding.jpg";
import birthday from "../../assets/image/slider/birthday.jpg";
import gathering from "../../assets/image/slider/gathering.jpg";
import { Typography } from "@mui/material";

const ImgSlider = () => {
  // Slider settings
  const settings = {
    dots: true, // Show dots for navigation
    infinite: true, // Infinite loop
    speed: 500, // Transition speed
    slidesToShow: 1, // Number of slides to show at a time
    slidesToScroll: 1, // Number of slides to scroll
    autoplay: true, // Auto-play the slider
    autoplaySpeed: 3000, // Auto-play speed in milliseconds
  };

  // Slide data (images and text)
  const slides = [
    {
      image: wedding,
      text: "Seamless Wedding Planning for Your Special Day",
    },
    {
      image: birthday,
      text: "Celebrate Birthdays with Unforgettable Experiences",
    },
    {
      image: gathering,
      text: "Host Perfect Events, Big or Small",
    },
  ];

  return (
    <div className="w-full h-[578px] relative px-4">
      <Slider {...settings}>
        {slides.map((slide, index) => (
          <div key={index} className="relative">
            {/* Image */}
            <img
              src={slide.image}
              alt={`Slide ${index + 1}`}
              className="w-full h-[578px] object-cover"
            />

            {/* Text Overlay (Left Bottom) */}
            <div className="absolute bottom-4 left-4 text-white">
              <Typography
                variant="h3"
                className="mb-2"
                sx={{
                  fontWeight: 800,
                  textShadow: "2px 2px 4px rgba(0, 0, 0, 0.6)",
                }}
              >
                {slide.text}
              </Typography>
              <Typography
                variant="h6"
                sx={{
                  fontWeight: 800,
                  color: "#FACC15"
                }}
              >
                Join us now and be part of the excitement!
              </Typography>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default ImgSlider;
