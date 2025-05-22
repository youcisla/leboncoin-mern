import 'bootstrap/dist/css/bootstrap.min.css';
import './RegisterForm.css';

const RegisterForm = ({ formData, handleChange, handleSubmit, message }) => (
  <div className="register-container">
    <div className="register-card">
      <h2 className="register-title">Inscription</h2>
      {message && <div className="register-message">{message}</div>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Nom d'utilisateur</label>
          <input
            type="text"
            name="username"
            className="form-input"
            placeholder="Nom d'utilisateur"
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Prénom</label>
          <input
            type="text"
            name="prenom"
            className="form-input"
            placeholder="Prénom"
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>Nom</label>
          <input
            type="text"
            name="nom"
            className="form-input"
            placeholder="Nom"
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            name="email"
            className="form-input"
            placeholder="Email"
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Mot de passe</label>
          <input
            type="password"
            name="password"
            className="form-input"
            placeholder="Mot de passe"
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Confirmer le mot de passe</label>
          <input
            type="password"
            name="confirmPassword"
            className="form-input"
            placeholder="Confirmer le mot de passe"
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="form-button">S'inscrire</button>
      </form>
    </div>
  </div>
);

export default RegisterForm;
