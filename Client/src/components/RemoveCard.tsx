interface Props {
	card: {};
}

const RemoveCard = ({card}) => {

	return (
		
			<button className='col bg-light  text-center'>
				<h3 className='card-title text-danger'>Are you sure?</h3>
				<p className='card-text text-dark mt-4'>
					You are about to delete "{card.prompt}" card from the deck
				</p>
			</button>
		
	);
}

export default RemoveCard;