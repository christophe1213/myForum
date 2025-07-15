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
    padding: 30,
    backgroundColor: '#FFFFFF', // Blanc pur
  },
  title: {
    fontSize: 30,
    fontWeight: '700',
    marginBottom: 30,
    textAlign: 'center',
    color: '#2C3E50', // Gris foncé élégant
  },
  input: {
    backgroundColor: '#F8F8F8', // Gris très clair
    padding: 16,
    borderRadius: 10,
    fontSize: 16,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  textArea: {
    backgroundColor: '#F8F8F8', // Gris très clair
    padding: 16,
    borderRadius: 10,
    fontSize: 16,
    height: 150, // Hauteur légèrement augmentée
    textAlignVertical: 'top',
    marginBottom: 25,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  button: {
    backgroundColor: '#5A67D8', // Couleur primaire douce
    paddingVertical: 18,
    borderRadius: 10,
    alignItems: 'center',
    shadowColor: '#5A67D8',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 3,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '700',
  },
});