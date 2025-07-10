import { useLocalSearchParams } from "expo-router"
import { View, Text, FlatList, SafeAreaView, TouchableOpacity, StyleSheet } from 'react-native';
// import { conversation } from "@/data"
import { Ionicons } from '@expo/vector-icons'
import { getByidForum } from "@/api/apiForum";
import { useState } from "react";
import Reaction from '@/components/Reaction'
import { ListComments } from "@/components/Comment";
export default function Forum(){
    
    const {id}=useLocalSearchParams()
    const conversation=getByidForum(id)
    const [likes,setLikes]=useState(0)
     const [likePressed, setLikePressed] = useState(false);
    const handleLike=()=>{
      if(!likePressed){
        setLikes(likes+1)
        setLikePressed(true)
      }else{
        setLikes(likes-1)
        setLikePressed(false)
      }
    }
   
    
    return(
        <>
        <SafeAreaView style={styles.container}>
            <TouchableOpacity style={styles.backButton}>
            <Ionicons name="arrow-back" size={24} color="black" />
            </TouchableOpacity>

            <View style={styles.topicCard}>
                  <Text style={styles.topicTitle}>{conversation.title}</Text>
                  <Text style={styles.topicMeta}>{conversation.author} · {conversation.time} · in General</Text>
                  <Text style={styles.topicContent}>{conversation.content}</Text>
                  <Text style={styles.topicMeta}>{conversation.replies.length} replies</Text>
                  <View style={styles.reactions}>
                  
                    <Reaction likePressed={likePressed}
                        handleLike={handleLike}
                        likes={likes}
                    />
                  </View>
            </View>
            <ListComments replies={conversation.replies}
            
            />

    </SafeAreaView>
        </>
    )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  backButton: {
    padding: 16,
  },
  topicCard: {
    paddingHorizontal: 16,
    paddingBottom: 8,
  },
  topicTitle: {
    fontSize: 22,
    fontWeight: 'bold',
  },
  topicMeta: {
    fontSize: 12,
    color: '#888',
    marginTop: 4,
  },
  topicContent: {
    fontSize: 14,
    color: '#444',
    marginTop: 8,
  },
  reactions: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 12,
  },

  list: {
    padding: 16,
  },
  reply: {
    marginBottom: 16,
  },
  replyAuthor: {
    fontWeight: 'bold',
    fontSize: 14,
  },
  replyContent: {
    fontSize: 14,
    color: '#333',
    marginTop: 4,
  },
  replyTime: {
    fontSize: 12,
    color: '#999',
    marginTop: 4,
  },
  replyLink: {
    fontSize: 13,
    color: '#007bff',
    marginTop: 6,
  },
});
