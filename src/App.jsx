import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import AddToDoTaskManager from './features/todo/Index'
import PostManager from './features/posts/Index'

function App() {
	return (
		<main className='App'>
			<BrowserRouter>
				<Routes>
					<Route>
						<Route path='redux/addToDo' element={<AddToDoTaskManager />} />
						<Route path='redux/posts' element={<PostManager />} />
					</Route>
				</Routes>
			</BrowserRouter>
		</main>
	)
}

export default App
