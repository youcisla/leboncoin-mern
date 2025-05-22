import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect, useState } from 'react';
import './Profile.css'; // Ensure the path matches the file system exactly

const Profile = () => {
  const [user, setUser] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({ username: '', prenom: '', nom: '', email: '', password: '' });

  useEffect(() => {
    const fetchMe = async () => {
      const token = localStorage.getItem('token');
      try {
        const res = await axios.get('http://localhost:5000/api/auth/me', {
          headers: { Authorization: token }
        });
        setUser(res.data);
        setFormData({
          username: res.data.username,
          prenom: res.data.prenom,
          nom: res.data.nom,
          email: res.data.email,
          password: ''
        });
      } catch (err) {
        console.error(err);
      }
    };
    fetchMe();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    const token = localStorage.getItem('token');
    try {
      const res = await axios.put('http://localhost:5000/api/auth/me', formData, {
        headers: { Authorization: token }
      });
      setUser(res.data);
      setEditMode(false);
    } catch (err) {
      console.error(err);
    }
  };

  if (!user) return <p className="text-center mt-5 text-white">Chargement...</p>;

  return (
    <div className="profile-container LeBonCoin-card" style={{ marginTop: 30, maxWidth: 600 }}>
      <h1 className="LeBonCoin-title mb-3">Mon Profil</h1>
      {editMode ? (
        <>
          <div>
            <label>Nom d'utilisateur :</label>
            <input type="text" name="username" value={formData.username} onChange={handleChange} />
          </div>
          <div>
            <label>Nom :</label>
            <input type="text" name="nom" value={formData.nom} onChange={handleChange} />
          </div>
          <div>
            <label>Prénom :</label>
            <input type="text" name="prenom" value={formData.prenom} onChange={handleChange} />
          </div>
          <div>
            <label>Email :</label>
            <input type="email" name="email" value={formData.email} onChange={handleChange} />
          </div>
          <div>
            <label>Mot de passe :</label>
            <input type="password" name="password" value={formData.password} onChange={handleChange} />
          </div>
          <button onClick={handleSave}>Enregistrer</button>
          <button onClick={() => setEditMode(false)}>Annuler</button>
        </>
      ) : (
        <>
          <div><strong>Nom d'utilisateur :</strong> {user.username}</div>
          <div><strong>Nom :</strong> {user.nom}</div>
          <div><strong>Prénom :</strong> {user.prenom}</div>
          <div><strong>Email :</strong> {user.email}</div>
          <button onClick={() => setEditMode(true)}>Modifier</button>
        </>
      )}
    </div>
  );
};

export default Profile;
