import { Link, useNavigate } from "react-router-dom";
import logo from '../../assets/logo.png';

const Navbar = () => {
  const token = localStorage.getItem("token");
  const username = localStorage.getItem("username");
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    navigate("/login");
  };

  return (
    <nav className="LeBonCoin-navbar mb-5">
      <div className="custom-container">
        <Link className="navbar-brand" to="/">
          <img src={logo} alt="LeBonCoin Logo" style={{ height: '40px', marginRight: '10px', borderRadius: '50%' }} />
          LeBonCoin
        </Link>
        <div className="custom-actions">
          {!token ? (
            <>
              <Link to="/register" className="LeBonCoin-link">S'inscrire</Link>
              <Link to="/login" className="LeBonCoin-link">Se connecter</Link>
            </>
          ) : (
            <>
              <span className="LeBonCoin-link">Bienvenue, <span style={{color:"#fff"}}>{username}</span></span>
              <Link to="/" className="LeBonCoin-link">Accueil</Link>
              <Link to="/profile" className="LeBonCoin-link">Profil</Link>
              <Link to="/all-ads" className="LeBonCoin-link">Toutes les annonces</Link>
              <Link to="/my-ads" className="LeBonCoin-link">Mes annonces</Link>
              <button className="btn LeBonCoin-btn small-btn" onClick={handleLogout} style={{ alignSelf: 'center' }}>Déconnexion</button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
