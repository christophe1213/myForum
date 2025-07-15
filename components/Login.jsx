import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Alert,
  ToastAndroid
} from 'react-native';
import { registerUser,loginUser } from '@/services/auth';
import { useRouter } from 'expo-router';
import { useAuth } from '@/context/AuthContext';
import { UserService } from '@/services/users.services';
export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter()
  const {logIn}=useAuth()
  
    const login = async()=>{
    let message ='login reussi'
    try{
        const r= await loginUser(email,password)
        const user = await UserService.getUser(r.uid)
        logIn(user)
      
         router.push('/app/home')
    }catch(e){
        message='echec de login'
        console.error(e)
    }finally{
       ToastAndroid.show(message,ToastAndroid.SHORT)
       
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Connexion</Text>

      <TextInput
        style={styles.input}
        placeholder="Email"
        placeholderTextColor="#999"
        keyboardType="email-address"
        autoCapitalize="none"
        value={email}
        onChangeText={setEmail}
      />

      <TextInput
        style={styles.input}
        placeholder="Mot de passe"
        placeholderTextColor="#999"
        secureTextEntry={!showPassword}
        value={password}
        onChangeText={setPassword}
      />

      <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
        <Text style={styles.togglePassword}>
          {showPassword ? 'Masquer le mot de passe' : 'Afficher le mot de passe'}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={login}>
        <Text style={styles.buttonText}>Se connecter</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.secondaryButton}>
        <Text style={styles.secondaryButtonText}>Mot de passe oublié ?</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.secondaryButton} onPress={() => router.push('/signUp')}>
        <Text style={styles.secondaryButtonText}>Créer un compte</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF', // Blanc pur pour un look moderne
    justifyContent: 'center',
    paddingHorizontal: 30, // Plus de padding pour un aspect aéré
  },
  title: {
    fontSize: 34, // Plus grand
    fontWeight: '700', // Plus audacieux
    marginBottom: 40, // Plus d'espace
    textAlign: 'center',
    color: '#2C3E50', // Gris foncé élégant
  },
  input: {
    backgroundColor: '#F8F8F8', // Gris très clair pour le fond de l'input
    padding: 16, // Plus de padding
    borderRadius: 10, // Coins légèrement plus arrondis
    marginBottom: 15, // Espacement cohérent
    borderWidth: 1,
    borderColor: '#E0E0E0', // Bordure très subtile
    fontSize: 16, // Taille de police pour l'input
    color: '#333333', // Couleur du texte de l'input
    shadowColor: '#000', // Ombre subtile
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  togglePassword: {
    flexDirection: 'row', // Pour aligner l'icône et le texte
    alignSelf: 'flex-end', // Aligner à droite
    alignItems: 'center',
    marginBottom: 25,
    paddingVertical: 5,
  },
  togglePasswordText: { // Nouveau style pour le texte du toggle
    color: '#5A67D8', // Couleur primaire douce
    marginLeft: 5,
    fontSize: 14,
  },
  button: {
    backgroundColor: '#5A67D8', // Couleur primaire douce
    padding: 18, // Plus de padding
    borderRadius: 10, // Coins arrondis
    alignItems: 'center',
    marginBottom: 15, // Espacement cohérent
    shadowColor: '#5A67D8', // Ombre colorée pour le bouton
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 3,
  },
  buttonText: {
    color: '#fff',
    fontWeight: '700', // Plus audacieux
    fontSize: 18, // Plus grand
  },
  link: {
    textAlign: 'center',
    color: '#5A67D8', // Même couleur que le bouton pour la cohérence
    marginTop: 10,
    fontSize: 15,
    fontWeight: '500',
  },
  // Nouveau style pour les liens secondaires (Créer un compte, Mot de passe oublié)
  secondaryButton: {
    padding: 10,
    alignItems: 'center',
    marginTop: 5,
  },
  secondaryButtonText: {
    color: '#7F8C8D', // Gris neutre pour les liens secondaires
    fontSize: 15,
    fontWeight: '500',
  },
});
