// services/reactionService.ts
import { db } from './FirebaseService';
import {
  collection,
  doc,
  setDoc,
  getDoc,
  getDocs,
  query,
  where,
  updateDoc,
  deleteDoc,
  addDoc,
  Timestamp,
} from 'firebase/firestore';

import { Reaction, ReactionType } from './models';
import { PostService } from './posts.services';
const ReactionCollection = collection(db, 'reactions');

export const ReactionService = {
  // ✅ Ajouter ou mettre à jour une réaction
  async react(userId: string, postId: string, type: ReactionType): Promise<void> {
    // on cherche s’il y a déjà une réaction de ce user sur ce post
    const q = query(
      ReactionCollection,
      where('userId', '==', userId),
      where('postId', '==', postId)
    );

    const snapshot = await getDocs(q);
    console.log("react ",type)
    if (snapshot.empty) {
      // Pas de réaction existante → on en crée une
      await addDoc(ReactionCollection, {
        userId,
        postId,
        type,
        createdAt: Timestamp.now(),
      });
      
      await PostService.incrementField(postId,type=="like"?"nbLikes":"nbDislikes",1)

    } else {
      // Réaction déjà existante → on met à jour le type
      const docRef = snapshot.docs[0].ref;
    //   await updateDoc(docRef, {
    //     type,
    //     createdAt: Timestamp.now(), // ou updatedAt si tu veux un autre champ
    //   });
        await this.removeReaction(userId,postId)
        await PostService.incrementField(postId,type=="like"?"nbLikes":"nbDislikes",-1) 

  
    }
  },

  // ✅ Supprimer une réaction
  async removeReaction(userId: string, postId: string): Promise<void> {
    const q = query(
      ReactionCollection,
      where('userId', '==', userId),
      where('postId', '==', postId)
    );

    const snapshot = await getDocs(q);
    for (const docSnap of snapshot.docs) {
      await deleteDoc(docSnap.ref);
    }
  },

  // ✅ Obtenir toutes les réactions d’un post
  async getReactionsForPost(postId: string): Promise<Reaction[]> {
    const q = query(ReactionCollection, where('postId', '==', postId));
    const snapshot = await getDocs(q);

    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...(doc.data() as Omit<Reaction, 'id'>),
      createdAt: (doc.data().createdAt as Timestamp).toDate(),
    }));
  },

  // ✅ Compter likes/dislikes pour un post
  async countReactions(postId: string): Promise<{ like: number; dislike: number }> {
    const reactions = await this.getReactionsForPost(postId);
    const like = reactions.filter(r => r.type === 'like').length;
    const dislike = reactions.filter(r => r.type === 'dislike').length;
    return { like, dislike };
  },
    // ✅ Vérifie si l'utilisateur a déjà réagi avec un type spécifique (like/dislike)
  async hasReacted(userId: string, postId: string, type: ReactionType): Promise<boolean> {
    const q = query(
      ReactionCollection,
      where('userId', '==', userId),
      where('postId', '==', postId),
      where('type', '==', type)
    );

    const snapshot = await getDocs(q);
    return !snapshot.empty;
  },



};
