import { View,Text,Button,StyleSheet,FlatList } from "react-native";
import { useState } from "react";
import { Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";



export default function Body(){
    const [clients, setClients] = useState([
        { id: 1, name: 'John Doe', email: 'john@example.com', phone: '123-456-7890' },
        { id: 2, name: 'Jane Smith', email: 'jane@example.com', phone: '098-765-4321' },
      ]);

    return <View style={styles.clientStyles}>
        <Button title="ajouter"  color='green'/>
    <FlatList data={clients} renderItem={({item})=>
      <View style={styles.item}>
      <Text>nom :{item.name} </Text>
      <Text>prenom:{item.phone} </Text>

      </View>} keyExtractor={(item)=>item.id.toString() }


/>

            </View>   
}

const styles = StyleSheet.create({
    clientStyles:{
        backgroundColor:'white',
        flex:1,
        borderRadius:20,
        height:100
    },
    item: {
        backgroundColor: '#0000000b',
        padding: 20,
        marginVertical: 8,
        borderRadius: 10,
        borderColor:'red'
      },
      button:{
        display:'none'
      }
})
