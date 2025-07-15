import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';

export default function AllRepliesScreen({ route }) {
  const { parentComment } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Réponses à {parentComment.author} :</Text>
      <FlatList
        data={parentComment.responses}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.subReply}>
            <Text style={styles.replyAuthor}>{item.author}</Text>
            <Text style={styles.replyContent}>{item.content}</Text>
            <Text style={styles.replyTime}>
              {item.time?.toDate?.().toLocaleString?.() || ''}
            </Text>
          </View>
        )}
        contentContainerStyle={{ padding: 16 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  title: { fontSize: 16, fontWeight: 'bold', margin: 16 },
  subReply: {
    marginTop: 10,
    paddingLeft: 8,
    borderLeftWidth: 2,
    borderColor: '#eee',
  },
  replyAuthor: { fontWeight: 'bold', fontSize: 14 },
  replyContent: { fontSize: 14, color: '#333', marginTop: 4 },
  replyTime: { fontSize: 12, color: '#999', marginTop: 4 },
});
