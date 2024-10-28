import React from 'react';
import { useState } from 'react';
import './MyActivitiesCard.css'; 
import ConfirmPopup from './ConfirmPopup';

const MyActivitiesCard = ({ activities, onClose, deleteActivity }) => {
  const [isPopupOpen, setPopupOpen] = useState(false);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedActivity, setSelectedActivity] = useState(null)

  const handleConfirm = (decision) => {
    if (decision) {
        deleteActivity(selectedActivity)
    }
    setPopupOpen(false);
  }

    return (
        <div className="popup-background">
            <div className="popup-container">
                <button className="close-button" onClick={onClose}>✕</button>
                
                {activities.map((activity, index) => (
                    <div key={index} className="activity-details">
                        <button className="delete-button" onClick={()=>{
                            setSelectedActivity(activity.id)
                            setPopupOpen(true)
                            }}>Delete Activity 🗑️</button>
                        <h1>{activity.content} by {activity.user_name}</h1>
                        <h2>Attendees:</h2>
                        <ul>
                            {activity.attendees_name.map((name, idx) => (
                                <li key={idx}>{name}</li>
                            ))}
                        </ul>
                        <h2>Comments:</h2>

                        <ul>
                            {activity.comments.map((comment, idx) => (
                                <li key={idx}>{comment.user_name}: {comment.comment_content}</li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>
            <div>
        <ConfirmPopup isOpen={isPopupOpen} onConfirm={handleConfirm} />
      </div>
        </div>
    );
};

export default MyActivitiesCard;
