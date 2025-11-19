import { createSlice, current } from "@reduxjs/toolkit"
import { createNew, getAll } from "../services/anecdoteServices"

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

const { setAnecdotes, addAnecdote } = anecdoteSlice.actions

export const initializeAnecdotes = () => {
  return async (dispatch) => {
    const anecdotes = await getAll()
    dispatch(setAnecdotes(anecdotes))
  }
}

export const createAnecdote = (data) => {
  return async (dispatch) => {
    const newAnecdote = await createNew(data)
    dispatch(addAnecdote(newAnecdote))
  } 
}

export const { addVote } = anecdoteSlice.actions

export default anecdoteSlice.reducer
