const StatisticLine = ({ text, value }) => {
  return (
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
  );
};

const Statistics = ({ good, neutral, bad }) => {
  const total = good + neutral + bad;
  const avg = (good / total) * 100;

  return (
    <>
      <h1>statistics</h1>
      <table>
        <tbody>
          <StatisticLine text="good" value={good} />
          <StatisticLine text="neutral" value={neutral} />
          <StatisticLine text="bad" value={bad} />
          <StatisticLine text="all" value={good + neutral + bad} />
          <StatisticLine text="good" value={good} />
          <StatisticLine text="average" value={total / 3} />
          <StatisticLine text="positive" value={`${avg ? avg : 0}%`} />
        </tbody>
      </table>
    </>
  );
};

export default Statistics;
