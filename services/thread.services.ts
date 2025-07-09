// services/postService.ts

import { db } from './FirebaseService'; // db = firebase.firestore()

import { collection, doc,setDoc, getDoc, getDocs, addDoc, updateDoc, deleteDoc, Timestamp } from 'firebase/firestore';

import { Thread } from './models';

// 🔹 CREATE
// export const createThread = async (thread: Thread) => {
//   // await setDoc(doc(db, "thread", thread.id), thread);
//   const docRef = await addDoc(collection(db,"thread"),thread)
//   return docRef
// };

const threadsCollection = collection(db, "threads");

export const ThreadService = {
  // ✅ CREATE avec id généré automatiquement
  async createThread(thread: Omit<Thread, "id">): Promise<string> {
    const docRef = await addDoc(threadsCollection, thread);
    return docRef.id; // retourne l'id généré
  },

  // ✅ READ un seul thread
  async getThread(id: string): Promise<Thread | null> {
    const docRef = doc(db, "threads", id);
    const docSnap = await getDoc(docRef);
    return docSnap.exists() ? { id, ...(docSnap.data() as Omit<Thread, "id">) } : null;
  },

  // ✅ READ tous les threads
  async getAllThreads(): Promise<Thread[]> {
    const snapshot = await getDocs(threadsCollection);
    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...(doc.data() as Omit<Thread, "id">),
    }));
  },

  // ✅ UPDATE
  async updateThread(id: string, data: Partial<Thread>) {
    const docRef = doc(db, "threads", id);
    await updateDoc(docRef, data);
  },

  // ✅ DELETE
  async deleteThread(id: string) {
    const docRef = doc(db, "threads", id);
    await deleteDoc(docRef);
  },
};