import './style.css'

const Note = ({ id, text, date, handleDeleteNote }) => {
	return (
		<div className='note'>
			<span>{text}</span>
			<div className='note-footer'>
				<small>{date}</small>
				<span onClick={() => handleDeleteNote(id)} >
					<button className='delete-icon'>
					🗑️
					</button>
				</span>
			</div>
		</div>
	);
};

export default Note;