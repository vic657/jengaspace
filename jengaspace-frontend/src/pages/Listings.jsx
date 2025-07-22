import { useEffect, useState } from 'react';
import axios from '../axios';
import '../Listings.css';

export default function Listings() {
  const [listings, setListings] = useState([]);
  const [selected, setSelected] = useState(null);
  const [showTermsModal, setShowTermsModal] = useState(false);
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [showLoginPrompt, setShowLoginPrompt] = useState(false);
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const [registerLoading, setRegisterLoading] = useState(false);
  const [registerError, setRegisterError] = useState('');
  const [registerData, setRegisterData] = useState({
    name: '',
    email: '',
    phone: '',
    id_number: '',
    password: '',
    confirmPassword: '',
  });

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

  const handleCardClick = (listing) => {
    if (!localStorage.getItem('token')) {
      setShowLoginPrompt(true);
      return;
    }
    setSelected(listing);
  };

  const handleMakePayment = () => {
    setAcceptedTerms(false);
    setShowTermsModal(true);
  };

  const handleRegister = async () => {
    setRegisterError('');
    setRegisterLoading(true);
    const { name, email, phone, id_number, password, confirmPassword } = registerData;

    if (!name || !email || !phone || !id_number || !password || !confirmPassword) {
      setRegisterError('All fields are required');
      setRegisterLoading(false);
      return;
    }

    if (password !== confirmPassword) {
      setRegisterError("Passwords don't match");
      setRegisterLoading(false);
      return;
    }

    try {
      await axios.post('/general-user/register', {
        name,
        email,
        phone,
        id_number,
        password,
      });

      alert('Registration successful! Redirecting to login...');
      setShowRegisterModal(false);
      window.location.href = '/general-login';
    } catch (err) {
      console.error(err);
      setRegisterError(err.response?.data?.message || 'Registration failed');
    } finally {
      setRegisterLoading(false);
    }
  };

  const handleCompletePayment = async () => {
    if (acceptedTerms) {
  try {
    const token = localStorage.getItem('token');
    await axios.post('/payments', {
      listing_id: selected.id,
    }, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    alert(' Payment successful! Awaiting landlord confirmation.');
    setShowTermsModal(false);
    setSelected(null);
  } catch (error) {
    console.error('Payment failed:', error);
    alert('Payment failed. Please try again later.');
  }
    }

  };

  return (
    <div className="listings-grid">
          {listings
            .filter((listing) => !listing.hidden) // Filter out hidden listings
            .map((listing) => (
              <div
                className="listing-card"
                key={listing.id}
                onClick={() => {
                  if (listing.status === "rented") {
                    alert(
                      "This property is already rented. Please check other available listings."
                    );
                    return;
                  }
                  handleCardClick(listing);
                }}
              >
                {listing.living_room_image && (
                  <img
                    src={listing.living_room_image}
                    alt="Living Room"
                    className="main-card-image"
                  />
                )}

                <div className="listing-details">
                  <h3>{listing.category}</h3>
                  <p>
                    <strong>Location:</strong> {listing.location}
                  </p>
                  <p>
                    <strong>Rent:</strong> KES {listing.rent}
                  </p>
                  <p>
                    <strong>Status:</strong>{" "}
                    <span
                      style={{
                        color: listing.status === "rented" ? "red" : "green",
                        fontWeight: "bold",
                      }}
                    >
                      {listing.status === "rented" ? "Rented" : "Available"}
                    </span>
                  </p>

                  {listing.status === "rented" && (
                    <button className="rented-button" disabled>
                      Already Rented
                    </button>
                  )}
                </div>
              </div>
  ))}




      {/* Listing Detail Modal */}
      {selected && (
        <div className="modal-overlay" onClick={() => setSelected(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h3>{selected.category} in {selected.location}</h3>
            <div className="modal-images">
              {selected.living_room_image && (
  <div>
    <p>Living Room</p>
    <img src={selected.living_room_image} alt="Living Room" />
  </div>
)}
{selected.bedroom_image && (
  <div>
    <p>Bedroom</p>
    <img src={selected.bedroom_image} alt="Bedroom" />
  </div>
)}
{selected.kitchen_image && (
  <div>
    <p>Kitchen</p>
    <img src={selected.kitchen_image} alt="Kitchen" />
  </div>
)}
{selected.bathroom_image && (
  <div>
    <p>Bathroom</p>
    <img src={selected.bathroom_image} alt="Bathroom" />
  </div>
)}

            </div>
            <div className="modal-info">
              <p><strong>Bedrooms:</strong> {selected.bedrooms ?? 'N/A'}</p>
              <p><strong>Rent:</strong> KES {selected.rent}</p>
              <p><strong>Description:</strong> {selected.description}</p>
              <p><strong>Posted by:</strong> {selected.user?.name}</p>
            </div>
            <button className="close-btn" onClick={handleMakePayment}>Make Payment</button>
            <button className="close-btn" onClick={() => setSelected(null)}>Close</button>
          </div>
        </div>
      )}

      {/* Terms Modal */}
      {showTermsModal && selected && (
        <div className="modal-overlay" onClick={() => setShowTermsModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h3>Terms of Service</h3>
            <p>{selected.terms_of_service}</p>
            <p><strong>Contact Info:</strong> {selected.contact_info}</p>
            <p><strong>Total Payment:</strong> KES {selected.rent * 2} (Rent + Deposit)</p>

            <label>
              <input
                type="checkbox"
                checked={acceptedTerms}
                onChange={(e) => setAcceptedTerms(e.target.checked)}
              />
              I accept the terms of service
            </label>

            <button className="make-payment-btn" onClick={handleCompletePayment}>
              Complete Payment
            </button>
            <button className="close-btn" onClick={() => setShowTermsModal(false)}>Cancel</button>
          </div>
        </div>
      )}

      {/* Login Prompt Modal */}
      {showLoginPrompt && (
        <div className="modal-overlay" onClick={() => setShowLoginPrompt(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h3>Login Required</h3>
            <p>Please log in to view detailed information about the listing.</p>
            <div style={{ marginTop: '1rem' }}>
              <a href="/login" className="btn" style={{ marginRight: '10px' }}>Login</a>
              <button className="btn" onClick={() => {
                setShowLoginPrompt(false);
                setShowRegisterModal(true);
              }}>Register</button>
            </div>
          </div>
        </div>
      )}

      {/* Register Modal */}
      {showRegisterModal && (
        <div className="modal-overlay" onClick={() => setShowRegisterModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h3>User Registration</h3>
            {registerError && <p style={{ color: 'red' }}>{registerError}</p>}

            <input
              type="text"
              placeholder="Name"
              value={registerData.name}
              onChange={(e) => setRegisterData({ ...registerData, name: e.target.value })}
            />
            <input
              type="email"
              placeholder="Email"
              value={registerData.email}
              onChange={(e) => setRegisterData({ ...registerData, email: e.target.value })}
            />
            <input
              type="text"
              placeholder="Phone Number"
              value={registerData.phone}
              onChange={(e) => setRegisterData({ ...registerData, phone: e.target.value })}
            />
            <input
              type="text"
              placeholder="ID Number"
              value={registerData.id_number}
              onChange={(e) => setRegisterData({ ...registerData, id_number: e.target.value })}
            />
            <input
              type="password"
              placeholder="Password"
              value={registerData.password}
              onChange={(e) => setRegisterData({ ...registerData, password: e.target.value })}
            />
            <input
              type="password"
              placeholder="Confirm Password"
              value={registerData.confirmPassword}
              onChange={(e) => setRegisterData({ ...registerData, confirmPassword: e.target.value })}
            />

            <button className="btn" onClick={handleRegister} disabled={registerLoading}>
              {registerLoading ? 'Registering...' : 'Register'}
            </button>
            <button className="close-btn" onClick={() => setShowRegisterModal(false)}>Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
}
