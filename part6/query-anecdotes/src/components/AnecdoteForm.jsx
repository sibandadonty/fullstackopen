import { createNew } from '../services/anecdotesService'
import { useMutation, useQueryClient } from '@tanstack/react-query'

const AnecdoteForm = () => {
    const queryClient = useQueryClient()
    const anecdoteMutation = useMutation({
    mutationFn: createNew,
    onSuccess: (newAnecdote) => {
      const anecdotes = queryClient.getQueryData(['anecdotes'])
      queryClient.setQueryData(["anecdotes"], [...anecdotes, newAnecdote])  
    }
  })

  const onCreate = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    if (content.length  < 5) {
      alert("The content of the anecdote must be at least 5 characters long")
      return;
    }
    event.target.anecdote.value = ''
    anecdoteMutation.mutate({content, votes: 0})
    console.log('new anecdote')
  }
  
  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name="anecdote" />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
