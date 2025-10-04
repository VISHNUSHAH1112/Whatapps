// chatSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { db } from "../../Firebase/Firebase";
import {
  collection,
  addDoc,
  query,
  where,
  orderBy,
  onSnapshot,
  doc,
  updateDoc,
  deleteDoc,
  serverTimestamp,
} from "firebase/firestore";

// ✅ Fetch messages 2-way real-time
export const fetchMessages = createAsyncThunk(
  "chat/fetchMessages",
  async ({ userId1, userId2 }, { dispatch }) => {
    // 2-way chat query
    const q1 = query(
      collection(db, "chats"),
      where("senderId", "==", userId1),
      where("receiverId", "==", userId2),
      orderBy("timestamp", "asc")
    );
    const q2 = query(
      collection(db, "chats"),
      where("senderId", "==", userId2),
      where("receiverId", "==", userId1),
      orderBy("timestamp", "asc")
    );

    // Listen for both queries
    onSnapshot(q1, (snapshot) => {
      let messages = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      dispatch(setMessages(messages));
    });
    onSnapshot(q2, (snapshot) => {
      let messages = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      dispatch(setMessages((prev) => [...prev, ...messages])); // merge
    });
  }
);

// ✅ Send message
export const sendMessage = createAsyncThunk(
  "chat/sendMessage",
  async ({ senderId, receiverId, message }) => {
    await addDoc(collection(db, "chats"), {
      senderId,
      receiverId,
      message,
      timestamp: serverTimestamp(),
    });
  }
);

// ✅ Edit message
export const editMessage = createAsyncThunk(
  "chat/editMessage",
  async ({ id, newMessage }) => {
    const docRef = doc(db, "chats", id);
    await updateDoc(docRef, { message: newMessage });
  }
);

// ✅ Delete message
export const deleteMessage = createAsyncThunk(
  "chat/deleteMessage",
  async (id) => {
    const docRef = doc(db, "chats", id);
    await deleteDoc(docRef);
  }
);

const chatSlice = createSlice({
  name: "chat",
  initialState: { messages: [] },
  reducers: {
    setMessages: (state, action) => {
      state.messages = action.payload;
    },
  },
});

export const { setMessages } = chatSlice.actions;
export default chatSlice.reducer;
