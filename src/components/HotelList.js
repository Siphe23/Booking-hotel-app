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
<<<<<<< HEAD
    const rooms = useSelector((state) => state.hotels.rooms) || [];
=======
    const [mockRooms, setMockRooms] = useState([]);
    const rooms = useSelector((state) => state.hotels.rooms) || mockRooms;
    const [ratings, setRatings] = useState({});
    const [favorites, setFavorites] = useState([]);
>>>>>>> 772af66dcab65545953bc77d46bd81ea3352d9d5
    const status = useSelector((state) => state.hotels.status);
    const error = useSelector((state) => state.hotels.error);
    
    const { ratings, favorites, addFavorite, rateRoom } = useHotelContext();
    
    // Fetch rooms when component mounts
    useEffect(() => {
        // Fetch rooms from Firestore
        dispatch(fetchRoomsFromFirestore());
    }, [dispatch]);

<<<<<<< HEAD
=======
    useEffect(() => {
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
                    imageUrl: 'https://example.com/images/room-a.jpg',
                },
                {
                    id: '2',
                    name: 'Room B',
                    price: 150,
                    address: '456 Elm St',
                    description: 'Spacious suite with a king bed',
                    facilities: 'Free breakfast, Gym',
                    policies: 'Check-in after 3 PM',
                    breakfastIncluded: true,
                    imageUrl: 'https://example.com/images/room-b.jpg',
                },
                {
                    id: '3',
                    name: 'Room C',
                    price: 100,
                    address: '789 Oak St',
                    description: 'Standard room with basic amenities',
                    facilities: 'Free Wi-Fi',
                    policies: 'No pets allowed',
                    breakfastIncluded: false,
                    imageUrl: 'https://example.com/images/room-c.jpg',
                },
                {
                    id: '4',
                    name: 'Room D',
                    price: 200,
                    address: '101 Pine St',
                    description: 'Luxury room with ocean view',
                    facilities: 'Private balcony, Spa',
                    policies: 'Late check-out available',
                    breakfastIncluded: true,
                    imageUrl: 'https://example.com/images/room-d.jpg',
                },
                {
                    id: '5',
                    name: 'Room E',
                    price: 130,
                    address: '102 Maple St',
                    description: 'Comfortable room for families',
                    facilities: 'Pool, Family-friendly',
                    policies: 'Child-friendly, No parties',
                    breakfastIncluded: true,
                    imageUrl: 'https://example.com/images/room-e.jpg',
                },
                {
                    id: '6',
                    name: 'Room F',
                    price: 170,
                    address: '103 Cedar St',
                    description: 'Romantic getaway suite',
                    facilities: 'Jacuzzi, Fireplace',
                    policies: 'Couples only',
                    breakfastIncluded: false,
                    imageUrl: 'https://example.com/images/room-f.jpg',
                },
                {
                    id: '7',
                    name: 'Room G',
                    price: 90,
                    address: '104 Birch St',
                    description: 'Economy room for budget travelers',
                    facilities: 'Free Wi-Fi',
                    policies: 'Budget-friendly, No frills',
                    breakfastIncluded: false,
                    imageUrl: 'https://example.com/images/room-g.jpg',
                },
                {
                    id: '8',
                    name: 'Room H',
                    price: 110,
                    address: '105 Spruce St',
                    description: 'Modern room with all amenities',
                    facilities: 'Free breakfast, Gym',
                    policies: 'Early check-in available',
                    breakfastIncluded: true,
                    imageUrl: 'https://example.com/images/room-h.jpg',
                },
                {
                    id: '9',
                    name: 'Room I',
                    price: 160,
                    address: '106 Willow St',
                    description: 'Elegant suite with luxury facilities',
                    facilities: 'Pool, Spa, Restaurant',
                    policies: 'No pets allowed',
                    breakfastIncluded: true,
                    imageUrl: 'https://example.com/images/room-i.jpg',
                },
                {
                    id: '10',
                    name: 'Room J',
                    price: 140,
                    address: '107 Ash St',
                    description: 'Charming room with garden view',
                    facilities: 'Garden access, Free Wi-Fi',
                    policies: 'No smoking, Quiet hours',
                    breakfastIncluded: false,
                    imageUrl: 'https://example.com/images/room-j.jpg',
                },
                {
                    id: '11',
                    name: 'Room K',
                    price: 180,
                    address: '108 Cherry St',
                    description: 'Penthouse suite with panoramic views',
                    facilities: 'Rooftop access, Hot tub',
                    policies: 'Luxury stay, VIP treatment',
                    breakfastIncluded: true,
                    imageUrl: 'https://example.com/images/room-k.jpg',
                },
                {
                    id: '12',
                    name: 'Room L',
                    price: 135,
                    address: '109 Peach St',
                    description: 'Cozy cabin in the woods',
                    facilities: 'Nature trails, Fireplace',
                    policies: 'Pet-friendly, Nature lovers',
                    breakfastIncluded: true,
                    imageUrl: 'https://example.com/images/room-l.jpg',
                },
                {
                    id: '13',
                    name: 'Room M',
                    price: 155,
                    address: '110 Lemon St',
                    description: 'Stylish room with modern decor',
                    facilities: 'Free Wi-Fi, Bar',
                    policies: 'No smoking',
                    breakfastIncluded: false,
                    imageUrl: 'https://example.com/images/room-m.jpg',
                },
                {
                    id: '14',
                    name: 'Room N',
                    price: 165,
                    address: '111 Lime St',
                    description: 'Elegant room with high ceilings',
                    facilities: 'Pool access, Restaurant',
                    policies: 'Family-friendly, No parties',
                    breakfastIncluded: true,
                    imageUrl: 'https://example.com/images/room-n.jpg',
                },
                {
                    id: '15',
                    name: 'Room O',
                    price: 125,
                    address: '112 Pineapple St',
                    description: 'Compact room ideal for solo travelers',
                    facilities: 'Wi-Fi, Coffee maker',
                    policies: 'Solo-friendly',
                    breakfastIncluded: false,
                    imageUrl: 'https://example.com/images/room-o.jpg',
                },
                {
                    id: '16',
                    name: 'Room P',
                    price: 175,
                    address: '113 Coconut St',
                    description: 'Spacious suite with living area',
                    facilities: 'Kitchenette, Free breakfast',
                    policies: 'Long stay discounts available',
                    breakfastIncluded: true,
                    imageUrl: 'https://example.com/images/room-p.jpg',
                },
            ]);
        }
    }, [rooms]);

