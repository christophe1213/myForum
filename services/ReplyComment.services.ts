import {
  collection,
  doc,
  addDoc,
  arrayUnion,
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


export const addReplyToComment = async (commentId:string, replyText:string,idAuthor:string,author:'') => {
  const commentRef = doc(db, 'comments', commentId);
  const commentSnap = await getDoc(commentRef);

  if (!commentSnap.exists()) {
    console.error("Commentaire parent introuvable");
    return;
  }

  const commentData = commentSnap.data();
  const repliesArray = commentData.replies || [];

  // Création du sous-commentaire dans la collection "replies"
  const replyDocRef = await addDoc(collection(db, 'replies'), {
    text: replyText,
    parentCommentId: commentId,
    author:author,
    idAuthor:idAuthor,
    createdAt: new Date()
  });

  // Si c’est le premier sous-commentaire, on ajoute un aperçu dans le tableau `replies`
  if (repliesArray.length === 0) {
    const previewReply = {
      replyId: replyDocRef.id,
      text: replyText,
      createdAt: new Date()
    };

    await updateDoc(commentRef, {
      replies: arrayUnion(previewReply)
    });
  }
};

interface Replies {
  id: string;
  text: string;
  parentCommentId: string;
  author: string;
  idAuthor: string;
  createdAt: Date; // ou Timestamp selon ta config Firestore
}




// export const getReplyComment = async (parentCommentId: string): Promise<Replies | null> => {
//   const replyRef = doc(collection(db, 'replies'), parentCommentId);
//   const docSnap = await getDoc(replyRef);

//   if (!docSnap.exists()) return null;

//   const data = docSnap.data();

//   // On vérifie que les champs nécessaires sont bien présents (bonnes pratiques)

// };

 export const getReplyComments=async(replyId: string): Promise<Replies[]> =>{
    
    const replyComments = collection(db, "replies");
    const q = query(replyComments, where("parentCommentId", "==", replyId));
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...(doc.data() as Omit<Replies, "id">),
    }));
  }