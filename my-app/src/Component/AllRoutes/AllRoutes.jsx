import React from 'react'
import { Routes, Route } from 'react-router-dom'
import LoginPage from '../logIn'
import SignupPage from '../signUp'
import { Home } from '../Home'

export const AllRoutes = () => {
  return (
    <div>
        <Routes>
            <Route path='/' element={<SignupPage/>} />
            <Route path='/login' element={<LoginPage/>} />
            <Route path='/home' element={<Home/>} />
        </Routes>
    </div>
  )
}
