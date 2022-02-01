import {ChatBubble, Search} from "@mui/icons-material";
import {Avatar} from "@mui/material";
import {collection, orderBy, onSnapshot} from "firebase/firestore";
import React, {useEffect, useState} from "react";
import "./Chats.css";
import {db} from "./firebase";
import Chat from "./Chat";

function Chats() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    let isMounted = true;

    onSnapshot(collection(db, "posts"), orderBy("timestamp", "desc"), (snapshot) => {
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

  return (
    <div className="chats">
      <div className="chats-header">
        <Avatar className="chats-avatar" />

        <div className="chats-search">
          <Search />
          <input type="text" placeholder="Friends" />
        </div>

        <ChatBubble />
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
