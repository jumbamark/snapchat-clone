import {ChatBubble, Search} from "@mui/icons-material";
import {Avatar} from "@mui/material";
import {collection, orderBy, onSnapshot, query} from "firebase/firestore";
import React, {useEffect, useState} from "react";
import "./Chats.css";
import {auth, db} from "./firebase";
import Chat from "./Chat";
import {selectUser} from "./features/appSlice";
import {useDispatch, useSelector} from "react-redux";
import {signOut} from "firebase/auth";
import RadioButtonUnchecked from "@mui/icons-material/RadioButtonUnchecked";
import {useNavigate} from "react-router-dom";
import {resetCameraImage} from "./features/cameraSlice";

function Chats() {
  const [posts, setPosts] = useState([]);
  const user = useSelector(selectUser);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    let isMounted = true;

    const q = query(collection(db, "posts"), orderBy("timestamp", "desc"));
    onSnapshot(q, (snapshot) => {
      // console.log(snapshot.docs);
      if (isMounted) {
        setPosts(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            data: doc.data(),
          }))
        );
      }
    });

    return () => {
      isMounted = false;
    };
  }, []);

  const takeSnap = () => {
    dispatch(resetCameraImage());
    navigate("/");
  };

  return (
    <div className="chats">
      <div className="chats-header">
        <Avatar src={user.profilePic} className="chats-avatar" onClick={() => signOut(auth)} />

        <div className="chats-search">
          <Search className="chats-searchIcon" />
          <input type="text" placeholder="Friends" />
        </div>

        <ChatBubble className="chats-chatIcon" />
      </div>

      <div className="chat-posts">
        {posts.map(({id, data: {profilePic, username, timestamp, imageUrl, read}}) => (
          <Chat
            key={id}
            id={id}
            username={username}
            timestamp={timestamp}
            imageUrl={imageUrl}
            read={read}
            profilePic={profilePic}
          />
        ))}
      </div>

      <RadioButtonUnchecked className="chats-takePicIcon" onClick={takeSnap} fontSize="large" />
    </div>
  );
}

export default Chats;

// const [value, setValue] = useState("checking value...");
// useEffect(() => {
//   let isMounted = true;
//   fetchValue().then(() => {
//     if (isMounted) {
//       setValue("done!"); // no more error
//     }
//   });
//   return () => {
//     isMounted = false;
//   };
// }, []);
