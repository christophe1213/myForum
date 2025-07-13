import {
  collection,
  doc,
  setDoc,
  getDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  query,
  increment,
  where,
  orderBy
} from "firebase/firestore";
import { db } from "./FirebaseService";

// ✅ Modèle TypeScript de Comment
export interface Comment {
  id?: string;
  postId: string; // 
  author: string;
  content: string;
  time: any; // Firebase Timestamp ou Date
}

const CommentsRef = collection(db, "comments");

export const CommentService = {
  // 🔹 Créer un commentaire sur une réponse
  async create( comment: Comment) {
    // const commentWithReplyId = { ...comment };
    const commentRef = doc(CommentsRef);
    await setDoc(commentRef, comment);
    await this.incrementField(comment.postId,"nbComments",1)
  },

  // 🔹 Lister les commentaires d’une POST
  async getComments(replyId: string): Promise<Comment[]> {
    const q = query(CommentsRef, where("postId", "==", replyId), orderBy('time', 'desc'));
    const snapshot = await getDocs(q);
    
    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...(doc.data() as Omit<Comment, "id">),
    }));
  },
  // 🔹 Lire un commentaire
  async getComment(commentId: string): Promise<Comment | null> {
    const commentRef = doc(CommentsRef, commentId);
    const docSnap = await getDoc(commentRef);
    return docSnap.exists() ? { id: commentId, ...(docSnap.data() as Omit<Comment, "id">) } : null;
  },

 

  // 🔹 Mettre à jour un commentaire
  async updateComment(commentId: string, data: Partial<Comment>) {
    const commentRef = doc(CommentsRef, commentId);
    await updateDoc(commentRef, data);
  },

  // 🔹 Supprimer un commentaire
  async deleteComment(commentId: string) {
    const commentRef = doc(CommentsRef, commentId);
    await deleteDoc(commentRef);
  },

  async incrementField(postId: string, field: "nbComments" | "nbLikes" | "nbDislikes", delta: number = 1) {
  const docRef = doc(db, "posts", postId);
  await updateDoc(docRef, {
    [field]: increment(delta),
  });
}
};
