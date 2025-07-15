import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import moment from 'moment';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';
import { useRouter } from 'expo-router';
const testPost = {
  id: 'post1',
  title: 'Pourquoi React Native est génial ?',
  content: 'React Native permet de créer des apps mobiles cross-platform avec JavaScript.',
  author: 'Alice',
  time: new Date(),
  upvotes: 12,
  downvotes: 3,
  comments: [
    {
      id: 'c1',
      author: 'Bob',
      content: 'Je suis d’accord !',
      time: new Date(),
      responses: [
        { id: 'sc1', author: 'Marie', content: 'Exactement !', time: new Date() },
        { id: 'sc2', author: 'John', content: 'Et performant aussi.', time: new Date() },
        { id: 'sc3', author: 'Emma', content: 'Même pour les débutants.', time: new Date() },
      ],
    },
  ],
};

const PostScreen = () => {
  const [post, setPost] = useState(testPost);
  const navigation = useNavigation();

  const handleVote = (type) => {
    setPost((prev) => ({
      ...prev,
      upvotes: type === 'up' ? prev.upvotes + 1 : prev.upvotes,
      downvotes: type === 'down' ? prev.downvotes + 1 : prev.downvotes,
    }));
  };

  const renderComment = ({ item }) => (
    <View style={styles.comment}>
      <Text style={styles.author}>{item.author}</Text>
      <Text style={styles.text}>{item.content}</Text>
      <Text style={styles.time}>{moment(item.time).fromNow()}</Text>

      {item.responses?.slice(0, 2).map((reply) => (
        <View key={reply.id} style={styles.subComment}>
          <Text style={styles.author}>{reply.author}</Text>
          <Text style={styles.text}>{reply.content}</Text>
        </View>
      ))}

      {item.responses?.length > 2 && (
        <TouchableOpacity
          onPress={() =>{
            const router = useRouter()
            router.push({pathname:'/app/post/test',params:{parentComment:item.responses}})
          }
            
          }
        >
          <Text style={styles.link}>Voir tous les commentaires ({item.responses.length})</Text>
        </TouchableOpacity>
      )}
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.post}>
        <Text style={styles.title}>{post.title}</Text>
        <Text style={styles.content}>{post.content}</Text>
        <Text style={styles.meta}>Par {post.author} • {moment(post.time).fromNow()}</Text>

        <View style={styles.voteRow}>
          <TouchableOpacity onPress={() => handleVote('up')} style={styles.voteButton}>
            <FontAwesome name="thumbs-up" size={18} color="#4CAF50" />
            <Text style={styles.voteText}>{post.upvotes}</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => handleVote('down')} style={styles.voteButton}>
            <FontAwesome name="thumbs-down" size={18} color="#f44336" />
            <Text style={styles.voteText}>{post.downvotes}</Text>
          </TouchableOpacity>
        </View>
      </View>

      <FlatList
        data={post.comments}
        renderItem={renderComment}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingBottom: 16 }}
      />
    </View>
  );
};

export default PostScreen;

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#fff' },
  post: {
    padding: 16,
    backgroundColor: '#f9f9f9',
    borderRadius: 12,
    marginBottom: 20,
    elevation: 2,
  },
  title: { fontSize: 20, fontWeight: 'bold', marginBottom: 8 },
  content: { fontSize: 16, color: '#333' },
  meta: { fontSize: 12, color: '#888', marginTop: 8 },
  voteRow: {
    flexDirection: 'row',
    gap: 20,
    marginTop: 12,
    alignItems: 'center',
  },
  voteButton: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  voteText: { fontSize: 16 },
  comment: {
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
    padding: 12,
    marginBottom: 12,
  },
  author: { fontWeight: 'bold', fontSize: 14 },
  text: { fontSize: 14, color: '#333', marginTop: 2 },
  time: { fontSize: 12, color: '#666', marginTop: 4 },
  subComment: {
    marginTop: 8,
    marginLeft: 16,
    borderLeftWidth: 2,
    borderColor: '#ccc',
    paddingLeft: 8,
  },
  link: {
    color: '#007bff',
    marginTop: 8,
    fontSize: 13,
    marginLeft: 8,
  },
});
