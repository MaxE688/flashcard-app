interface Props {
	bsClass: "";
	children: string,
	color: string,
	onClick: () => void;
}

const Button = ({children, color, onClick, bsClass}: Props) => {
	return (
		<button 
			type="button" 
			className={"btn btn-" + color + " " + bsClass}
			onClick={onClick}
		>{children}</button>
	);
}

export default Button;