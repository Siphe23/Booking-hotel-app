import React, { useEffect } from 'react'; 
import { useDispatch, useSelector } from 'react-redux';
import { fetchRooms } from '../redux/hotelSlice';
import { useNavigate } from 'react-router-dom'; 
import '../assets/HotelList.css';

function HotelList() {
    const dispatch = useDispatch();
    const navigate = useNavigate(); 
    const rooms = useSelector((state) => state.hotels.rooms) || [];
    const status = useSelector((state) => state.hotels.status);

    useEffect(() => {
        dispatch(fetchRooms());
    }, [dispatch]);

    if (status === 'loading') {
        return <div>Loading rooms...</div>;
    }

    const handleBookNow = (roomId) => {
        navigate(`/booknow?roomId=${roomId}`);
    };

    const handleShare = (room) => {
        alert(`Sharing ${room.name}`);
    };

    const handleFavorites = (roomId) => {
        alert(`Added room ${roomId} to favorites!`);
    };

    return (
        <div className="hotel-list-container">
            <h2>Available Rooms</h2>
            <div className="rooms-grid">
                {rooms.length > 0 ? (
                    rooms.map((room) => (
                        <div key={room.id} className="room-card" role="article">
                            <div className="image-gallery">
                                {room.images && Array.isArray(room.images) && room.images.length > 0 ? (
                                    room.images.map((image, index) => (
                                        <img key={index} src={image} alt={`${room.name} ${index}`} className="room-image" />
                                    ))
                                ) : (
                                    <p>No images available for this room.</p>
                                )}
                            </div>
                            <div className="room-info">
                                <h3>{room.name}</h3>
                                <p>${room.price} per night</p>
                                <p><strong>Address:</strong> {room.address || 'Not available'}</p>
                                <p><strong>Star Rating:</strong> {room.starRating || 'Not rated'} ⭐</p>
                                {room.breakfastIncluded && <p>Breakfast included</p>}
                                <div className="amenities">
                                    {room.amenities?.map((amenity, index) => (
                                        <span key={index} className={`amenity-icon ${amenity}`} aria-label={amenity}></span>
                                    ))}
                                </div>
                                <div className="hotel-facilities">
                                    <p><strong>Facilities:</strong> {room.facilities ? room.facilities.join(', ') : 'No facilities available.'}</p>
                                    <p><strong>Policies:</strong> {room.policies || 'No policies available.'}</p>
                                </div>
                                <button className="get-button" onClick={() => handleBookNow(room.id)} aria-label={`Book ${room.name}`}>
                                    Book Room
                                </button>
                                <button className="share-button" onClick={() => handleShare(room)} aria-label={`Share ${room.name}`}>
                                    Share
                                </button>
                                <button className="favorites-button" onClick={() => handleFavorites(room.id)} aria-label={`Add ${room.name} to favorites`}>
                                    Add to Favorites
                                </button>
                            </div>
                        </div>
                    ))
                ) : (
                    <p className="no-rooms-message">No rooms available.</p>
                )}
            </div>
        </div>
    );
}

export default HotelList;
