import { createSlice, current } from "@reduxjs/toolkit"
import { createNew, getAll, updateVote } from "../services/anecdoteServices"

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

      return state.map(anec => anec.id === action.payload.id ? action.payload : anec).sort((a,b) => b.votes - a.votes)
    },

    addAnecdote(state, action) {
      return state.concat(action.payload).sort((a,b) => b.votes - a.votes)
    },

    setAnecdotes(state, action) {
      return action.payload
    }
  }
})

const { setAnecdotes, addAnecdote, addVote } = anecdoteSlice.actions

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

export const updateVoteCount = (id, votes) => {
  return async (dispatch) => {
    const updatedAnecdote = await updateVote(id, votes)
    
    dispatch(addVote(updatedAnecdote))
  } 
}

export default anecdoteSlice.reducer
