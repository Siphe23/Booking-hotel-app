import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchRoomsFromFirestore } from '../redux/hotelSlice';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify'; // Add ToastContainer import
import 'react-toastify/dist/ReactToastify.css'; // Add this line to import the CSS
import { FaStar, FaHeart } from 'react-icons/fa';
import '../assets/HotelList.css';

function HotelList() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const rooms = useSelector((state) => state.hotels.rooms) || [];
    const [ratings, setRatings] = useState({});
    const [favorites, setFavorites] = useState([]);
    const status = useSelector((state) => state.hotels.status);
    const error = useSelector((state) => state.hotels.error);

    useEffect(() => {
        dispatch(fetchRoomsFromFirestore());
    }, [dispatch]);

    if (status === 'loading') {
        return <div>Loading rooms...</div>;
    }

    const handleBookNow = (roomId) => {
        navigate(`/booknow?roomId=${roomId}`);
    };

    const handleShowMore = (id) => {
        navigate(`/rooms/${id}`); // Navigate to room details page with ID
    };

    const handleRateRoom = (roomId, rating) => {
        setRatings((prev) => ({
            ...prev,
            [roomId]: rating,
        }));
        toast.success(`Rated ${rating} stars for room ID: ${roomId}`);
    };

    const handleFavorite = (roomId) => {
        setFavorites((prev) => [...prev, roomId]);
        toast.success(`Added room ID: ${roomId} to favorites`);
    };

    if (error) return <p>Error loading rooms: {error}</p>;

    return (
        <div className="hotel-list-container">
            <h2>Available Accommodations</h2>
            <div className="rooms-grid">
                {rooms.length > 0 ? (
                    rooms.map((room) => (
                        <div key={room.id} className="room-card">
                            <img src={room.imageUrl} alt={room.name} className="room-image" />
                            <div className="room-info">
                                <h3>{room.name || 'DELUX'}</h3>
                                <p>RSA {room.price} per night</p>
                                <p>Address: {room.address || 'Address not available'}</p>
                                <p>{room.description || 'No description available'}</p>
                                <p>Facilities: {room.facilities || 'No facilities listed'}</p>
                                <p>Policies: {room.policies || 'No policies listed'}</p>
                                {room.breakfastIncluded && <p>Breakfast included</p>}

                                {/* Rating Section */}
                                <div className="rating-section">
                                    {[1, 2, 3, 4, 5].map((star) => (
                                        <FaStar
                                            key={star}
                                            className={`star-icon ${ratings[room.id] >= star ? 'rated' : ''}`}
                                            onClick={() => handleRateRoom(room.id, star)}
                                        />
                                    ))}
                                </div>

                                <button className="get-button" onClick={() => handleBookNow(room.id)}>
                                    Book Now
                                </button>
                                <button className="favorite-button" onClick={() => handleFavorite(room.id)}>
                                    <FaHeart />
                                </button>
                                <button className="show-more-button" onClick={() => handleShowMore(room.id)}>
                                    Show More
                                </button>
                            </div>
                        </div>
                    ))
                ) : (
                    <p>No rooms available.</p>
                )}
            </div>
            <ToastContainer /> {/* Add ToastContainer here */}
        </div>
    );
}

export default HotelList;