>>>>>>> 772af66dcab65545953bc77d46bd81ea3352d9d5
    const handleBookNow = (roomId) => {
        navigate(`/booknow?roomId=${roomId}`);
    };

    const handleShowMore = (id) => {
        navigate(`/rooms/${id}`);
    };

<<<<<<< HEAD
    // Loading state
    if (status === 'loading') {
        return <div>Loading rooms...</div>;
    }

    // Error handling
    if (error) {
        toast.error(`Error loading rooms: ${error}`);
        return <p>Error loading rooms. Please try again later.</p>;
    }
=======
    const handleRateRoom = (roomId, rating) => {
        setRatings((prev) => ({ ...prev, [roomId]: rating }));
        toast.success(`Rated ${rating} stars for room ID: ${roomId}`);
    };

    const handleFavorite = (roomId) => {
        setFavorites((prev) => [...prev, roomId]);
        toast.success(`Added room ID: ${roomId} to favorites`);
    };

    if (status === 'loading') {
        return <div>Loading rooms...</div>;
    }

    if (error) return <p>Error loading rooms: {error}</p>;
>>>>>>> 772af66dcab65545953bc77d46bd81ea3352d9d5

    return (
        <div className="hotel-list-container">
            <h2>Available Accommodations</h2>
            <div className="rooms-grid">
                {rooms.length > 0 ? (
                    rooms.map((room) => (
<<<<<<< HEAD
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
=======
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
>>>>>>> 772af66dcab65545953bc77d46bd81ea3352d9d5
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
