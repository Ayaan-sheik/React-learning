import { useEffect } from "react";


function PersonalDetail({ personal, setPersonal }) {
  // Update personal data when form changes
  const handleChange = (field, value) => {
    setPersonal(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <div className="form-section">
      <h2 className="section-title">Personal Details</h2>
      
      <div className="form-group">
        <label>Full Name</label>
        <input
          type="text"
          value={personal.name}
          onChange={(e) => handleChange('name', e.target.value)}
          placeholder="Enter your full name"
          className="form-input"
        />
      </div>

      <div className="form-group">
        <label>Email</label>
        <input
          type="email"
          value={personal.email}
          onChange={(e) => handleChange('email', e.target.value)}
          placeholder="Enter your email"
          className="form-input"
        />
      </div>

      <div className="form-group">
        <label>Phone</label>
        <input
          type="text"
          value={personal.phone}
          onChange={(e) => handleChange('phone', e.target.value)}
          placeholder="Enter your phone number"
          className="form-input"
        />
      </div>

      <div className="form-group">
        <label>Address</label>
        <input
          type="text"
          value={personal.address}
          onChange={(e) => handleChange('address', e.target.value)}
          placeholder="Enter your address"
          className="form-input"
        />
      </div>
    </div>
  );
}

export default PersonalDetail;