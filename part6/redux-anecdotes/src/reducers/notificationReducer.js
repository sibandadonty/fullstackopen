import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    show: false,
    message: "12 12"
}

const notificationSlice = createSlice({
    name: "notification",
    initialState,
    reducers: {
        showNotification(state, action) {
            return {
                show: true,
                message: action.payload.message
            }
        },

        hideNotification(state, action) {
            return {
                show: false,
                message: ""
            }
        }

    }
})

export const { showNotification, hideNotification } = notificationSlice.actions
export default notificationSlice.reducer