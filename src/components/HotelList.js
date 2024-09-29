import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setRooms } from '../redux/hotelSlice'; 
import { db } from '../Firebase/firebase'; 
import { collection, getDocs } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom'; 
import '../assets/HotelList.css';

const rooms = [
  {
    id: 1,
    image: 'https://firebasestorage.googleapis.com/v0/b/hotel-booking-app-a083a.appspot.com/o/room1.png?alt=media&token=YOUR_TOKEN',
    name: 'Express',
    price: 'R450',
    breakfastIncluded: true,
    amenities: ['wifi', 'tv', 'ac', 'car', 'pool'],
  },
  {
    id: 2,
    image: 'https://firebasestorage.googleapis.com/v0/b/hotel-booking-app-a083a.appspot.com/o/room1.png?alt=media&token=YOUR_TOKEN',
    name: 'Deluxe',
    price: 'R650',
    breakfastIncluded: true,
    amenities: ['wifi', 'tv', 'ac', 'car', 'pool'],
  },
  {
    id: 3,
    image: 'https://firebasestorage.googleapis.com/v0/b/hotel-booking-app-a083a.appspot.com/o/room3.png?alt=media&token=YOUR_TOKEN',
    name: 'Suite',
    price: 'R850',
    breakfastIncluded: true,
    amenities: ['wifi', 'tv', 'ac', 'car', 'pool'],
  },
  {
    id: 4,
    image: 'https://firebasestorage.googleapis.com/v0/b/hotel-booking-app-a083a.appspot.com/o/room4.png?alt=media&token=YOUR_TOKEN',
    name: 'Penthouse',
    price: 'R1200',
    breakfastIncluded: true,
    amenities: ['wifi', 'tv', 'ac', 'car', 'pool'],
  },
  {
    id: 5,
    image: 'https://firebasestorage.googleapis.com/v0/b/hotel-booking-app-a083a.appspot.com/o/room5.png?alt=media&token=YOUR_TOKEN',
    name: 'Luxury Suite',
    price: 'R1500',
    breakfastIncluded: true,
    amenities: ['wifi', 'tv', 'ac', 'car', 'pool'],
  },
  {
    id: 6,
    image: 'https://firebasestorage.googleapis.com/v0/b/hotel-booking-app-a083a.appspot.com/o/room6.png?alt=media&token=YOUR_TOKEN',
    name: 'Presidential Suite',
    price: 'R2500',
    breakfastIncluded: true,
    amenities: ['wifi', 'tv', 'ac', 'car', 'pool'],
  },
];

function HotelList() {
    const dispatch = useDispatch();
    const navigate = useNavigate(); 
    const roomsFromState = useSelector((state) => state.hotels.rooms);

    useEffect(() => {
        const fetchRooms = async () => {
            try {
                const roomsCollection = collection(db, 'rooms'); 
                const roomSnapshot = await getDocs(roomsCollection);
                const roomList = roomSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

                console.log("Fetched rooms:", roomList);

                if (roomList.length > 0) {
                    dispatch(setRooms(roomList)); 
                } else {
                    dispatch(setRooms(rooms));
                }
            } catch (error) {
                console.error("Error fetching rooms:", error);
                dispatch(setRooms(rooms)); 
            }
        };

        fetchRooms();
    }, [dispatch]);

    const handleBookNow = (roomId) => {
       
        navigate(`/booknow?roomId=${roomId}`);
    };

    return (
        <div className="hotel-list-container">
            <h2>Available Rooms</h2>
            <div className="rooms-grid">
                {roomsFromState.length > 0 ? (
                    roomsFromState.map((room) => (
                        <div key={room.id} className="room-card">
                            <img src={room.image} alt={room.name} className="room-image" />
                            <div className="room-info">
                                <h3>{room.name}</h3>
                                <div className="room-rating">
                                    <span>⭐⭐⭐⭐⭐</span>
                                </div>
                                <p>{room.price}</p>
                                {room.breakfastIncluded && <p>Breakfast included</p>}
                                <div className="amenities">
                                    {room.amenities.map((amenity, index) => (
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
