import { useEffect, useState } from 'react';
import axios from '../axios';

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
    <div className="admin-dashboard">
      <h2>Pending Landlord Registrations</h2>
      {requests.length === 0 ? (
        <p>No pending requests</p>
      ) : (
        <ul className="request-list">
          {requests.map(req => (
            <li key={req.id}>
              <p><strong>{req.name}</strong> - {req.email} - {req.location}</p>
              <p>Status: {req.status}</p>
              {req.status === 'pending' && (
                <button onClick={() => approveRequest(req.id)}>Approve</button>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default AdminDashboard;
