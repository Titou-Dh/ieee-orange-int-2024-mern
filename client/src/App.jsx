// import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Books from "./components/Books";
import ModifyBook from "./components/ModifyBook";
import InputField from "./components/InputField";

export default function App() {
  

  return (
    <div className="bg-main min-h-screen">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Books />} />
          <Route path="books/add" element={<InputField />} />
          <Route path="books/modify/:id" element={<ModifyBook />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}
