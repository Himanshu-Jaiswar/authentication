import React from 'react'
import { AppData } from '../context/AppContext'
import { Link, useNavigate } from 'react-router-dom';

function Home() {
  const {logout, user} = AppData();
  const navigate = useNavigate();
  return (
    <div className='flex w-[100px] m-auto mt-40'>
      <button className='bg-red-400 text-white p-2 rounded-md' onClick={() => logout(navigate)}>Logout</button>

      {
        user && user.role === "admin" && (
          <Link to="/dashboard" className='bg-purple-500 text-white p-2 rounded-md'>Dashboard</Link>
        )
      }
    </div>
  )
}

export default Home