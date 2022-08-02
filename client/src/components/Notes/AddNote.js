import { useState } from 'react';
import './style.css'

const AddNote = ({ handleAddNote }) => {
    const [noteText, setNoteText] = useState('');
    const characterLimit = 200;

    const handleChange = (event) => {
        if (characterLimit - event.target.value.length >= 0) {
            setNoteText(event.target.value);
        }
    };

    const handleSaveClick = () => {
        if (noteText.trim().length > 0) {
            handleAddNote(noteText);
            setNoteText('');
        }
    };

    return (
        <div className='note new'>
            <input type='text' className='note-text'
                placeholder='Type note...'
                value={noteText}
                onChange={handleChange}
            ></input>
            <div className='note-footer'>
                <button className='save' onClick={handleSaveClick}>
                    Save
                </button>
            </div>
        </div>
    );
};

export default AddNote;