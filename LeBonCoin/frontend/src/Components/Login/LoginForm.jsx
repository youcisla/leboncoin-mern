import React from 'react';

const LoginForm = ({ email, setEmail, password, setPassword, handleLogin, message }) => (
  <div className="container mt-5">
    <h2 className="LeBonCoin-title text-center">Connexion</h2>
    {message && (
      <div className="alert alert-warning text-dark fw-semibold border border-warning rounded mb-4 text-center">
        {message}
      </div>
    )}
    <form onSubmit={handleLogin} className="LeBonCoin-card">
      <div className="mb-3">
        <label className="LeBonCoin-label">Email</label>
        <input
          type="email"
          className="LeBonCoin-input"
          placeholder="Entrez votre email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
        />
      </div>
      <div className="mb-3">
        <label className="LeBonCoin-label">Mot de passe</label>
        <input
          type="password"
          className="LeBonCoin-input"
          placeholder="Entrez votre mot de passe"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
        />
      </div>
      <button type="submit" className="LeBonCoin-btn">Se connecter</button>
    </form>
  </div>
);

export default LoginForm;
