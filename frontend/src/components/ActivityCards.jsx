import React from 'react';
import './MyActivitiesCard.css'; 

const ActivityCards = ({ activity, 
    toggleCommentInput, 
    makeComment, 
    deleteComment,
    handleInputChange, 
    commentsData, 
    visibleComments, 
    setPopupOpen, 
    setAttendedActivity 
}) => {
    return (
        <div className="activity-cards" key={activity.id}>
          <div className="content-area">
            <h1>{activity.content} by {activity.user_name}</h1>
          </div>
          <div className="attendees-area">
            <h2>Attendees:</h2>
            <ul>
              {activity.attendees_name.map((name, index) => (
                <li key={index}>{name}</li>
              ))}
            </ul>
          </div>
          <div className="comment-area">
            <h2>Comments:</h2>
            <ul>
              {activity.comments.map((comment, index) => (
                <li key={index}>
                  {comment.user_name}: {comment.comment_content} 
                  {localStorage.getItem('user_id') ==  String(comment.user_id) &&
                 (
                  <button style={{ backgroundColor: 'red', color: 'white', border: 'none', padding: '5px 10px', cursor: 'pointer' }} onClick={() => { deleteComment(activity.id, index) }}>
                   Delete
                  </button>
                )}
                </li>
              ))}
            </ul>
            {visibleComments[activity.id] &&
              <div className='comment-input-area'>
                <input
                  type="text"
                  placeholder='Type your comment...'
                  value={commentsData[activity.id] || ''}
                  onChange={(e) => handleInputChange(e, activity.id)}
                />
                <button onClick={() => makeComment(activity.id)}>Comment</button>
              </div>
            }
          </div>
          <div className="action-buttons">
            <button onClick={() => toggleCommentInput(activity.id)}>💬</button>
            <button onClick={() => {
              setPopupOpen(true)
              setAttendedActivity(activity.id)
            }}>➕</button>
          </div>
          
        </div>
    );
};

export default ActivityCards;
