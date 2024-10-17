import React, { useState } from 'react'; // Import useState
import { FaStar } from 'react-icons/fa';

const StarRating = ({ initialRating, onRatingChange }) => {
  const [rating, setRating] = useState(initialRating);

  const handleMouseOver = (index) => {
    setRating(index + 1); // Set the rating based on the index of the hovered star
  };

  const handleMouseLeave = () => {
    setRating(initialRating); // Reset to initial rating on mouse leave
  };

  const handleClick = (index) => {
    const newRating = index + 1; // Set new rating on click
    setRating(newRating);
    onRatingChange(newRating); // Notify parent of the rating change
  };

  return (
    <div className="star-rating" onMouseLeave={handleMouseLeave}>
      {[...Array(5)].map((_, index) => (
        <FaStar
          key={index}
          size={30}
          color={index < rating ? 'gold' : 'gray'}
          onMouseOver={() => handleMouseOver(index)}
          onClick={() => handleClick(index)}
          style={{ cursor: 'pointer' }}
        />
      ))}
    </div>
  );
};

export default StarRating;

