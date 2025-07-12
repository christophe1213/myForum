import { useState } from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import moment from "moment";

const staticNotifications = [
  {
    id: "1",
    title: "Alice a commenté votre post",
    type: "comment",
    isRead: false,
    time: new Date(Date.now() - 2 * 60 * 60 * 1000), // il y a 2 heures
  },
  {
    id: "2",
    title: "Bob a aimé votre réponse",
    type: "like",
    isRead: true,
    time: new Date(Date.now() - 30 * 60 * 1000), // il y a 30 min
  },
  {
    id: "3",
    title: "Clara a répondu à votre commentaire",
    type: "comment",
    isRead: false,
    time: new Date(Date.now() - 5 * 60 * 1000), // il y a 5 min
  },
];

export const NotificationList = () => {
  const [notifications] = useState(staticNotifications);

  const renderItem = ({ item }) => (
    <View style={[styles.card, !item.isRead && styles.unread]}>
      <Ionicons
        name={item.type === "like" ? "heart-outline" : "chatbubble-ellipses-outline"}
        size={24}
        color={item.type === "like" ? "#e91e63" : "#007bff"}
        style={styles.icon}
      />
      <View style={styles.textContainer}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.time}>{moment(item.time).fromNow()}</Text>
      </View>
    </View>
  );

  return (
    <FlatList
      data={notifications}
      keyExtractor={(item) => item.id}
      renderItem={renderItem}
      contentContainerStyle={styles.container}
      ListEmptyComponent={<Text style={styles.empty}>Aucune notification</Text>}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  card: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f2f2f2",
    padding: 12,
    borderRadius: 10,
    marginBottom: 10,
  },
  unread: {
    backgroundColor: "#e6f0ff",
  },
  icon: {
    marginRight: 12,
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontSize: 15,
    fontWeight: "500",
  },
  time: {
    fontSize: 12,
    color: "#666",
    marginTop: 4,
  },
  empty: {
    textAlign: "center",
    color: "#999",
    marginTop: 50,
    fontSize: 16,
  },
});
