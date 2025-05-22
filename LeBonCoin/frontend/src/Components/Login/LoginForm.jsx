import 'bootstrap/dist/css/bootstrap.min.css';
import './LoginForm.css';

const LoginForm = ({ email, setEmail, password, setPassword, handleLogin, message }) => (
  <div className="login-container">
    <div className="login-card">
      <h2 className="login-title">Connexion</h2>
      {message && <div className="login-message">{message}</div>}
      <form onSubmit={handleLogin}>
        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            className="form-input"
            placeholder="Entrez votre email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Mot de passe</label>
          <input
            type="password"
            className="form-input"
            placeholder="Entrez votre mot de passe"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="form-button">Se connecter</button>
      </form>
    </div>
  </div>
);

export default LoginForm;
