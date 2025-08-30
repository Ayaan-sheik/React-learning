import { useState } from "react";
import PersonalDetail from "./PersonalDetail";
import Education from "./Education";
import Experience from "./Experience";
import Resume from "./Resume";
import "./App.css";

function App() {
  // centralised state to hold all CV data
  const [personal, setPersonal] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  });

  const [education, setEducation] = useState([]);
  const [experience, setExperience] = useState([]);

  return (
    <div className="app-container">
      {/* LEFT SIDE - Input Forms */}
      <div className="left-panel">
        <h1 className="app-title">CV Builder</h1>
        <PersonalDetail personal={personal} setPersonal={setPersonal} />
        <Education education={education} setEducation={setEducation} />
        <Experience experience={experience} setExperience={setExperience} />
      </div>

      {/* RIGHT SIDE - Resume Display */}
      <div className="right-panel">
        <Resume personal={personal} education={education} experience={experience} />
      </div>
    </div>
  );
}

export default App;