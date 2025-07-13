import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native";
import { NotificationList } from "@/components/NotifcationList";
import { NotificationService } from "@/services/notification.services";
import { useAuth } from "@/context/AuthContext";
import { useRoute } from "@react-navigation/native";
import { useRouter } from "expo-router";
export default function NotificationsScreen() {
  const {user}=useAuth()
  const [notifications,setNotification]=useState([])
  const router= useRouter()
  const readNotify=async(notifyId,url='')=>{
      try{
       
        await NotificationService.markAsRead(notifyId)
        router.push('/app/'+url)
        console.log('mark ready bien reusi')
      }catch(e){
        console.error(e)
      }
  }
  
  useEffect(()=>{
    NotificationService.getNotifications(user.id).then((r)=>{
     if(r!=null) setNotification(r)
    }).catch((e)=>{
      console.error("il y a une erreur ",e)
    })
  },[])

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <NotificationList notifications={notifications} 
        read={readNotify}
      />
    </SafeAreaView>
  );
}
