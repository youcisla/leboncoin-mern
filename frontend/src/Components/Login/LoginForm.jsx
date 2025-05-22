import React from 'react';
import { Link } from 'react-router-dom';

const LoginForm = ({ email, setEmail, password, setPassword, handleLogin, message }) => (
  <div className="kick-card">
    <div className="kick-title">Connexion</div>
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
    <form onSubmit={handleLogin}>
      <input
        className="kick-input"
        type="email"
        placeholder="Adresse email"
        value={email}
        onChange={e => setEmail(e.target.value)}
        required
      />
      <input
        className="kick-input"
        type="password"
        placeholder="Mot de passe"
        value={password}
        onChange={e => setPassword(e.target.value)}
        required
      />
      <button className="kick-btn" type="submit">Se connecter</button>
    </form>
    <div className="mt-3 text-center">
      <Link to="/register" className="kick-link">Créer un compte</Link>
    </div>
  </div>
);

export default LoginForm;
