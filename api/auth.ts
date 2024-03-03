import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  NextOrObserver,
  User,
  getAuth,
  signOut,
} from "firebase/auth";

import app from "@/firebaseConfig";

const auth = getAuth(app);

// Authentication state listener
function onAuthStateChange(callback: NextOrObserver<User>) {
  return onAuthStateChanged(auth, callback);
}

async function register(email: string, password: string) {
  try {
    const userCredential = await createUserWithEmailAndPassword(
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
