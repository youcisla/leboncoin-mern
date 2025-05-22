import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Profile = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchMe = async () => {
      const token = localStorage.getItem('token');
      try {
        const res = await axios.get('http://localhost:5000/api/auth/me', {
          headers: { Authorization: token }
        });
        setUser(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchMe();
  }, []);

  if (!user) return <p className="text-center mt-5 text-white">Chargement...</p>;

  return (
    <div className="container mt-5 text-white">
      <h2 className="text-success mb-4">Mon Profil</h2>
      <div className="card p-4 bg-dark text-white">
        <p><strong>Nom d'utilisateur :</strong> {user.username}</p>
        <p><strong>Nom :</strong> {user.nom}</p>
        <p><strong>Prénom :</strong> {user.prenom}</p>
        <p><strong>Email :</strong> {user.email}</p>
      </div>
    </div>
  );
};

export default Profile;
