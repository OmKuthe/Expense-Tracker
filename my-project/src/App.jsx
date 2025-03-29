import React from "react"
import {Routes,Route} from "react-router-dom"
import Home from "./pages/Home"
import Transactions from "./pages/Transactions"
import Upload from "./pages/Upload"

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />}/>
      <Route path="/upload" element={<Upload />}/>
      <Route path="/get" element={<Transactions />}/>
    </Routes>
  )
}