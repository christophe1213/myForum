// services/postService.ts

import { db } from './FirebaseService'; // db = firebase.firestore()

import { collection, doc,setDoc, getDoc, getDocs, addDoc, updateDoc, deleteDoc, Timestamp } from 'firebase/firestore';

import {Post } from './models';


const PostCollection = collection(db, "posts");

export const PostService = {
  // ✅ CREATE avec id généré automatiquement
  async createPost(post: Omit<Post, "id">): Promise<string> {
    const docRef = await addDoc(PostCollection, post);
    return docRef.id; // retourne l'id généré
  },

  // ✅ READ un seul thread
  async getPost(id: string): Promise<Post | null> {
    const docRef = doc(db, "posts", id);
    const docSnap = await getDoc(docRef);
    return docSnap.exists() ? { id, ...(docSnap.data() as Omit<Post, "id">) } : null;
  },

  // ✅ READ tous les threads
  async getAllPosts(): Promise<Post[]> {
    const snapshot = await getDocs(PostCollection);
    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...(doc.data() as Omit<Post, "id">),
    }));
  },

  // ✅ UPDATE
  async updatePost(id: string, data: Partial<Post>) {
    const docRef = doc(db, "pots", id);
    await updateDoc(docRef, data);
  },

  // ✅ DELETE
  async deleteThread(id: string) {
    const docRef = doc(db, "posts", id);
    await deleteDoc(docRef);
  },
};