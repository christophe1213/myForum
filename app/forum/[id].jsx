import { useLocalSearchParams } from "expo-router"
import { View, Text, FlatList, SafeAreaView, TouchableOpacity, StyleSheet } from 'react-native';
// import { conversation } from "@/data"
import { Ionicons } from '@expo/vector-icons'
import { getByidForum } from "@/api/apiForum";
import { useState } from "react";
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
    const renderReply = ({ item }) => (
    <View style={styles.reply}>
      <Text style={styles.replyAuthor}>{item.author}</Text>
      <Text style={styles.replyContent}>{item.content}</Text>
      <Text style={styles.replyTime}>{item.time}</Text>
      <Text style={styles.replyLink}>Reply</Text>
    </View>)
    
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
          <TouchableOpacity onPress={handleLike} style={{ flexDirection: 'row', alignItems: 'center' }}>
             <Ionicons name={likePressed ? "thumbs-up" : "thumbs-up-outline"} size={20} color={likePressed ? "blue" : "gray"} />
              <Text style={styles.iconText}>{likes}</Text>
              
          </TouchableOpacity>
         
        </View>
      </View>

      <FlatList
        data={conversation.replies}
        renderItem={renderReply}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.list}
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
  iconText: {
    fontSize: 12,
    color: '#555',
    marginLeft: 4,
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
