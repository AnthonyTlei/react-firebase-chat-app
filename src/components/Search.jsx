import { useContext, useState } from "react";
import { db } from "../firebase";
import {
  collection,
  getDoc,
  getDocs,
  query,
  setDoc,
  where,
  doc,
  updateDoc,
  serverTimestamp,
} from "firebase/firestore";
import { AuthContext } from "../context/AuthContext";
import { ChatContext } from "../context/ChatContext";
const Search = () => {
  const { currentUser } = useContext(AuthContext);
  const [username, setUsername] = useState("");
  const [user, setUser] = useState(null);
  const [error, setError] = useState(false);
  const { dispatch } = useContext(ChatContext);
  const handleSearch = async () => {
    const q = query(
      collection(db, "users"),
      where("displayName", "==", username)
    );
    try {
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        setUser(doc.data());
      });
    } catch (err) {
      setError(true);
    }
  };
  const handleKey = async (e) => {
    if (e.code === "Enter") {
      setUser(null);
      await handleSearch();
    }
  };
  const handleChange = (e) => {
    setUser(null);
    setUsername(e.target.value);
  };
  const handleSelect = async () => {
    const chatID =
      currentUser.uid > user.uid
        ? currentUser.uid + user.uid
        : user.uid + currentUser.uid;
    try {
      const res = await getDoc(doc(db, "chats", chatID));
      if (!res.exists()) {
        await setDoc(doc(db, "chats", chatID), { messages: [] });
        await updateDoc(doc(db, "userChats", currentUser.uid), {
          [chatID + ".userInfo"]: {
            uid: user.uid,
            displayName: user.displayName,
            photoURL: user.photoURL,
          },
          [chatID + ".date"]: serverTimestamp(),
        });
        await updateDoc(doc(db, "userChats", user.uid), {
          [chatID + ".userInfo"]: {
            uid: currentUser.uid,
            displayName: currentUser.displayName,
            photoURL: currentUser.photoURL,
          },
          [chatID + ".date"]: serverTimestamp(),
        });
      }
    } catch (err) {
      setError(true);
    }
    if (!error) {
      dispatch({ type: "CHANGE_USER", payload: user });
    }
    setUser(null);
    setUsername("");
  };
  return (
    <div className="search">
      <div className="searchForm">
        <input
          type="text"
          name=""
          id=""
          placeholder="Search user"
          onChange={handleChange}
          onKeyDown={handleKey}
          value={username}
        />
      </div>
      {error && <span>Something went wrong...</span>}
      {user && (
        <div className="userChat" onClick={handleSelect}>
          <img src={user.photoURL} alt="user-logo" />
          <div className="userChatInfo">
            <span>{user.displayName}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default Search;
