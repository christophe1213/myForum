import { View,Text } from "react-native"
import { StyleSheet } from "react-native"

export default function Header(){

    return <View style={styles.header}>
        <Text style={styles.title}>Géstion de file d'attente</Text>
    </View>
       

}

const styles = StyleSheet.create({
    header:{
        backgroundColor:'green',
        height:80,
    },
    title:{
        fontSize: 20,
        fontWeight: 'bold',
        marginVertical: 20,
    },
}
)