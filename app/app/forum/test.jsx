import React, { useState } from 'react';
import { View, Text, FlatList, SafeAreaView, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const initialConversation = {
  title: 'Welcome to the forum',
  author: 'admin',
  time: '2h ago',
  content: 'Feel free to ask questions, share your ideas, and participate in discussions!',
  replies: [
    {
      id: 'r1',
      author: 'Andrew',
      content: 'Thanks! Happy to be here.',
      time: '1h ago'
    },
    {
      id: 'r2',
      author: 'Emily',
      content: 'Excited to join the community!',
      time: '2h ago'
    },
    {
      id: 'r3',
      author: 'John',
      content: "I'm looking forward to learning from everyone.",
      time: '4h ago'
    }
  ]
};

export default function TopicDetail() {
  const [likes, setLikes] = useState(5);
  const [comments, setComments] = useState(initialConversation.replies);
  const [likePressed, setLikePressed] = useState(false);

  const handleLike = () => {
    if (!likePressed) {
      setLikes(likes + 1);
      setLikePressed(true);
    } else {
      setLikes(likes - 1);
      setLikePressed(false);
    }
  };

  const handleReply = (replyId) => {
    Alert.alert("Reply", `You want to reply to comment ID: ${replyId}`);
    // Tu peux ici naviguer vers un autre écran, ou ouvrir un modal
  };

  const renderReply = ({ item }) => (
    <View style={styles.reply}>
      <Text style={styles.replyAuthor}>{item.author}</Text>
      <Text style={styles.replyContent}>{item.content}</Text>
      <Text style={styles.replyTime}>{item.time}</Text>
      <TouchableOpacity onPress={() => handleReply(item.id)}>
        <Text style={styles.replyLink}>Reply</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity style={styles.backButton}>
        <Ionicons name="arrow-back" size={24} color="black" />
      </TouchableOpacity>

      <View style={styles.topicCard}>
        <Text style={styles.topicTitle}>{initialConversation.title}</Text>
        <Text style={styles.topicMeta}>{initialConversation.author} · {initialConversation.time} · in General</Text>
        <Text style={styles.topicContent}>{initialConversation.content}</Text>
        <Text style={styles.topicMeta}>{comments.length} replies</Text>

        <View style={styles.reactions}>
          <TouchableOpacity onPress={handleLike} style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Ionicons name={likePressed ? "thumbs-up" : "thumbs-up-outline"} size={20} color={likePressed ? "blue" : "gray"} />
            <Text style={styles.iconText}>{likes}</Text>
          </TouchableOpacity>

          <Ionicons name="chatbubble-outline" size={20} color="gray" style={{ marginLeft: 12 }} />
          <Text style={styles.iconText}>{comments.length}</Text>
        </View>
      </View>

      <FlatList
        data={comments}
        renderItem={renderReply}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.list}
      />
    </SafeAreaView>
  );
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
