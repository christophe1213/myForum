import { useFocusEffect } from "expo-router";
import { useCallback, useEffect, useState } from "react";
import { getReplyComments,addReplyToComment } from "@/services/ReplyComment.services";
import { StyleSheet } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { View,Text,FlatList } from "react-native"
import { CommentService } from "@/services/comment.service";
import CommentInput from "@/components/CommentInput";
import { useAuth } from "@/context/AuthContext";
import { KeyboardAvoidingView } from "react-native";
import { Platform } from "react-native";
import { listenToComments, listenToReplyComments } from "@/services/realTime.service";
export default function AllRepliesScreen() {
  const {  id } = useLocalSearchParams();
  const [data,setData]=useState([])
  console.log(id+ 'dd')
  const {user}=useAuth()
  const [newComment,setNewComment]=useState('')
  const [comment,setComment]=useState({
    author:'',
    content:'',
    time:new Date()

  })
  // useFocusEffect(
    
  //   useCallback(()=>{
  //       if(id!='')
  //       getReplyComments(id).then((r)=>{
  //         console.log('donnée')
       
  //         if(r!==null)
  //              setData(r)
  //         console.log(r)
  //       }).catch((e)=>{
  //           console.error(e)
  //       })
  //       else console.log("comment id null ")
  //       CommentService.getComment(id).then((r)=>{
  //         setComment(r)
  //       }).catch((e)=>{
  //         console.error("error de récupération comment ",e)
  //       })   
  //       return()=>{
            
  //       }
  //   },[])
    
  // )
  useEffect(()=>{
    const unsubscribe=listenToReplyComments(id,setData)
    return ()=> unsubscribe() 
  },[])
  

  const handleReplyComment=()=>{
   
      addReplyToComment(id,newComment,user.id,user.name).then(()=>{
        console.log('commentaire bien reussi')
      }).catch((e)=>{
        console.error(e)
      })
      setNewComment('')
    }


  return (
    <KeyboardAvoidingView 
     style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={80}
    >

      
   <View style={styles.container}>
      <Text style={styles.title}>Réponses à :</Text>
  
      <FlatList
        data={data}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.reply}>
            <Text style={styles.author}>{item?.author}</Text>
            <Text style={styles.content}>{item.text}</Text>
          </View>
        )}
        contentContainerStyle={{ padding: 16 }}
      />
    
      <CommentInput value={newComment} onChangeText={setNewComment} onSubmit={handleReplyComment}  />

    </View>
    </KeyboardAvoidingView>
 
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  title: { fontSize: 16, fontWeight: 'bold', margin: 16 },
  reply: {
    marginTop: 10,
    paddingLeft: 8,
    borderLeftWidth: 2,
    borderColor: '#eee',
  },
  author: { fontWeight: 'bold', fontSize: 14 },
  content: { fontSize: 14, color: '#333', marginTop: 4 },
});