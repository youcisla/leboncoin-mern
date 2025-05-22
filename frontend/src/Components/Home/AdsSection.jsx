import React from "react";

const AdsSection = ({
  ads,
  handleSubmit,
  handleDelete,
  title,
  setTitle,
  description,
  setDescription,
  category,
  setCategory,
  price,
  setPrice
}) => {
  return (
    <div className="container mt-5 text-white">
      <h2 className="mb-4 text-success">Ajouter une annonce</h2>
      <div className="card p-4 bg-dark text-white mb-5">
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Titre de l'annonce"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <textarea
              className="form-control"
              placeholder="Description détaillée"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Catégorie (ex: Immobilier, Électronique)"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <input
              type="number"
              className="form-control"
              placeholder="Prix en €"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn btn-success">Publier</button>
        </form>
      </div>

      <h3 className="text-success">Toutes les annonces</h3>
      <div className="row">
        {ads.map((ad) => (
          <div className="col-md-4 mb-4" key={ad._id}>
            <div className="card bg-dark text-white h-100">
              <div className="card-body">
                <h5 className="card-title">{ad.title}</h5>
                <p className="card-text">{ad.description}</p>
                <p className="text-muted">{ad.category} - {ad.price}€</p>
                <button onClick={() => handleDelete(ad._id)} className="btn btn-outline-danger btn-sm">Supprimer</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdsSection;
