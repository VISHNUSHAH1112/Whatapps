import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Sigin from "./Comopents/Signin"
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Signup from './Comopents/Signup'
import ChatApp from './Comopents/Home'

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/ChatApp' element={<ChatApp />} />
        <Route path='/Signin' element={<Sigin />} />
        <Route path='/' element={<Signup />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
