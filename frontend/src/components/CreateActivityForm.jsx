import React, { useState } from 'react';
import './CreateActivityForm.css';

function CreateActivityForm({ onClose, onSend }) {
    const [input, setInput] = useState('');

    const handleInputChange = (e) => {
        setInput(e.target.value);
    };

    const handleSend = () => {
        onSend(input);
        onClose();  // Optionally close the popup after sending
    };

    return (
        <div className="popup-overlay">
            <div className="popup-content">
                <button className="close-btn" onClick={onClose}>&times;</button>
                <form onSubmit={(e) => e.preventDefault()}>
                    <textarea
                        value={input}
                        onChange={handleInputChange}
                        placeholder="Type your message..."
                        rows="5"
                    ></textarea>
                    <button type="button" onClick={handleSend}>Send</button>
                </form>
            </div>
        </div>
    );
}

export default CreateActivityForm;
