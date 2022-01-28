import React, {useCallback, useRef} from "react";
import "./WebcamCapture.css";
import Webcam from "react-webcam";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";

const videoConstraints = {
  width: 250,
  height: 400,
  facingMode: "user", // front facing camera
};

function WebcamCapture() {
  const webcamRef = useRef(null);
  // const [image, setImage] = useState(null);

  const capture = useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();
    // console.log(imageSrc);
    // setImage(imageSrc);
  }, [webcamRef]);

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
