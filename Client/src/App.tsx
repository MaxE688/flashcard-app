import { useState } from 'react'
import '../node_modules/bootstrap/dist/css/bootstrap.css'
import Flashcard from './components/Flashcard'


function App() {

	const actions = {
		create: 'create', 
		update: 'update', 
		remove: 'delete'
	};
	const serverURL = 'http://localhost:5174/';
	
	

	return (
		<div className='grid bg-info px-5'}>
			<div className='row  px-5'>
				<div className='col text-center  px-5'>
					<h1>Flash!</h1>
				</div>
			</div>
			<div className='row  px-5'>
					<Flashcard 
						serverURL={serverURL}
						actions={actions}
					/>
			</div>
		</div>
	);
}

export default App






