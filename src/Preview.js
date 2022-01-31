import {
  AttachFile,
  Close,
  Create,
  Crop,
  MusicNote,
  Note,
  Send,
  TextFields,
  Timer,
} from "@mui/icons-material";
import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import {resetCameraImage, selectCameraImage} from "./features/cameraSlice";
import "./Preview.css";
import {v4 as uuid} from "uuid";
import {
  getStorage,
  ref,
  uploadString,
  getDownloadURL,
  uploadBytesResumable,
} from "firebase/storage";
import {db} from "./firebase";
import {collection, addDoc, serverTimestamp} from "firebase/firestore";

function Preview() {
  const cameraImage = useSelector(selectCameraImage);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!cameraImage) {
      navigate("/", {replace: true});
    }
  }, [cameraImage, navigate]);

  const closePreview = () => {
    dispatch(resetCameraImage());
  };

  const sendPost = () => {
    const id = uuid();

    // upload the image to firebase storage
    const storage = getStorage();
    const file = `posts/${id}`;
    const storageRef = ref(storage, file);
    console.log(storageRef);
    uploadString(storageRef, cameraImage, "data_url").then((uploadTask) => {
      // console.log(uploadTask);
      // console.log(uploadTask.metadata.name);

      uploadBytesResumable(storageRef, file).on(
        "state_changed",
        null,
        (error) => {
          console.log(error);
        },

        () => {
          getDownloadURL(ref(storage, file)).then((url) => {
            addDoc(collection(db, "posts"), {
              imageUrl: url,
              username: "Jumba Mark",
              read: false,
              profilePic: "",
              timestamp: serverTimestamp(),
            });
            navigate("/chats/view");
          });
        }
      );
    });
  };

  return (
    <div className="preview">
      <Close className="preview-close" onClick={closePreview} />
      <div className="preview-toolbarRight">
        <TextFields />
        <Create />
        <Note />
        <MusicNote />
        <AttachFile />
        <Crop />
        <Timer />
      </div>
      <img src={cameraImage} alt="" />

      <div className="preview-footer" onClick={sendPost}>
        <h2>Send Now</h2>
        <Send className="preview-sendIcon" fontSize="small" />
      </div>
    </div>
  );
}

export default Preview;
