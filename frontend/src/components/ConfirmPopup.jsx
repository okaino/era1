import React from 'react';
import './MyActivitiesCard.css';
const ConfirmPopup = ({ isOpen, onConfirm }) => {
    if (!isOpen) {
        return null;
    }

    return (

        <div className="popup-background">
            <div className="popup-container">
                <div className="question">


                    <p>Are you sure?</p>
                    <button onClick={() => onConfirm(true)}>Yes</button>
                    <button onClick={() => onConfirm(false)}>No</button>
                </div></div></div>
    );
};

export default ConfirmPopup;
