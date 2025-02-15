import { useEffect, useState } from "react";
import userImg from "../images/user.jpg";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { db } from "../lib/firebase";
import { collection, getDocs } from "firebase/firestore";

function Chats() {
  const [users, setUsers] = useState([]);
  const { curUser } = useContext(AuthContext);

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
        console.log(error);
      }
    };
    fetchUsers();
  }, [curUser]);

  return (
    <>
      {users.map((user) => (
        <div key={user.id}>
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
