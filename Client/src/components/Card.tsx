interface Props {
	answer: string;
	onClick: () => void;
	prompt: string;
	showAnswer: boolean;
}

const Card = ({answer, onClick, prompt, showAnswer}: Props) => {
	// returns Card component to display the prompt and answer of the current flashcard
	return (
		
			<button className='col bg-light text-dark text-center' onClick={onClick} >
				<h3 className='card-title ' >{prompt}</h3>
				<p className='card-text mt-4'>{showAnswer ? answer : "..."}</p>
			</button>
		
	);
}

export default Card;

