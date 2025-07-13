import {
  collection,
  doc,
  addDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  query,
  where,
  orderBy,
  Timestamp,
} from 'firebase/firestore';
import { db } from './FirebaseService';
import { Notification } from './models';

const notificationCollection = collection(db, 'notifications');

export const NotificationService = {
  // 🔔 Ajouter une notification
  async sendNotification(notification: Omit<Notification, 'id'>) {
    await addDoc(notificationCollection, {
      ...notification,
    
      isRead: false,
    });
  },

  // 📬 Lister les notifications d’un utilisateur
  async getNotifications(userId: string): Promise<Notification[]> {
    const q = query(
      notificationCollection,
      where('userId', '==', userId),
      orderBy('time', 'desc')
    );
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...(doc.data() as Omit<Notification, 'id'>),
      time: (doc.data().time as Timestamp).toDate(),
    }));
  },

  // ✅ Marquer une notification comme lue
  async markAsRead(notificationId: string) {
    const ref = doc(db, 'notifications', notificationId);
    await updateDoc(ref, { isRead: true });
  },

  // ❌ Supprimer une notification
  async deleteNotification(notificationId: string) {
    const ref = doc(db, 'notifications', notificationId);
    await deleteDoc(ref);
  },
};
