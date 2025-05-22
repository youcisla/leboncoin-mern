import React, { useEffect, useState } from "react";
import axios from "axios";
import AdsSection from "./AdsSection";

const Home = () => {
  const [ads, setAds] = useState([]);
  const [showForm, setShowForm] = useState(false);

  // Champs du formulaire
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [file, setFile] = useState(null);

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

      // Reset + hide form + refresh ads
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

  return (
    <div className="container mt-5" style={{ minHeight: "80vh" }}>
      {!showForm ? (
        <>
          <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap">
            <h2 className="kick-title" style={{ color: "#00ff84" }}>Toutes les annonces</h2>
            <button
              className="kick-btn"
              onClick={() => setShowForm(true)}
            >
              Ajouter une annonce
            </button>
          </div>
          <div className="row">
            {ads.map((ad) => (
              <div className="col-12 col-sm-6 col-lg-4 mb-4" key={ad._id}>
                <div className="kick-card h-100" style={{ border: "1.5px solid #00ff84" }}>
                  <div>
                    <div className="kick-title mb-2" style={{ fontSize: 22 }}>{ad.title}</div>
                    <div className="mb-2" style={{ color: "#a0ffa0" }}>{ad.category} — {ad.price} €</div>
                    <div className="mb-2" style={{ minHeight: 60 }}>{ad.description}</div>
                    {ad.fileUrl && ad.fileType?.startsWith("image/") && (
                      <img src={ad.fileUrl} alt="Visuel" className="img-fluid mb-2" style={{ borderRadius: 8, maxHeight: 160, objectFit: "cover" }} />
                    )}
                    {ad.fileUrl && !ad.fileType?.startsWith("image/") && (
                      <a href={ad.fileUrl} target="_blank" rel="noreferrer" className="kick-link btn btn-sm mt-2" style={{ background: "#181b18" }}>
                        Voir le fichier
                      </a>
                    )}
                  </div>
                  <button
                    onClick={() => handleDelete(ad._id)}
                    className="kick-btn-cancel mt-3"
                    style={{ width: "100%" }}
                  >
                    Supprimer
                  </button>
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
          handleSubmit={handleSubmit}
          handleCancel={() => setShowForm(false)}
        />
      )}
    </div>
  );
};

export default Home;
