import { useLocalSearchParams } from "expo-router"
import { View, Text, FlatList, SafeAreaView, TouchableOpacity, StyleSheet } from 'react-native';
// import { conversation } from "@/data"
import { Ionicons } from '@expo/vector-icons'
import { getByidForum } from "@/api/apiForum";
import { useEffect, useState } from "react";
import Reaction from '@/components/Reaction'
import { ListComments } from "@/components/Comment";
import { ThreadService } from "@/services/thread.services";
import  BtnComment  from "@/components/BtnComment";
import { ReplyService } from "@/services/replies.services";
import { useAuth } from "@/context/AuthContext";
import { CommentService } from "@/services/comment.service";
import { PostService } from "@/services/posts.services";
export default function Forum(){
    
    const {id}=useLocalSearchParams()
    const conversation=getByidForum(id)
    const {user }=useAuth()
    const [likes,setLikes]=useState(0)
    const [likePressed, setLikePressed] = useState(false);
    const [showComment,setShowComment]=useState(false)
    const [author,setAuthor]=useState('')
    const [title,setTitle]=useState('')
    const [replies,setReplies]=useState([])
    const [description,setDesciption]=useState('')
    

    const handleLike=()=>{
      if(!likePressed){
        setLikes(likes+1)
        setLikePressed(true)
      }else{
        setLikes(likes-1)
        setLikePressed(false)
      }
    }
    

    const handleComent=(text)=>{
      const newComment = {
        author: user.name,
        content: text,
        time: new Date(),
        commentId:id
      };
      CommentService.create(newComment).then((r)=>{
        console.log("commentaire bien passé")
        setReplies([newComment, ...replies]);
        setShowComment(false)
      
      }).catch((e)=>{
        console.error(e)
      })
    }

    const handleReplyComment=(commentId,text)=>{
      const replyComment={
        replyId:commentId,
        author:user.name,
        userId:user.id,
        content:text,
        time:new Date()
      }
    

    } 
    useEffect(()=>{
        PostService.getPost(id).then((r)=>{
          if(r!==null){
            setTitle(r.title)
            setDesciption(r.description)
            setLikes(r.nbLike)
            setAuthor(r.author.name)
          }
        
        }).catch((e)=>{
          console.error(e)
        })
       
        CommentService.getComments(id).then((r)=>{
          if(r!=null)setReplies(r)
          console.log(r)
        }).catch((e)=>{
          console.error(e)
        })

    },[])
   
    return(
        <>
        <SafeAreaView style={styles.container}>
            <TouchableOpacity style={styles.backButton}>
            <Ionicons name="arrow-back" size={24} color="black" />
            </TouchableOpacity>

            <View style={styles.topicCard}>
                  <Text style={styles.topicTitle}> {title} </Text>
                  <Text style={styles.topicMeta}> {author} · {conversation.time}  · en general</Text>
                  <Text style={styles.topicContent}>{description}</Text>
                  <Text style={styles.topicMeta}> {replies.length}  réponse</Text>
                  <View style={styles.reactions}>
                  
                    <Reaction likePressed={likePressed}
                        handleLike={handleLike}
                        likes={likes}
                    />
                    <BtnComment
                        show={showComment}
                        showInputComment={()=>setShowComment(true)}
                        nbComment={replies.length}
                        handleSendReply={handleComent}
                    />
            </View>
            </View>
            <ListComments replies={replies}
              replyComent={handleReplyComment}
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
