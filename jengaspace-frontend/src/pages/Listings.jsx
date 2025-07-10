import { useEffect, useState } from 'react';
import axios from '../axios';
import '../Listings.css';

export default function Listings() {
  const [listings, setListings] = useState([]);
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    const fetchListings = async () => {
      try {
        const res = await axios.get('/listings');
        setListings(res.data);
      } catch (err) {
        console.error('Error fetching listings:', err);
      }
    };
    fetchListings();
  }, []);

  return (
    <div className="listings-page">
      <h2>Available Houses</h2>
      <div className="listings-grid">
        {listings.map(listing => (
          <div className="listing-card" key={listing.id} onClick={() => setSelected(listing)}>
            {listing.living_room_image && (
              <img
                src={`http://localhost:8000/storage/${listing.living_room_image}`}
                alt="Living Room"
                className="main-card-image"
              />
            )}
            <div className="listing-details">
              <h3>{listing.category}</h3>
              <p><strong>Location:</strong> {listing.location}</p>
              <p><strong>Rent:</strong> KES {listing.rent}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Modal for full listing view */}
      {selected && (
        <div className="modal-overlay" onClick={() => setSelected(null)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <h3>{selected.category} in {selected.location}</h3>
            <div className="modal-images">
              {selected.living_room_image && (
                <div>
                  <p>Living Room</p>
                  <img src={`http://localhost:8000/storage/${selected.living_room_image}`} alt="Living Room" />
                </div>
              )}
              {selected.bedroom_image && (
                <div>
                  <p>Bedroom</p>
                  <img src={`http://localhost:8000/storage/${selected.bedroom_image}`} alt="Bedroom" />
                </div>
              )}
              {selected.kitchen_image && (
                <div>
                  <p>Kitchen</p>
                  <img src={`http://localhost:8000/storage/${selected.kitchen_image}`} alt="Kitchen" />
                </div>
              )}
              {selected.bathroom_image && (
                <div>
                  <p>Bathroom</p>
                  <img src={`http://localhost:8000/storage/${selected.bathroom_image}`} alt="Bathroom" />
                </div>
              )}
            </div>
            <div className="modal-info">
              <p><strong>Bedrooms:</strong> {selected.bedrooms ?? 'N/A'}</p>
              <p><strong>Rent:</strong> KES {selected.rent}</p>
              <p><strong>Description:</strong> {selected.description}</p>
              <p><strong>Posted by:</strong> {selected.user?.name}</p>
            </div>
            <button className="close-btn" onClick={() => setSelected(null)}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
}
