import React from "react";
import "./App.css";
import WebcamCapture from "./WebcamCapture";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import Preview from "./Preview";
import Chats from "./Chats";
import ChatView from "./ChatView";

function App() {
  return (
    <div className="app">
      <BrowserRouter>
        <div className="app-body">
          <Routes>
            <Route exact path="/" element={<WebcamCapture />} />
            <Route path="/preview" element={<Preview />} />
            <Route path="/chats" element={<Chats />} />
            {/* <Route path="/chats/view" element={<ChatView />} /> */}
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
