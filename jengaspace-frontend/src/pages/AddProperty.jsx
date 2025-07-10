import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function AddPropertyForm() {
  const [form, setForm] = useState({
    category: '',
    bedrooms: '',
    location: '',
    rent: '',
    description: '',
    living_room_image: null,
    kitchen_image: null,
    bathroom_image: null,
    bedroom_image: null,
    terms_of_service: '',    
    contact_info: '',  
  });

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      setForm((prev) => ({ ...prev, [name]: files[0] }));
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const data = new FormData();
    data.append('category', form.category);
    data.append('location', form.location);
    data.append('rent', form.rent);
    data.append('description', form.description);
    if (form.category !== 'bedsitter') {
      data.append('bedrooms', form.bedrooms);
      data.append('bedroom', form.bedroom_image);
    }

    data.append('livingRoom', form.living_room_image);
    data.append('kitchen', form.kitchen_image);
    data.append('bathroom', form.bathroom_image);
    data.append('terms_of_service', form.terms_of_service); 
    data.append('contact_info', form.contact_info);         


    try {
      await axios.post('/properties', data, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'multipart/form-data',
        },
      });

      toast.success('Property added successfully! Redirecting...', {
        position: 'top-right',
        autoClose: 2000,
      });

      setTimeout(() => navigate('/landlord-dashboard'), 2000);
    } catch (err) {
      console.error(err);
      toast.error('Failed to submit property.', {
        position: 'top-right',
        autoClose: 3000,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
    <button className="back-button" onClick={() => window.history.back()}>
  ← Back
</button>
      <ToastContainer />
      
      <div className="form-wrapper">
        

        <form onSubmit={handleSubmit} className="form add-property-form">
          <h2 style={{ color: '#fffdf9' }}>Add Property</h2>

          <label>Category</label>
          <select name="category" value={form.category} onChange={handleChange} required>
            <option value="">-- Select --</option>
            <option value="bedsitter">Bedsitter</option>
            <option value="one-bedroom">One Bedroom</option>
            <option value="two-bedroom">Two Bedroom</option>
            <option value="own-compound">Own Compound</option>
          </select>

          {form.category !== 'bedsitter' && (
            <>
              <label>Number of Bedrooms</label>
              <input
                type="number"
                name="bedrooms"
                value={form.bedrooms}
                onChange={handleChange}
                placeholder=""
                required
              />
            </>
          )}

          <label>Location</label>
          <input
            type="text"
            name="location"
            value={form.location}
            onChange={handleChange}
            placeholder="location"
            required
          />

          <label>Rent (KES)</label>
          <input
            type="number"
            name="rent"
            value={form.rent}
            onChange={handleChange}
            placeholder="ksh/m"
            required
          />

          <label>Description</label>
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            placeholder="landmarks"
            rows={3}
          />
          <textarea
            value={form.terms_of_service}
            onChange={(e) => setForm({ ...form, terms_of_service: e.target.value })}
            placeholder="Enter terms of service"
            required
          />

          <input
            type="text"
            value={form.contact_info}
            onChange={(e) => setForm({ ...form, contact_info: e.target.value })}
            placeholder="Enter contact information"
            required
          />


          <label>Living Room Image</label>
          <input type="file" name="living_room_image" accept="image/*" onChange={handleChange} required />

          <label>Kitchen Image</label>
          <input type="file" name="kitchen_image" accept="image/*" onChange={handleChange} required />

          <label>Bathroom Image</label>
          <input type="file" name="bathroom_image" accept="image/*" onChange={handleChange} required />

          {form.category !== 'bedsitter' && (
            <>
              <label>Bedroom Image</label>
              <input type="file" name="bedroom_image" accept="image/*" onChange={handleChange} required />
            </>
          )}

          <button type="submit" style={{ backgroundColor: '#0984e3' }} disabled={loading}>
            {loading ? 'Submitting...' : 'Submit'}
          </button>
        </form>
      </div>
    </>
  );
}

export default AddPropertyForm;
