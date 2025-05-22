import axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
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

  const [currentPage, setCurrentPage] = useState(1);
  const [adsPerPage] = useState(10);
  const [filter, setFilter] = useState("");

  const navigate = useNavigate();

  const fetchAllAds = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/ads/all");
      if (res.data && res.data.length > 0) {
        setAds(res.data);
        setAdCount(res.data.length);
      } else {
        setAds([]);
        setAdCount(0);
      }
    } catch (err) {
      console.error("Erreur récupération annonces", err);
      setErrorMessage("Impossible de récupérer les annonces. Veuillez réessayer plus tard.");
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
      } catch (err) {
        console.error("Erreur récupération utilisateur", err);
      }
    };
    fetchUser();
  }, []);

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
        ad.title.toLowerCase().includes(filter.toLowerCase()) ||
        ad.category.toLowerCase().includes(filter.toLowerCase())
      )
    : ads;

  const indexOfLastAd = currentPage * adsPerPage;
  const indexOfFirstAd = indexOfLastAd - adsPerPage;
  const currentAds = filteredAds.slice(indexOfFirstAd, indexOfLastAd);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="container mt-5" style={{ minHeight: "80vh" }}>
      {!showForm ? (
        <>
          <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap">
            <h2 className="LeBonCoin-title">
              <span style={{ color: 'white' }}>Bienvenue,</span> <span style={{ color: '#00ff84' }}>{username}</span>
              <span style={{ color: 'white' }}> vous avez </span>
              <span style={{ color: '#00ff84' }}>{adCount}</span>
              <span style={{ color: 'white' }}> annonces. Pour les voir, cliquez </span>
              <a href="/my-ads" style={{ color: '#00ff84', textDecoration: 'underline' }}>ici</a>.
            </h2>
            <button className="LeBonCoin-btn" onClick={() => setShowForm(true)}>Ajouter une annonce</button>
          </div>
          <input
            type="text"
            placeholder="Filtrer par titre..."
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="form-control mb-4"
          />
          <div className="row">
            {currentAds.map((ad) => {
              const sanitizedFileUrl = ad.fileUrl ? `http://localhost:5000${encodeURI(ad.fileUrl)}` : null;

              return (
                <div className="col-12 col-sm-6 col-lg-4 mb-4" key={ad._id}>
                  <div className="LeBonCoin-card h-100">
                    <div className="LeBonCoin-title" style={{ fontSize: 22 }}>{ad.title}</div>
                    <div className="mb-2" style={{ color: "#a0ffa0" }}>{ad.category} — {ad.price} €</div>
                    <div className="mb-2">{ad.description}</div>
                    {sanitizedFileUrl && ad.fileType?.startsWith("image/") && (
                      <img src={sanitizedFileUrl} alt="Visuel" className="img-fluid mb-2 rounded" />
                    )}
                    {sanitizedFileUrl && !ad.fileType?.startsWith("image/") && (
                      <a href={sanitizedFileUrl} target="_blank" rel="noreferrer" className="btn btn-outline-light btn-sm mt-2">
                        Voir le fichier
                      </a>
                    )}
                    <button onClick={() => handleEdit(ad)} className="LeBonCoin-btn mt-3 w-100">Modifier</button>
                    <button className="LeBonCoinRed-btn" onClick={() => handleDelete(ad._id)}>Supprimer</button>
                  </div>
                </div>
              );
            })}
          </div>
          <nav>
            <ul className="pagination">
              {Array.from({ length: Math.ceil(filteredAds.length / adsPerPage) }, (_, i) => (
                <li key={i} className="page-item">
                  <button onClick={() => paginate(i + 1)} className="page-link">
                    {i + 1}
                  </button>
                </li>
              ))}
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
