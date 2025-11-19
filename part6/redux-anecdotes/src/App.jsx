import { useSelector, useDispatch } from 'react-redux'
import { addAnecdote, addVote } from './reducers/anecdoteReducer'
import AnecdoteForm from './components/AnecdoteForm'
import AnecdoteList from './components/AnecdoteList'
import Filter from './components/FIlter'
import Notification from './components/Notification'

const App = () => {
  const anecdotes = useSelector(({ anecdotes, filter }) => {
    return anecdotes.filter(anecdote => anecdote.content.toLowerCase().includes(filter))
  })

  const notificationObj = useSelector(state => state.notification)
  
  return (
    <div>
      { notificationObj.show && <Notification />}
      <h2>Anecdotes</h2>
      <Filter />
      <AnecdoteList anecdotes={anecdotes}/>
      <AnecdoteForm/>
    </div>
  )
}

export default App
