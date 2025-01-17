import React from 'react'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { nanoid } from '@reduxjs/toolkit'

import { postadded } from './postsSlice'
import { selectAllUsers } from '../users/userSlice'

const AddPostForm = () => {
	const [title, setTitle] = useState('')
	const [content, setContent] = useState('')
	const dispatch = useDispatch()
	const users = useSelector(selectAllUsers)
	const [userId, setUserId] = useState('')

	const onSavePostClicked = e => {
		e.preventDefault()
		if (title && content) {
			dispatch(postadded(title, content, userId))
			setContent('')
			setTitle('')
			setUserId('')
		}
	}

	const userOptions = users.map(user => (
		<option key={user.id} value={user.id}>
			{user.name}
		</option>
	))

	const canSave = Boolean(title) && Boolean(userId) && Boolean(content)

	return (
		<section>
			<h2>Add a New Post</h2>
			<form>
				<label htmlFor='postTitle'> Post Title:</label>
				<input type='text' id='postTitle' value={title} onChange={e => setTitle(e.target.value)} />
				<label htmlFor='postAuthor'>Author:</label>
				<select id='postAuthor' onChange={e => setUserId(e.target.value)}>
					<option value=''></option>
					{userOptions}
				</select>
				<label htmlFor='postContent'>Post Content:</label>
				<input type='text' id='postContent' value={content} onChange={e => setContent(e.target.value)} />
				<button onClick={onSavePostClicked} type='submit' disabled={!canSave}>
					Save Post
				</button>
			</form>
		</section>
	)
}

export default AddPostForm
