import React from "react";

const AdsSection = ({
  title,
  setTitle,
  description,
  setDescription,
  category,
  setCategory,
  price,
  setPrice,
  file,
  setFile,
  handleSubmit,
  handleCancel
}) => {
  const onFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  return (
    <div className="LeBonCoin-card mt-4">
      <div className="LeBonCoin-title">Créer une annonce</div>
      <form onSubmit={handleSubmit}>
        <input className="LeBonCoin-input" type="text" placeholder="Titre de l'annonce" value={title} onChange={(e) => setTitle(e.target.value)} required />
        <textarea className="LeBonCoin-input" placeholder="Description détaillée" value={description} onChange={(e) => setDescription(e.target.value)} required rows={3} />
        <input className="LeBonCoin-input" type="text" placeholder="Catégorie (ex: Immobilier, Électronique)" value={category} onChange={(e) => setCategory(e.target.value)} required />
        <input className="LeBonCoin-input" type="number" placeholder="Prix en €" value={price} onChange={(e) => setPrice(e.target.value)} required />
        <input className="LeBonCoin-input" type="file" onChange={onFileChange} accept="image/*,.pdf,.doc,.docx,.xls,.xlsx,.txt" />
        <div className="d-flex gap-3 mt-3">
          <button type="submit" className="LeBonCoin-btn">Publier</button>
          <button type="button" className="btn btn-outline-light" onClick={handleCancel}>Annuler</button>
        </div>
      </form>
    </div>
  );
};

export default AdsSection;
