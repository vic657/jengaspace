import { useEffect, useState } from 'react';
import axios from '../axios';
import '../AdminDashboard.css'; 
import Sidebar from '../components/Sidebar';



function AdminDashboard() {
  const [requests, setRequests] = useState([]);

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
      alert('Approved!');
      fetchRequests(); // refresh list
    } catch (err) {
      alert('Failed to approve');
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  return (
  <div className="admin-dashboard-container">
    <Sidebar />

    <div className="admin-dashboard">
      <h2 className="dashboard-title">Pending Landlord Registrations</h2>
      {requests.length === 0 ? (
        <p className="no-requests">No pending requests</p>
      ) : (
        <ul className="request-list">
          {requests.map((req) => (
            <li key={req.id} className="request-item">
              <div className="request-info">
                <p><strong>{req.name}</strong> ({req.email})</p>
                <p>ID: {req.id_number} | Location: {req.location}</p>
                <p>Status: <span className={`status ${req.status}`}>{req.status}</span></p>
              </div>
              {req.status === 'pending' && (
                <button className="approve-btn" onClick={() => approveRequest(req.id)}>
                  Approve
                </button>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  </div>
);
}
export default AdminDashboard;
