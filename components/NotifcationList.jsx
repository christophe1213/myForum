import { useState } from "react";
import { View, Text, FlatList, StyleSheet , TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import moment from "moment";
export const NotificationList = ({notifications=[],read=()=>{}}) => {
  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={()=>read(item.id,item.lien)}>
      <View style={[styles.card, !item.isRead && styles.unread]}>
          <Ionicons
            name={item.type === "like" ? "heart-outline" : "chatbubble-ellipses-outline"}
            size={24}
            color={item.type === "like" ? "#e91e63" : "#007bff"}
            style={styles.icon}
          />
          <View style={styles.textContainer}>
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.time}>{moment(item.time.toDate()).fromNow()}</Text>
          </View>
        </View>
    </TouchableOpacity>
  
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
    padding: 20,
  },
  card: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF", // Blanc pur
    padding: 15,
    borderRadius: 12, // Coins plus arrondis
    marginBottom: 12,
    shadowColor: "#000", // Ombre subtile
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 3,
  },
  unread: {
    backgroundColor: "#E6F0FF", // Bleu pastel doux pour non lu
    borderLeftWidth: 4, // Barre latérale pour indiquer non lu
    borderLeftColor: "#5A67D8", // Couleur primaire
  },
  icon: {
    marginRight: 15,
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: "600",
    color: "#2C3E50", // Gris foncé élégant
  },
  time: {
    fontSize: 13,
    color: "#888888", // Gris clair
    marginTop: 4,
  },
  empty: {
    textAlign: "center",
    color: "#7F8C8D", // Gris neutre
    marginTop: 50,
    fontSize: 16,
    fontWeight: "500",
  },
});
