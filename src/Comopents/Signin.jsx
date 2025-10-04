import React, { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { signInEmailAndPassword, LoginwithGoogle } from "../Slice/Auth/authSlice";

export default function Login() {
    const emailRef = useRef("");
    const passwordRef = useRef("");
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const authState = useSelector((state) => state.auth);

    //  Form submit handler
    const handleSubmit = async (e) => {
        e.preventDefault();

        const email = emailRef.current.value;
        const password = passwordRef.current.value;

        const res = await dispatch(signInEmailAndPassword({ email, password }));

        if (res.type.endsWith("fulfilled")) {
            navigate("/ChatApp"); //  Login successful → redirect
        }

        // Optional: Clear form
        emailRef.current.value = "";
        passwordRef.current.value = "";
    };

    //  Google login handler
    const handleGoogle = async () => {
        const res = await dispatch(LoginwithGoogle());
        if (res.type.endsWith("fulfilled")) {
            navigate("/ChatApp");
        }
    };

    return (
        <div style={{ maxWidth: "400px", margin: "auto", padding: "20px", border: "1px solid #ccc", borderRadius: "8px" }}>
            <h2 style={{ textAlign: "center" }}>Login</h2>

            <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                <input type="email" placeholder="Email" ref={emailRef} required style={{ padding: "8px" }} />
                <input type="password" placeholder="Password" ref={passwordRef} required style={{ padding: "8px" }} />

                <button
                    type="submit"
                    disabled={authState.loading}
                // style={{ padding: "10px", backgroundColor: "#4caf50", color: "#fff", border: "none", borderRadius: "5px" }}
                >
                    {authState.loading ? "Signing in..." : "Sign In"}
                </button>
            </form>

            <button
                onClick={handleGoogle}
                style={{ marginTop: "10px", padding: "10px", backgroundColor: "#4285f4", color: "#fff", border: "none", borderRadius: "5px" }}
            >
                Continue with Google
            </button>
            <button onClick={() => navigate("/")}>don't Have an account</button>

        </div>
    );
}
