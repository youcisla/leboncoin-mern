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
      <div className="custom-container">
        <Link className="navbar-brand" to="/">LeBonCoin</Link>
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
              <button className="btn LeBonCoin-btn small-btn" onClick={handleLogout}>Déconnexion</button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
