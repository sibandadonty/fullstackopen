import { useDispatch, useSelector } from "react-redux";
import { addAnecdote } from "../reducers/anecdoteReducer";
import { hideNotification, showNotification } from "../reducers/notificationReducer";
import { createNew } from "../services/anecdoteServices";
const AnecdoteForm = ({ onSubmitHandler }) => {
  const dispatch = useDispatch();
  const notificationObj = useSelector(state => state.notification)

  const handleSubmit = (event) => {
    event.preventDefault();
    const content = event.target.anecdote.value;
    event.target.anecdote.value = "";
    const payload = {votes: 0, content}
    createNew(payload).then(anecdote => dispatch(addAnecdote(anecdote)))
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
