import axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect, useState } from "react";
import AdsSection from "./AdsSection";

const Home = () => {
  const [ads, setAds] = useState([]);
  const [showForm, setShowForm] = useState(false);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [file, setFile] = useState(null);
  const [editingAd, setEditingAd] = useState(null);

  const fetchAds = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/ads");
      setAds(res.data);
    } catch (err) {
      console.error("Erreur récupération annonces", err);
    }
  };

  useEffect(() => {
    fetchAds();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/ads/${id}`);
      fetchAds();
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
      fetchAds();
    } catch (err) {
      alert("Erreur lors de la création de l'annonce");
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
    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("description", description);
      formData.append("category", category);
      formData.append("price", price);
      if (file) formData.append("file", file);

      await axios.put(`http://localhost:5000/api/ads/${editingAd._id}`, formData, {
        headers: { Authorization: token, "Content-Type": "multipart/form-data" },
      });

      setEditingAd(null);
      setTitle("");
      setDescription("");
      setCategory("");
      setPrice("");
      setFile(null);
      setShowForm(false);
      fetchAds();
    } catch (err) {
      alert("Erreur lors de la mise à jour de l'annonce");
    }
  };

  return (
    <div className="container mt-5" style={{ minHeight: "80vh" }}>
      {!showForm ? (
        <>
          <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap">
            <h2 className="LeBonCoin-title">Toutes les annonces</h2>
            <button className="LeBonCoin-btn" onClick={() => setShowForm(true)}>Ajouter une annonce</button>
          </div>
          <div className="row">
            {ads.map((ad) => (
              <div className="col-12 col-sm-6 col-lg-4 mb-4" key={ad._id}>
                <div className="LeBonCoin-card h-100">
                  <div className="LeBonCoin-title" style={{ fontSize: 22 }}>{ad.title}</div>
                  <div className="mb-2" style={{ color: "#a0ffa0" }}>{ad.category} — {ad.price} €</div>
                  <div className="mb-2">{ad.description}</div>
                  {ad.fileUrl && ad.fileType?.startsWith("image/") && (
                    <img src={ad.fileUrl} alt="Visuel" className="img-fluid mb-2 rounded" />
                  )}
                  {ad.fileUrl && !ad.fileType?.startsWith("image/") && (
                    <a href={ad.fileUrl} target="_blank" rel="noreferrer" className="btn btn-outline-light btn-sm mt-2">
                      Voir le fichier
                    </a>
                  )}
                  <button onClick={() => handleDelete(ad._id)} className="LeBonCoin-btn mt-3 w-100">Supprimer</button>
                  <button onClick={() => handleEdit(ad)} className="LeBonCoin-btn mt-3 w-100">Modifier</button>
                </div>
              </div>
            ))}
          </div>
        </>
      ) : (
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
      )}
    </div>
  );
};

export default Home;
