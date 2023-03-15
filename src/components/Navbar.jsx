const Navbar = () => {
    return (
        <div className="navbar">
            <span className="logo">Chat App</span>
            <div className="user">
                <img src="https://images3.alphacoders.com/909/90905.jpg" alt="user-avatar" />
                <span>Ichigo</span>
                <button>Logout</button>
            </div>
        </div>
    );
}
 
export default Navbar;