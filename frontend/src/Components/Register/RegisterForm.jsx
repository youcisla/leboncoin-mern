import React from 'react';
import { Link } from 'react-router-dom';

const RegisterForm = ({ formData, handleChange, handleSubmit, message }) => (
  <div className="kick-card">
    <div className="kick-title">Inscription</div>
    {message && (
      <div style={{
        background: "#1f3328",
        border: "1.5px solid #00ff84",
        borderRadius: 8,
        color: "#fff",
        marginBottom: 14,
        padding: "12px 14px"
      }}>{message}</div>
    )}
    <form onSubmit={handleSubmit}>
      <input className="kick-input" type="text" name="username" placeholder="Nom d'utilisateur *" value={formData.username} onChange={handleChange} required />
      <input className="kick-input" type="text" name="prenom" placeholder="Prénom" value={formData.prenom} onChange={handleChange} />
      <input className="kick-input" type="text" name="nom" placeholder="Nom" value={formData.nom} onChange={handleChange} />
      <input className="kick-input" type="email" name="email" placeholder="Adresse email *" value={formData.email} onChange={handleChange} required />
      <input className="kick-input" type="password" name="password" placeholder="Mot de passe *" value={formData.password} onChange={handleChange} required />
      <input className="kick-input" type="password" name="confirmPassword" placeholder="Confirmer le mot de passe *" value={formData.confirmPassword} onChange={handleChange} required />
      <button type="submit" className="kick-btn">S'inscrire</button>
    </form>
    <div className="mt-3 text-center">
      <Link to="/login" className="kick-link">Déjà inscrit ? Se connecter</Link>
    </div>
  </div>
);

export default RegisterForm;
