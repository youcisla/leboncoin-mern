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
      <h2 className="mb-4 text-success">Créer une annonce</h2>
      <div className="card p-4 bg-dark text-white mb-5">
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <input type="text" name="title" className="form-control" placeholder="Titre de l'annonce" onChange={handleChange} required />
          </div>
          <div className="mb-3">
            <textarea name="description" className="form-control" placeholder="Description détaillée" onChange={handleChange} required />
          </div>
          <div className="mb-3">
            <input type="text" name="category" className="form-control" placeholder="Catégorie (ex: Immobilier, Électronique)" onChange={handleChange} required />
          </div>
          <div className="mb-3">
            <input type="number" name="price" className="form-control" placeholder="Prix en €" onChange={handleChange} required />
          </div>
          <div className="mb-3">
            <input type="file" name="file" className="form-control" onChange={handleChange} />
          </div>
          <button type="submit" className="btn btn-success">Publier</button>
        </form>
      </div>
      <button className="btn btn-outline-light" onClick={() => navigate('/')}>Voir toutes les annonces</button>
    </div>
  );
};

export default MyAds;
