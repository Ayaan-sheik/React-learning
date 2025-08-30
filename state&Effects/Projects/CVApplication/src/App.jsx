import { useState } from "react";
import PersonalDetail from "./PersonalDetail";
import Education from "./Education";
import Experience from "./Experience";
import Resume from "./Resume";

function App() {
  // centralised state to hold all CV data
  const [personal, setPersonal] = useState({
    name: "",
    email: "",
    phone: "",
  });

  const [education, setEducation] = useState([]);
  const [experience, setExperience] = useState([]);

  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      {/* LEFT SIDE - Input Forms */}
      <div style={{ width: "40%", padding: "1rem", borderRight: "1px solid #ccc" }}>
        <h2>CV Builder</h2>
        <PersonalDetail personal={personal} setPersonal={setPersonal} />
        <Education education={education} setEducation={setEducation} />
        <Experience experience={experience} setExperience={setExperience} />
      </div>

      {/* RIGHT SIDE - Resume Display */}
      <div style={{ flex: 1, padding: "1rem" }}>
        <Resume personal={personal} education={education} experience={experience} />
      </div>
    </div>
  );
}

export default App;
