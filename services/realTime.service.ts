// CommentService.ts
import {
  collection,
  query,
  where,
  orderBy,
  onSnapshot,
  QuerySnapshot,
  DocumentData,
  doc
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

  export const listenToNotifications=(
    userId:string,
    onUpdate: (comments: any[])=>void)=>{
      const notificationCollection = collection(db, 'notifications'); 
      const q = query(
            notificationCollection,
            where('userId', '==', userId),
            orderBy('time', 'desc')
          );
      
      const unsubscribe = onSnapshot(q, (snapshot: QuerySnapshot<DocumentData>) => {
      const notifications = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));
      onUpdate(notifications); // ⬅️ Callback appelé avec les données à jour
    });

    return unsubscribe; // Permet d’arrêter l’écoute si besoin    
  }


export const listenToPostById=(postId:string,onUpdate: ({}) => void)=>{
  const postRef = doc(db, "posts", postId);

  const unsubscribe = onSnapshot(postRef, (docSnapshot) => {
    if (docSnapshot.exists()) {
      onUpdate({
        id: docSnapshot.id,
        ...docSnapshot.data(),
      });
    } else {
      onUpdate({}); // ou gérer l’absence du document
    }
  });
  return unsubscribe
}

export const listenToPost=(onUpdate: ({}) => void)=>{
  const postRef = doc(db, "posts");

  const unsubscribe = onSnapshot(postRef, (docSnapshot) => {
    if (docSnapshot.exists()) {
      onUpdate({
        
        ...docSnapshot.data(),
      });
    } else {
      onUpdate({}); // ou gérer l’absence du document
    }
  });
  return unsubscribe
} 