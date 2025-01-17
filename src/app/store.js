import { configureStore } from '@reduxjs/toolkit'
import todoReducer from '../features/todo/todoSlice'
import postsReducer from '../features/posts/postsSlice'
import userReducer from '../features/users/userSlice'

export const Store = configureStore({
	reducer: {
		todo: todoReducer,
		posts: postsReducer,
		users: userReducer,
	},
})

export default Store
