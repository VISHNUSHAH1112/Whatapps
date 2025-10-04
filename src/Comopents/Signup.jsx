// import { Button } from "bootstrap"
import { useRef } from "react";
import { Button } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom"
import { signupEmailPassword } from "../Slice/Auth/authSlice";

export default function Signup() {
    const nameref = useRef("")
    const emailref = useRef("")
    const passwordref = useRef("")
    const navigate = useNavigate();
    const dispatch = useDispatch()

    const handleSubmit = async (e) => {
        e.preventDefault();

        const name = nameref.current.value;
        const email = emailref.current.value;
        const password = passwordref.current.value;

        const res = await dispatch(signupEmailPassword({ name, email, password }));
        // if (res.payload) {
        //     navigate("/Signin")
        // }
        if (res.type.endsWith("fullfiled")) {
            navigate("/Signin")
        }
    }
    return (
        <div>
            <form action="" onSubmit={handleSubmit}>
                <input type="name" placeholder="Name" ref={nameref} required style={{ padding: "8px" }} />
                <br />
                <input type="email" placeholder="Email" ref={emailref} required style={{ padding: "8px" }} />
                <br />
                <input type="password" placeholder="Password" ref={passwordref} required style={{ padding: "8px" }} />
                <div>
                    <Button>Sign Up</Button>
                    <br />

                    <button onClick={() => navigate("/Signin")}>Already have an account.</button>
                </div>
            </form>
        </div>
    );
}