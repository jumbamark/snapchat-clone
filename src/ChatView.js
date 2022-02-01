import React, {useEffect} from "react";
import {useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import "./ChatView.css";
import {selectSelectedImage} from "./features/appSlice";
import {CountdownCircleTimer} from "react-countdown-circle-timer";

function ChatView() {
  const selectedImage = useSelector(selectSelectedImage);
  console.log(selectedImage);
  const navigate = useNavigate();

  const exit = () => {
    navigate("/chats", {replace: true});
  };

  useEffect(() => {
    if (!selectedImage) {
      exit();
    }
  }, [selectedImage]);

  return (
    <div className="chatView">
      <img src={selectedImage} alt="snap" onClick={exit} />

      <div className="chatView-timer">
        <CountdownCircleTimer
          isPlaying
          duration={10}
          strokeWidth={6}
          size={50}
          colors={["#004777", "#F7B801", "#A30000"]}
          colorsTime={[7, 4, 3]}
        >
          {({remainingTime}) => {
            if (remainingTime === 0) {
              exit();
            }

            return remainingTime;
          }}
        </CountdownCircleTimer>
      </div>
    </div>
  );
}

export default ChatView;
