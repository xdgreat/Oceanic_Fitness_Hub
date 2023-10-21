import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Auth0Provider } from "@auth0/auth0-react";
import App from "./App.jsx";
import About from "./pages/About.jsx";
import Coaching from "./pages/Coaching.jsx";
import Gallery from "./pages/Gallery.jsx";
import Contact from "./pages/Contact.jsx";
import NotFound from "./pages/NotFound.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import Location from "./pages/Location.jsx";
import Login from "./pages/Login.jsx";
import Signup from "./pages/Signup.jsx";
import Me from "./pages/me.jsx";
import Store from "./store.jsx";

async function init() {
  const root = createRoot(document.getElementById("root"));

  root.render(
    <Store>
      <Router>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/login" element={<Login />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/coaching" element={<Coaching />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/location" element={<Location />} />
          <Route path="/register" element={<Signup />} />
          <Route path="/me" element={<Me />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </Store>
  );
}

init();
