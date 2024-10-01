
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../Firebase/firebase';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { useEffect, useState } from 'react';

function AdminProfile() {
  const [admin, setAdmin] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
   
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setAdmin(user);
      } else {
       
        navigate('/admin-login');
      }
    });
  }, [navigate]);

  const handleLogout = () => {
    signOut(auth).then(() => {
      navigate('/admin-login');
    });
  };

  if (!admin) return null; 

  return (
    <div>
      <h2>Welcome, {admin.email}</h2>
      <button onClick={handleLogout}>Logout</button>
     
    </div>
  );
}

export default AdminProfile;
