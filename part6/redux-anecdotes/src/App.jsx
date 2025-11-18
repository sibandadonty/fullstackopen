import { useSelector, useDispatch } from 'react-redux'

const App = () => {
  const anecdotes = useSelector(state => state)
  console.log("anecdotes: ", anecdotes);
  
  const dispatch = useDispatch()

  const vote = id => {
    dispatch(addVote(id))
  }

  const addVote = (id) => {
    return {
      type: "VOTE",
      payload: { id }
    }
  }
  console.log("anecdotes tosati taprinter: ", anecdotes);
  
  return (
    <div>
      <h2>Anecdotes</h2>
      {anecdotes.map(anecdote => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
      ))}
      <h2>create new</h2>
      <form>
        <div>
          <input />
        </div>
        <button>create</button>
      </form>
    </div>
  )
}

export default App
