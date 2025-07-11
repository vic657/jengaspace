import { useEffect, useState } from 'react';
import axios from '../axios';
import '../index.css';

export default function LandlordPayments() {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPayments = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get('/landlord/payments', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setPayments(res.data);
      } catch (error) {
        console.error('Failed to fetch payments:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPayments();
  }, []);
const handleConfirm = async (id) => {
  try {
    const token = localStorage.getItem('token');
    await axios.post(`/payments/${id}/confirm`, {}, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    alert('Payment confirmed');
    setPayments(prev => prev.map(p => p.id === id ? { ...p, status: 'confirmed' } : p));
  } catch (error) {
    console.error('Failed to confirm payment:', error);
    alert('Could not confirm payment.');
  }
};

  return (
    <div className="landlord-dashboard-page">
      <h2>Tenant Payments</h2>
      {loading ? (
        <p>Loading payments...</p>
      ) : payments.length === 0 ? (
        <p>No payments received yet.</p>
      ) : (
        <table className="payments-table">
          <thead>
            <tr>
              <th>Tenant</th>
              <th>Listing</th>
              <th>Rent</th>
              <th>Total Paid</th>
              <th>Status</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {payments.map((payment) => (
              <tr key={payment.id}>
                <td>{payment.user?.name || 'N/A'}</td>
                <td>{payment.listing?.category} – {payment.listing?.location}</td>
                <td>KES {payment.rent_amount}</td>
                <td>KES {payment.total_amount}</td>
                <td>
                    {payment.status === 'pending' ? (
                      <button
                        className="btn"
                        onClick={() => handleConfirm(payment.id)}
                      >
                        Confirm
                      </button>
                    ) : (
                      'Confirmed'
                    )}
                  </td>

                <td>{new Date(payment.created_at).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
