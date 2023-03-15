import Img from "../assets/images/img.png"
import Attach from "../assets/images/attach.png"

const Input = () => {
    return (
        <div className="input">
            <input type="text" placeholder="Type your message..."/>
            <div className="send">
                <img src={Img} alt="" />
                <input type="file" style={{display:"none"}} id="file"/>
                <label htmlFor="file">
                    <img src={Attach} alt="" />
                </label>
                <button>Send</button>
            </div>
        </div>
    );
}
 
export default Input;