import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const MyAds = () => {
  const [form, setForm] = useState({
    title: "",
    description: "",
    category: "",
    price: "",
    file: null,
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "file") {
      setForm({ ...form, file: files[0] });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    const formData = new FormData();
    formData.append("title", form.title);
    formData.append("description", form.description);
    formData.append("category", form.category);
    formData.append("price", form.price);
    if (form.file) {
      formData.append("file", form.file);
    }

    try {
      await axios.post("http://localhost:5000/api/ads", formData, {
        headers: {
          Authorization: token,
          "Content-Type": "multipart/form-data"
        }
      });
      navigate("/");
    } catch (err) {
      alert("Échec de création de l'annonce");
    }
  };

  return (
    <div className="container mt-5 text-white">
      <h2 className="LeBonCoin-title text-center">Créer une annonce</h2>
      <form onSubmit={handleSubmit} className="LeBonCoin-card">
        <input type="text" name="title" className="LeBonCoin-input" placeholder="Titre de l'annonce" onChange={handleChange} required />
        <textarea name="description" className="LeBonCoin-textarea" placeholder="Description détaillée" onChange={handleChange} required />
        <input type="text" name="category" className="LeBonCoin-input" placeholder="Catégorie (ex: Immobilier, Électronique)" onChange={handleChange} required />
        <input type="number" name="price" className="LeBonCoin-input" placeholder="Prix en €" onChange={handleChange} required />
        <input type="file" name="file" className="LeBonCoin-input" onChange={handleChange} />
        <button type="submit" className="LeBonCoin-btn">Publier</button>
      </form>
      <div className="text-center mt-3">
        <button className="btn btn-outline-light" onClick={() => navigate('/')}>Voir toutes les annonces</button>
      </div>
    </div>
  );
};

export default MyAds;
