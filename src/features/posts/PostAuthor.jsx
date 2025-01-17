import { useSelector } from 'react-redux'
import { selectAllUsers } from '../users/userSlice'

const postAuthor = ({ userId }) => {
	const authors = useSelector(selectAllUsers)

	const author = authors.find(author => author.id === userId)

	return <span>by {author ? author.name : 'Unknown Author'}</span>
}

export default postAuthor
