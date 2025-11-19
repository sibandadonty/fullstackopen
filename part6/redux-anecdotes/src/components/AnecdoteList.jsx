import { useDispatch, useSelector } from "react-redux";
import { updateVoteCount } from "../reducers/anecdoteReducer";
import {
  showNotification,
  hideNotification,
} from "../reducers/notificationReducer";

const AnecdoteList = ({ anecdotes }) => {
  const dispatch = useDispatch();
  const notificationObj = useSelector((state) => state.notification);

  const vote = (id, votes) => {
    dispatch(showNotification({ message: "voting successful" }));
    dispatch(updateVoteCount(id, votes));
    setTimeout(() => {
      dispatch(hideNotification());
    }, 5000);
  };

  return (
    <div>
      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id, anecdote.votes)}>vote</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AnecdoteList;
