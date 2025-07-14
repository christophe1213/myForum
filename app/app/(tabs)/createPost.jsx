import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  SafeAreaView,
} from 'react-native';
import { useAuth } from '@/context/AuthContext';
import { PostService } from '@/services/posts.services';
import { useRouter } from 'expo-router';
import { useState } from 'react';
const CreatePost=()=>{
     const [discussion, setDiscussion] = useState({
        title: '',
        content: '',
      });
    
      const {user}=useAuth()
    const handleChange = (field, value) => {
        setDiscussion(prev => ({ ...prev, [field]: value }));
      };
    const handleSubmit = async() => {
    
        if (!discussion.title.trim() || !discussion.content.trim()) {
            Alert.alert('Erreur', 'Tous les champs sont obligatoires.');
            return;
        }
         console.log('Nouvelle discussion :', discussion);
        

        await  PostService.createPost({
               title:discussion.title,
                description:discussion.content,
                userId:user.id,
                author:user.name,
                createdAt:new Date(),
                nbLikes:0,
                nbDislikes:0,
                nbComments:0
            })
            setDiscussion({ title: '', content: '' });
            
            Alert.alert('Succès', 'Votre post est créée avec succès !');
            const router = useRouter()
            router.push('/app/home')
        
        }

    return(
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
    )
}
export default CreatePost
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