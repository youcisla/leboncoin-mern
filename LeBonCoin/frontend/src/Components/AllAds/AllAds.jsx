import axios from 'axios';
import { useEffect, useState } from 'react';

const AllAds = () => {
  const [ads, setAds] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [adsPerPage] = useState(10);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    const fetchAds = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/ads/all');
        if (res.data && Array.isArray(res.data)) {
          setAds(res.data);
        } else {
          console.warn("Invalid response format", res.data);
          setAds([]);
        }
      } catch (err) {
        console.error("Error fetching all ads", err);
        setAds([]);
      }
    };

    fetchAds();
  }, []);

  const filteredAds = filter
    ? ads.filter((ad) =>
        ad.title?.toLowerCase().includes(filter.toLowerCase()) ||
        ad.category?.toLowerCase().includes(filter.toLowerCase())
      )
    : ads;

  const indexOfLastAd = currentPage * adsPerPage;
  const indexOfFirstAd = indexOfLastAd - adsPerPage;
  const currentAds = filteredAds.slice(indexOfFirstAd, indexOfLastAd); // Ensure slicing is done after filtering

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const totalPages = Math.ceil(filteredAds.length / adsPerPage);
  const startPage = Math.max(1, currentPage - 1);
  const endPage = Math.min(totalPages, currentPage + 1);

  const pages = Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i);

  return (
    <div className="container mt-5" style={{ minHeight: '80vh' }}>
      <h2 className="LeBonCoin-title">Toutes les Annonces</h2>
      <input
        type="text"
        placeholder="Filtrer par titre..."
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
        className="form-control mb-4"
      />
      <div className="row">
        {currentAds.map((ad) => {
          const sanitizedFileUrl = ad.fileUrl ? `http://localhost:5000${encodeURI(ad.fileUrl)}` : null;

          return (
            <div className="col-12 col-sm-6 col-lg-4 mb-4" key={ad._id}>
              <div className="LeBonCoin-card h-100">
                <div className="LeBonCoin-title" style={{ fontSize: 22 }}>{ad.title}</div>
                <div className="mb-2" style={{ color: '#a0ffa0' }}>{ad.category} — {ad.price} €</div>
                <div className="mb-2">{ad.description}</div>
                {sanitizedFileUrl && ad.fileType?.startsWith("image/") && (
                  <img src={sanitizedFileUrl} alt="Visuel" className="img-fluid mb-2 rounded" />
                )}
                {sanitizedFileUrl && !ad.fileType?.startsWith("image/") && (
                  <a href={sanitizedFileUrl} target="_blank" rel="noreferrer" className="btn btn-outline-light btn-sm mt-2">
                    Voir le fichier
                  </a>
                )}
              </div>
            </div>
          );
        })}
      </div>
      <nav>
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
      </nav>
    </div>
  );
};

export default AllAds;
