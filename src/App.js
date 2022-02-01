import React, {useEffect} from "react";
import "./App.css";
import WebcamCapture from "./WebcamCapture";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import Preview from "./Preview";
import Chats from "./Chats";
import ChatView from "./ChatView";
import {login, logout, selectUser} from "./features/appSlice";
import {useDispatch, useSelector} from "react-redux";
import Login from "./Login";
import {onAuthStateChanged} from "firebase/auth";
import {auth} from "./firebase";

function App() {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch(
          login({
            username: user.displayName,
            profilePicture: user.photoURL,
            id: user.uid,
          })
        );
      } else {
        dispatch(logout());
      }
    });
  }, [dispatch]);

  return (
    <div className="app">
      <BrowserRouter>
        {!user ? (
          <Login />
        ) : (
          <>
            <img
              src="https://scx2.b-cdn.net/gfx/news/2017/1-snapchat.jpg"
              alt=""
              className="app-logo"
            />
            <div className="app-body">
              <div className="app-bodyBackground">
                <Routes>
                  <Route exact path="/" element={<WebcamCapture />} />
                  <Route path="/preview" element={<Preview />} />
                  <Route path="/chats" element={<Chats />} />
                  <Route path="/chats/view" element={<ChatView />} />
                </Routes>
              </div>
            </div>
          </>
        )}
      </BrowserRouter>
    </div>
  );
}

export default App;
