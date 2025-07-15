import { TouchableOpacity,Text , StyleSheet } from "react-native"
import { Ionicons } from "@expo/vector-icons"
export default function Reaction({onClick=()=>{},nb=0,userReactionType=null,type='like'}){
  const iconName = type === 'dislike' ? 'thumbs-down' : 'thumbs-up';
  const isPressed = userReactionType === type;
  const iconVariant = isPressed ? iconName : `${iconName}-outline`;
  const iconColor = isPressed ? "blue" : "gray";

  return(
            <TouchableOpacity onPress={onClick} style={{ flexDirection: 'row', alignItems: 'center' }}>
            
            <Ionicons name={iconVariant} size={20} color={iconColor} />
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