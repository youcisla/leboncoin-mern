import 'bootstrap/dist/css/bootstrap.min.css';
import { Link, useNavigate } from "react-router-dom";

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
      <div className="container d-flex align-items-center justify-content-between">
        <Link className="navbar-brand" to="/">LeBonCoin</Link>
        <div className="d-flex align-items-center gap-3">
          {!token ? (
            <>
              <Link to="/register" className="LeBonCoin-link">S'inscrire</Link>
              <Link to="/login" className="LeBonCoin-link">Se connecter</Link>
            </>
          ) : (
            <>
              <span className="LeBonCoin-link">Bienvenue, <span style={{color:"#fff"}}>{username}</span></span>
              <Link to="/" className="LeBonCoin-link">Accueil</Link>
              <button className="btn LeBonCoin-btn" onClick={handleLogout}>Déconnexion</button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
