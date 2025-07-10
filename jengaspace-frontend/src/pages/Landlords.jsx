import { useEffect, useState } from 'react';
import axios from '../axios';
import '../Sidebar.css';

export default function Landlords() {
  const [approved, setApproved] = useState([]);
  const [pending, setPending] = useState([]);
  const [searchApproved, setSearchApproved] = useState('');
  const [searchPending, setSearchPending] = useState('');

  const fetchLandlords = async () => {
    try {
      const res = await axios.get('/admin/landlords');
      setApproved(res.data.approved);
      setPending(res.data.pending);
    } catch (err) {
      console.error('Failed to fetch landlords:', err);
    }
  };

  const approveLandlord = async (id) => {
    try {
      await axios.post(`/admin/approve-request/${id}`);
      fetchLandlords(); // Refresh list
    } catch {
      alert('Failed to approve');
    }
  };

  useEffect(() => {
    fetchLandlords();
  }, []);

  const filteredApproved = approved.filter(l =>
    l.name.toLowerCase().includes(searchApproved.toLowerCase())
  );

  const filteredPending = pending.filter(l =>
    l.name.toLowerCase().includes(searchPending.toLowerCase())
  );

  return (
    <div className="admin-dashboard">
      <h2>Approved Landlords</h2>
      <input
        type="text"
        placeholder="Search approved landlords..."
        value={searchApproved}
        onChange={(e) => setSearchApproved(e.target.value)}
      />
      <ul className="request-list">
        {filteredApproved.map(l => (
          <li key={l.id} className="request-item">
            <strong>{l.name}</strong> - {l.email}
            <p>Properties:</p>
            <ul>
              {l.properties.map(p => (
                <li key={p.id}>
                  {p.category} - {p.location} - Ksh {p.rent}
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>

      <h2>Pending Landlords</h2>
      <input
        type="text"
        placeholder="Search pending landlords..."
        value={searchPending}
        onChange={(e) => setSearchPending(e.target.value)}
      />
      <ul className="request-list">
        {filteredPending.map(l => (
          <li key={l.id} className="request-item">
            <strong>{l.name}</strong> - {l.email}
            <p>ID: {l.id_number} | Location: {l.location}</p>
            <button onClick={() => approveLandlord(l.id)}>Approve</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
