import { useDispatch, useSelector } from "react-redux";
import { createAnecdote } from "../reducers/anecdoteReducer";
import { hideNotification, showNotification } from "../reducers/notificationReducer";
const AnecdoteForm = ({ onSubmitHandler }) => {
  const dispatch = useDispatch();
  const notificationObj = useSelector(state => state.notification)

  const handleSubmit = (event) => {
    event.preventDefault();
    const content = event.target.anecdote.value;
    event.target.anecdote.value = "";
    const payload = {votes: 0, content}
    dispatch(createAnecdote(payload))
    dispatch(showNotification({message: "new anecdote added successfully"}))
    setTimeout(() => {
      dispatch(hideNotification())
    }, 5000)
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>create new</h2>
      <div>
        <input name="anecdote" />
      </div>
      <button>create</button>
    </form>
  );
};

export default AnecdoteForm;
