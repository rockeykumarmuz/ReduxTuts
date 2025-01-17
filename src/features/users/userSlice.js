import { createSlice, nanoid } from '@reduxjs/toolkit'

const initialState = {
	users: [
		{ id: 1, name: 'Rockey' },
		{ id: 2, name: 'Madhav' },
	],
}

const userSlice = createSlice({
	name: 'users',
	initialState,
	reducers: {
		userAdded: {
			reducer: (state, action) => {
				state.users.push(action.payload)
			},
			prepare: name => {
				return {
					payload: {
						id: Date.now(),
						name,
					},
				}
			},
		},
	},
})

export const selectAllUsers = state => state.users.users

export const { userAdded } = userSlice.actions

export default userSlice.reducer
