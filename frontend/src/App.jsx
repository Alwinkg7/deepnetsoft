import { useState } from 'react'
import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Menu from './pages/Menu';
import Navbar from './components/Navbar';
import MakeReservation from './pages/MakeReservation';
import Contact from './pages/Contact';

function App() {
  const [count, setCount] = useState(0)

  return (
    <BrowserRouter>

     <Navbar />
    <Routes>
        <Route path='/' element={<Menu />} />
        <Route path="/home" element={<Home />} />
        <Route path="/reservation" element={<MakeReservation />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </BrowserRouter>

  )
}

export default App
