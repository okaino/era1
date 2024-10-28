import { useState } from 'react'
import './App.css'
import {Routes, Route} from 'react-router-dom'
import Navbar from '../src/components/NavBar'
import Home from '../src/pages/Home'
import Login from '../src/pages/Login'
import Register from '../src/pages/Register'
import axios from 'axios'
import { Toaster } from 'react-hot-toast'

axios.defaults.baseURL = 'http://localhost:3000'
axios.defaults.withCredentials

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Navbar />
      <Toaster position='bottom-right' toastOptions={{duration: 2000}}></Toaster>
      <Routes>
        <Route path='/' element={<Home />}></Route>
        <Route path='/register' element={<Register />}></Route>
        <Route path='/login' element={<Login />}></Route>
      </Routes>
    </>
  )
}

export default App;
