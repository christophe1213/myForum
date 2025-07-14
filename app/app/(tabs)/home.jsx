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
    
     
      
           <BtnAdd onClick={()=>{
              const router = useRouter()
               router.push('/app/createPost')
           }}/>
     
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '500',
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  list: {
    paddingHorizontal: 16,
  },
  card: {
    backgroundColor: '#f9f9f9',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: '#007bff',
  },
  description: {
    fontSize: 14,
    color: '#444',
    marginTop: 4,
  },
  meta: {
    fontSize: 12,
    color: '#888',
    marginTop: 8,
  },
  navBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 12,
    borderTopWidth: 1,
    borderColor: '#ddd',
    backgroundColor: '#fff',
  },
  navItem: {
    alignItems: 'center',
  },
  navText: {
    fontSize: 12,
    color: '#6c757d',
    marginTop: 4,
  },
});
