import { TouchableOpacity,Text } from "react-native"
import { Ionicons } from "@expo/vector-icons"
import { StyleSheet } from "react-native"
export default function Reaction({onClick=()=>{},nb=0,pressed=false,type='like'}){
 const iconName = type === 'dislike' ? 'thumbs-down' : 'thumbs-up';
const iconVariant = pressed ? iconName : `${iconName}-outline`;

  return(
            <TouchableOpacity onPress={onClick} style={{ flexDirection: 'row', alignItems: 'center' }}>
            
            <Ionicons name={iconVariant} size={20} color={pressed ? "blue" : "gray"} />
            <Text style={styles.iconText}>{nb}</Text>
              
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