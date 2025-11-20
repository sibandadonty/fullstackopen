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
        throw new Error("Failed to update anecdote")
    }

    return response.json()
}

export const updateVotes = async (updateData) => {
    const options = {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(updateData)
    }
    
    const response = await fetch(`${baseUrl}/${updateData.id}`, options)
    
    if (!response.ok) {
        throw new Error("Failed to update votes")
    }

    return await response.json()
}