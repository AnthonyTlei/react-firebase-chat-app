import { useState } from "react";
import { db } from "../firebase";
import { collection, getDocs, query, where } from "firebase/firestore";
const Search = () => {
  const [username, setUsername] = useState("");
  const [user, setUser] = useState(null);
  const [error, setError] = useState(false);
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
    if (e.code == "Enter") {
        setUser(null);
        await handleSearch();
    }
  };
  const handleChange = (e) => {
    setUser(null);
    setUsername(e.target.value)
  }
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
        />
      </div>
      {error && <span>Something went wrong...</span>}
      {user && (
        <div className="userChat">
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
