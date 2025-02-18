import React, { useEffect, useState } from "react";
import Category from "../../components/Layouts/category";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { bannerImages } from "./categoryList/bannerImages";

const Slider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === bannerImages.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? bannerImages.length - 1 : prevIndex - 1
    );
  };

  // Automatically switch slides every 5 seconds
  useEffect(() => {
    const timer = setInterval(nextSlide, 5000);
    return () => clearInterval(timer); // Cleanup on unmount
  }, []);

  return (
    <div className="container my-4 font-aeonik">
      <div className="row">
        {/* Categories Column */}
        <Category/>

        {/* Slider Column */}
        <div className="col-md-9">
          <div
            className="slider-container position-relative"
            style={{ overflow: "hidden", borderRadius: "10px" }}>
            {bannerImages.map((image, index) => (
              <div
                key={index}
                className={`slider-item ${
                  index === currentIndex ? "active" : ""
                }`}
                style={{
                  display: index === currentIndex ? "block" : "none",
                }}>
                <img
                  src={image.src}
                  alt={`Banner ${index + 1}`}
                  style={image.style}
                  className="d-block w-100 h-30"
                />
              </div>
            ))}
            {/* Navigation Buttons */}
            <button
              onClick={prevSlide}
              className="slider-prev position-absolute"
              style={{
                top: "50%",
                left: "10px",
                transform: "translateY(-50%)",
                background: "#0000",
                color: "#fff",
                border: "none",
                borderRadius: "50%",
                width: "40px",
                height: "40px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
              }}>
              <IoIosArrowBack size={30}/>
            </button>
            <button
              onClick={nextSlide}
              className="slider-next position-absolute"
              style={{
                top: "50%",
                right: "10px",
                transform: "translateY(-50%)",
                background: "#0000",
                color: "#fff",
                border: "none",
                borderRadius: "50%",
                width: "40px",
                height: "40px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
              }}>
              <IoIosArrowForward size={30}/>
            </button>
          </div>
        </div>
      </div>
      </div>
  );
};

export default Slider;
