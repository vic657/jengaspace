import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../axios';

function LandlordPayment() {
  const navigate = useNavigate();
  const [processing, setProcessing] = useState(false);
  const [formData, setFormData] = useState(null);

  useEffect(() => {
    const stored = sessionStorage.getItem('landlord_form');
    if (stored) {
      setFormData(JSON.parse(stored));
    } else {
      navigate('/register'); // no form data, go back
    }
  }, [navigate]);

  const handlePayment = async () => {
    if (!formData) return;

    setProcessing(true);

    try {
      const res = await axios.post('/landlord/register', formData);
      alert('Payment received. Await admin approval.');
      navigate('/landlord-dashboard');
    } catch (err) {
      alert('Failed to submit registration. Please try again.');
    } finally {
      setProcessing(false);
    }
  };

  return (
    <div className="payment-wrapper">
      <div className="payment-box">
        <h2>Payment Simulation</h2>
        <p>Pay a one-time fee of <strong>KES 500</strong> to register as a landlord on JengaSpace.</p>
        <p>This is a simulation. Click "Confirm Payment" to proceed.</p>
        <button onClick={handlePayment} disabled={processing}>
          {processing ? 'Processing...' : 'Confirm Payment'}
        </button>
      </div>
    </div>
  );
}

export default LandlordPayment;
