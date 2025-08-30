import { useState } from "react";

function Experience({ experience, setExperience }) {
  // Form field states
  const [companyName, setCompanyName] = useState("");
  const [posTitle, setPosTitle] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  // Show/hide form
  const [showForm, setShowForm] = useState(false);

  // Reset form fields
  const resetForm = () => {
    setCompanyName("");
    setPosTitle("");
    setStartDate("");
    setEndDate("");
    setLocation("");
    setDescription("");
  };

  // Save experience entry
  const handleSave = () => {
    if (!companyName || !posTitle) return; // Require company name and position
    
    const newExperience = {
      companyName,
      posTitle,
      startDate,
      endDate,
      location,
      description
    };
    
    setExperience(prev => [...prev, newExperience]);
    resetForm();
    setShowForm(false);
  };

  // Delete an entry by index
  const handleDelete = (index) => {
    setExperience(prev => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="form-section">
      <h2 className="section-title">Experience</h2>
      
      <button 
        className={`add-button ${showForm ? 'active' : ''}`}
        onClick={() => setShowForm(!showForm)}
      >
        {showForm ? "Cancel" : "Add Experience"}
      </button>

      {showForm && (
        <div className="form-container">
          <div className="form-group">
            <label>Company Name *</label>
            <input
              type="text"
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
              placeholder="Enter company name"
              className="form-input"
            />
          </div>

          <div className="form-group">
            <label>Position Title *</label>
            <input
              type="text"
              value={posTitle}
              onChange={(e) => setPosTitle(e.target.value)}
              placeholder="Enter job title"
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

          <div className="form-group">
            <label>Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe your work experience and achievements"
              className="form-textarea"
              rows="4"
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

      {/* List of saved experience entries */}
      {experience.length > 0 && (
        <div className="entries-list">
          {experience.map((exp, idx) => (
            <div key={idx} className="entry-item">
              <div className="entry-info">
                <strong>{exp.posTitle}</strong>
                <span>{exp.companyName}</span>
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

export default Experience;