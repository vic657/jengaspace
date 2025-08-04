import { useEffect, useState } from 'react';
import axios from '../axios';
import '../Sidebar.css';

export default function Requests() {
  const [requests, setRequests] = useState([]);
  const [activeTab, setActiveTab] = useState('pending');
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    fetchRequests();
  }, []);

  const fetchRequests = async () => {
    try {
      const res = await axios.get('/admin/landlord-requests');
      setRequests(res.data);
    } catch (err) {
      setErrorMessage('Failed to load landlord requests.');
    }
  };

  const approveRequest = async (id) => {
    try {
      await axios.post(`/admin/approve-request/${id}`);
      setSuccessMessage('Request approved successfully.');
      fetchRequests();
    } catch (err) {
      setErrorMessage('Failed to approve request.');
    }
  };

  // Auto-dismiss messages
  useEffect(() => {
    if (successMessage || errorMessage) {
      const timer = setTimeout(() => {
        setSuccessMessage('');
        setErrorMessage('');
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [successMessage, errorMessage]);

  const filtered = requests.filter(req => req.status === activeTab);

  return (
    <div className="admin-dashboard">
      <h2 className="dashboard-title">Landlord Requests</h2>

      <div className="tab-buttons">
        <button
          className={activeTab === 'pending' ? 'active' : ''}
          onClick={() => setActiveTab('pending')}
        >
          Pending
        </button>
        <button
          className={activeTab === 'approved' ? 'active' : ''}
          onClick={() => setActiveTab('approved')}
        >
          Approved
        </button>
      </div>

      {/* Success/Error Message Display */}
      {successMessage && <div className="msg success-msg">{successMessage}</div>}
      {errorMessage && <div className="msg error-msg">{errorMessage}</div>}

      {filtered.length === 0 ? (
        <p className="no-requests">No {activeTab} requests</p>
      ) : (
        <ul className="request-list">
          {filtered.map((req) => (
            <li key={req.id} className="request-item">
              <div className="request-info">
                <p><strong>{req.name}</strong> ({req.email})</p>
                <p>ID: {req.id_number} | Location: {req.location}</p>
                <p>Status: <span className={`status ${req.status}`}>{req.status}</span></p>
              </div>
              {activeTab === 'pending' && (
                <button className="approve-btn" onClick={() => approveRequest(req.id)}>
                  Approve
                </button>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
