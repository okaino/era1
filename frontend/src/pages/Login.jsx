import {useState} from 'react'
import axios from 'axios'
import {toast} from 'react-hot-toast'
import{ useNavigate } from 'react-router-dom'

export default function Login() {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    email:'',
    password:''
  })

  const loginUser = async (e) => {
    e.preventDefault();
    const { email, password } = formData;

    try {
      const response = await axios.post('http://localhost:3000/api/login', { email, password });
      const { accessToken, refreshToken, user_id } = response.data;

      // Store the received tokens
      localStorage.setItem('accessToken', accessToken);
      localStorage.setItem('refreshToken', refreshToken);
      localStorage.setItem('user_id', user_id);
      
      setFormData({});
      toast.success('Login Successful.');
      
      navigate('/');

      // Set the auth token for any future requests
      setAuthToken(accessToken);
    } catch (error) {
      if (error.response && error.response.data) {
        toast.error(error.response.data.message);
      } else {
        toast.error('An error occurred during login.');
      }
    }
}
function setAuthToken(token) {
  if (token) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    delete axios.defaults.headers.common['Authorization'];
  }
}


  return (
    <div>
      <form onSubmit={loginUser}>
        <label>E-mail</label>
        <input type="email" placeholder='enter email' value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})}/>
        <label>Password</label>
        <input type="password" placeholder='enter password' value={formData.password} onChange={(e) => setFormData({...formData, password: e.target.value})}/>
        <button type='submit'>Login</button>
      </form>
    </div>
  )
}
