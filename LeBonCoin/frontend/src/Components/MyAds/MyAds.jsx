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
        if (!token) {
          console.error("No token found");
          setMyAds([]);
          return;
        }

        const res = await axios.get("http://localhost:5000/api/ads/", {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (res.data && Array.isArray(res.data)) {
          setMyAds(res.data);
        } else {
          console.warn("Invalid response format", res.data);
          setMyAds([]);
        }
      } catch (err) {
        console.error("Error fetching ads", err);
        setMyAds([]);
      }
    };

    fetchMyAds();
  }, []);

  const filteredAds = filter
    ? myAds.filter((ad) =>
        ad.title?.toLowerCase().includes(filter.toLowerCase()) ||
        ad.category?.toLowerCase().includes(filter.toLowerCase())
      )
    : myAds;

  const indexOfLastAd = currentPage * adsPerPage;
  const indexOfFirstAd = indexOfLastAd - adsPerPage;
  const currentAds = filteredAds.slice(indexOfFirstAd, indexOfLastAd); // Ensure slicing is done after filtering

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const totalPages = Math.ceil(filteredAds.length / adsPerPage);
  const startPage = Math.max(1, currentPage - 1);
  const endPage = Math.min(totalPages, currentPage + 1);

  const pages = Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i);

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
        {totalPages > 1 && (
          <ul className="pagination justify-content-center">
            {startPage > 1 && (
              <li className="page-item">
                <button onClick={() => paginate(1)} className="page-link LeBonCoin-btn">1</button>
              </li>
            )}
            {startPage > 2 && <li className="page-item disabled"><span className="page-link">...</span></li>}
            {pages.map((page) => (
              <li key={page} className={`page-item ${currentPage === page ? 'active' : ''}`}>
                <button onClick={() => paginate(page)} className="page-link LeBonCoin-btn">{page}</button>
              </li>
            ))}
            {endPage < totalPages - 1 && <li className="page-item disabled"><span className="page-link">...</span></li>}
            {endPage < totalPages && (
              <li className="page-item">
                <button onClick={() => paginate(totalPages)} className="page-link LeBonCoin-btn">{totalPages}</button>
              </li>
            )}
          </ul>
        )}
      </nav>
    </div>
  );
};

export default MyAds;
