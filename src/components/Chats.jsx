import userImg from "../images/user.jpg";

function Chats() {
  return (
    <>
      <div className="chats-container">
        <img src={userImg} alt="userImage" className="userImage" />
        <div className="chats">
          <h2 className="chats-name">Chadu</h2>
          <p className="chats-text">Hello</p>
        </div>
      </div>
      <div className="chats-container">
        <img src={userImg} alt="userImage" className="userImage" />
        <div className="chats">
          <h2 className="chats-name">Chadu</h2>
          <p className="chats-text">Hello</p>
        </div>
      </div>
      <div className="chats-container">
        <img src={userImg} alt="userImage" className="userImage" />
        <div className="chats">
          <h2 className="chats-name">Chadu</h2>
          <p className="chats-text">Hello</p>
        </div>
      </div>
    </>
  );
}

export default Chats;
