// CommentService.ts
import {
  collection,
  query,
  where,
  orderBy,
  onSnapshot,
  QuerySnapshot,
  DocumentData,
} from 'firebase/firestore';
import { db } from './FirebaseService';

export const listenToComments=  (
    postId: string,
    onUpdate: (comments: any[]) => void
  ) => {
    const commentsRef = collection(db, 'comments');
    const q = query(
      commentsRef,
      where('postId', '==', postId),
      orderBy('time', 'desc')
    );

    const unsubscribe = onSnapshot(q, (snapshot: QuerySnapshot<DocumentData>) => {
      const comments = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));
      onUpdate(comments); // ⬅️ Callback appelé avec les données à jour
    });

    return unsubscribe; // Permet d’arrêter l’écoute si besoin
  }
