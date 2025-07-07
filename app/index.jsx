import { SafeAreaView,TouchableOpacity, Text, View,FlatList } from "react-native";
import { Link } from "expo-router";
import { discussions } from "@/data";
import { StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { BtnAdd } from "@/components/BtnAdd";
import Discussions from "@/components/Discussion";
import LoginScreen from "@/components/Login";
import WelcomeScreen from "@/components/Welcome";
export default function Index() {
  return (
  //  <LoginScreen/>/
  <WelcomeScreen/>
    
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffff',
  },
  header: {
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '500',
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  list: {
    paddingHorizontal: 16,
  },
  card: {
    backgroundColor: '#f9f9f9',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: '#007bff',
  },
  description: {
    fontSize: 14,
    color: '#444',
    marginTop: 4,
  },
  meta: {
    fontSize: 12,
    color: '#888',
    marginTop: 8,
  },
  navBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 12,
    borderTopWidth: 1,
    borderColor: '#ddd',
    backgroundColor: '#fff',
  },
  navItem: {
    alignItems: 'center',
  },
  navText: {
    fontSize: 12,
    color: '#6c757d',
    marginTop: 4,
  },
});

