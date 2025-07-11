import { useEffect, useState } from 'react';
import axios from '../axios';
import '../index.css';

export default function UserDashboard() {
  const [payments, setPayments] = useState([]);

  useEffect(() => {
    const fetchPayments = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get('/my-payments', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setPayments(res.data);
      } catch (err) {
        console.error('Error fetching payments:', err);
      }
    };

    fetchPayments();
  }, []);

  return (
    <div className="user-dashboard">
      <h2>My Payments</h2>
      {payments.length === 0 ? (
        <p>No payments found.</p>
      ) : (
        <table className="payments-table">
          <thead>
            <tr>
              <th>Listing</th>
              <th>Location</th>
              <th>Rent</th>
              <th>Total Paid</th>
              <th>Status</th>
              <th>Date</th>
              <th>Receipt</th>
            </tr>
          </thead>
          <tbody>
            {payments.map((payment) => (
              <tr key={payment.id}>
                <td>{payment.listing?.category}</td>
                <td>{payment.listing?.location}</td>
                <td>KES {payment.rent_amount}</td>
                <td>KES {payment.total_amount}</td>
                <td>{payment.status}</td>
                <td>{new Date(payment.created_at).toLocaleDateString()}</td>
                <td>
                  {payment.status === 'confirmed' && payment.receipt_path ? (
                    <a
                      href={`http://localhost:8000/${payment.receipt_path}`}
                      target="_blank"
                      className="btn"
                    >
                      Download
                    </a>
                  ) : (
                    '—'
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
