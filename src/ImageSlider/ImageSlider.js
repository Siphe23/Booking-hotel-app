// src/ImageSlider/ImageSlider.js
import React, { useState, useEffect } from 'react';


const ImageSlider = ({ images = [], interval = 3000 }) => { // Use the correct prop name and default values
  const [currentIndex, setCurrentIndex] = useState(0);
  
  useEffect(() => {
    if (images.length === 0) return; // Early return if no images
    
    const imageInterval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, interval); // Change image every `interval` milliseconds
    
    return () => clearInterval(imageInterval); // Cleanup on component unmount
  }, [images, interval]); // Use images directly
  
  return (
    <div className="image-slider">
      {images.length > 0 ? (
        <img src={images[currentIndex]} alt="Slider" className="slider-image" />
      ) : (
        <p>No images available</p> // Fallback content
      )}
    </div>
  );
};

export default ImageSlider;
