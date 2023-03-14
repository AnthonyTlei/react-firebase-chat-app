import AddAvatar from "../assets/images/addAvatar.png"

const Register = () => {
    return ( 
        <div className="formContainer">
            <div className="formWrapper">
                <span className="logo">Chat App</span>
                <span className="title">Register</span>
                <form>
                    <input type="text" name="" id="" placeholder="display name"/>
                    <input type="email" name="" id="" placeholder="email"/>
                    <input type="password" name="" id="" placeholder="password"/>
                    <input style={{display:"none"}} type="file" name="" id="file" />
                    <label htmlFor="file">
                        <img src={AddAvatar} alt="avatar" />
                        <span>Add an avatar</span>
                    </label>
                    <button>Sign up</button>
                </form>
                <p>Already have an account? Login</p>
            </div>
        </div>
     );
}
 
export default Register;