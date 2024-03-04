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

	const [showAnswer, setShowAnswer] = useState(false);
	const [cardIndex, setCardIndex] = useState(0);
	const [showEdit, setShowEdit] = useState(false);
	const [showRemoved, setShowRemoved] = useState(false);
	const [newAnswer, setNewAnswer] = useState();
	const [newPrompt, setNewPrompt] = useState();
	const [btnColor, setBtnColor] = useState('primary');
	const [saveOperation, setSaveOperation] = useState("");
	const [deck, setDeck] = useState([{answer: '', prompt: ''}]);
	
	useEffect( () => {
		
		getDeck(setDeck);
		
	}, []);
	
	
	const getDeck = (setDeck) => {
		
		fetch(serverURL)
			.then((res) => res.json())
			.then((data) => {
				console.log("Data is: " + typeof(data));
				console.log(data);
				setDeck(data);
			})
	}

	const onClick = () => {
		showAnswer ? console.log('hide answer') : console.log('reveal answer');
		setShowAnswer(!showAnswer);
	}
	
	const onPromptChange = (value) => {
		setNewPrompt(value);
	}
	
	const onAnswerChange = (value) => {
		setNewAnswer(value);
	}
	
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
	
	const formatCardIndex = () => {
		return cardIndex % deck.length;
	}
	
	const handleAdd = () => {
		console.log("add")
		setBtnColor('secondary')
		setShowEdit(true);
		setSaveOperation(actions.create);
	}
	
	const handleCancel = () => {
		afterEdit();
	}
	
	const handleEdit = (answer, prompt) => {
		setBtnColor('secondary');
		setShowEdit(true);
		setSaveOperation(actions.update);
	}
	
	const handleNext = () => {
		let newIndex = (cardIndex + 1) % deck.length;
		setCardIndex(newIndex);
		
		//same in handlePrev
		setShowAnswer(false);
		console.log('next')
	}
	
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
	
	const handleRemove = () => {
		setBtnColor('secondary');
		setShowRemoved(true);
		setSaveOperation(actions.remove);
	}
	
	
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
									onClick={onClick}
								/>
							
					
					}
				</div>
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

const useThrowAsyncError = () => {
	const [state, setState] = useState();
	
	return (error: any) => {
		setState(() => {
			throw error;
		});
	}
}

export default Flashcard;
