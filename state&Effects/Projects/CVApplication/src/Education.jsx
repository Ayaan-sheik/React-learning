import { useState } from "react";

function EducationDetails (){
    const [showForm, setShowForm] = useState(false); // form hidden initially

    const [schoolName,setSchoolName] = useState("");
    const [degree, setDegree] = useState("");
    const [firstDate, setFirstDate] = useState("");
    const [lastDate, setLastDate] = useState("");
    const [location, setLocation] = useState("");   
    return(
        <div>
            <button className="addEducation"
                onClick={() =>setShowForm(!showForm)}
            >
                {showForm ? "Hide Form" : "Show Form"}
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
                </div>
            )}
        </div>
    )
}

export default EducationDetails