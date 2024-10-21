import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchRoomsFromFirestore } from '../redux/hotelSlice';
import { useNavigate } from 'react-router-dom'; 
import '../assets/HotelList.css';

function HotelList() {
    const dispatch = useDispatch();
    const navigate = useNavigate(); 
    const rooms = useSelector((state) => state.hotels.rooms) || [];
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
                                <h3>{room.name}</h3>
                                <p>${room.price} per night</p>
                                <p>Address: {room.address}</p>
                                <p>Star Rating: {room.starRating} ⭐</p>
                                <p>{room.description}</p>
                                <p>Facilities: {room.facilities}</p>
                                <p>Policies: {room.policies}</p>
                                {room.breakfastIncluded && <p>Breakfast included</p>}
                                <button className="get-button" onClick={() => handleBookNow(room.id)}>
                                    Book Now
                                </button>
                                <button className="share-button">Share</button>
                            </div>
                        </div>
                    ))
                ) : (
                    <p>No rooms available.</p> 
                )}
            </div>
        </div>
    );
}

export default HotelList;
