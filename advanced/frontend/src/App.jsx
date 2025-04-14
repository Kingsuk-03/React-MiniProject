import React from "react";
import { useState } from "react";
import { Admin } from "./components/Admin";
import { User } from "./components/User";
import { Allcards } from "./components/Allcards";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";

function App() {
  return (
    <>
      <BrowserRouter>
        <Appbar />
        <Routes>
          <Route path="/admin" element={<Admin />} />
          <Route path="/user" element={<User />} />
          <Route path="/allCards" element={<Allcards />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

function Appbar() {
  const navigate = useNavigate();
  return (
    <div>
      <>
        <button onClick={() => navigate("/admin")}>ADMIN</button>
        <button onClick={() => navigate("/user")}>USER</button>
        <button onClick={() => navigate("/allCards")}>ALL CARDS</button>
      </>
    </div>
  );
}

export default App;
