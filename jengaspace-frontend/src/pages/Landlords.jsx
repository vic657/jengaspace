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
      fetchLandlords();
    } catch {
      alert('Failed to approve');
    }
  };

  useEffect(() => {
    fetchLandlords();
  }, []);

  const filteredApproved = approved.filter((l) =>
    l.name.toLowerCase().includes(searchApproved.toLowerCase())
  );

  const filteredPending = pending.filter((l) =>
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

      {filteredApproved.map((landlord) => {
        const rentedTotal = landlord.properties
          .filter((p) => p.status === 'rented')
          .reduce((sum, p) => sum + Number(p.rent), 0);

        return (
          <div key={landlord.id} style={{ marginBottom: '30px' }}>
            <h3>{landlord.name} - {landlord.email}</h3>
            <table border="1" cellPadding="10" style={{ borderCollapse: 'collapse', width: '100%' }}>
              <thead>
                <tr style={{ backgroundColor: '#f2f2f2' }}>
                  <th>Category</th>
                  <th>Location</th>
                  <th>Rent (Ksh)</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {landlord.properties.map((p) => (
                  <tr key={p.id}>
                    <td>{p.category}</td>
                    <td>{p.location}</td>
                    <td>{p.rent}</td>
                    <td style={{ color: p.status === 'rented' ? 'red' : 'green', fontWeight: 'bold' }}>
                      {p.status === 'rented' ? 'Rented' : 'Available'}
                    </td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr>
                  <td colSpan="4" style={{ textAlign: 'right', fontWeight: 'bold' }}>
                    Total Rented Amount: Ksh {rentedTotal.toLocaleString()}
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>
        );
      })}

      <h2>Pending Landlords</h2>
      <input
        type="text"
        placeholder="Search pending landlords..."
        value={searchPending}
        onChange={(e) => setSearchPending(e.target.value)}
      />
      <ul className="request-list">
        {filteredPending.map((l) => (
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
