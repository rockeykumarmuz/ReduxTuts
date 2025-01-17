import React from 'react'
import { shallowEqual, useSelector } from 'react-redux'
import './PostList.css'
import { selectAllPosts } from './postsSlice'
import PostAuthor from './PostAuthor'
import TimeAgo from './TimeAgo'
import ReactionButton from './ReactionButton'

const PostList = () => {
	// shallowEqual performs a shallow comparison to ensure that the component doesn't re-render unless state.tasks has changed.
	// const posts = useSelector(state => state.posts.posts)
	const posts = useSelector(selectAllPosts)

	const renderPosts = posts.map(post => (
		<article key={post.id}>
			<h3>{post.title}</h3>
			<p>{post.content.substring(0, 100)}</p>
			<p className='postCredit'>
				<PostAuthor userId={post.userId} />
				<TimeAgo timestamp={post.date} />
			</p>
			<ReactionButton post={post} />
		</article>
	))

	return (
		<section>
			<h2>Posts</h2>
			{renderPosts}
		</section>
	)
}

export default PostList
