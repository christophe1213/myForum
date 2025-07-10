import { SafeAreaView,FlatList } from  "react-native";
import { StyleSheet } from "react-native";
import Comment  from '@/components/Comment'
import { useState } from "react";
import { TextInput } from "react-native";
const initialConversation = {
  title: 'Welcome to the forum',
  author: 'admin',
  time: '2h ago',
  content: 'Feel free to ask questions, share your ideas, and participate in discussions!',
  replies: [
    { id: 'r1', author: 'Andrew', content: 'Thanks! Happy to be here.', time: '1h ago', responses: [] },
    { id: 'r2', author: 'Emily', content: 'Excited to join the community!', time: '2h ago', responses: [] },
    { id: 'r3', author: 'John', content: "I'm looking forward to learning from everyone.", time: '4h ago', responses: [] },
  ]
};

export default function TestComment(){
      return(
        <SafeAreaView>
          <ListComments replies={initialConversation.replies}></ListComments>
        </SafeAreaView>
      )
}


export function ListComments({replies=[]}){
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

const styles = StyleSheet.create({
     list: {
    padding: 16,
  },
})