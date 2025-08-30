import { useState } from "react";

function Education({ education, setEducation }) {
  // Form field states
  const [schoolName, setSchoolName] = useState("");
  const [degree, setDegree] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [location, setLocation] = useState("");
  // Show/hide form
  const [showForm, setShowForm] = useState(false);

  // Reset form fields
  const resetForm = () => {
    setSchoolName("");
    setDegree("");
    setStartDate("");
    setEndDate("");
    setLocation("");
  };

  // Save education entry
  const handleSave = () => {
    if (!schoolName || !degree) return; // Require school name and degree
    
    const newEducation = {
      schoolName,
      degree,
      startDate,
      endDate,
      location,
    };
    
    setEducation(prev => [...prev, newEducation]);
    resetForm();
    setShowForm(false);
  };

  // Delete an entry by index
  const handleDelete = (index) => {
    setEducation(prev => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="form-section">
      <h2 className="section-title">Education</h2>
      
      <button 
        className={`add-button ${showForm ? 'active' : ''}`}
        onClick={() => setShowForm(!showForm)}
      >
        {showForm ? "Cancel" : "Add Education"}
      </button>

      {showForm && (
        <div className="form-container">
          <div className="form-group">
            <label>School/University *</label>
            <input
              type="text"
              value={schoolName}
              onChange={(e) => setSchoolName(e.target.value)}
              placeholder="Enter school/university"
              className="form-input"
            />
          </div>

          <div className="form-group">
            <label>Degree *</label>
            <input
              type="text"
              value={degree}
              onChange={(e) => setDegree(e.target.value)}
              placeholder="Enter degree"
              className="form-input"
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Start Date</label>
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="form-input"
              />
            </div>

            <div className="form-group">
              <label>End Date</label>
              <input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="form-input"
              />
            </div>
          </div>

          <div className="form-group">
            <label>Location</label>
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="Enter location"
              className="form-input"
            />
          </div>

          <div className="button-group">
            <button onClick={handleSave} className="save-button">Save</button>
            <button onClick={() => { resetForm(); setShowForm(false); }} className="cancel-button">
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* List of saved education entries */}
      {education.length > 0 && (
        <div className="entries-list">
          {education.map((edu, idx) => (
            <div key={idx} className="entry-item">
              <div className="entry-info">
                <strong>{edu.degree}</strong>
                <span>{edu.schoolName}</span>
              </div>
              <button onClick={() => handleDelete(idx)} className="delete-button">
                Delete
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Education;