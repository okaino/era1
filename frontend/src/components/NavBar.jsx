import React from 'react'
import { Link } from 'react-router-dom'
import './NavBar.css'

export default function NavBar() {
  return (
    <nav>
      <div className='links'>
        <Link to='/'>Home</Link>
      </div>
      <div className='links'>
        <div className='right-side'>
        <Link to='/register'>Register</Link>
        <Link to='/login'>Login</Link>
        </div>
      </div>
    </nav>
  )
}
