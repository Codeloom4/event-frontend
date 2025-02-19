import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import image1 from "../../assest/image/slider/image1.jpg";
import image2 from "../../assest/image/slider/image2.jpg";
import image3 from "../../assest/image/slider/image3.jpg";

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
      image: image1,
      text: "Discover Exciting Events Near You",
    },
    {
      image: image2,
      text: "Join the Best Events in Your City",
    },
    {
      image: image3,
      text: "Experience Unforgettable Moments",
    },
  ];

  return (
    <div className="w-[1920px] h-[578px] relative">
      <Slider {...settings}>
        {slides.map((slide, index) => (
          <div key={index} className="relative">
            {/* Image */}
            <img
              src={slide.image}
              alt={`Slide ${index + 1}`}
              className="w-full h-[578px] object-cover"
            />

            {/* Text Overlay (20% from Left) */}
            <div className="absolute top-1/2 left-[10%] transform -translate-y-1/2 text-white">
              <h2 className="text-5xl font-bold mb-4">{slide.text}</h2>
              <p className="text-xl">
                Join us now and be part of the excitement!
              </p>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default ImgSlider;
