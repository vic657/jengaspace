import { useEffect, useState } from "react";
import axios from "../axios"; 
import "../index.css"; 

export default function MyListings() {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get("/landlord/properties")
      .then((res) => {
        setProperties(res.data.properties);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to load listings", err);
        setError("Failed to load listings.");
        setLoading(false);
      });
  }, []);

  if (loading) return <p className="listing-message">Loading...</p>;
  if (error) return <p className="listing-error">{error}</p>;

  return (
    <div className="listing-container">
        <button className="back-button" onClick={() => window.history.back()}>
  ← Back
</button>

      <h2 className="listing-title">My Property Listings</h2>
      {properties.length === 0 ? (
        <p className="listing-message">No listings found.</p>
      ) : (
        <div className="table-wrapper">
          <table className="listing-table">
            <thead>
              <tr>
                <th>#</th>
                <th>Category</th>
                <th>Bedrooms</th>
                <th>Location</th>
                <th>Rent (Ksh)</th>
                <th>Description</th>
                <th>Living Room</th>
                <th>Bedroom</th>
                <th>Kitchen</th>
                <th>Bathroom</th>
              </tr>
            </thead>
            <tbody>
              {properties.map((property, index) => (
                <tr key={property.id}>
                  <td>{index + 1}</td>
                  <td>{property.category}</td>
                  <td>{property.bedrooms ?? "-"}</td>
                  <td>{property.location}</td>
                  <td>{property.rent.toLocaleString()}</td>
                  <td>{property.description || "-"}</td>
                  <td>
                    {property.living_room_image && (
                      <img
                        src={property.living_room_image}
                        alt="Living Room"
                        className="listing-image"
                      />
                    )}
                  </td>
                  <td>
                    {property.bedroom_image && (
                      <img
                        src={property.bedroom_image}
                        alt="Bedroom"
                        className="listing-image"
                      />
                    )}
                  </td>
                  <td>
                    {property.kitchen_image && (
                      <img
                        src={property.kitchen_image}
                        alt="Kitchen"
                        className="listing-image"
                      />
                    )}
                  </td>
                  <td>
                    {property.bathroom_image && (
                      <img
                        src={property.bathroom_image}
                        alt="Bathroom"
                        className="listing-image"
                      />
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
