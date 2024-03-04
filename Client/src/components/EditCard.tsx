import {useState} from 'react'
import Button from './Button'



interface Props {
	answer: string;
	onPromptChange: () => void;
	onAnswerChange: () => void;
	prompt: string;
}



const EditCard = ({answer,onAnswerChange, onPromptChange, prompt}: Props) => {

	return (
		<>
			<button className='col bg-light text-center' >
				<form>
					<div className='row px-5 pt-2'>
						<input 
							className='col text-center rounded-2 bg-light-subtle text-dark' 
							type='text' id='fPrompt' 
							id='fPrompt'
							name='fPrompt'  
							defaultValue={prompt}
							onChange={(e) => onPromptChange(e.target.value)}
						/>
					</div>
					<div className='row px-5 mt-3'>
						<input 
							className='col text-center rounded-2 bg-light-subtle text-dark' 
							type='text' 
							id='fAnswer' 
							name='fAnswer'  
							defaultValue={answer}
							onChange={(e) => onAnswerChange(e.target.value)}
						/>
					</div>
				</form>
			</button>
		
		</>
	);
}

export default EditCard;

