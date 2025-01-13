import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { removeToDo, setEditableToDo } from '../features/todo/todoSlice'
import { MdDeleteForever, MdEdit } from 'react-icons/md'

const ToDo = () => {
	const todos = useSelector(state => state.todos)
	const dispatch = useDispatch()

	return (
		<div className='todo-container'>
			<h1>ToDos</h1>
			<ul>
				{todos.map(todo => (
					<li key={todo.id} className='todo'>
						{todo.text}
						<div className='button-wrapper'>
							<button className='edit-btn' onClick={() => dispatch(setEditableToDo(todo.id))}>
								<MdEdit className='edit-icon' />
							</button>
							<button className='delete-btn' onClick={() => dispatch(removeToDo(todo.id))}>
								<MdDeleteForever className='delete-icon' />
							</button>
						</div>
					</li>
				))}
			</ul>
		</div>
	)
}

export default ToDo
