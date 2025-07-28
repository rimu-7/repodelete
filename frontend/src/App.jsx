// === App.js ===
import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import axios from "axios";
import Login from "./components/Login";
import RepoList from "./components/RepoList";
import Dashboard from "./components/Dashboard";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import About from "./components/About";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

axios.defaults.withCredentials = true;

function App() {
  const [user, setUser] = useState(null);
  const BACKEND_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    axios
      .get(`${BACKEND_URL}/auth/status`) // ✅ Corrected path
      .then((res) => {
        console.log("Auth Status Response:", res.data);
        setUser(res.data.user); // ✅ should contain `username`
      })
      .catch((err) => {
        console.error("Auth check failed", err);
        setUser(null);
      });
  }, []);

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home user={user} />} />
        <Route path="/about" element={<About/>}/>
        <Route path="/contact" element={<Contact/>}/>
        <Route path="/dashboard" element={<Dashboard user={user} />} />
      </Routes>
      <Footer/>
    </Router>
  );
}

export default App;
