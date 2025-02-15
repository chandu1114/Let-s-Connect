import { useEffect, useState } from "react";
import userImg from "../images/user.jpg";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { db } from "../lib/firebase";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  serverTimestamp,
  setDoc,
  updateDoc,
} from "firebase/firestore";

function Chats() {
  const [users, setUsers] = useState([]);
  const { curUser } = useContext(AuthContext);

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
  }, [curUser]);

  return (
    <>
      {users.map((user) => (
        <div key={user.id} onClick={() => handleSelect(user)}>
          <div className="chats-container">
            <img src={userImg} alt="userImage" className="userImage" />
            <div className="chats">
              <h2 className="chats-name">{user.displayName}</h2>
              <p className="chats-text">Hello</p>
            </div>
          </div>
        </div>
      ))}
    </>
  );
}

export default Chats;
