import axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import jcLogo from '../../assets/jc.png';
import AdsSection from "./AdsSection";

const Home = () => {
  const [ads, setAds] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [file, setFile] = useState(null);
  const [editingAd, setEditingAd] = useState(null);
  const [username, setUsername] = useState("");
  const [adCount, setAdCount] = useState(0);
  const [userAdCount, setUserAdCount] = useState(0);

  const [currentPage, setCurrentPage] = useState(1);
  const [adsPerPage] = useState(10);
  const [filter, setFilter] = useState("");

  const navigate = useNavigate();

  const fetchAllAds = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/ads/all");
      if (res.data && Array.isArray(res.data)) {
        setAds(res.data);
        setAdCount(res.data.length);
      } else {
        console.warn("Invalid response format", res.data);
        setAds([]);
        setAdCount(0);
      }
    } catch (err) {
      console.error("Error fetching all ads", err);
      setAds([]);
      setAdCount(0);
    }
  };

  useEffect(() => {
    fetchAllAds();
  }, []);

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("token");
      try {
        const res = await axios.get("http://localhost:5000/api/auth/me", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUsername(res.data.username);

        const userAdsRes = await axios.get("http://localhost:5000/api/ads/user", {
          headers: { Authorization: `Bearer ${token}` },
        });
        console.log("User ads response:", userAdsRes.data);
        setUserAdCount(userAdsRes.data.length);
      } catch (err) {
        console.error("Error fetching user or user ads:", err);
      }
    };
    fetchUser();
  }, []);

  useEffect(() => {
    console.log("userAdCount at render:", userAdCount);
  }, [userAdCount]);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/ads/${id}`);
      fetchAllAds();
    } catch (err) {
      alert("Erreur lors de la suppression de l'annonce");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("description", description);
      formData.append("category", category);
      formData.append("price", price);
      if (file) formData.append("file", file);

      await axios.post("http://localhost:5000/api/ads", formData, {
        headers: { Authorization: token, "Content-Type": "multipart/form-data" },
      });

      setTitle("");
      setDescription("");
      setCategory("");
      setPrice("");
      setFile(null);
      setShowForm(false);
      fetchAllAds();
      navigate("/my-ads");
    } catch (err) {
      setErrorMessage(err.response?.data?.error || "Erreur lors de la création de l'annonce");
    }
  };

  const handleEdit = (ad) => {
    setEditingAd(ad);
    setTitle(ad.title);
    setDescription(ad.description);
    setCategory(ad.category);
    setPrice(ad.price);
    setFile(null);
    setShowForm(true);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    console.log("Token being sent:", token);
    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("description", description);
      formData.append("category", category);
      formData.append("price", price);
      if (file) formData.append("file", file);

      await axios.put(`http://localhost:5000/api/ads/${editingAd._id}`, formData, {
        headers: { Authorization: `Bearer ${token}`, "Content-Type": "multipart/form-data" },
      });

      setEditingAd(null);
      setTitle("");
      setDescription("");
      setCategory("");
      setPrice("");
      setFile(null);
      setShowForm(false);
      fetchAllAds();
      navigate("/my-ads");
    } catch (err) {
      setErrorMessage(err.response?.data?.error || "Erreur lors de la mise à jour de l'annonce");
    }
  };

  const filteredAds = filter
    ? ads.filter((ad) =>
        ad.title?.toLowerCase().includes(filter.toLowerCase()) ||
        ad.category?.toLowerCase().includes(filter.toLowerCase())
      )
    : ads;

  const indexOfLastAd = currentPage * adsPerPage;
  const indexOfFirstAd = indexOfLastAd - adsPerPage;
  const currentAds = filteredAds.slice(indexOfFirstAd, indexOfLastAd);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const totalPages = Math.ceil(filteredAds.length / adsPerPage);
  const startPage = Math.max(1, currentPage - 1);
  const endPage = Math.min(totalPages, currentPage + 1);

  const pages = Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i);

  return (
    <div className="container mt-5" style={{ minHeight: "80vh" }}>
      <div className="special-ad-section" style={{
        backgroundColor: "gold",
        padding: "2rem",
        borderRadius: "15px",
        marginBottom: "2rem",
        boxShadow: "0 4px 15px rgba(0, 0, 0, 0.2)",
        textAlign: "center",
        color: "black"
      }}>
        <img src={jcLogo} alt="JC Logo" style={{ height: '50px', marginBottom: '1rem' }} />
        <h2 style={{ fontSize: "2.5rem", fontWeight: "bold", marginBottom: "1rem" }}>Annonce Spéciale</h2>
        <p style={{ fontSize: "1.2rem", marginBottom: "1.5rem" }}>Découvrez notre marque partenaire :</p>
        <a
          href="https://jarche.net/"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: "inline-block",
            padding: "0.8rem 1.5rem",
            backgroundColor: "#000",
            color: "gold",
            borderRadius: "8px",
            textDecoration: "none",
            fontWeight: "bold",
            transition: "background-color 0.3s ease"
          }}
          onMouseOver={(e) => e.target.style.backgroundColor = "#333"}
          onMouseOut={(e) => e.target.style.backgroundColor = "#000"}
        >
          Visitez JC
        </a>
      </div>

      {!showForm ? (
        <>
          <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap">
            <h2 className="LeBonCoin-title">
              <span style={{ color: 'white' }}>Bienvenue,</span> <span style={{ color: '#00ff84' }}>{username}</span>
              <span style={{ color: 'white' }}> il y'a </span>
              <span style={{ color: '#00ff84' }}>{adCount}</span>
              <span style={{ color: 'white' }}> annonces dont </span>
              <span style={{ color: '#00ff84' }}>{userAdCount}</span>
              <span style={{ color: 'white' }}> sont les votres. Pour les voir, cliquez </span>
              <a href="/my-ads" style={{ color: '#00ff84', textDecoration: 'underline' }}>ici</a>.
            </h2>
            <button className="LeBonCoin-btn" onClick={() => setShowForm(true)}>Ajouter une annonce</button>
          </div>
          <div className="d-flex gap-3 mb-4">
            <select
              className="form-control LeBonCoin-btn"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
            >
              <option value="">Toutes les catégories</option>
              <option value="Immobilier">Immobilier</option>
              <option value="Véhicules">Véhicules</option>
              <option value="Mode">Mode</option>
              <option value="Électronique">Électronique</option>
              <option value="Loisirs">Loisirs</option>
              <option value="Autres">Autres</option>
            </select>
            <input
              type="text"
              placeholder="Rechercher..."
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="form-control LeBonCoin-btn"
            />
          </div>
          <div className="row">
            {currentAds.map((ad) => (
              <div className="col-12 col-sm-6 col-lg-4 mb-4" key={ad._id}>
                <div className="LeBonCoin-card h-100">
                  <div className="LeBonCoin-title" style={{ fontSize: 22 }}>{ad.title}</div>
                  <div className="mb-2" style={{ color: '#a0ffa0' }}>{ad.category} — {ad.price} €</div>
                  <div className="mb-2">{ad.description}</div>
                  {ad.fileUrl && (
                    <img
                      src={`http://localhost:5000${ad.fileUrl}`}
                      alt={ad.title}
                      className="img-fluid mb-2"
                      style={{ maxHeight: "200px", objectFit: "cover" }}
                    />
                  )}
                </div>
              </div>
            ))}
          </div>
          <nav>
            <ul className="pagination justify-content-center">
              {startPage > 1 && (
                <li className="page-item">
                  <button onClick={() => paginate(1)} className="page-link LeBonCoin-btn">1</button>
                </li>
              )}
              {startPage > 2 && <li className="page-item disabled"><span className="page-link LeBonCoin-btn">...</span></li>}
              {pages.map((page) => (
                <li key={page} className={`page-item ${currentPage === page ? 'active' : ''}`}>
                  <button onClick={() => paginate(page)} className="page-link LeBonCoin-btn">{page}</button>
                </li>
              ))}
              {endPage < totalPages - 1 && <li className="page-item disabled"><span className="page-link LeBonCoin-btn">...</span></li>}
              {endPage < totalPages && (
                <li className="page-item">
                  <button onClick={() => paginate(totalPages)} className="page-link LeBonCoin-btn">{totalPages}</button>
                </li>
              )}
            </ul>
          </nav>
        </>
      ) : (
        <>
          <AdsSection
            title={title}
            setTitle={setTitle}
            description={description}
            setDescription={setDescription}
            category={category}
            setCategory={setCategory}
            price={price}
            setPrice={setPrice}
            file={file}
            setFile={setFile}
            handleSubmit={editingAd ? handleUpdate : handleSubmit}
            handleCancel={() => {
              setEditingAd(null);
              setTitle("");
              setDescription("");
              setCategory("");
              setPrice("");
              setFile(null);
              setShowForm(false);
            }}
          />
          {errorMessage && <div className="error-message">{errorMessage}</div>}
        </>
      )}
    </div>
  );
};

export default Home;
