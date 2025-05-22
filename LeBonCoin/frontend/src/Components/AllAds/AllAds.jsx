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
        setAds(res.data);
      } catch (err) {
        console.error('Erreur récupération annonces', err);
      }
    };

    fetchAds();
  }, []);

  const filteredAds = filter
    ? ads.filter((ad) =>
        ad.title.toLowerCase().includes(filter.toLowerCase()) ||
        ad.category.toLowerCase().includes(filter.toLowerCase())
      )
    : ads;

  const indexOfLastAd = currentPage * adsPerPage;
  const indexOfFirstAd = indexOfLastAd - adsPerPage;
  const currentAds = filteredAds.slice(indexOfFirstAd, indexOfLastAd);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

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

export default AllAds;
