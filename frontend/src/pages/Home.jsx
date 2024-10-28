import { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import './Home.css';
import MyActivitiesCard from '../components/MyActivitiesCard';
import ActivityCards from '../components/ActivityCards';
import ConfirmPopup from '../components/ConfirmPopup';
import CreateActivityForm from '../components/CreateActivityForm';

export default function Home() {
  const [activities, setActivities] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [visibleComments, setVisibleComments] = useState({});
  const [myActivities, setMyActivities] = useState([]);
  const [commentsData, setCommentsData] = useState({ comment_content: '' })
  const [isPopupOpen, setPopupOpen] = useState(false);
  const [attendedActivity, setAttendedActivity] = useState(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [messages, setMessages] = useState([]);

  const toggleForm = () => {
    setIsFormOpen(!isFormOpen);
  };

  

  useEffect(() => {
    getActivities();  // Call on component mount
  }, []);

  const getActivities = async () => {
    try {
      const { data } = await axios.get('http://localhost:4000/post/viewActivity');
      if (data?.error) {
        toast.error(data.error);
        return; // Exit if there is an error in the response
      }

      const processedActivities = data.map(item => ({
        id: item._id,
        user_id: item.user_id,
        user_name: item.user_name,
        content: item.content,
        attendees_id: item.attendees_id,
        attendees_name: item.attendees_name,
        comments: item.comments.map(comment => JSON.parse(comment))
      }));

      setActivities(processedActivities);
      toast.success('Activities loaded successfully!');
    } catch (error) {
      console.error(error);
      toast.error('Failed to fetch activities.');
    }
  };
  const createActivity = async (message) => {
    setMessages([...messages, message]);
    try {
      const { data } = await axios.post('http://localhost:4000/post/createActivity', { content: message })
      if (data?.error) {
        toast.error(data.error);
        return;
      }
      getActivities();
      setMessages([])
      toast.success('Activity uploaded successfully!');
    } catch (error) {
      toast.error('Failed to Comment!')
    }
  };
  const getMyActivities = async () => {
    try {
      const { data } = await axios.post('http://localhost:4000/post/viewMyActivities')
      if (data?.error) {
        toast.error(data.error);
        return;
      }
      const processedActivities = data.map(item => ({
        id: item._id,
        user_id: item.user_id,
        user_name: item.user_name,
        content: item.content,
        attendees_id: item.attendees_id,
        attendees_name: item.attendees_name,
        comments: item.comments.map(comment => JSON.parse(comment))
      }));
      setMyActivities(processedActivities);
      setShowPopup(true)
      toast.success('My Activities loaded successfully!');
    } catch (error) {
      console.error(error);
      toast.error('Failed to fetch activities.');
    }
  }
  const makeComment = async (id) => {
    try {
      const contain = Object.keys(commentsData).find((eachKey) => eachKey === id);
      if (contain) {

        const { data } = await axios.put(`http://localhost:4000/post/makeComment/${id}`, { comment_content: commentsData?.[id] })
        toast.success('Commented!');
        getActivities();
      }
      else {
        alert("Type something to make comment")
      }
    } catch (error) {
      toast.error('Failed to Comment!')
    }
  }
  const attendActivity = async () => {
    try {
      const { data } = await axios.put(`http://localhost:4000/post/joinActivity/${attendedActivity}`)
      if (data.error) {
        toast.error(data.error)
      }
      toast.success('Attended!');
      getActivities();

    } catch (error) {
      toast.error(error.response.data.error)
    }
  }
  const deleteActivity = async (id) => {
    try {
      const user_id = localStorage.getItem('user_id');
      console.log(user_id)
      const { data } = await axios.delete(`http://localhost:4000/post/deleteActivity/${id}`)
      if(data.error){
        toast.error(data.error)
      }
      toast.success('Activity Deleted Sucessfully.')
      getActivities();
    } catch (error) {
      toast.error(error.response.data.error)
    }
  }
  const deleteComment = async (id, comment_index) => {
    try {
      console.log("okan",id)
      const { data } = await axios.delete(`http://localhost:4000/post/deleteComment/${id}/${comment_index}`)
      if(data.error){
        toast.error(data.error)
      }
      toast.success('Comment Deleted Sucessfully.')
      getActivities();

    } catch (error) {
      toast.error(error.response.data.error)
    }
  }
  const toggleCommentInput = (id) => {
    setVisibleComments(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };
  const handleInputChange = (event, id) => {

    setCommentsData({
      ...commentsData,
      [id]: event.target.value
    });
  };

  const handleConfirm = (decision) => {
    setActionConfirmed(decision);
    if (decision) {
      attendActivity()
    }
    setPopupOpen(false);
  }
  return (
    <div className='home-main'>
      <div className="home-header">
        <h1>Home</h1>
        <h2>Activities</h2>
      </div>
      <button onClick={getActivities}>Refresh Data</button>
      <button onClick={getMyActivities}>My Activities</button>
      <button onClick={toggleForm}>Create Activities</button>
      {activities.map(activity => (
         <ActivityCards
         key={activity.id}
         activity={activity}
         toggleCommentInput={toggleCommentInput}
         makeComment={makeComment}
         deleteComment={deleteComment}
         handleInputChange={handleInputChange}
         commentsData={commentsData}
         visibleComments={visibleComments}
         setPopupOpen={setPopupOpen}
         setAttendedActivity={setAttendedActivity}
       />
      ))}
      <div>

        {showPopup &&
          <MyActivitiesCard
            activities={myActivities}
            deleteActivity={deleteActivity}
            onClose={() => setShowPopup(false)}
          />
        }
      </div>
      <div>
        <ConfirmPopup isOpen={isPopupOpen} onConfirm={handleConfirm} />
      </div>
      {isFormOpen && (
        <CreateActivityForm
          onClose={toggleForm}
          onSend={createActivity}
        />
      )}
    </div>

  );
}
