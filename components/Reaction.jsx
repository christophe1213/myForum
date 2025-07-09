import { TouchableOpacity,Text } from "react-native"
import { Ionicons } from "@expo/vector-icons"
import { StyleSheet } from "react-native"
export default function Reaction({handleLike=()=>{},likes=0,likePressed=false}){
    return(
            <TouchableOpacity onPress={handleLike} style={{ flexDirection: 'row', alignItems: 'center' }}>
             <Ionicons name={likePressed ? "thumbs-up" : "thumbs-up-outline"} size={20} color={likePressed ? "blue" : "gray"} />
              <Text style={styles.iconText}>{likes}</Text>
              
          </TouchableOpacity>
    )
}
const styles=StyleSheet.create({
      iconText: {
    fontSize: 18,
    color: '#555',
    marginLeft: 4,
  },
})