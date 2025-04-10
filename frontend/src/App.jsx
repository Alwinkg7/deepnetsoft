import { useState } from 'react'
import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Menu from './pages/Menu';
import Navbar from './components/Navbar';
import AddMenuForm from './pages/AddMenuForm';
import AddMenuItemForm from './pages/AddMenuItemForm';

function App() {
  const [count, setCount] = useState(0)

  return (
    <BrowserRouter>

     <Navbar />
    <Routes>
        <Route index element={<Home />} />
        <Route path="menu" element={<Menu />} />
        <Route path="add-menu" element={<AddMenuForm />} />
        <Route path="add-menu-item" element={<AddMenuItemForm />} />
      </Routes>
    </BrowserRouter>

  )
}

export default App
