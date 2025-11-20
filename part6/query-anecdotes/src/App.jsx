import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import { createNew, getAll } from './services/anecdotesService'
import { useQuery, useMutation } from '@tanstack/react-query'

const App = () => {
  const results = useQuery({
    queryKey: ["anecdotes"],
    queryFn: getAll,
    retry: 1
  })

  const handleVote = (anecdote) => {
    console.log('vote')
  }

  const anecdotes = results.data

  if (results.isLoading) {
    return <h1>Loading...</h1>
  }

  if (results.isError) {
    return <h1>Anecdote service not available due to problems in the server</h1>
  }

  return (
    <div>
      <h3>Anecdote app</h3>

      <Notification />
      <AnecdoteForm />

      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      ))}
    </div>
  )
}

export default App
