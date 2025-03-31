import React from "react"
import {Routes,Route} from "react-router-dom"
import Home from "./pages/Home"
import Transactions from "./pages/Transactions"
import Dashboard from "./pages/Dashboard"

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />}/>
      <Route path="/dashboard" element={<Dashboard/>}/>
      <Route path="/get" element={<Transactions />}/>
    </Routes>
  )
}