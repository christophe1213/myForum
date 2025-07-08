// services/postService.ts

import { db } from './FirebaseService'; // db = firebase.firestore()

import { collection, doc,setDoc, getDoc, getDocs, addDoc, updateDoc, deleteDoc, Timestamp } from 'firebase/firestore';

export type Thread = {
  id: string;
  title: string;
  description: string;
  userId: string;
};

// 🔹 CREATE
export const createThread = async (thread: Thread) => {
  await setDoc(doc(db, "thread", thread.id), thread);
};

// 🔹 READ ONE
export const getThreadById = async (id: string): Promise<Thread | null> => {
  const docRef = doc(db, "thread", id);
  const snap = await getDoc(docRef);
  return snap.exists() ? (snap.data() as Thread) : null;
};

// 🔹 READ ALL
export const getAllThreads = async (): Promise<Thread[]> => {
  const colRef = collection(db, "threads");
  const snapshot = await getDocs(colRef);
  return snapshot.docs.map((doc) => doc.data() as Thread);
};

// 🔹 UPDATE
export const updateThread = async (id: string, updates: Partial<Thread>) => {
  const docRef = doc(db, "threads", id);
  await updateDoc(docRef, updates);
};

// 🔹 DELETE
export const deleteThread = async (id: string) => {
  const docRef = doc(db, "threads", id);
  await deleteDoc(docRef);
};