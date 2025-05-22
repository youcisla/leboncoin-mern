import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Profile.css'; // Ensure the path matches the file system exactly

const Profile = () => {
  const [user, setUser] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({ username: '', prenom: '', nom: '', email: '', password: '' });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMe = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        console.error('No token found, redirecting to login.');
        navigate('/login');
        return;
      }

      try {
        const res = await axios.get('http://localhost:5000/api/auth/me', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUser(res.data);
        setFormData({
          username: res.data.username,
          prenom: res.data.prenom,
          nom: res.data.nom,
          email: res.data.email,
          password: '',
        });
      } catch (err) {
        console.error('Error fetching user data:', err);
        if (err.response?.status === 401) {
          console.error('Invalid or expired token, redirecting to login.');
          localStorage.removeItem('token');
          navigate('/login');
        }
      }
    };
    fetchMe();
  }, [navigate]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    const token = localStorage.getItem('token');
    try {
      const res = await axios.put('http://localhost:5000/api/auth/me', formData, {
        headers: { Authorization: `Bearer ${token}` } // Added Bearer prefix
      });
      setUser(res.data);
      localStorage.setItem('username', res.data.username); // Update username in localStorage
      setEditMode(false);
    } catch (err) {
      console.error(err);
    }
  };

  if (!user) return <p className="text-center mt-5 text-white">Chargement...</p>;

  return (
    <div className="LeBonCoin-card mt-4" style={{ maxWidth: 600, margin: '0 auto' }}>
      <h1 className="LeBonCoin-title">Mon Profil</h1>
      {editMode ? (
        <form className="profile-form">
          <div className="mb-3">
            <label className="LeBonCoin-label">Nom d'utilisateur:</label>
            <input
              type="text"
              name="username"
              className="LeBonCoin-input"
              value={formData.username}
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <label className="LeBonCoin-label">Nom:</label>
            <input
              type="text"
              name="nom"
              className="LeBonCoin-input"
              value={formData.nom}
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <label className="LeBonCoin-label">Prénom:</label>
            <input
              type="text"
              name="prenom"
              className="LeBonCoin-input"
              value={formData.prenom}
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <label className="LeBonCoin-label">Email:</label>
            <input
              type="email"
              name="email"
              className="LeBonCoin-input"
              value={formData.email}
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <label className="LeBonCoin-label">Mot de passe:</label>
            <input
              type="password"
              name="password"
              className="LeBonCoin-input"
              value={formData.password}
              onChange={handleChange}
            />
          </div>
          <div className="d-flex gap-3 mt-3">
            <button type="button" className="LeBonCoin-btn" onClick={handleSave}>Sauvegarder</button>
            <button type="button" className="LeBonCoinRed-btn" onClick={() => setEditMode(false)}>Annuler</button>
          </div>
        </form>
      ) : (
        <div className="profile-details">
          <p><strong>Nom d'utilisateur:</strong> {user.username}</p>
          <p><strong>Nom:</strong> {user.nom}</p>
          <p><strong>Prénom:</strong> {user.prenom}</p>
          <p><strong>Email:</strong> {user.email}</p>
          <button className="LeBonCoin-btn mt-3" onClick={() => setEditMode(true)}>Modifier</button>
        </div>
      )}
    </div>
  );
};

export default Profile;
