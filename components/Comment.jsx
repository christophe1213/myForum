
import { View, Text, StyleSheet, TouchableOpacity, TextInput,FlatList } from 'react-native';
import { useState } from 'react';

export function ListComments({replies=[],createComent=()=>{}}){
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
    return(
         <View style={styles.reply}>
      <Text style={styles.replyAuthor}>{comment.author}</Text>
      <Text style={styles.replyContent}>{comment.content}</Text>
      <Text style={styles.replyTime}>{comment.time}</Text>

      <TouchableOpacity onPress={() => onStartReply(comment.id)}>
        <Text style={styles.replyLink}>Répondre</Text>
      </TouchableOpacity>

      {replyingTo === comment.id && (
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
      )}

      {comment.responses?.map(sub => (
        <View key={sub.id} style={styles.subReply}>
          <Text style={styles.replyAuthor}>{sub.author}</Text>
          <Text style={styles.replyContent}>{sub.content}</Text>
          <Text style={styles.replyTime}>{sub.time}</Text>
        </View>
      ))}
    </View>
  
    )
}
const styles = StyleSheet.create({
  reply: { marginBottom: 24 },
  replyAuthor: { fontWeight: 'bold', fontSize: 14 },
  replyContent: { fontSize: 14, color: '#333', marginTop: 4 },
  replyTime: { fontSize: 12, color: '#999', marginTop: 4 },
  replyLink: { fontSize: 13, color: '#007bff', marginTop: 6 },
  replyInputContainer: { marginTop: 8 },
  replyInput: {
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 6,
    padding: 8,
    fontSize: 14,
    marginBottom: 8
  },
  sendButton: {
    backgroundColor: '#007bff',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 6,
    alignSelf: 'flex-start'
  },
  sendButtonText: { color: 'white', fontSize: 14 },
  subReply: {
    marginTop: 10,
    marginLeft: 16,
    paddingLeft: 8,
    borderLeftWidth: 2,
    borderColor: '#eee'
  },
    list: {
    padding: 16,
  },
});