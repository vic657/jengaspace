import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

function LandlordAgreement() {
  const navigate = useNavigate();
  const [accepted, setAccepted] = useState(false);
  const [formData, setFormData] = useState(null);

  useEffect(() => {
    const stored = sessionStorage.getItem('landlord_form');
    if (stored) {
      setFormData(JSON.parse(stored));
    } else {
      navigate('/register'); // go back if no form data
    }
  }, [navigate]);

  const handleAccept = () => {
    if (accepted) {
      navigate('/landlord-payment'); // next step
    } else {
      alert('You must accept the agreement to continue.');
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
          <input type="checkbox" onChange={(e) => setAccepted(e.target.checked)} />
          I accept the terms and conditions above.
        </label>

        <button onClick={handleAccept}>Proceed to Payment</button>
      </div>
    </div>
  );
}

export default LandlordAgreement;
