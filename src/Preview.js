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

      <div className="preview-footer">
        <h2>Send Now</h2>
        <Send className="preview-sendIcon" fontSize="small" />
      </div>
    </div>
  );
}

export default Preview;
