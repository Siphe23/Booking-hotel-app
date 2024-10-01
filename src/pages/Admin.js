import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth, db, storage } from '../Firebase/firebase';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { collection, addDoc } from 'firebase/firestore';
import '../assets/adminProfile.css'; 

function Admin() {
  const [admin, setAdmin] = useState(null);
  const [roomName, setRoomName] = useState('');
  const [roomPrice, setRoomPrice] = useState('');
  const [image, setImage] = useState(null);
  const [tv, setTv] = useState(false);
  const [parking, setParking] = useState(false);
  const [swimmingPool, setSwimmingPool] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setAdmin(user);
      } else {
        navigate('/admin-login');
      }
    });
    return () => unsubscribe(); // Cleanup subscription on unmount
  }, [navigate]);

  const handleLogout = () => {
    signOut(auth).then(() => {
      navigate('/admin-login');
    });
  };

  const handleRoomSubmit = async (e) => {
    e.preventDefault();

    if (!image) {
      alert('Please upload an image for the room');
      return;
    }

    try {
      const storageRef = ref(storage, `rooms/${image.name}`);
      await uploadBytes(storageRef, image);
      const imageUrl = await getDownloadURL(storageRef);

      await addDoc(collection(db, 'rooms'), {
        roomName,
        roomPrice,
        imageUrl,
        tv,
        parking,
        swimmingPool,
      });

      alert('Room added successfully!');
      // Reset form fields
      setRoomName('');
      setRoomPrice('');
      setImage(null);
      setTv(false);
      setParking(false);
      setSwimmingPool(false);
    } catch (error) {
      console.error('Error adding room: ', error);
      alert('Error adding room');
    }
  };

  if (!admin) return null; 

  return (
    <div className="admin-profile">
      <h2>Welcome, {admin.email}</h2>
      <button onClick={handleLogout}>Logout</button>

      <h3>Add a New Room</h3>
      <form onSubmit={handleRoomSubmit}>
        <div>
          <label>Room Name:</label>
          <input
            type="text"
            value={roomName}
            onChange={(e) => setRoomName(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Room Price:</label>
          <input
            type="text"
            value={roomPrice}
            onChange={(e) => setRoomPrice(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Room Image:</label>
          <input
            type="file"
            onChange={(e) => setImage(e.target.files[0])}
            required
          />
        </div>
        <div>
          <label>
            <input
              type="checkbox"
              checked={tv}
              onChange={() => setTv(!tv)}
            />
            TV
          </label>
        </div>
        <div>
          <label>
            <input
              type="checkbox"
              checked={parking}
              onChange={() => setParking(!parking)}
            />
            Parking
          </label>
        </div>
        <div>
          <label>
            <input
              type="checkbox"
              checked={swimmingPool}
              onChange={() => setSwimmingPool(!swimmingPool)}
            />
            Swimming Pool
          </label>
        </div>
        <button type="submit">Add Room</button>
      </form>
    </div>
  );
}

export default Admin;

