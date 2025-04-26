import { createAsyncThunk, createSlice, nanoid } from '@reduxjs/toolkit'
import { sub } from 'date-fns'
import axios from 'axios'

const POST_URL = 'https://jsonplaceholder.typicode.com/posts'

const initialState = {
	// posts: [
	// 	{
	// 		id: 1,
	// 		title: 'post1',
	// 		content: "I have heare'd good things.",
	// 		date: sub(new Date(), { minutes: 10 }).toISOString(),
	// 		reactions: {
	// 			thumbsUp: 0,
	// 			wow: 0,
	// 			heart: 0,
	// 			rocket: 0,
	// 			coffee: 0,
	// 		},
	// 	},
	// 	{
	// 		id: 2,
	// 		title: 'post2',
	// 		content: 'The more I say slice, the more I want pizza.The more I say slice, the more I want pizza.',
	// 		date: sub(new Date(), { minutes: 10 }).toISOString(),
	// 		reactions: {
	// 			thumbsUp: 0,
	// 			wow: 0,
	// 			heart: 0,
	// 			rocket: 0,
	// 			coffee: 0,
	// 		},
	// 	},
	// ],
	posts: [],
	status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
	error: null,
}

export const fetchPost = createAsyncThunk('/posts/fetchPosts', async () => {
	try {
		const response = await axios.get(POST_URL)
		return [...response.data]
	} catch (error) {
		console.log(error.message)
	}
})

export const postSlice = createSlice({
	name: 'posts',
	initialState,
	reducers: {
		postadded: {
			reducer: (state, actions) => {
				state.posts.push(actions.payload)
			},
			prepare: (title, content, userId) => {
				return {
					payload: {
						id: nanoid(),
						title,
						content,
						date: new Date().toISOString(),
						userId,
						reactions: {
							thumbsUp: 0,
							wow: 0,
							heart: 0,
							rocket: 0,
							coffee: 0,
						},
					},
				}
			},
		},
		reactionAdded: (state, actions) => {
			const { postId, reaction } = actions.payload
			const post = state.posts.find(post => post.id === postId)
			if (post) {
				post.reactions[reaction]++
			}
		},
	},
	extraReducers: (builder) => {
		builder.addCase(fetchPost.pending , (state, action) => {
			state.status = 'loading'
		})

		builder.addCase(fetchPost.fulfilled , (state, action) => {
			state.status = 'succeeded'
			// adding date and reactions
			let min = 1;
			const posts = action.payload.map(post => {
				post.date = sub(new Date(), {minutes: min++}).toISOString()
				post.reactions = {
					thumbsUp: 0,
					wow: 0,
					heart: 0,
					rocket: 0,
					coffee: 0,
				}
				return post;
			});

			// add any fetched post to the array
			state.posts = state.posts.concat(loadedPosts)
		})
		.addCase(fetchPost.rejected, (state, action) => {
			state.status = 'failed'
			state.error = state.error.message
		})
	}
})

export const selectAllPosts = state => state.posts.posts

export const { postadded, reactionAdded } = postSlice.actions

export default postSlice.reducer
