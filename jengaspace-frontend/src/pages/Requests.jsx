// src/pages/Requests.jsx
import { useEffect, useState } from 'react';
import axios from '../axios';
import '../Sidebar.css';

export default function Requests() {
  const [requests, setRequests] = useState([]);
  const [activeTab, setActiveTab] = useState('pending');

  const fetchRequests = async () => {
    try {
      const res = await axios.get('/admin/landlord-requests');
      setRequests(res.data);
    } catch (err) {
      console.error('Failed to fetch requests:', err);
    }
  };

  const approveRequest = async (id) => {
    try {
      await axios.post(`/admin/approve-request/${id}`);
      alert('Request approved!');
      fetchRequests(); // Refresh
    } catch (err) {
      alert('Failed to approve request');
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  const filtered = requests.filter(req => req.status === activeTab);

  return (
    <div className="admin-dashboard">
      <h2 className="dashboard-title">Landlord Requests</h2>

      <div className="tab-buttons">
        <button className={activeTab === 'pending' ? 'active' : ''} onClick={() => setActiveTab('pending')}>
          Pending
        </button>
        <button className={activeTab === 'approved' ? 'active' : ''} onClick={() => setActiveTab('approved')}>
          Approved
        </button>
      </div>

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
