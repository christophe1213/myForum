import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, SafeAreaView, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '@/context/AuthContext';
import { BtnAdd } from '@/components/BtnAdd';
import { Link, useRouter } from 'expo-router';
import { ThreadService } from '@/services/thread.services';
const discussions = [
  {
    id: '1',
    title: 'Welcome to the Forum!',
    description: 'Feel free to introduce yourself and get to know other members.',
    author: 'Admin',
    time: '2h ago',
    replies: 25,
  },
  {
    id: '2',
    title: 'How to Improve Navigation?',
    description: "I'm looking for suggestions on how to make the navigation more user-friendly.",
    author: 'Alex',
    time: '5h ago',
    replies: 12,
  },
  {
    id: '3',
    title: 'Best Coding Practices',
    description: 'Share your tips and experiences on writing clean and efficient code.',
    author: 'developer42',
    time: '1d ago',
    replies: 8,
  },
  {
    id: '4',
    title: 'Favorite Programming Languages',
    description: 'Which programming languages do you prefer and why?',
    author: 'Jordan',
    time: '1d ago',
    replies: 17,
  },
];
export default function home() {
  const {user}=useAuth()
  const renderItem = ({ item={title:'',description:'',time:'',replies:[],author:{name:''}} }) => (
   
      <Link href={{pathname:'/app/forum/[id]',params:{id:item.id}}}>
       <View style={styles.card}>
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.description}>{item.description}</Text>
          <Text style={styles.meta}>{item.author.name} · {item.time} ·  replies</Text>
        </View>
          </Link>
  );
  
   const [threads,setThreads]=useState([{
    id:"", 
    title: "",
  userId: "",
  author:{name:''},
  replies: []
   }])
  useEffect(()=>{
    ThreadService.getAllThreads().then((r)=>{
      console.log(r)
      setThreads(r)
    }).catch((e)=>{
      console.error(e)
    })
  },[])

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
      <View style={styles.navBar}>
        <TouchableOpacity style={styles.navItem}>
          <Ionicons name="chatbubble-ellipses-outline" size={24} color="#007bff" />
          <Text style={styles.navText}>Discussions</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <Ionicons name="mail-outline" size={24} color="#6c757d" />
          <Text style={styles.navText}>Messages</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <Ionicons name="person-outline" size={24} color="#6c757d" />
          <Text style={styles.navText}>Activity</Text>
        </TouchableOpacity>
      </View>

     
      
           <BtnAdd onClick={()=>{
              const router = useRouter()
               router.push('/app/createDiscussion')
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
