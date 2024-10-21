import React, { useEffect } from 'react'; 
import { useDispatch, useSelector } from 'react-redux';
import { fetchRoomsFromFirestore } from '../redux/hotelSlice'; // Use Firestore action
import { useNavigate } from 'react-router-dom'; 
import '../assets/HotelList.css';

function HotelList() {
    const dispatch = useDispatch();
    const navigate = useNavigate(); 
    const { rooms, loading, error } = useSelector((state) => state.hotel); // Ensure you're accessing the correct slice of the state

    useEffect(() => {
        dispatch(fetchRoomsFromFirestore()); // Fetch rooms from Firestore
    }, [dispatch]);

    const handleBookNow = (roomId) => {
        navigate(`/booknow?roomId=${roomId}`);
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error loading rooms: {error}</p>;

    return (
        <div className="hotel-list-container">
            <h2>Available Accommodations</h2>
            <div className="rooms-grid">
                {rooms.length > 0 ? (
                    rooms.map((room) => (
                        <div key={room.id} className="room-card">
                            <h3>{room.name}</h3>
                            <p>Price: ${room.price}/night</p>
                            <button onClick={() => handleBookNow(room.id)}>Book Now</button>
                        </div>
                    ))
                ) : (
                    <p>No accommodations available.</p>
                )}
            </div>
        </div>
    );
}

export default HotelList;



