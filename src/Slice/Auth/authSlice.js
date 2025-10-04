import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import { auth } from "../../Firebase/Firebase";
import { GoogleAuthProvider } from "firebase/auth";

import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  signInWithPopup,
} from "firebase/auth";

// 1️⃣ Email + Password Sign In Thunk
export const signInEmailAndPassword = createAsyncThunk(
  "auth/signInEmailAndPassword",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const SigninWithEp = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      return SigninWithEp;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

// 2️⃣ Email + Password Signup Thunk
export const signupEmailPassword = createAsyncThunk(
  "auth/signupEmailPassword",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const SignupWithEp = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      return SignupWithEp;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

// 3️⃣ Google Login Thunk
export const LoginwithGoogle = createAsyncThunk(
  "auth/LoginwithGoogle",
  async (_, { rejectWithValue }) => {
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      return result.user;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

// 4️⃣ Logout Thunk
export const logout = createAsyncThunk("auth/logout", async () => {
  await signOut(auth);
  return null;
});

// Slice create kar rahe
const authSlice = createSlice({
  name: "auth",
  initialState: { user: null, loading: false, error: null },
  reducers: {
    setuser: (state, action) => {
      state.user = action.payload;
    },
  },

  extraReducers: (builder) => {
    // SignInx
    builder.addCase(signInEmailAndPassword.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(signInEmailAndPassword.fulfilled, (state, action) => {
      state.loading = false;
      state.user = action.payload;
    });
    builder.addCase(signInEmailAndPassword.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    // Signup
    builder.addCase(signupEmailPassword.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(signupEmailPassword.fulfilled, (state, action) => {
      state.loading = false;
      state.user = action.payload;
    });
    builder.addCase(signupEmailPassword.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    //  Google Login
    builder.addCase(LoginwithGoogle.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(LoginwithGoogle.fulfilled, (state, action) => {
      state.loading = false;
      state.user = action.payload;
    });
    builder.addCase(LoginwithGoogle.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    //Logout
    builder.addCase(logout.fulfilled, (state, action) => {
      state.user = null;
    });
  },
});

export const { setuser } = authSlice.actions;
export default authSlice.reducer;
