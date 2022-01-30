import React, {useCallback, useRef} from "react";
import "./WebcamCapture.css";
import Webcam from "react-webcam";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import {useDispatch} from "react-redux";
import {setCameraImage} from "./features/cameraSlice";
import {useNavigate} from "react-router-dom";

const videoConstraints = {
  width: 250,
  height: 400,
  facingMode: "user", // front facing camera
};

function WebcamCapture() {
  const webcamRef = useRef(null);
  // const [image, setImage] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const capture = useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();
    // console.log(imageSrc);
    // setImage(imageSrc);
    dispatch(setCameraImage(imageSrc));
    navigate("/preview"); //redirecting the user to the appropriate page on the webcamCapture
  }, [webcamRef, dispatch, navigate]);

  return (
    <div className="webcamCapture">
      <Webcam
        audio={false}
        height={videoConstraints.height}
        ref={webcamRef}
        screenshotFormat="image/jpeg"
        width={videoConstraints.width}
        videoConstraints={videoConstraints}
      />

      <RadioButtonUncheckedIcon
        className="webcamCapture-button"
        onClick={capture}
        fontSize="large"
      />

      {/* <img src={image} alt="" /> */}
    </div>
  );
}

export default WebcamCapture;

// redirect
// When we take a picture it should redirect to the preview route
// useHistory gives the history of the web pages, we can push a page on(essentially a redirect)
// If you call the capture button it takes you to "/preview"
