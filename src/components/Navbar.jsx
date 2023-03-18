import { signOut } from "firebase/auth";
import { auth } from "../firebase";

const Navbar = () => {
    return (
        <div className="navbar">
            <span className="logo">Chat App</span>
            <div className="user">
                <img src="https://images3.alphacoders.com/909/90905.jpg" alt="user-avatar" />
                <span>Ichigo</span>
                <button onClick={() => signOut(auth)}>Logout</button>
            </div>
        </div>
    );
}
 
export default Navbar;