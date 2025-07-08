import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  SafeAreaView,
} from 'react-native';

interface Discussion {
  title: string;
  content: string;
}

const CreateDiscussionScreen: React.FC = () => {
  const [discussion, setDiscussion] = useState<Discussion>({
    title: '',
    content: '',
  });

  const handleChange = (field: keyof Discussion, value: string) => {
    setDiscussion(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = () => {
    if (!discussion.title.trim() || !discussion.content.trim()) {
      Alert.alert('Erreur', 'Tous les champs sont obligatoires.');
      return;
    }

    // Ici tu peux appeler une API ou WebSocket pour envoyer le post
    console.log('Nouvelle discussion :', discussion);

    Alert.alert('Succès', 'Discussion créée avec succès !');

    // Reset form
    setDiscussion({ title: '', content: '' });
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Créer une discussion</Text>

      <TextInput
        placeholder="Titre du sujet"
        value={discussion.title}
        onChangeText={(text) => handleChange('title', text)}
        style={styles.input}
      />

      <TextInput
        placeholder="Contenu de la discussion"
        value={discussion.content}
        onChangeText={(text) => handleChange('content', text)}
        style={styles.textArea}
        multiline
        numberOfLines={6}
      />

      <TouchableOpacity onPress={handleSubmit} style={styles.button}>
        <Text style={styles.buttonText}>Publier</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default CreateDiscussionScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 24,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 12,
    borderRadius: 8,
    fontSize: 16,
    marginBottom: 16,
  },
  textArea: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 12,
    borderRadius: 8,
    fontSize: 16,
    height: 120,
    textAlignVertical: 'top',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#007bff',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
