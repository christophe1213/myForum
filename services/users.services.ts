// services/userService.ts
import { db } from "./FirebaseService";
import {
  collection,
  doc,
  setDoc,
  getDoc,
  getDocs,
  updateDoc,
  deleteDoc
} from "firebase/firestore";

export type User = {
  id: string;
  name: string;
  email: string;
  role?: string;
};

// 📁 Référence vers la collection "users"
const usersCollection = collection(db, "users");

export const UserService = {
  // 🔹 Create or update a user
  async createUser(user: User) {
    const userRef = doc(usersCollection, user.id);
    await setDoc(userRef, user);
  },

  // 🔹 Read one user by ID
  async getUser(id: string): Promise<User | null> {
    const userRef = doc(usersCollection, id);
    const docSnap = await getDoc(userRef);
    return docSnap.exists() ? { id, ...(docSnap.data() as Omit<User, "id">) } : null;
  },

  // 🔹 Read all users
  async getAllUsers(): Promise<User[]> {
    const snapshot = await getDocs(usersCollection);
    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...(doc.data() as Omit<User, "id">),
    }));
  },

  // 🔹 Update a user
  async updateUser(id: string, data: Partial<User>) {
    const userRef = doc(usersCollection, id);
    await updateDoc(userRef, data);
  },

  // 🔹 Delete a user
  async deleteUser(id: string) {
    const userRef = doc(usersCollection, id);
    await deleteDoc(userRef);
  }
};
