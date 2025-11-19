const baseUrl = "http://localhost:3000/anecdotes"

export const getAll = async () => {
    const response = await fetch(baseUrl)

    if (!response.ok) {
        throw new Error("Failed to fetch anecdotes")
    }

    return await response.json()
}

export const createNew = async (data) => {
    const options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    }
    const response = await fetch(baseUrl, options)

    if (!response.ok) {
        throw new Error("Failed to create new anecdote")
    }

    return response.json()
}

export const updateVote = async (id, votes) => {
    const updateObj = {votes: votes + 1}

    const options = {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(updateObj)
    }
    
    const response = await fetch(`${baseUrl}/${id}`, options)
    
    if (!response.ok) {
        throw new Error("Failed to update votes")
    }

    return await response.json()
}