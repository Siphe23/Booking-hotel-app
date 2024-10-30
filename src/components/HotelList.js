// src/components/HotelList.js
import React, { useEffect, useState } from 'react';
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
    const [mockRooms, setMockRooms] = useState([]);
    const rooms = useSelector((state) => state.hotels.rooms) || mockRooms;
    const { ratings, favorites, addFavorite, rateRoom } = useHotelContext(); // Use context state for ratings and favorites
    const status = useSelector((state) => state.hotels.status);
    const error = useSelector((state) => state.hotels.error);

    // Fetch rooms when component mounts
    useEffect(() => {
        dispatch(fetchRoomsFromFirestore());
    }, [dispatch]);

    // Set mock rooms if no rooms are fetched
    useEffect(() => {
        if (rooms.length === 0) {
            setMockRooms([
                { id: '1', name: 'Room A', price: 120, address: '123 Main St', description: 'Cozy room with great views', facilities: 'Free Wi-Fi, Pool, Gym', policies: 'No smoking, No pets', breakfastIncluded: true, imageUrl: 'https://example.com/images/room-a.jpg' },
                // Add the rest of your mock rooms here...
            ]);
        }
    }, [rooms]);

    const handleBookNow = (roomId) => {
        navigate(`/booknow?roomId=${roomId}`);
    };

    const handleShowMore = (id) => {
        navigate(`/rooms/${id}`);
    };

    const handleRateRoom = (roomId, rating) => {
        rateRoom(roomId, rating); // Call rateRoom from context
        toast.success(`Rated ${rating} stars for room ID: ${roomId}`);
    };

    const handleFavorite = (roomId) => {
        addFavorite(roomId); // Call addFavorite from context
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
                            {room.imageUrl ? (
                                <img src={room.imageUrl} alt={room.name} className="room-image" />
                            ) : (
                                <img src="path/to/placeholder-image.jpg" alt="No Image Available" className="room-image" />
                            )}
                            <div className="room-info">
                                <h3>{room.name || 'DELUX'}</h3>
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
