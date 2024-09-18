import React from 'react';
import '../assets/HotelList.css'; // Import the CSS file for styling

const rooms = [
  {
    id: 1,
    image: 'https://via.placeholder.com/150', // Replace with actual image URLs
    name: 'Express',
    price: 'R450',
    breakfastIncluded: true,
    amenities: ['wifi', 'tv', 'ac', 'car', 'pool'],
  },
  {
    id: 2,
    image: 'https://via.placeholder.com/150',
    name: 'Deluxe',
    price: 'R650',
    breakfastIncluded: true,
    amenities: ['wifi', 'tv', 'ac', 'car', 'pool'],
  },
  {
    id: 3,
    image: 'https://via.placeholder.com/150',
    name: 'Suite',
    price: 'R850',
    breakfastIncluded: true,
    amenities: ['wifi', 'tv', 'ac', 'car', 'pool'],
  },
  {
    id: 4,
    image: 'https://via.placeholder.com/150',
    name: 'Penthouse',
    price: 'R1200',
    breakfastIncluded: true,
    amenities: ['wifi', 'tv', 'ac', 'car', 'pool'],
  },
  {
    id: 5,
    image: 'https://via.placeholder.com/150',
    name: 'Luxury Suite',
    price: 'R1500',
    breakfastIncluded: true,
    amenities: ['wifi', 'tv', 'ac', 'car', 'pool'],
  },
  {
    id: 6,
    image: 'https://via.placeholder.com/150',
    name: 'Luxury Suite',
    price: 'R1500',
    breakfastIncluded: true,
    amenities: ['wifi', 'tv', 'ac', 'car', 'pool'],
  },
];

function HotelList() {
    return (
        <div className="hotel-list-container">
            <h2>Available Rooms</h2>
            <div className="rooms-grid">
                {rooms.map((room) => (
                    <div key={room.id} className="room-card">
                        <img src={room.image} alt={room.name} className="room-image" />
                        <div className="room-info">
                            <h3>{room.name}</h3>
                            <div className="room-rating">
                                <span>⭐⭐⭐⭐⭐</span> {/* Star ratings */}
                            </div>
                            <p>{room.price}</p>
                            {room.breakfastIncluded && <p>Breakfast included</p>}
                            <div className="amenities">
                                {room.amenities.map((amenity, index) => (
                                    <span key={index} className={`amenity-icon ${amenity}`}></span>
                                ))}
                            </div>
                            <button className="get-button">Get</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default HotelList;


