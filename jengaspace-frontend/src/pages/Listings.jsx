import { useEffect, useState } from 'react';
import api from '../services/api';

function Listings() {
  const [properties, setProperties] = useState([]);

  useEffect(() => {
    api.get('/properties') // Laravel route
      .then(res => setProperties(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div>
      <h1>Available Houses 🏠</h1>
      <div className="grid">
        {properties.map(p => (
          <div key={p.id} className="card">
            <img src={p.image_url} alt={p.title} />
            <h2>{p.title}</h2>
            <p>{p.region} • KES {p.price}</p>
            <a href={`/property/${p.id}`}>View Details</a>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Listings;
