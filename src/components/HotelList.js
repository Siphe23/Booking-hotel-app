// src/components/HotelList.js
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchRoomsFromFirestore } from '../redux/hotelSlice';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaStar, FaHeart } from 'react-icons/fa';
import { useHotelContext } from '../context/HotelContext';
import '../assets/HotelList.css';

function HotelList() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const rooms = useSelector((state) => state.hotels.rooms) || [];
    const status = useSelector((state) => state.hotels.status);
    const error = useSelector((state) => state.hotels.error);
    
    const { ratings, favorites, addFavorite, rateRoom } = useHotelContext();
    
    // Fetch rooms when component mounts
    useEffect(() => {
        dispatch(fetchRoomsFromFirestore());
    }, [dispatch]);

    const handleBookNow = (roomId) => {
        navigate(`/booknow?roomId=${roomId}`);
    };

    const handleShowMore = (id) => {
        navigate(`/rooms/${id}`);
    };

    // Loading state
    if (status === 'loading') {
        return <div>Loading rooms...</div>;
    }

    // Error handling
    if (error) {
        toast.error(`Error loading rooms: ${error}`);
        return <p>Error loading rooms. Please try again later.</p>;
    }

    return (
        <div className="hotel-list-container">
            <h2>Available Accommodations</h2>
            <div className="rooms-grid">
                {rooms.length > 0 ? (
                    rooms.map((room) => (
                        <div key={room?.id} className="room-card">
                            <img src={room?.imageUrl || ''} alt={room?.name || 'Room'} className="room-image" />
                            <div className="room-info">
                                <h3>{room?.name || 'DELUX'}</h3>
                                <p>RSA {room?.price?.toFixed(2) || 'N/A'} per night</p>
                                <p>Address: {room?.address || 'Address not available'}</p>
                                <p>{room?.description || 'No description available'}</p>
                                <p>Facilities: {room?.facilities || 'No facilities listed'}</p>
                                <p>Policies: {room?.policies || 'No policies listed'}</p>
                                {room?.breakfastIncluded && <p>Breakfast included</p>}

                                {/* Rating Section */}
                                <div className="rating-section">
                                    {[1, 2, 3, 4, 5].map((star) => (
                                        <FaStar
                                            key={star}
                                            className={`star-icon ${ratings[room?.id] >= star ? 'rated' : ''}`}
                                            onClick={() => rateRoom(room?.id, star)}
                                        />
                                    ))}
                                </div>

                                <div className="button-group">
                                    <button className="get-button" onClick={() => handleBookNow(room?.id)}>
                                        Book Now
                                    </button>
                                    <button className="favorite-button" onClick={() => addFavorite(room?.id)}>
                                        <FaHeart />
                                    </button>
                                    <button className="show-more-button" onClick={() => handleShowMore(room?.id)}>
                                        Show More
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <p>No rooms available.</p>
                )}
            </div>
            <ToastContainer />
        </div>
    );
}

export default HotelList;
