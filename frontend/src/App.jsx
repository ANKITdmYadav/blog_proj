import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Navbar from "../src/components/Navbar"
import Home from "../src/components/Home"
import Footer from "../src/components/Footer"
import {Navigate, Route,Routes,useLocation,useMatch} from 'react-router-dom'

import Blog from "./pages/Blogs";
import Contact from "./pages/Contact";
import Creators from "./pages/Creators";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Register from "./pages/Register";
import About from "./pages/About"
import { useAuth } from './context/AuthProvider'
import {Toaster} from 'react-hot-toast'
import UpdateBlog from './dashboard/UpdateBlog'
import Detail from './pages/Detail'
import Notfound from './Notfound'


function App() {
  const location=useLocation()
  const isNotFound = useMatch("*");
  const hideNavbarFooter=["/dashboard","/login","/register","*"].includes(location.pathname)
  const {blogs,isAuthenticated}=useAuth()
  console.log(blogs);
  console.log(isAuthenticated);
  
  

  return (
    <div>
      {!hideNavbarFooter && <Navbar/>}

      <Routes>
        <Route path="/" element={isAuthenticated===true?<Home />:<Navigate to={"/login"}/> }></Route>
        <Route path="/blogs" element={<Blog/>}></Route>
        <Route path="/about" element={<About/>}></Route>
        <Route path="/contact" element={<Contact/>}></Route>
        <Route path="/creators" element={<Creators/>}></Route>
        <Route path="/dashboard" element={<Dashboard/>}></Route>
        <Route path="/login" element={<Login/>}></Route>
        <Route path="/Register" element={<Register/>}></Route>
        
        <Route path='/blog/:id' element={<Detail/>}></Route>
        <Route path='/blog/update/:id' element={<UpdateBlog/>}></Route>
        
        <Route path='*' element={<Notfound/>}></Route>
      </Routes>
      <Toaster/>
      {!hideNavbarFooter && <Footer/>}
    </div>
  )
}

export default App
