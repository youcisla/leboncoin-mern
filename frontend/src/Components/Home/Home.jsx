import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [ads, setAds] = useState([]);
  const navigate = useNavigate();

  const fetchAds = async () => {
    const res = await axios.get("http://localhost:5000/api/ads");
    setAds(res.data);
  };

  useEffect(() => {
    fetchAds();
  }, []);

  return (
    <div className="container mt-5 text-white">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="text-success">Toutes les annonces</h2>
        <button className="btn btn-success" onClick={() => navigate('/my-ads')}>
          Créer une annonce
        </button>
      </div>
      <div className="row">
        {ads.map((ad) => (
          <div className="col-md-4 mb-4" key={ad._id}>
            <div className="card bg-dark text-white h-100">
              <div className="card-body">
                <h5 className="card-title">{ad.title}</h5>
                <p className="card-text">{ad.description}</p>
                <p className="text-muted">{ad.category} - {ad.price}€</p>
                {ad.fileUrl && ad.fileType?.startsWith("image/") && (
                  <img src={ad.fileUrl} alt="Fichier" className="img-fluid mt-2 rounded" />
                )}
                {ad.fileUrl && !ad.fileType?.startsWith("image/") && (
                  <a href={ad.fileUrl} target="_blank" rel="noreferrer" className="btn btn-outline-light btn-sm mt-2">
                    Voir le fichier
                  </a>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
