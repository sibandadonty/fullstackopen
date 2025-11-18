import { useSelector, useDispatch } from 'react-redux'
import { asObject } from './reducers/anecdoteReducer'

const App = () => {
  const anecdotes = useSelector(state => state)
  
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

  const addAnecdote = content => {
    return {
      type: "ADD",
      payload: asObject(content)
    }
  }

  const onSubmitHandler = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    dispatch(addAnecdote(content))
  }
  console.log("raw unsorted ancedotes: ", anecdotes);
  console.log("sorted :", anecdotes);
  
  
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
      <form onSubmit={onSubmitHandler}>
        <div>
          <input name="anecdote"/>
        </div>
        <button>create</button>
      </form>
    </div>
  )
}

export default App
