import {useState} from 'react'
import axios from 'axios'
import {toast} from 'react-hot-toast'
import{ useNavigate } from 'react-router-dom'

export default function Register() {

  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    user_name:'',
    user_surname:'',
    email:'',
    password:''
  })

  const resgisterUser = async (e) => {
    e.preventDefault()
    const {user_name, user_surname, email, password} = formData
    try {
      const {receiver} = await axios.post('http://localhost:3000/api/register', {
        user_name, user_surname, email, password
      })
      if(receiver?.error){
        toast.error(receiver.error)
      }
      else {
        setFormData({})
        toast.success('Login Succesful.')
        navigate('/login')
      }
    } catch (error) {
      console.log(error)
  }
}

  return (
    <div>
      <form onSubmit={resgisterUser}>
        <label>Name</label>
        <input type="text" placeholder='enter name' value={formData.user_name} onChange={(e) => setFormData({...formData, user_name: e.target.value})}/>
        <label>Surname</label>
        <input type="text" placeholder='enter surname' value={formData.user_surname} onChange={(e) => setFormData({...formData, user_surname: e.target.value})}/>
        <label>E-mail</label>
        <input type="email" placeholder='enter email' value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})}/>
        <label>Password</label>
        <input type="password" placeholder='enter password' value={formData.password} onChange={(e) => setFormData({...formData, password: e.target.value})}/>
        <button type='submit'>Submit</button>
      </form>
    </div>
  )
}
