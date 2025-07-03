import { SafeAreaView,TouchableOpacity, Text, View,FlatList } from "react-native";
import { Link } from "expo-router";
import { discussions } from "@/data";
import { StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
const renderItem = ({ item={title:'',description:'',time:'',replies:'',author:''} }) => {
  
  return(
        

    
    <View style={styles.card}>
          <Link href={{pathname:'/forum/[id]',params:{id:item.id}}}>
          <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.description}>{item.description}</Text>
      <Text style={styles.meta}
        
      >{item.author} · {item.time} · {item.replies} replies</Text>
      
          </Link>
      
    </View>
  );

}

export default function Index() {
  return (
   
    <SafeAreaView style={styles.container}>
         <View style={styles.header}>
        <Text style={styles.headerTitle}>Forum</Text>
        <Ionicons name="search" size={24} color="black" />
      </View>
      <Text style={styles.sectionTitle}>Discussions</Text>
      <FlatList
        data={discussions}
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
    </SafeAreaView>

  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffff',
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

