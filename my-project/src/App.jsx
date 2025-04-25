import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Reports from "./pages/Reports";
import Add from "./pages/Add";
import Analytics from "./pages/Analytics";
import Profile from "./pages/Profile";
import Settings from "./pages/Settings";
import Layout from "./assets/Layout"; // import your Layout here

export default function App() {
  return (
    <Routes>
      {/* Login page without layout */}
      <Route path="/" element={<Login />} />
      {/* Routes that use the layout */}
      <Route element={<Layout />}>
        <Route path="/home/:userId" element={<Home />} />
        <Route path="/analytics/:userId" element={<Analytics />} />
        <Route path="/reports/:userId" element={<Reports />} />
        <Route path="/add/:userId" element={<Add />} />
        <Route path="/settings/:userId" element={<Settings />} />
        <Route path="/profile/:userId" element={<Profile />} />
      </Route>
    </Routes>
  );
}
