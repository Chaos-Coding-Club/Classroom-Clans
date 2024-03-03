import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  NextOrObserver,
  User,
  getAuth,
  signOut,
} from "firebase/auth";

import { setDocument } from "./db";
import app from "@/firebaseConfig";

const auth = getAuth(app);

// Authentication state listener
function onAuthStateChange(callback: NextOrObserver<User>) {
  return onAuthStateChanged(auth, callback);
}

async function register(
  email: string,
  password: string,
  username: string,
) {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password,
    );
    await setDocument("users", userCredential.user.uid, {
      email: userCredential.user.email,
      total_class_count: 0,
      total_class_points: 0,
      username,
    });
    return userCredential;
  } catch (error: any) {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.error(errorCode, errorMessage);
  }
}

async function login(email: string, password: string) {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password,
    );
    return userCredential;
  } catch (error: any) {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.error(errorCode, errorMessage);
  }
}

async function logout() {
  try {
    await signOut(auth);
    return true;
  } catch (error: any) {
    console.error(error);
    return false;
  }
}

export { onAuthStateChange, login, register, logout };
