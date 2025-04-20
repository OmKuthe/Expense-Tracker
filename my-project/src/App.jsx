import React from "react"
import {Routes,Route} from "react-router-dom"
import Login from "./pages/Login"
import Home from "./pages/Home"
import Reports from "./pages/Reports"
import Add from "./pages/Add"
import Analytics from "./pages/Analytics"

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />}/>
      <Route path='/home/:userId' element={<Home />}/>
      <Route path="/analytics/:userId" element={<Analytics/>}/>
      <Route path='/reports/:userId' element={<Reports/>}/>
      <Route path='/add/:userId' element={<Add/>}/>
    </Routes>
  )
}