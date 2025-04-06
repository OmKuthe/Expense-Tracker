import React from "react"
import {Routes,Route} from "react-router-dom"
import Login from "./pages/Login"
// import Dashboard from "./pages/Dashboard"
import Home from "./pages/Home"
import Reports from "./pages/Reports"

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />}/>
      <Route path='/home/:userId' element={<Home />}/>
      <Route path='/reports/:userId' element={<Reports/>}/>
      {/* <Route path='/dashboard/:userId' element={<Dashboard/>}/> */}
    </Routes>
  )
}