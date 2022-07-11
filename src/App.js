import React from "react";
import './App.css';
import { Route, Routes } from "react-router";
import { BrowserRouter } from "react-router-dom";
import Demo from "./pages/demo";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Demo />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
