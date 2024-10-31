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
    const rooms = useSelector((state) => state.hotels.rooms);
    const { ratings, favorites, addFavorite, rateRoom } = useHotelContext();
    const status = useSelector((state) => state.hotels.status);
    const error = useSelector((state) => state.hotels.error);

    // Fetch rooms from Firestore when component mounts
    useEffect(() => {
        dispatch(fetchRoomsFromFirestore());
    }, [dispatch]);

    const handleBookNow = (roomId) => {
        navigate(`/booknow?roomId=${roomId}`);
    };

    const handleShowMore = (id) => {
        navigate(`/rooms/${id}`);
    };

    const handleRateRoom = (roomId, rating) => {
        rateRoom(roomId, rating);
        toast.success(`Rated ${rating} stars for room ID: ${roomId}`);
    };

    const handleFavorite = (roomId) => {
        addFavorite(roomId);
        toast.success(`Added room ID: ${roomId} to favorites`);
    };

    if (status === 'loading') {
        return <div>Loading rooms...</div>;
    }

    if (error) return <p>Error loading rooms: {error}</p>;

    return (
        <div className="hotel-list-container">
            <h2>Available Accommodations</h2>
            <div className="rooms-grid">
                {rooms.length > 0 ? (
                    rooms.map((room) => (
                        <div key={room.id} className="room-card">
                            <img
                                src={room.imageUrl || 'path/to/default-image.jpg'}
                                alt={room.name}
                                className="room-image"
                            />
                            <div className="room-info">
                                <h3>{room.name}</h3>
                                <p>RSA {room.price} per night</p>
                                <p>Address: {room.address || 'Address not available'}</p>
                                <p>{room.description || 'No description available'}</p>
                                <p>Facilities: {room.facilities || 'No facilities listed'}</p>
                                <p>Policies: {room.policies || 'No policies listed'}</p>
                                <p>{room.breakfastIncluded ? 'Breakfast Included' : 'No Breakfast'}</p>
                                <div className="room-actions">
                                    <button onClick={() => handleBookNow(room.id)}>Book Now</button>
                                    <button onClick={() => handleShowMore(room.id)}>Show More</button>
                                    <div className="rating-section">
                                        <p>Rate this room:</p>
                                        {[1, 2, 3, 4, 5].map((star) => (
                                            <span
                                                key={star}
                                                onClick={() => handleRateRoom(room.id, star)}
                                                className={`star ${ratings[room.id] === star ? 'selected' : ''}`}
                                            >
                                                <FaStar />
                                            </span>
                                        ))}
                                    </div>
                                    <button onClick={() => handleFavorite(room.id)}>
                                        <FaHeart className={favorites.includes(room.id) ? 'favorited' : ''} />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <p>No rooms available</p>
                )}
            </div>
            <ToastContainer />
        </div>
    );
}

export default HotelList;