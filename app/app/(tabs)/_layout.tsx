import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Tabs } from 'expo-router';
import { useNotifications } from '@/context/NotificationContext';
export default function TabLayout() {
  const {unreadCount}=useNotifications()
  return (
    <Tabs screenOptions={{ tabBarActiveTintColor: 'blue',headerShown:false }}>
      <Tabs.Screen
        name="home"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => <FontAwesome size={28} name="home" color={color} />,
        }}
      />
    <Tabs.Screen
        name="createPost"
        options={{
          title: 'créer un post',
          tabBarIcon: ({ color }) => <FontAwesome size={28} name="plus-circle" color={color} />,
        }}
      />
      <Tabs.Screen
        name="NotificationScreen"
        options={{
          title: 'notifications ',
          tabBarBadge:unreadCount>0?unreadCount:'',
           tabBarBadgeStyle: {
            backgroundColor: "#e0245e", // style moderne type Instagram / Messenger
            color: "white",
            fontSize: 12,
          },
          tabBarIcon: ({ color }) => <FontAwesome size={28} name="bell" color={color} />,
        }}
      />
    </Tabs>
  );
}
