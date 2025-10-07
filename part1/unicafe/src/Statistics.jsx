const Statistics = ({good, neutral, bad}) => {
   const total = good + neutral + bad
   const avg = (good / total) * 100
    
  return (
    <>
      <h1>statistics</h1>
      <p>good {good}</p>
      <p>neutral {neutral}</p>
      <p>bad {bad}</p>
      <p>all {good + neutral + bad}</p>
      <p>average {total / 3}</p>
      <p>positive {avg ? avg: 0}%</p>
    </>
  );
};

export default Statistics;