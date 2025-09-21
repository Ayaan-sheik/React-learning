import { useEffect, useState } from "react";

/* ---------------- WATERFALL VERSION ---------------- */
const BioWaterfall = () => {
  const [bioText, setBioText] = useState(null);

  useEffect(() => {
    console.log("Fetching bio (waterfall)...");
    setTimeout(() => {
      setBioText("This is the bio text (waterfall).");
    }, 1000); // fake 1s delay
  }, []);

  if (!bioText) return <p>Loading Bio...</p>;
  return <p>{bioText}</p>;
};

const ProfileWaterfall = () => {
  const [imageURL, setImageURL] = useState(null);

  useEffect(() => {
    console.log("Fetching profile image (waterfall)...");
    setTimeout(() => {
      setImageURL("https://via.placeholder.com/150");
    }, 1000); // fake 1s delay
  }, []);

  if (!imageURL) return <p>Loading Profile...</p>;

  return (
    <div style={{ border: "2px solid red", padding: "1rem", margin: "1rem" }}>
      <h2>Waterfall Example</h2>
      <img src={imageURL} alt="profile" />
      {/* Bio only renders AFTER imageURL is ready */}
      <BioWaterfall />
    </div>
  );
};

/* ---------------- PARALLEL VERSION ---------------- */
const BioParallel = ({ bioText }) => {
  if (!bioText) return <p>Loading Bio...</p>;
  return <p>{bioText}</p>;
};

const ProfileParallel = () => {
  const [imageURL, setImageURL] = useState(null);
  const [bioText, setBioText] = useState(null);

  useEffect(() => {
    console.log("Fetching profile image (parallel)...");
    setTimeout(() => {
      setImageURL("https://via.placeholder.com/150");
    }, 1000); // fake 1s delay

    console.log("Fetching bio (parallel)...");
    setTimeout(() => {
      setBioText("This is the bio text (parallel).");
    }, 1000); // fake 1s delay
  }, []);

  if (!imageURL) return <p>Loading Profile...</p>;

  return (
    <div style={{ border: "2px solid green", padding: "1rem", margin: "1rem" }}>
      <h2>Parallel Example</h2>
      <img src={imageURL} alt="profile" />
      {/* Bio renders immediately, and updates when bioText is ready */}
      <BioParallel bioText={bioText} />
    </div>
  );
};

/* ---------------- APP ---------------- */
function App() {
  return (
    <div style={{ fontFamily: "sans-serif" }}>
      <h1>React Fetching Example</h1>
      <ProfileWaterfall />
      <ProfileParallel />
    </div>
  );
}

export default App;
