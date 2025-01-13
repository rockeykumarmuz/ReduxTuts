import { createSlice, nanoid } from '@reduxjs/toolkit'

const initialState = {
	todos: [{ id: 1, text: 'todo1' }],
	editableToDo: null,
}

export const todoSlice = createSlice({
	name: 'todo',
	initialState,
	reducers: {
		addToDo: (state, actions) => {
			const todo = {
				id: nanoid(),
				text: actions.payload,
			}

			state.todos.push(todo)
		},
		removeToDo: (state, actions) => {
			state.todos = state.todos.filter(todo => todo.id !== actions.payload)
		},
		updateToDo: (state, actions) => {
			const { id, text } = actions.payload
			const todo = state.todos.find(todo => todo.id === id)
			if (todo) {
				todo.text = text
			}
			// reseting the state after editing
			state.editableToDo = null
		},
		setEditableToDo: (state, actions) => {
			const toDo = state.todos.find(todo => todo.id === actions.payload)
			if (toDo) {
				state.editableToDo = toDo
			}
		},
	},
})

export const { addToDo, removeToDo, updateToDo, setEditableToDo } = todoSlice.actions

// giving all the todoSlice functionlity access to the store
export default todoSlice.reducer
