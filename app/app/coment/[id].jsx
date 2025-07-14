import { useLocalSearchParams } from "expo-router"
import { View, Text, FlatList, SafeAreaView, TouchableOpacity, StyleSheet } from 'react-native';
// import { conversation } from "@/data"
import { Ionicons } from '@expo/vector-icons'
import { getByidForum } from "@/api/apiForum";
import { useEffect, useState } from "react";
import Reaction from '@/components/Reaction'
import { ListComments } from "@/components/Comment";
import  BtnComment  from "@/components/BtnComment";
import { useAuth } from "@/context/AuthContext";
import { CommentService } from "@/services/comment.service";
import { listenToComments,listenToPostById } from "@/services/realTime.service";
import { NotificationService } from "@/services/notification.services";
import {ReactionService} from "@/services/reactionPost.service"
import moment from "moment";
export default function Forum(){
    
    const {id}=useLocalSearchParams()
    const {user}=useAuth()
    const [disLikePressed,setDisLikePressed]=useState(false)
    const [likePressed, setLikePressed] = useState(false);
    const [showComment,setShowComment]=useState(false)
    const [replies,setReplies]=useState([])

    
    const [post,setPost]=useState({
      id:'',
      title:'',
      description:'',
      userId:'',
      author:'',
      createdAt:new Date(),
      nbLikes:0,
      nbDislikes:0,
      nbComments:0
    })


    const handleLike=()=>{
      if(!likePressed){
        setLikePressed(true)
      }else{
        setLikePressed(false)
      }
      console.log("dans le fonction handleLike")
      ReactionService.react(user.id,post.id,"like")
    }
    const handleDislike=()=>{
      if(!disLikePressed){
        setDisLikePressed(true)
      }else{
        setDisLikePressed(false)
      }
      console.log("dans le fonction handleDisLike")
      ReactionService.react(user.id,post.id,"dislike")
    }

    
    

    const handleComent=async(text)=>{
      const newComment = {
        author: user.name,
        content: text,
        time: new Date(),
        postId:id
      };
      try{
          await CommentService.create(newComment)
          setShowComment(false)
          try {
            await NotificationService.sendNotification({
              userId: post.userId,
              title: `${user.post} a commenté votre poste`,
              type: "comment",
              isRead: false,
              time: new Date(),
              lien: `coment/${id}`
            });
            console.log("notification reussi")
          } catch (notifError) {
              console.warn("Erreur lors de l'envoi de la notification :", notifError);
          }
          }catch(e){
            console.log('erreur creation comment')
            console.error(e)
        }
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
        const unsubscribe = listenToComments(id, setReplies)
        return ()=>unsubscribe()
    },[])
    
    useEffect(()=>{
        const unsubscribe = listenToPostById(id, setPost)
        return ()=>unsubscribe()
      },[])
    
    useEffect(()=>{
      ReactionService.hasReacted(user.id,id,'like').then((r)=>{
        setLikePressed(r)
      }).catch((e)=>{
        console.error(e)
      })
      ReactionService.hasReacted(user.id,id,'dislike').then((r)=>{
        setDisLikePressed(r)
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
                  <Text style={styles.topicTitle}> {post.title} </Text>
                  <Text style={styles.topicMeta}> {post.author} ·   · en general</Text>
                  
                  <Text style={styles.topicContent}>{post.description}</Text>
                  <Text style={styles.topicMeta}> {replies.length}  réponse</Text>
                  <View style={styles.reactions}>
                  
                    <Reaction pressed={likePressed}
                        onClick={handleLike}
                        nb={post.nbLikes}
                    />
                    <Reaction pressed={disLikePressed}
                        onClick={handleDislike}
                        nb={post.nbDislikes}
                        type="dislike"
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
