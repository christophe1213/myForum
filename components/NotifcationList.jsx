import { useState } from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import moment from "moment";
import { TouchableOpacity } from "react-native";
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
