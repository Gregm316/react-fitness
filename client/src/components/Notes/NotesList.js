import Note from './Note';
import AddNote from './AddNote';
import './style.css'

const NotesList = ({
	notes,
	handleAddNote,
	handleDeleteNote,
}) => {
	return (
		<div className='notes-list'>
            <AddNote handleAddNote={handleAddNote} />
			{notes.map((note) => (
				<Note key={note.id}
					id={note.id}
					text={note.text}
					handleDeleteNote={handleDeleteNote}
				/>
			))}
		</div>
	);
};

export default NotesList;