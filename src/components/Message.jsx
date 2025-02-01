import userImg from "../images/user.jpg";

function Message() {
  return (
    <div className="message owner">
      <div className="message-info">
        <img src={userImg} alt="userImg" />
        <span>Just now</span>
      </div>
      <div className="messsage-content">
        <p>Hello, how are you?</p>
      </div>
    </div>
  );
}

export default Message;
