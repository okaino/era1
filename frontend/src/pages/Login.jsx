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

  const loginUser =async (e) => {
    console.log(formData)
    e.preventDefault()
    const {email, password} = formData
    try {
      const {receiver} = await axios.post('api/login', {
        email,
        password
      });
      if(receiver?.error){
        toast.error(receiver.error)
      }
      else {
        setFormData({})
        toast.success('Login Succesful.')
        navigate('/')
      }
    } catch (error) {
      
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
