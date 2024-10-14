import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchRooms } from '../redux/hotelSlice';
import { useNavigate } from 'react-router-dom'; 
import '../assets/HotelList.css';

function HotelList() {
    const dispatch = useDispatch();
    const navigate = useNavigate(); 
    const rooms = useSelector((state) => state.hotels.rooms) || []; // Fallback to empty array

    useEffect(() => {
        dispatch(fetchRooms()); // Fetch rooms when the component mounts
    }, [dispatch]);

    const handleBookNow = (roomId) => {
        navigate(`/booknow?roomId=${roomId}`); // Navigate to booking page with room ID
    };

    return (
        <div className="hotel-list-container">
            <h2>Available Rooms</h2>
            <div className="rooms-grid">
                {rooms.length > 0 ? (
                    rooms.map((room) => (
                        <div key={room.id} className="room-card">
                            <img src={room.image} alt={room.name} className="room-image" />
                            <div className="room-info">
                                <h3>{room.name}</h3>
                                <p>${room.price}</p>
                                {room.breakfastIncluded && <p>Breakfast included</p>}
                                <div className="amenities">
                                    {room.amenities?.map((amenity, index) => (
                                        <span key={index} className={`amenity-icon ${amenity}`}></span>
                                    ))}
                                </div>
                                <button className="get-button" onClick={() => handleBookNow(room.id)}>
                                    Book Room
                                </button>
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
