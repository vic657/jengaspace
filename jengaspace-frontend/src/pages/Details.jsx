import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../services/api'; // assumes axios setup

function Details() {
  const { id } = useParams();
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    api.get(`/properties/${id}`)
      .then(res => {
        setProperty(res.data);
        setLoading(false);
      })
      .catch(err => {
        setError('Failed to load property');
        setLoading(false);
      });
  }, [id]);

  if (loading) return <p>Loading property details...</p>;
  if (error) return <p>{error}</p>;
  if (!property) return <p>Property not found.</p>;

  return (
    <div className="property-details" style={styles.container}>
      <img
        src={property.image_url}
        alt={property.title}
        style={styles.image}
      />
      <div style={styles.info}>
        <h2 style={styles.title}>{property.title}</h2>
        <p><strong>Location:</strong> {property.region}</p>
        <p><strong>Price:</strong> KES {property.price.toLocaleString()}</p>
        <p><strong>Rooms:</strong> {property.rooms}</p>
        <p><strong>Description:</strong> {property.description}</p>
        <p><strong>Landlord:</strong> {property.landlord_name}</p>
        <button style={styles.button}>Request Contact</button>
      </div>
    </div>
  );
}

const styles = {
  container: {
    padding: '2rem',
    display: 'flex',
    gap: '2rem',
    flexWrap: 'wrap',
    backgroundColor: '#ffffff',
    color: '#000000',
  },
  image: {
    width: '100%',
    maxWidth: '480px',
    borderRadius: '12px',
    boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
  },
  info: {
    flex: 1,
    minWidth: '300px',
  },
  title: {
    color: '#1e3a8a', // Navy Blue
    marginBottom: '1rem',
  },
  button: {
    backgroundColor: '#f97316', // Orange
    color: '#ffffff',
    padding: '0.8rem 1.5rem',
    border: 'none',
    borderRadius: '8px',
    fontWeight: 'bold',
    marginTop: '1rem',
    cursor: 'pointer',
  },
};

export default Details;
