import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Mood = () => {
  const [mood, setMood] = useState("");
  const navigate = useNavigate();
  return (
    <div>
      <h1>How are you feeling today?</h1>
      <div>
        <button onClick={() => setMood("happy")}>Happy</button>
        <button onClick={() => setMood("sad")}>Sad</button>
        <button onClick={() => setMood("angry")}>Angry</button>
      </div>
      {mood && (
        <p>You selected: {mood}</p>
      )}
    </div>
  );
};

export default Mood;