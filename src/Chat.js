import {StopRounded} from "@mui/icons-material";
import {Avatar} from "@mui/material";
import React from "react";
import {useDispatch} from "react-redux";
import ReactTimeago from "react-timeago";
import "./Chat.css";
import {selectImage} from "./features/appSlice";
import {setDoc, doc} from "firebase/firestore";
import {db} from "./firebase";
import {useNavigate} from "react-router-dom";

function Chat({id, username, timestamp, read, imageUrl, profilePic}) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const open = () => {
    if (!read) {
      // pushes the image into the store
      dispatch(selectImage(imageUrl));
      // const postsRef = doc(db, "posts", id);
      // updateDoc(postsRef, {
      //   read: true,
      // });

      setDoc(
        doc(db, "posts", id),
        {
          read: true,
        },
        {merge: true}
      );

      navigate("/chats/view");
    }
  };

  return (
    <div className="chat" onClick={open}>
      <Avatar src={profilePic} className="chat-avatar" />
      <div className="chat-info">
        <h4>{username}</h4>
        <p>
          Tap to View - <ReactTimeago date={new Date(timestamp?.toDate()).toUTCString()} />
        </p>
      </div>

      {!read && <StopRounded className="chat-readIcon" />}
    </div>
  );
}

export default Chat;
