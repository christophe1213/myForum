import { TouchableOpacity } from "react-native"
import { Ionicons } from "@expo/vector-icons"
import { StyleSheet } from "react-native"
export const BtnAdd=({onClick=()=>{}})=>{
    return(
        <>
              <TouchableOpacity onPress={onClick} style={styles.fab}>
                <Ionicons name="add" size={28} color="#fff" />
              </TouchableOpacity>
        </>
    )
}
const styles= StyleSheet.create({
      fab: {
        position: 'absolute',
        bottom: 80,
        right: 20,
        backgroundColor: '#007bff',
        width: 56,
        height: 56,
        borderRadius: 28,
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 5,
        shadowColor: '#000',
        shadowOpacity: 0.2,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 4,
        },
})