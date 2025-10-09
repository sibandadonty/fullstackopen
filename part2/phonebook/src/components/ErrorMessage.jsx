const ErrorMessage = ({ message, className }) => {
  if (message === undefined) {
    return null;
  }

  return (
    <div className={className}>
      <p>{message}</p>
    </div>
  );
};

export default ErrorMessage;
