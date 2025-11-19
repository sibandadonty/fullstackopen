
const filterReducer = (state = "", action) => {
  
  switch (action.type) {
    case "FILTER":
        return action.payload.searchTerm
    default:
        return state
  }
}

export const applyFilter = (searchTerm) => {
    return {
        type: "FILTER",
        payload: { searchTerm }
    }
}

export default filterReducer
