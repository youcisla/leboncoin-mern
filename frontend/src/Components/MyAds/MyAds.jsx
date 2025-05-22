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
      navigate("/"); // redirect to all ads
    } catch (err) {
      alert("Échec de création de l'annonce");
    }
  };

  return (
    <div className="kick-card">
      <div className="kick-title">Créer une annonce</div>
      <form onSubmit={handleSubmit}>
        <input className="kick-input" type="text" name="title" placeholder="Titre de l'annonce" onChange={handleChange} required />
        <textarea className="kick-input" name="description" placeholder="Description détaillée" onChange={handleChange} required />
        <input className="kick-input" type="text" name="category" placeholder="Catégorie (ex: Immobilier, Électronique)" onChange={handleChange} required />
        <input className="kick-input" type="number" name="price" placeholder="Prix en €" onChange={handleChange} required />
        <input className="kick-input" type="file" name="file" onChange={handleChange} />
        <button type="submit" className="kick-btn">Publier</button>
      </form>
      <button className="kick-btn mt-3" style={{background: "#17181c", color: "#00ff84"}} onClick={() => navigate('/')}>Voir toutes les annonces</button>
    </div>
  );
};

export default MyAds;
