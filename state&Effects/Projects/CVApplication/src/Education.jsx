import { useState } from "react";

function EducationDetails() {
    // Array to store multiple education entries
    const [educations, setEducations] = useState([]);
    // Form field states
    const [schoolName, setSchoolName] = useState("");
    const [degree, setDegree] = useState("");
    const [firstDate, setFirstDate] = useState("");
    const [lastDate, setLastDate] = useState("");
    const [location, setLocation] = useState("");
    // Show/hide form
    const [showForm, setShowForm] = useState(false);

    // Reset form fields
    const resetForm = () => {
        setSchoolName("");
        setDegree("");
        setFirstDate("");
        setLastDate("");
        setLocation("");
    };

    // Save education entry
    const handleSave = () => {
        if (!schoolName) return; // Require school name
        setEducations([
            ...educations,
            {
                schoolName,
                degree,
                firstDate,
                lastDate,
                location,
            },
        ]);
        resetForm();
        setShowForm(false);
    };

    // Delete an entry by index
    const handleDelete = (index) => {
        setEducations(educations.filter((_, i) => i !== index));
    };

    return (
        <div>
            <button className="addEducation" onClick={() => setShowForm(true)}>
                {showForm ? "Add Education" : "Add Education"}
            </button>

            {showForm && (
                <div className="form">
                    <h3>School</h3>
                    <input
                        type="text"
                        value={schoolName}
                        onChange={(e) => setSchoolName(e.target.value)}
                        placeholder="Enter school/university"
                    />

                    <h3>Degree</h3>
                    <input
                        type="text"
                        value={degree}
                        onChange={(e) => setDegree(e.target.value)}
                        placeholder="Enter degree"
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

                    <div style={{ marginTop: "10px" }}>
                        <button onClick={handleSave}>Save</button>
                        <button onClick={() => { resetForm(); setShowForm(false); }}>Delete</button>
                    </div>
                </div>
            )}

            {/* List of saved education entries, showing only the school name, with delete button */}
            <ul style={{ marginTop: "20px" }}>
                {educations.map((edu, idx) => (
                    <li key={idx} style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                        <span>{edu.schoolName}</span>
                        <button onClick={() => handleDelete(idx)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default EducationDetails;