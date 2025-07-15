import React, { useEffect, useState } from "react";
import { SafeAreaView, View, Text, StyleSheet } from "react-native";
import { NotificationList } from "@/components/NotifcationList";
import { NotificationService } from "@/services/notification.services";
import { useAuth } from "@/context/AuthContext";
import { useRoute } from "@react-navigation/native";
import { useRouter } from "expo-router";
import { useNotifications } from '@/context/NotificationContext';
export default function NotificationsScreen() {
  const {user}=useAuth()
  // const [notifications,setNotification]=useState([])
  const router= useRouter()
  const {notifications}=useNotifications()
  const readNotify=async(notifyId,url='')=>{
      try{
       
        await NotificationService.markAsRead(notifyId)
        router.push('/app/'+url)
        console.log('mark ready bien reusi')
      }catch(e){
        console.error(e)
      }
  }
  
  // useEffect(()=>{
  //   NotificationService.getNotifications(user.id).then((r)=>{
  //    if(r!=null) setNotification(r)
  //   }).catch((e)=>{
  //     console.error("il y a une erreur ",e)
  //   })
  // },[])

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Notifications</Text>
      </View>
      <NotificationList notifications={notifications} 
        read={readNotify}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F8F8', // Fond légèrement gris
  },
  header: {
    padding: 20,
    backgroundColor: '#FFFFFF', // Fond blanc pour l'en-tête
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
    marginBottom: 10,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: '700',
    color: '#2C3E50',
  },
});
