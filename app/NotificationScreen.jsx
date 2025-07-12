import React from "react";
import { SafeAreaView } from "react-native";
import { NotificationList } from "@/components/NotifcationList";

export default function NotificationsScreen() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <NotificationList />
    </SafeAreaView>
  );
}
