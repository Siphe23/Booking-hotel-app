import React, { useEffect } from 'react'; 
import { useDispatch, useSelector } from 'react-redux';
import { fetchRooms } from '../redux/hotelSlice';
import { useNavigate } from 'react-router-dom'; 
import '../assets/HotelList.css';

function HotelList() {
    const dispatch = useDispatch();
    const navigate = useNavigate(); 
    const { rooms, loading, error } = useSelector((state) => state.hotels); // Get loading and error from state

    useEffect(() => {
        dispatch(fetchRooms()); // Fetch rooms when the component mounts
    }, [dispatch]);

    const handleBookNow = (roomId) => {
        navigate(`/booknow?roomId=${roomId}`); // Navigate to booking page with room ID
    };

    const handleShare = (room) => {
        if (navigator.share) {
          const shareData = {
            title: room.name,
            text: `${room.name} at ${room.address}. Price: $${room.price}`,
            url: window.location.href,
          };
          navigator.share(shareData).catch(console.error);
        } else {
          alert("Sharing is not supported on your browser");
        }
    };

    const handleAddToFavourites = (roomId) => {
        const favourites = JSON.parse(localStorage.getItem('favourites')) || [];
        if (!favourites.includes(roomId)) {
            favourites.push(roomId);
            localStorage.setItem('favourites', JSON.stringify(favourites));
            alert('Added to favourites');
        } else {
            alert('Already in favourites');
        }
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error loading rooms: {error}</p>;

    return (
        <div className="hotel-list-container">
            <h2>Available Rooms</h2>
            <div className="rooms-grid">
                {rooms.length > 0 ? (
                    rooms.map((room) => (
                        <div key={room.id} className="room-card">
                            {/* Photo Gallery */}
                            <div className="room-gallery">
                                {room.images.map((image, index) => (
                                    <img key={index} src={image} alt={`${room.name} photo ${index + 1}`} className="room-image" />
                                ))}
                            </div>

                            {/* Basic Information */}
                            <div className="room-info">
                                <h3>{room.name}</h3>
                                <p>${room.price}</p>
                                <p>Address: {room.address}</p>
                                <p>Rating: {room.rating} stars</p>
                                {room.breakfastIncluded && <p>Breakfast included</p>}

                                {/* Hotel Facilities */}
                                <div className="amenities">
                                    {room.amenities?.map((amenity, index) => (
                                        <span key={index} className={`amenity-icon ${amenity}`}></span>
                                    ))}
                                </div>

                                {/* Action Buttons */}
                                <div className="action-buttons">
                                    <button className="get-button" onClick={() => handleBookNow(room.id)}>
                                        Book Room
                                    </button>
                                    <button className="share-button" onClick={() => handleShare(room)}>
                                        Share
                                    </button>
                                    <button className="favourite-button" onClick={() => handleAddToFavourites(room.id)}>
                                        Add to Favourites
                                    </button>
                                </div>
                            </div>

                            {/* Map */}
                            <div className="room-map">
                                <iframe
                                    src={`https://maps.google.com/maps?q=${room.location.latitude},${room.location.longitude}&z=15&output=embed`}
                                    width="100%" height="150px" allowFullScreen=""
                                    loading="lazy" title="hotel-location"
                                ></iframe>
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
