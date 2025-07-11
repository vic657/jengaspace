import { useEffect, useState } from 'react';
import axios from '../axios';

export default function MyPayments() {
  const [payments, setPayments] = useState([]);

  useEffect(() => {
    const fetchPayments = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get('/my-payments', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setPayments(res.data);
      } catch (err) {
        console.error('Failed to load payments:', err);
      }
    };

    fetchPayments();
  }, []);

  return (
    <div className="my-payments-page">
      <h2>My Payments</h2>
      <table className="payments-table">
        <thead>
          <tr>
            <th>Property</th>
            <th>Location</th>
            <th>Amount Paid</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {payments.map((payment) => (
            <tr key={payment.id}>
              <td>{payment.listing?.category}</td>
              <td>{payment.listing?.location}</td>
              <td>KES {payment.total_amount}</td>
              <td>
                {payment.status === 'pending' ? (
                  <span className="badge pending">Awaiting landlord confirmation</span>
                ) : (
                  <span className="badge confirmed">Confirmed</span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
