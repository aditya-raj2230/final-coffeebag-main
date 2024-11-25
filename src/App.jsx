import React, {useState} from 'react'
import {Route, BrowserRouter as Router, Routes} from 'react-router-dom';
import Navbar from './components/Navbar';
import { Landing, OurCoffees, CoffeeClass, OurCoffees2 } from './pages';
import './index.css'

import InkfishScroll from './components/InkfishScroll';


function App() {
  

  return (
    <main className="w-screen h-screen overflow-hidden">
    <Router>
      <div className="fixed top-0 left-0 w-full z-50">
        <Navbar />
      </div>

      <div className="pt-[80px]">
        <Routes>
          <Route path="/" element={<Landing/>}/>
          <Route  path="/ourcoffees" element={<OurCoffees/>}/>
          <Route  path="/coffeeclass" element={<CoffeeClass/>}/>
        </Routes>
      </div>
    </Router>
    </main>
  )
}

export default App
