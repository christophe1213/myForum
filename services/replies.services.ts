import { Reply } from "./models";
import {
  collection,
  doc,
  setDoc,
  getDoc,
  getDocs,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";
import { db } from "./FirebaseService";
// 🔧 Génère une référence vers la sous-collection replies d’un thread
const repliesRef = (threadId: string) => collection(db, "threads", threadId, "replies");

export const ReplyService = {
  // 🔹 Ajouter une réponse
  async createReply(threadId: string, reply: Reply) {
    const replyRef = doc(repliesRef(threadId), reply.id);
    await setDoc(replyRef, reply);
  },

  // 🔹 Lire une réponse
  async getReply(threadId: string, replyId: string): Promise<Reply | null> {
    const replyRef = doc(repliesRef(threadId), replyId);
    const docSnap = await getDoc(replyRef);
    return docSnap.exists() ? { id: replyId, ...(docSnap.data() as Omit<Reply, "id">) } : null;
  },

  // 🔹 Lister toutes les réponses d’un thread
  async getReplies(threadId: string): Promise<Reply[]> {
    const snapshot = await getDocs(repliesRef(threadId));
    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...(doc.data() as Omit<Reply, "id">),
    }));
  },

  // 🔹 Mettre à jour une réponse
  async updateReply(threadId: string, replyId: string, data: Partial<Reply>) {
    const replyRef = doc(repliesRef(threadId), replyId);
    await updateDoc(replyRef, data);
  },

  // 🔹 Supprimer une réponse
  async deleteReply(threadId: string, replyId: string) {
    const replyRef = doc(repliesRef(threadId), replyId);
    await deleteDoc(replyRef);
  },
};