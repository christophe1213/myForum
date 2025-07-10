import {
  collection,
  doc,
  setDoc,
  getDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  query,
  where
} from "firebase/firestore";
import { db } from "./FirebaseService";

// ✅ Modèle TypeScript de ReplyComment
export interface ReplyComment {
  id: string;
  replyId: string; // identifiant de la réponse parent
  author: string;
  content: string;
  time: any; // Firebase Timestamp ou Date
}

const replyCommentsRef = collection(db, "replyComments");

export const ReplyCommentService = {
  // 🔹 Créer un commentaire sur une réponse
  async createReplyComment(replyId: string, comment: ReplyComment) {
    const commentWithReplyId = { ...comment, replyId };
    const commentRef = doc(replyCommentsRef);
    await setDoc(commentRef, commentWithReplyId);
  },

  // 🔹 Lire un commentaire
  async getReplyComment(commentId: string): Promise<ReplyComment | null> {
    const commentRef = doc(replyCommentsRef, commentId);
    const docSnap = await getDoc(commentRef);
    return docSnap.exists() ? { id: commentId, ...(docSnap.data() as Omit<ReplyComment, "id">) } : null;
  },

  // 🔹 Lister les commentaires d’une réponse
  async getReplyComments(replyId: string): Promise<ReplyComment[]> {
    const q = query(replyCommentsRef, where("replyId", "==", replyId));
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...(doc.data() as Omit<ReplyComment, "id">),
    }));
  },

  // 🔹 Mettre à jour un commentaire
  async updateReplyComment(commentId: string, data: Partial<ReplyComment>) {
    const commentRef = doc(replyCommentsRef, commentId);
    await updateDoc(commentRef, data);
  },

  // 🔹 Supprimer un commentaire
  async deleteReplyComment(commentId: string) {
    const commentRef = doc(replyCommentsRef, commentId);
    await deleteDoc(commentRef);
  },
};
