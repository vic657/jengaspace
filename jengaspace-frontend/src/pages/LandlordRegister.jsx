import { useState } from 'react';
import axios from '../axios';
import { useNavigate } from 'react-router-dom';

function LandlordRegister() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    id_number: '',
    location: '',
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Store form data in session to use in the next step
    sessionStorage.setItem('landlord_form', JSON.stringify(formData));
    navigate('/landlord-agreement');
  };

  return (
    <div className="form-wrapper">
      <form onSubmit={handleSubmit} className="form">
        <h2>Landlord Registration</h2>

        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email Address"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="id_number"
          placeholder="National ID Number"
          value={formData.id_number}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="location"
          placeholder="Location"
          value={formData.location}
          onChange={handleChange}
          required
        />
        <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
            />



        <button type="submit">Next</button>
      </form>
    </div>
  );
}

export default LandlordRegister;
