import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchRoomsFromFirestore } from '../redux/hotelSlice';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaStar, FaHeart } from 'react-icons/fa';
import '../assets/HotelList.css';

function HotelList() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [mockRooms, setMockRooms] = useState([]);
    const rooms = useSelector((state) => state.hotels.rooms) || mockRooms; // Fallback to mockRooms if rooms are empty
    const [ratings, setRatings] = useState({});
    const [favorites, setFavorites] = useState([]);
    const status = useSelector((state) => state.hotels.status);
    const error = useSelector((state) => state.hotels.error);

    useEffect(() => {
        // Fetch rooms from Firestore
        dispatch(fetchRoomsFromFirestore());

        // For testing, add mock rooms if there are no rooms from Firestore
        if (rooms.length === 0) {
            setMockRooms([
                {
                    id: '1',
                    name: 'Room A',
                    price: 120,
                    address: '123 Main St',
                    description: 'Cozy room with great views',
                    facilities: 'Free Wi-Fi, Pool, Gym',
                    policies: 'No smoking, No pets',
                    breakfastIncluded: true,
                    imageUrl: 'https://example.com/image1.jpg',
                },
                {
                    id: '2',
                    name: 'Room B',
                    price: 150,
                    address: '456 Elm St',
                    description: 'Luxury room with king-sized bed',
                    facilities: 'Free breakfast, Pool, Spa',
                    policies: 'Pets allowed, No smoking',
                    breakfastIncluded: false,
                    imageUrl: 'https://example.com/image2.jpg',
                },
                {
                    id: '3',
                    name: 'Room C',
                    price: 90,
                    address: '789 Pine St',
                    description: 'Budget-friendly room with essentials',
                    facilities: 'Wi-Fi, Gym access',
                    policies: 'No pets, No smoking',
                    breakfastIncluded: false,
                    imageUrl: 'https://example.com/image3.jpg',
                },
                // Add more room objects here as needed
            ]);
        }
    }, [dispatch]);

    if (status === 'loading') {
        return <div>Loading rooms...</div>;
    }

    const handleBookNow = (roomId) => {
        navigate(`/booknow?roomId=${roomId}`);
    };

    const handleShowMore = (id) => {
        navigate(`/rooms/${id}`);
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
            <ToastContainer /> {/* Toast notifications */}
        </div>
    );
}

export default HotelList;
