import { useState } from "react";
import Statistics from "./Statistics";

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const handleGoodStats = () => {
    setGood(good + 1);
  };

  const handleNeutralStats = () => {
    setNeutral(neutral + 1);
  };

  const handleBadStats = () => {
    setBad(bad + 1);
  };

  return (
    <div>
      <h1>give feedback</h1>
      <div>
        <button onClick={handleGoodStats}>good</button>
        <button onClick={handleNeutralStats}>neutral</button>
        <button onClick={handleBadStats}>bad</button>
      </div>
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  );
};

export default App;
