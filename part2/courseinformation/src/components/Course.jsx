const Header = (props) => <h1>{props.course}</h1>;

const Content = (props) => {
  const total = props.parts.reduce((a, b) => {
    return a + b.exercises;
  }, 0);

  return (
    <div>
      {props.parts.map((part) => (
        <Part key={part.id} part={part} />
      ))}
      <Total total={total} />
    </div>
  );
};

const Part = (props) => (
  <p>
    {props.part.name} {props.part.exercises}
  </p>
);

const Total = (props) => (
  <p style={{ fontWeight: "bold" }}>total of {props.total} exercises</p>
);

const Course = ({ course }) => {
  return (
    <>
      <Header course={course.name} />
      <Content parts={course.parts} />
    </>
  );
};

export default Course;