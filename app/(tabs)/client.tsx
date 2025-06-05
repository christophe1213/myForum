import { Text, View,Button } from "react-native";
import { FlatList, TouchableOpacity,TextInput } from "react-native-gesture-handler";
import { useState } from "react";
import { StyleSheet } from "react-native";
import { Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
// import {api} from '@/app/Hooks/api'

export default function Client(){ 
    const [clients, setClients] = useState([
        { id: 1, name: 'John Doe', email: 'john@example.com', phone: '123-456-7890' },
        { id: 2, name: 'Jane Smith', email: 'jane@example.com', phone: '098-765-4321' },
      ]);

    //Pour manipuler l'insertion de nouveau  client
    const [newClient,setnewClient]=useState({
      id:'',
      name:'',
      email:'',
      phone:''
    })
    const create=()=>{
     Alert.alert("ss")
    //  console.log('d')
    //  api.get('/users').then((r)=>{
    //     console.log(r)
    //  }).catch((e)=>{
    //     console.log(e)
    //     console.error()
    //  })
    }
    
    
    return <View style={styles.body}>
        <SafeAreaView style={styles.container}>
      <Text>Hello Worlds</Text>
  
    </SafeAreaView>
      <Text style={styles.title}>Ajout d'un nouveau client</Text>
      <TextInput style={styles.input} 
                  onChangeText={(text)=> setnewClient({...newClient,name:text})} 
                  placeholder="nom">

      </TextInput> 
      <TextInput style={styles.input} onChangeText={(text)=>setnewClient({...newClient,email:text})} placeholder="email"></TextInput>
      <TextInput style={styles.input} onChangeText={(text)=>setnewClient({...newClient,phone:text})} placeholder="phone" keyboardType="phone-pad"></TextInput>
      <Button title="ajouter" color='green' onPress={create}/>
      {/* <FlatList data={clients} renderItem={({item})=>
      <View style={styles.item}>
      <Text>nom :{item.name} </Text>
      <Text>prenom:{item.phone} </Text>

      </View>} keyExtractor={(item)=>item.id.toString() }


/> */}

    </View>

}
const styles = StyleSheet.create({
  title:{
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 20,
  },
  input:{
    height:40,
    borderRadius:100,
    borderColor:'gray',
    borderWidth:1,
    paddingHorizontal:10,
    backgroundColor:'white',

       
  },
  item: {
    backgroundColor: '#0000000b',
    padding: 20,
    marginVertical: 8,
    borderRadius: 10,
  },
  container:{

    backgroundColor:'green'
  },
  body:{
     backgroundColor:'white'
  }

})