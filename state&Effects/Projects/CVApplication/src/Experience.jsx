import { useState } from "react";

function ExperienceDetails() {
    // Array to store multiple education entries
    const [experiences, setExperiences] = useState([]);
    // Form field states
    const [companyName, setCompanyName] = useState("");
    const [posTitle, setPosTitle] = useState("");
    const [firstDate, setFirstDate] = useState("");
    const [lastDate, setLastDate] = useState("");
    const [location, setLocation] = useState("");
    const [description,setDescription] = useState("");
    // Show/hide form
    const [showForm, setShowForm] = useState(false);

    // Reset form fields
    const resetForm = () => {
        setCompanyName("");
        setPosTitle("");
        setFirstDate("");
        setLastDate("");
        setLocation("");
        setDescription("");
    };

    // Save education entry
    const handleSave = () => {
        if (!companyName) return; // Require school name
        setEducations([
            ...experiences,
            {
                companyName,
                posTitle,
                firstDate,
                lastDate,
                location,
                description
            },
        ]);
        resetForm();
        setShowForm(false);
    };

    // Delete an entry by index
    const handleDelete = (index) => {
        setExperiences(experiences.filter((_, i) => i !== index));
    };

    return (
    <div>
      <button className="addExperience" onClick={() => setShowForm(!showForm)}>
        {showForm ? "Hide Form" : "Add Experience"}
      </button>

      {showForm && (
        <div className="form">
          <h3>Company Name</h3>
          <input
            type="text"
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
            placeholder="Enter company name"
          />

          <h3>Position Title</h3>
          <input
            type="text"
            value={posTitle}
            onChange={(e) => setPosTitle(e.target.value)}
            placeholder="Enter job title"
          />

          <h3>Start Date</h3>
          <input
            type="date"
            value={firstDate}
            onChange={(e) => setFirstDate(e.target.value)}
            placeholder="Start date"
          />

          <h3>End Date</h3>
          <input
            type="date"
            value={lastDate}
            onChange={(e) => setLastDate(e.target.value)}
            placeholder="End date"
          />

          <h3>Location</h3>
          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="Enter location"
          />

          <h3>Description</h3>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Describe your work"
          />

          <div style={{ marginTop: "10px" }}>
            <button onClick={handleSave}>Save</button>
            <button
              onClick={() => {
                resetForm();
                setShowForm(false);
              }}
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* List of saved experience entries */}
      <ul style={{ marginTop: "20px" }}>
        {experiences.map((exp, idx) => (
          <li
            key={idx}
            style={{ display: "flex", alignItems: "center", gap: "8px" }}
          >
            <span>
              {exp.companyName} — {exp.posTitle}
            </span>
            <button onClick={() => handleDelete(idx)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ExperienceDetails;