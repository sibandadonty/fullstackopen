import { createSlice, current } from "@reduxjs/toolkit"


export const getId = () => (100000 * Math.random()).toFixed(0)

export const asObject = anecdote => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  }
}

const anecdoteSlice = createSlice({
  name: "anecdotes",
  initialState: [],
  reducers: {
    addVote(state, action) {
      const anecdote = state.find(anec => anec.id === action.payload)
      
      const newAnecdote = {...anecdote, votes: anecdote.votes + 1}
      
      return state.map(anec => anec.id === action.payload ? newAnecdote : anec).sort((a,b) => b.votes - a.votes)
    },

    addAnecdote(state, action) {
      return state.concat(action.payload).sort((a,b) => b.votes - a.votes)
    },

    setAnecdotes(state, action) {
      return action.payload
    }
  }
})
export const { addVote, addAnecdote, setAnecdotes } = anecdoteSlice.actions

export default anecdoteSlice.reducer
