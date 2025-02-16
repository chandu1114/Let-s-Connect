import { useEffect, useState } from "react";
import userImg from "../images/user.jpg";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { ChatContext } from "../context/ChatContext";
import { db } from "../lib/firebase";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  serverTimestamp,
  onSnapshot,
  setDoc,
  updateDoc,
} from "firebase/firestore";

function Chats() {
  const [users, setUsers] = useState([]);
  const [chats, setChats] = useState([]);

  const { curUser } = useContext(AuthContext);
  const { dispatch } = useContext(ChatContext);

  const handleSelect = async (user) => {
    const combinedId =
      curUser.uid > user.id ? curUser.uid + user.id : user.id + curUser.uid;
    console.log(curUser.uid, user.id);

    try {
      const res = await getDoc(doc(db, "chats", combinedId));
      console.log("user", user);
      console.log("curUser", curUser);
      if (!res.exists()) {
        await setDoc(doc(db, "chats", combinedId), { messages: [] });

        await updateDoc(doc(db, "userChats", curUser.uid), {
          [combinedId + ".userInfo"]: {
            uid: user.id,
            displayName: user.displayName,
          },
          [combinedId + ".date"]: serverTimestamp(),
        });

        await updateDoc(doc(db, "userChats", user.id), {
          [combinedId + ".userInfo"]: {
            uid: curUser.uid,
            displayName: curUser.email.split("@")[0],
          },
          [combinedId + ".date"]: serverTimestamp(),
        });
      }
    } catch (err) {
      alert(err);
    }
  };

  const handleSelectUser = (user) => {
    dispatch({ type: "CHANGE_USER", payload: user });
  };

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        if (!curUser) return;

        const usersRef = collection(db, "users");
        const querySnapshot = await getDocs(usersRef);

        const filteredUsers = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        const filterdUsers2 = filteredUsers.filter(
          (user) => user.id !== curUser.uid
        );
        console.log(filterdUsers2);

        setUsers(filterdUsers2);
      } catch (error) {
        alert(error);
      }
    };
    fetchUsers();

    const recentUserInteractions = async () => {
      try {
        const getChats = () => {
          const unsub = onSnapshot(doc(db, "userChats", curUser.uid), (doc) => {
            setChats(doc.data());
          });
          return () => {
            unsub();
          };
        };
        curUser.uid && getChats();
      } catch (error) {
        alert(error);
      }
    };
    recentUserInteractions();
  }, [curUser]);

  return (
    <>
      <div className="chats-separator">
        <div className="chatsep">
          <h3>Recent Chats:</h3>
          {Object.entries(chats).length === 0 ? (
            <span>
              Start the conversations by selecting users showing in Database
            </span>
          ) : (
            Object.entries(chats)
              ?.sort((a, b) => b[1].date - a[1].date)
              .map((chat) => (
                <div
                  key={chat[0]}
                  onClick={() => handleSelectUser(chat[1].userInfo)}
                >
                  <div className="chats-container">
                    <img src={userImg} alt="userImage" className="userImage" />
                    <div className="chats">
                      <h2 className="chats-name">
                        {chat[1].userInfo.displayName}
                      </h2>
                      <p className="chats-text">{chat[1].lastMessage?.text}</p>
                    </div>
                  </div>
                </div>
              ))
          )}
        </div>

        <h3>List Of Users in Database:</h3>
        <div className="chatsep">
          {users.map((user) => (
            <div key={user.id} onClick={() => handleSelect(user)}>
              <div className="chats-container">
                <img src={userImg} alt="userImage" className="userImage" />
                <div className="chats">
                  <h2 className="chats-name">{user.displayName}</h2>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default Chats;
