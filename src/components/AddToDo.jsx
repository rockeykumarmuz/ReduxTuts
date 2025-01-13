import { useEffect, useState } from 'react'
import './addToDo.css'
import { addToDo, updateToDo } from '../features/todo/todoSlice'
import { useDispatch, useSelector } from 'react-redux'

export function AddToDo() {

	const [input, setInput] = useState('')
	
  const dispatch = useDispatch()
	
  const editableToDo = useSelector(state => state.editableToDo)

	const addToDohandler = e => {
		e.preventDefault()
		if (!input) return
		if (editableToDo) {
			dispatch(updateToDo({ id: editableToDo.id, text: input }))
			// dispatch(addToDo(input))
		} else {
			dispatch(addToDo(input))
		}
		setInput('')
	}

	useEffect(() => {
		if (editableToDo) {
			setInput(editableToDo.text)
		}
	}, [editableToDo])

	return (
		<div className='container'>
			<form className='form-container'>
				<input
					className='add-task'
					type='text'
					placeholder='Add your Task...'
					value={input}
					onChange={e => setInput(e.target.value)}
				/>
				<button className='btn' onClick={addToDohandler} disabled={!input}>
					{editableToDo ? 'Update Task' : 'Add Task'}
				</button>
			</form>
		</div>
	)
}
