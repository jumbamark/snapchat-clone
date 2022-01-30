import React from "react";
import "./App.css";
import WebcamCapture from "./WebcamCapture";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import Preview from "./Preview";

function App() {
  return (
    <div className="app">
      <BrowserRouter>
        <div className="app-body">
          <Routes>
            <Route path="/preview" element={<Preview />} />
            <Route exact path="/" element={<WebcamCapture />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
