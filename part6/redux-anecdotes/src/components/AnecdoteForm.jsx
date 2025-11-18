import React from 'react'

const AnecdoteForm = ({ onSubmitHandler }) => {
  return (
     <form onSubmit={onSubmitHandler}>
        <div>
          <input name="anecdote"/>
        </div>
        <button>create</button>
      </form>
  )
}

export default AnecdoteForm
