import {
  getFirestore,
  collection,
  addDoc,
  getDoc,
  doc,
  setDoc,
  query,
  QueryCompositeFilterConstraint,
  getDocs,
  updateDoc,
} from "firebase/firestore";

import app from "@/firebaseConfig";

const db = getFirestore(app);

// getting clan id from user data
// `/${data.clan._key.path.segments[data.clan._key.path.offset]}/${data.clan._key.path.segments[data.clan._key.path.offset + 1]}`

async function addDocument(collectionName: string, data: any) {
  try {
    const docRef = await addDoc(collection(db, collectionName), data);
    return docRef;
  } catch (error: any) {
    console.error(error);
  }
}

async function setDocument(collectionName: string, docId: string, data: any) {
  try {
    await setDoc(doc(db, collectionName, docId), data);
  } catch (error: any) {
    console.error(error);
  }
}

async function getDocument(collectionName: string, docId: string) {
  try {
    const docSnap = await getDoc(doc(db, collectionName, docId));
    if (!docSnap.exists()) {
      return null;
    }
    return docSnap.data();
  } catch (error: any) {
    console.error(error);
  }
}

function getUserDocRef(userId: string) {
  return doc(db, "users", userId);
}

async function updateDocument(
  collectionName: string,
  docId: string,
  data: any,
) {
  try {
    await updateDoc(doc(db, collectionName, docId), data);
  } catch (error: any) {
    console.error(error);
  }
}

async function deleteDocument(collectionName: string, docId: string) {
  try {
    await setDoc(doc(db, collectionName, docId), { deleted: true });
  } catch (error: any) {
    console.error(error);
  }
}

async function getCollection(
  path: string,
  pathSegments: string[],
  where?: QueryCompositeFilterConstraint,
) {
  try {
    const q = query(
      collection(db, path, ...pathSegments),
      where ? where : ({} as QueryCompositeFilterConstraint),
    );
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map((doc) => doc.data());
  } catch (error: any) {
    console.error(error);
  }
}

export {
  addDocument,
  getDocument,
  updateDocument,
  deleteDocument,
  getCollection,
  setDocument,
  getUserDocRef,
};
