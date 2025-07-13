import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Tabs } from 'expo-router';

export default function TabLayout() {
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
        name="createDiscussion"
        options={{
          title: 'créer un post',
          tabBarIcon: ({ color }) => <FontAwesome size={28} name="plus-circle" color={color} />,
        }}
      />
      <Tabs.Screen
        name="NotificationScreen"
        options={{
          title: 'notifications',
          tabBarIcon: ({ color }) => <FontAwesome size={28} name="bell" color={color} />,
        }}
      />
    </Tabs>
  );
}
