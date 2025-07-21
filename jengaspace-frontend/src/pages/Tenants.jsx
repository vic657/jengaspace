import { useEffect, useState } from 'react';
import axios from '../axios';
import '../Sidebar.css';

export default function Tenants() {
  const [tenants, setTenants] = useState([]);

  useEffect(() => {
    const fetchTenants = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get('/admin/tenants', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setTenants(res.data);
      } catch (err) {
        console.error('Error fetching tenants:', err);
      }
    };

    fetchTenants();
  }, []);

  return (
    <div className="admin-dashboard">
      <h2>Confirmed Tenants</h2>
      {tenants.length === 0 ? (
        <p>No tenants found.</p>
      ) : (
        <table className="tenant-table" style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr style={{ background: '#f0f0f0' }}>
            <th style={thStyle}>#</th>
            <th style={thStyle}>Tenant Name</th>
            <th style={thStyle}>Email</th>
            <th style={thStyle}>Phone</th>
            <th style={thStyle}>ID Number</th>
            <th style={thStyle}>Property</th>
            <th style={thStyle}>Location</th>
            <th style={thStyle}>Rent</th>
            <th style={thStyle}>Amount Paid</th>
            <th style={thStyle}>Landlord Name</th>
            <th style={thStyle}>Landlord Email</th>
          </tr>
        </thead>
        <tbody>
          {tenants.map((tenant, index) => (
            <tr key={tenant.payment_id || `${tenant.id}-${index}`}>
              <td style={tdStyle}>{index + 1}</td>
              <td style={tdStyle}>{tenant.name}</td>
              <td style={tdStyle}>{tenant.email}</td>
              <td style={tdStyle}>{tenant.phone}</td>
              <td style={tdStyle}>{tenant.id_number}</td>
              <td style={tdStyle}>{tenant.property?.category}</td>
              <td style={tdStyle}>{tenant.property?.location}</td>
              <td style={{ ...tdStyle, color: 'green' }}>
                KES {tenant.property?.rent?.toLocaleString()}
              </td>
              <td style={{ ...tdStyle, fontWeight: 'bold' }}>
                KES {(tenant.property?.rent * 2)?.toLocaleString()}
              </td>
              <td style={tdStyle}>{tenant.property?.user?.name || 'N/A'}</td>
              <td style={tdStyle}>{tenant.property?.user?.email || 'N/A'}</td>
            </tr>
          ))}
        </tbody>
      </table>
      )}
    </div>
  );
}

const thStyle = {
  padding: '10px',
  border: '1px solid #ddd',
  textAlign: 'left',
};

const tdStyle = {
  padding: '8px',
  border: '1px solid #ddd',
};
