import React, { useState } from "react";
import "./App.css";

const COLORS = ["pink", "green", "blue", "yellow", "purple"];

function App() {
  const [backgroundColor, setBackgroundColor] = useState(COLORS[0]);
  const [count,setCount] = useState(0)

  const onButtonClick = (color) => () => {
    setBackgroundColor(color);
    setCount(count => count +1)
  };

  return (
    <div
      className="App"
      style={{
        backgroundColor,
      }}
    > 
      <div className="count">
        count : {count}
      </div>
      {COLORS.map((color) => (
        <button
          type="button"
          key={color}
          onClick={onButtonClick(color)}
          className={backgroundColor === color ? "selected" : ""}
        >
          {color}
        </button>
      ))}
    </div>
  );
}

export default App;
