import Button from './Button'



interface Props {
	actions: string;
	btnColor: string;
	handleAdd: () => void;
	handleEdit: () => void;
	handleNext: () => void;
	handlePrev: () => void;
	handleRemove: () => void;
	handleSave: (card) => void;
	handleCancel: () => void;
	saveOperation: string;
}



const FlashCardControl = ({
			actions,
			btnColor,
			handleAdd,
			handleCancel,
			handleEdit,
			handleNext,
			handlePrev,
			handleRemove,
			handleSave, 
			saveOperation
		   }: Props) => {
						
	
	
	return (
		<>
			{
				saveOperation === actions.update || saveOperation === actions.create?
					<div className='row px-5'>
						<div className='col btn-group px-0'>
							<Button 
								children='Save' 
								color='primary' 
								onClick={handleSave}
								bsClass={"px-4"}
							/>
							<div className=' ms-1'/>
							<Button 
								children='Cancel' 
								color='primary' 
								onClick={handleCancel} 
								bsClass={"px-3"}
							/>
						</div>
					</div>
					:
					saveOperation === actions.remove ?
						<div className='row px-5'>
							<div className='col btn-group px-0'>
								<Button 
									children='Delete' 
									color='danger' 
									onClick={handleSave}
									bsClass={"px-0"}
								/>
								<div className=' ms-1'/>
								<Button 
									children='Cancel' 
									color='primary' 
									onClick={handleCancel} 
									bsClass={"px-0"}
								/>
							</div>
						</div>
						:
						<>
						<div className='row px-5'>
							<div className='col btn-group px-0'>
								<Button 
									children={'Add'} 
									color={btnColor} 
									onClick={handleAdd}
									bsClass={"px-4"}
								/>
								<div className=' ms-1'/>
								<Button 
									children={'edit'} 
									color={btnColor} 
									onClick={handleEdit}
								/>
								<div className=' ms-1'/>
								<Button 
									children={'Remove'} 
									color={btnColor} 
									onClick={handleRemove}
								/>
							</div>
						</div>
						</>
			}
			<div className='row px-5 mt-1'>
				<div className='col btn-group px-0'>
					<Button 
						children={'prev'} 
						color={btnColor} 
						onClick={saveOperation === "" ? handlePrev : null}
									
					/>
					<div className=' ms-1'/>
					<Button 
						children={'next'} 
						color={btnColor} 
						onClick={saveOperation === "" ? handleNext : null}
					/>
				</div>
			</div>
		</>
	);
}


export default FlashCardControl;
