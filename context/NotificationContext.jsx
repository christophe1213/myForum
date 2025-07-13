
import  { createContext, useContext, useEffect, useState, useMemo } from "react";
// import { listenToNotifications } from "@/services/NotificationService";
import { listenToNotifications } from "@/services/realTime.service";
import { useAuth } from "./AuthContext";


const NotificationContext = createContext({
  notifications: [],
  unreadCount: 0,
});

export const NotificationProvider = ({ children }) => {
  const { user } = useAuth();
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    if (!user?.id) return;

    const unsubscribe = listenToNotifications(user.id, (notifs) => {
      setNotifications(notifs);
    });

    return () => unsubscribe(); // Nettoyage lors du démontage
  }, [user?.id]);

  const value = useMemo(() => {
    return {
      notifications,
      unreadCount: notifications.filter((n) => !n.isRead).length,
    };
  }, [notifications]);

  return (
    <NotificationContext.Provider value={value}>
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotifications = () => useContext(NotificationContext);
