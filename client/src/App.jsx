import { useState } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import "./App.css";

function App() {
  return (
    <div className="w-full h-screen bg-blue-400 flex flex-col items-center justify-center">
      <div class="container">
        <div class="dot"></div>
        <div class="dot"></div>
        <div class="dot"></div>
      </div>
      <div>
        <h1 className="text-4xl font-bold text-white font-mono pt-10">
          {" "}
          Loading Silas
        </h1>
      </div>
    </div>
  );
}

export default App;
