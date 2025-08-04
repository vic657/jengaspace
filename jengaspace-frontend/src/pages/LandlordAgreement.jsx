import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from '../axios';
import '../index.css';

function LandlordAgreement() {
  const navigate = useNavigate();
  const [accepted, setAccepted] = useState(false);
  const [formData, setFormData] = useState(null);
  const [registrationFee, setRegistrationFee] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    const stored = sessionStorage.getItem('landlord_form');

    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        if (parsed && parsed.password) {
          setFormData(parsed);
        } else {
          setErrorMessage('Incomplete registration data. Please register again.');
          sessionStorage.removeItem('landlord_form');
          setTimeout(() => navigate('/register'), 2500);
        }
      } catch (err) {
        console.error('Invalid JSON in landlord_form');
        sessionStorage.removeItem('landlord_form');
        navigate('/register');
      }
    } else {
      navigate('/register');
    }
  }, [navigate]);

  const handleAccept = async () => {
    setErrorMessage('');
    setSuccessMessage('');

    // Validate terms and payment
    if (!accepted) {
      setErrorMessage('You must accept the agreement to continue.');
      return;
    }

    if (!registrationFee || Number(registrationFee) !== 10000) {
      setErrorMessage('Please pay the full registration fee of KES 10,000 to continue.');
      return;
    }

    if (!formData || !formData.password) {
      setErrorMessage('Missing registration information. Please start over.');
      sessionStorage.removeItem('landlord_form');
      navigate('/register');
      return;
    }

    setLoading(true);

    try {
      const dataToSend = {
        ...formData,
        registration_fee: registrationFee,
      };

      const response = await axios.post('/landlord/register', dataToSend);

      setSuccessMessage('Registration successful. Redirecting...');
      setTimeout(() => {
        navigate('/landlord-dashboard');
      }, 2000);
    } catch (error) {
      if (error.response) {
        const res = error.response;
        if (res.status === 422 && res.data?.errors) {
          const firstError = Object.values(res.data.errors)[0][0];
          setErrorMessage(firstError);
        } else if (res.data?.message) {
          setErrorMessage(res.data.message);
        } else {
          setErrorMessage('Registration failed. Please try again.');
        }
      } else {
        setErrorMessage('Network error. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="agreement-wrapper">
      <div className="agreement-box">
        <h2>User Agreement</h2>
        <div className="agreement-text">
          <p>
            By registering as a landlord on JengaSpace, you agree to provide accurate
            information, follow all local laws and housing regulations, and ensure that
            properties listed are safe and habitable. Payments are non-refundable once
            approved. Violations may lead to account suspension.
          </p>
        </div>

        <label className="checkbox">
          <input
            type="checkbox"
            checked={accepted}
            onChange={(e) => setAccepted(e.target.checked)}
          />
          I accept the terms and conditions above.
        </label>

        <label className="fee-input">
          Registration Fee (KES)
          <input
            type="number"
            value={registrationFee}
            onChange={(e) => setRegistrationFee(e.target.value)}
            placeholder="Enter 10000"
          />
        </label>

        {/* Error / Success Messages */}
        {errorMessage && <div className="error-message">{errorMessage}</div>}
        {successMessage && <div className="success-message">{successMessage}</div>}

        <button onClick={handleAccept} disabled={loading}>
          {loading ? 'Registering...' : 'Proceed to Payment'}
        </button>
      </div>
    </div>
  );
}

export default LandlordAgreement;
