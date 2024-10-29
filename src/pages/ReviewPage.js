import React from 'react';
import Review from '../components/Review'; // Import the Review component

const ReviewPage = ({ ratings, favorites }) => {
    // Ensure ratings is an array
    const ratingsArray = Array.isArray(ratings) ? ratings : [];

    return (
        <div>
            <h1>Review Page</h1>
            {ratingsArray.length > 0 ? (
                ratingsArray.map((review) => (
                    <Review key={review.id} {...review} />
                ))
            ) : (
                <p>No reviews available.</p>
            )}
        </div>
    );
};

export default ReviewPage;
