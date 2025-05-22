import axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const MyAds = () => {
  const [myAds, setMyAds] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [adsPerPage] = useState(10);
  const [filter, setFilter] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMyAds = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get("http://localhost:5000/api/ads/", {
          headers: { Authorization: `Bearer ${token}` },
        });
        console.log("Response from backend:", res.data);
        setMyAds(res.data);
      } catch (err) {
        console.error("Erreur récupération de mes annonces", err);
      }
    };

    fetchMyAds();
  }, []);

  const filteredAds = filter
    ? myAds.filter((ad) =>
        ad.title.toLowerCase().includes(filter.toLowerCase()) ||
        ad.category.toLowerCase().includes(filter.toLowerCase())
      )
    : myAds;

  const indexOfLastAd = currentPage * adsPerPage;
  const indexOfFirstAd = indexOfLastAd - adsPerPage;
  const currentAds = filteredAds.slice(indexOfFirstAd, indexOfLastAd);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="container mt-5" style={{ minHeight: "80vh" }}>
      <h2 className="LeBonCoin-title">Mes Annonces</h2>
      <input
        type="text"
        placeholder="Filtrer par titre..."
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
        className="form-control mb-4"
      />
      <div className="row">
        {currentAds.map((ad) => (
          <div className="col-12 col-sm-6 col-lg-4 mb-4" key={ad._id}>
            <div className="LeBonCoin-card h-100">
              <div className="LeBonCoin-title" style={{ fontSize: 22 }}>{ad.title}</div>
              <div className="mb-2" style={{ color: "#a0ffa0" }}>{ad.category} — {ad.price} €</div>
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
    </div>
  );
};

export default MyAds;
