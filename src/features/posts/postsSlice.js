import { createSlice, nanoid } from '@reduxjs/toolkit'
import { sub } from 'date-fns'

const initialState = {
	posts: [
		{
			id: 1,
			title: 'post1',
			content: "I have heare'd good things.",
			date: sub(new Date(), { minutes: 10 }).toISOString(),
			reactions: {
				thumbsUp: 0,
				wow: 0,
				heart: 0,
				rocket: 0,
				coffee: 0,
			},
		},
		{
			id: 2,
			title: 'post2',
			content: 'The more I say slice, the more I want pizza.The more I say slice, the more I want pizza.',
			date: sub(new Date(), { minutes: 10 }).toISOString(),
			reactions: {
				thumbsUp: 0,
				wow: 0,
				heart: 0,
				rocket: 0,
				coffee: 0,
			},
		},
	],
}

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
})

export const selectAllPosts = state => state.posts.posts

export const { postadded, reactionAdded } = postSlice.actions

export default postSlice.reducer
