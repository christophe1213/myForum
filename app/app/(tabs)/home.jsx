import React, { useCallback, useEffect, useState } from 'react';
import { View, Text, FlatList, SafeAreaView, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '@/context/AuthContext';
import { BtnAdd } from '@/components/BtnAdd';
import { Link, useFocusEffect, useRouter } from 'expo-router';
import { PostService } from '@/services/posts.services';
import { listenToPost } from "@/services/realTime.service";
export default function home() {
  const {user}=useAuth()
  const renderItem = ({ item={title:'',description:'',time:'',nbComments:0,author:'0',userId:'',nbLike:'',nbDislike:'0'} }) => (
   
      <Link href={{pathname:'/app/coment/[id]',params:{id:item.id}}}>
       <View style={styles.card}>
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.description}>{item.description}</Text>
          <Text style={styles.meta}>{item.author} · {item.time} · {item.nbComments}  replies</Text>
        </View>
          </Link>
  );
  
   const [threads,setThreads]=useState([{
    id:"", 
    title: "",
    userId: "",
    author:'',
    nbComments:0
   }])
  // useEffect(()=>{

  //   PostService.getAllPosts().then((r)=>{
  //     console.log(r)
  //     if(r!=null)setThreads(r)
  //   }).catch((e)=>{
  //     console.error((e))
  //   })
  // },[])

useFocusEffect(
  useCallback(() => {
    PostService.getAllPosts()
      .then((r) => {
        console.log(r);
        if (r != null) setThreads(r);
      })
      .catch((e) => {
        console.error(e);
      });

    // Optionnel : nettoyage quand l'écran perd le focus
    return () => {
      console.log("Nettoyage si nécessaire");
    };
  }, []) // ajoute ici des dépendances si nécessaire, ex: [user.id]
);
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Forum</Text>
        <Ionicons name="search" size={24} color="black" />
      </View>
      <Text style={styles.sectionTitle}>Discussions {user.name} jj </Text>
      <FlatList
        data={threads}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.list}
      />
    
     
      
           <View style={styles.floatingButtonContainer}>
             <BtnAdd onClick={()=>{
                const router = useRouter()
                 router.push('/app/createPost')
             }}/>
           </View>
     
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F8F8', // Fond légèrement gris pour un contraste doux
  },
  header: {
    padding: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#FFFFFF', // Fond blanc pour l'en-tête
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0', // Bordure subtile
    shadowColor: '#000', // Ombre subtile pour l'en-tête
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  },
  headerTitle: {
    fontSize: 28, // Plus grand
    fontWeight: '700', // Plus audacieux
    color: '#2C3E50', // Gris foncé élégant
  },
  sectionTitle: {
    fontSize: 20, // Plus grand
    fontWeight: '600',
    paddingHorizontal: 20,
    paddingVertical: 15,
    color: '#333333', // Gris foncé
  },
  list: {
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  card: {
    backgroundColor: '#FFFFFF', // Blanc pur pour les cartes
    padding: 20,
    borderRadius: 15, // Coins plus arrondis
    marginBottom: 15, // Espacement cohérent
    shadowColor: '#000', // Ombre subtile pour les cartes
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 3,
  },
  title: {
    fontSize: 18, // Plus grand
    fontWeight: '700',
    color: '#5A67D8', // Couleur primaire douce
    marginBottom: 5,
  },
  description: {
    fontSize: 15,
    color: '#555555', // Gris moyen
    marginTop: 4,
    lineHeight: 22, // Améliorer la lisibilité
  },
  meta: {
    fontSize: 13,
    color: '#888888', // Gris clair
    marginTop: 10,
  },
  // Styles pour le bouton flottant (BtnAdd)
  floatingButtonContainer: {
    position: 'absolute',
    bottom: 30,
    right: 20,
    zIndex: 10,
  },
});
