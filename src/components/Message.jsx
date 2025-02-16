import { useContext, useEffect, useRef } from "react";
import userImg from "../images/user.jpg";
import { AuthContext } from "../context/AuthContext";

function Message({ message }) {
  const { curUser } = useContext(AuthContext);

  const ref = useRef();

  useEffect(() => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
  }, [message]);

  console.log(message);
  return (
    <div
      ref={ref}
      className={`message ${message.senderId === curUser.uid && "owner"}`}
    >
      <div className="message-info">
        <img src={userImg} alt="userImg" />
        <span>Just now</span>
      </div>
      <div className="messsage-content">
        <p>{message.text}</p>
      </div>
    </div>
  );
}

export default Message;
