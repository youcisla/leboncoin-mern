import React from 'react';

const RegisterForm = ({ formData, handleChange, handleSubmit, message }) => (
  <div className="container mt-5">
    <h2 className="LeBonCoin-title text-center">Inscription</h2>
    {message && (
      <div className="alert alert-warning text-dark fw-semibold border border-warning rounded mb-4 text-center">
        {message}
      </div>
    )}
    <form onSubmit={handleSubmit} className="LeBonCoin-card">
      <div className="mb-3">
        <label className="LeBonCoin-label">Nom d'utilisateur</label>
        <input type="text" name="username" className="LeBonCoin-input" placeholder="Nom d'utilisateur" onChange={handleChange} required />
      </div>
      <div className="mb-3">
        <label className="LeBonCoin-label">Prénom</label>
        <input type="text" name="prenom" className="LeBonCoin-input" placeholder="Prénom" onChange={handleChange} />
      </div>
      <div className="mb-3">
        <label className="LeBonCoin-label">Nom</label>
        <input type="text" name="nom" className="LeBonCoin-input" placeholder="Nom" onChange={handleChange} />
      </div>
      <div className="mb-3">
        <label className="LeBonCoin-label">Email</label>
        <input type="email" name="email" className="LeBonCoin-input" placeholder="Email" onChange={handleChange} required />
      </div>
      <div className="mb-3">
        <label className="LeBonCoin-label">Mot de passe</label>
        <input type="password" name="password" className="LeBonCoin-input" placeholder="Mot de passe" onChange={handleChange} required />
      </div>
      <div className="mb-3">
        <label className="LeBonCoin-label">Confirmer le mot de passe</label>
        <input type="password" name="confirmPassword" className="LeBonCoin-input" placeholder="Confirmer le mot de passe" onChange={handleChange} required />
      </div>
      <button type="submit" className="LeBonCoin-btn">S'inscrire</button>
    </form>
  </div>
);

export default RegisterForm;
