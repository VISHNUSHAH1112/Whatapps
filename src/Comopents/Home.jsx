// ChatApp.jsx
import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchMessages, sendMessage, editMessage, deleteMessage } from "../Slice/Auth/chatSlice";

export default function ChatApp({ currentUserId, otherUserId }) {
    const dispatch = useDispatch();
    const messages = useSelector(state => state.chat?.messages || []);

    const [text, setText] = useState("");
    const [editId, setEditId] = useState(null);
    const scrollRef = useRef();

    useEffect(() => {
        dispatch(fetchMessages({ userId1: currentUserId, userId2: otherUserId }));
    }, [currentUserId, otherUserId]);

    useEffect(() => {
        // Auto scroll to bottom
        scrollRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    const handleSend = () => {
        if (text.trim() === "") return;
        if (editId) {
            dispatch(editMessage({ id: editId, newMessage: text }));
            setEditId(null);
        } else {
            dispatch(sendMessage({ senderId: currentUserId, receiverId: otherUserId, message: text }));
        }
        setText("");
    };

    const handleEdit = (msg) => {
        setText(msg.message);
        setEditId(msg.id);
    };

    const handleDelete = (id) => {
        dispatch(deleteMessage(id));
    };

    // ✅ Inline Premium Styles
    const styles = {
        container: {
            maxWidth: "500px",
            margin: "50px auto",
            border: "1px solid #ddd",
            borderRadius: "10px",
            boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
            fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
            display: "flex",
            flexDirection: "column",
            height: "600px",
            backgroundColor: "#f9f9f9",
        },
        chatBox: {
            flex: 1,
            padding: "15px",
            overflowY: "auto",
            display: "flex",
            flexDirection: "column",
            gap: "8px",
            backgroundColor: "#e5ddd5",
            borderTopLeftRadius: "10px",
            borderTopRightRadius: "10px",
        },
        myMsg: {
            alignSelf: "flex-end",
            backgroundColor: "#dcf8c6",
            padding: "10px 15px",
            borderRadius: "20px",
            maxWidth: "70%",
            position: "relative",
        },
        otherMsg: {
            alignSelf: "flex-start",
            backgroundColor: "#fff",
            padding: "10px 15px",
            borderRadius: "20px",
            maxWidth: "70%",
            position: "relative",
        },
        buttonGroup: {
            display: "flex",
            gap: "5px",
            position: "absolute",
            top: "-25px",
            right: "0",
        },
        inputContainer: {
            display: "flex",
            padding: "10px",
            borderTop: "1px solid #ccc",
            backgroundColor: "#f0f0f0",
            borderBottomLeftRadius: "10px",
            borderBottomRightRadius: "10px",
        },
        input: {
            flex: 1,
            padding: "10px 15px",
            borderRadius: "25px",
            border: "1px solid #ccc",
            outline: "none",
            fontSize: "16px",
        },
        sendBtn: {
            marginLeft: "10px",
            padding: "10px 20px",
            border: "none",
            borderRadius: "25px",
            backgroundColor: "#128c7e",
            color: "#fff",
            fontWeight: "bold",
            cursor: "pointer",
        },
    };

    return (
        <div style={styles.container}>
            <div style={styles.chatBox}>
                {messages.map((msg) => (
                    <div
                        key={msg.id}
                        style={msg.senderId === currentUserId ? styles.myMsg : styles.otherMsg}
                        ref={scrollRef}
                    >
                        {msg.message}
                        {msg.senderId === currentUserId && (
                            <div style={styles.buttonGroup}>
                                <button onClick={() => handleEdit(msg)}>Edit</button>
                                <button onClick={() => handleDelete(msg.id)}>Delete</button>
                            </div>
                        )}
                    </div>
                ))}
            </div>
            <div style={styles.inputContainer}>
                <input
                    style={styles.input}
                    type="text"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    placeholder="Type a message"
                />
                <button style={styles.sendBtn} onClick={handleSend}>
                    {editId ? "Update" : "Send"}
                </button>
            </div>
        </div>
    );
}
