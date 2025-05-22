import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect, useState } from 'react';

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
    <div className="LeBonCoin-card" style={{ marginTop: 30, maxWidth: 600 }}>
      <div className="LeBonCoin-title mb-3">Mon Profil</div>
      <div><strong>Nom d'utilisateur :</strong> {user.username}</div>
      <div><strong>Nom :</strong> {user.nom}</div>
      <div><strong>Prénom :</strong> {user.prenom}</div>
      <div><strong>Email :</strong> {user.email}</div>
    </div>
  );
};

export default Profile;
