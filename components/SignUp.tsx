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
import { User,UserService } from '@/services/users.services';
import { useRouter } from 'expo-router';
import { useAuth } from '@/context/AuthContext';
export default function SignUpScreen() {
  const [name,setName]=useState('')
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
   const router = useRouter()
   const {logIn}=useAuth()
  const register = async()=>{
    let message ='register reussi'
    try{

        const r= await registerUser(email,password)
        await UserService.createUser({
          id: r.uid,
          name: name,
          email: email,
          role: "client"
        });
          logIn({
             id: r.uid,
          name: name,
          email: email,
          role: "client"
          })
         router.push('/app/home')
    }catch(e){
        message='echec de register'
        console.error(e)
    }finally{
       ToastAndroid.show(message,ToastAndroid.SHORT)
    }
 }



  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Créer un comptet</Text>

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
        placeholder="nom"
        placeholderTextColor="#999"
        autoCapitalize="none"
        value={name}
        onChangeText={setName}
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

      <TouchableOpacity style={styles.button} onPress={register}>
        <Text style={styles.buttonText}>Créer un compte</Text>
      </TouchableOpacity>

      <TouchableOpacity >
        <Text style={styles.link}>Mot de passe oublié ?</Text>
      </TouchableOpacity>

      
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F1F5F9',
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 24,
    textAlign: 'center',
    color: '#1E293B',
  },
  input: {
    backgroundColor: '#fff',
    padding: 14,
    borderRadius: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#CBD5E1',
  },
  togglePassword: {
    textAlign: 'right',
    color: '#3B82F6',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#3B82F6',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 20,
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
  link: {
    textAlign: 'center',
    color: '#1E40AF',
    marginTop: 10,
  },
});
