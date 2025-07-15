
import { View, Text, StyleSheet, TouchableOpacity, TextInput,FlatList } from 'react-native';
import { useEffect, useState } from 'react';
import moment from "moment"
import { useRouter } from 'expo-router';
export function ListComments({replies=[],replyComent=()=>{}}){
    const [replyingTo, setReplyingTo] = useState(null);
    const [inputText,setInputText]=useState('')
    const [comments, setComments] = useState(replies);
    const handleSendReply = (parentId) => {
    if (inputText.trim() === '') return;
    const updated = comments.map(comment => {
     if (comment.id === parentId) {
      return {
        ...comment,
          responses: [
            ...(comment.responses || []),
            {
              id: Date.now().toString(),
              author: 'You',
              content: inputText,
              time: 'Just now'
            }
          ]
        };
      }
      return comment;
    });
    setComments(updated);
    setInputText('');
    setReplyingTo(null);
  replyComent(parentId,inputText)
  console.log("dans commentaire   ")
  };
     const renderReply = ({ item=[] }) => (
  <Comment
    comment={item}
    replyingTo={replyingTo}
    inputText={inputText}
    onStartReply={setReplyingTo}
    onChangeText={setInputText}
    onSendReply={handleSendReply}
  />
);
useEffect(()=>{
  setComments(replies)
},[replies])
    
     return(
        
          <FlatList
        data={comments}
        renderItem={renderReply}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.list}
      />
      
    )
}



export default function Comment({
    comment,
    replyingTo,
    inputText,
    onStartReply,
    onChangeText,
    onSendReply
}){
  const router = useRouter()
  const onShowAllReplies=(id)=>{
     router.push({ pathname: '/app/coment/replies/[id]', params: { id } })
  }
    return(
         <View style={styles.reply}>
      <Text style={styles.replyAuthor}>{comment.author}</Text>
      <Text style={styles.replyContent}>{comment.content}</Text>
      
      <Text style={styles.replyTime}>{moment(comment.time.toDate()).fromNow()}</Text>
      <TouchableOpacity onPress={() => onStartReply(comment.id)}>
        <Text style={styles.replyLink}>Répondre</Text>
      </TouchableOpacity>

      {/* {replyingTo === comment.id && (
        <View style={styles.replyInputContainer}>
          <TextInput
            placeholder="Votre réponse..."
            value={inputText}
            onChangeText={onChangeText}
            style={styles.replyInput}
          />
          <TouchableOpacity onPress={() => onSendReply(comment.id)} style={styles.sendButton}>
            <Text style={styles.sendButtonText}>Envoyer</Text>
          </TouchableOpacity>
        </View>
      )} */}

      {comment.replies?.map(sub => (
        <View key={sub.id} style={styles.subReply}>
          <Text style={styles.replyAuthor}>{sub.author}</Text>
          <Text style={styles.replyContent}>{sub.text}</Text>
          <Text style={styles.replyTime}>{sub.time?.toDate?.().toLocaleString?.() || ''}</Text>
        </View>

      ))}
       <TouchableOpacity onPress={() => onShowAllReplies(comment.id)} style={styles.replyLink}>
          <Text style={styles.replyLink}>Voir tous les sous-commentaires</Text>
        </TouchableOpacity>
    </View>
  
    )
}
const styles = StyleSheet.create({
  list: {
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  reply: {
    backgroundColor: '#FFFFFF', // Fond blanc pour chaque commentaire
    padding: 15,
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  replyAuthor: {
    fontWeight: '700', // Plus audacieux
    fontSize: 16,
    color: '#2C3E50', // Gris foncé élégant
    marginBottom: 4,
  },
  replyContent: {
    fontSize: 15,
    color: '#444444',
    lineHeight: 22,
  },
  replyTime: {
    fontSize: 12,
    color: '#888888',
    marginTop: 8,
  },
  replyLink: {
    fontSize: 14,
    color: '#5A67D8', // Couleur primaire douce
    marginTop: 8,
    fontWeight: '500',
  },
  replyInputContainer: { marginTop: 15 },
  replyInput: {
    borderColor: '#E0E0E0',
    borderWidth: 1,
    borderRadius: 8,
    padding: 12,
    fontSize: 15,
    marginBottom: 10,
    backgroundColor: '#F8F8F8',
  },
  sendButton: {
    backgroundColor: '#5A67D8',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 8,
    alignSelf: 'flex-end',
  },
  sendButtonText: { color: 'white', fontSize: 15, fontWeight: '600' },
  subReply: {
    marginTop: 12,
    marginLeft: 20,
    paddingLeft: 10,
    borderLeftWidth: 2,
    borderLeftColor: '#E0E0E0', // Bordure plus douce
    backgroundColor: '#FDFDFD', // Fond très légèrement différent
    borderRadius: 8,
    paddingVertical: 10,
  },
});