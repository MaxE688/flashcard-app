import {useState, useEffect} from 'react'
import FlashCardControl from './FlashCardControl'
import Card from './Card'
import EditCard from './EditCard'
import RemoveCard from './RemoveCard'



interface Props {
	serverURL: string;
	actions: {create: string, update: string, remove: string};
}



const Flashcard = ({serverURL, actions = {
					create: 'create', 
					update: 'update', 
					remove: 'delete'
				 }
				}: Props) => {
	
	//set state of app
	const [showAnswer, setShowAnswer] = useState(false);
	const [cardIndex, setCardIndex] = useState(0);
	const [showEdit, setShowEdit] = useState(false);
	const [showRemoved, setShowRemoved] = useState(false);
	const [newAnswer, setNewAnswer] = useState();
	const [newPrompt, setNewPrompt] = useState();
	const [btnColor, setBtnColor] = useState('primary');
	const [saveOperation, setSaveOperation] = useState("");
	const [deck, setDeck] = useState([{answer: '', prompt: ''}]);
	
	//fetch deck from server
	useEffect( () => {
		
		getDeck(setDeck);
		
	}, []);
	
	//send GET request to server to recieve deck of flashcards
	const getDeck = (setDeck) => {
		
		fetch(serverURL)
			.then((res) => res.json())
			.then((data) => {
				console.log("Data is: " + typeof(data));
				console.log(data);
				setDeck(data);
			})
	}
	
	//reveals/hides the answer when the card component is clicked
	const revealAnswer = () => {
		showAnswer ? console.log('hide answer') : console.log('reveal answer');
		setShowAnswer(!showAnswer);
	}
	
	//update the value of newPrompt for card manipulation
	const onPromptChange = (value) => {
		setNewPrompt(value);
	}
	
	//update the value of newAnswer for card manipulation
	const onAnswerChange = (value) => {
		setNewAnswer(value);
	}
	
	//resets the state of the app after an edit was made to the deck
	const afterEdit = () => {
		
		
		if(saveOperation === 'add'){
				setCardIndex(deck.length);
		}
		
		setShowEdit(false);
		setShowAnswer(false);
		setBtnColor('primary');
		setSaveOperation("");
		setShowRemoved(false);
	}
	
	//sends POST request to specified route on server to update the database
	const updateDB = (cards, action = "") => {
		
		fetch(serverURL + action, {
			method: "POST",
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(cards)
		})
			.then((res) => {return res.text()})
				.then((text) => {
					console.log(text);
					getDeck(setDeck);
				});
	}
	
	//formats cardIndex to prevent out of bounds index value
	const formatCardIndex = () => {
		return cardIndex % deck.length;
	}
	
	//handles add card action
	const handleAdd = () => {
		console.log("add")
		setBtnColor('secondary')
		setShowEdit(true);
		setSaveOperation(actions.create);
	}
	
	//handles cancel button press
	const handleCancel = () => {
		afterEdit();
	}
	
	//handles edit card action
	const handleEdit = (answer, prompt) => {
		setBtnColor('secondary');
		setShowEdit(true);
		setSaveOperation(actions.update);
	}
	
	//handles next card button press
	const handleNext = () => {
		let newIndex = (cardIndex + 1) % deck.length;
		setCardIndex(newIndex);
		
		//same in handlePrev
		setShowAnswer(false);
		console.log('next')
	}
	
	//handles prev card button press
	const handlePrev = () => {
	
		let newIndex = (cardIndex - 1) % deck.length;
		if(newIndex < 0){
			newIndex = deck.length - 1;
		}
		setCardIndex(newIndex);
		
		//same in handleNext
		setShowAnswer(false);
		console.log('prev')
	}
	
	//handles remove card action
	const handleRemove = () => {
		setBtnColor('secondary');
		setShowRemoved(true);
		setSaveOperation(actions.remove);
	}
	
	//handle save button press
	const handleSave = () => {
		
		let saveCard; 
		
		if(saveOperation === actions.update){
			saveCard = {
				ID: deck[cardIndex].ID,
				answer: newAnswer,
				prompt: newPrompt
			}
		}
		else if(saveOperation === actions.create){
			
			saveCard = {
				ID: null,
				answer: newAnswer,
				prompt: newPrompt
			}
		}
		else if(saveOperation === actions.remove){
			saveCard = deck[cardIndex];
			setCardIndex(cardIndex % deck.length);
		}
		else{
			return;
		}
		
		updateDB(saveCard, saveOperation);
		
		afterEdit();
	}
	
	
	
	return (
		
			<div className='card bg-primary-subtle rounded-4 px-4 mb-5 pt-3'>
				<div className='row card-body bg-subtle h-100 rounded-4 p-0' >
					{	
						{/* 
						- if making edit render EditCard
						- if deleting render RemoveCard
						- if no action render current card
						*/}
						showEdit ?
							<EditCard 
								prompt={saveOperation === actions.create ? 
									'New prompt' 
									: 
									deck[formatCardIndex()].prompt
								} 
								answer={saveOperation === actions.create ? 
									'New Answer' 
									: 
									deck[formatCardIndex()].answer
								} 
								onAnswerChange={onAnswerChange}
								onPromptChange={onPromptChange}
							/>
							:
							showRemoved ? 
								<RemoveCard card={deck[cardIndex]} />
								:
								<Card 
									prompt={deck[formatCardIndex()].prompt} 
									answer={deck[formatCardIndex()].answer} 
									showAnswer={showAnswer} 
									onClick={revealAnswer}
								/>
							
					
					}
				</div>
				{/* Render control buttons */}
				<div className='px-5 mb-3 mt-4'>
					<FlashCardControl
						actions={actions}
						btnColor={btnColor}
						handleAdd={handleAdd}
						handleEdit={handleEdit}
						handleNext={handleNext}
						handlePrev={handlePrev}
						handleRemove={handleRemove}
						handleSave={handleSave}
						handleCancel={handleCancel}
						saveOperation={saveOperation}
					/>
				</div>
			</div>
	);
}


export default Flashcard;
