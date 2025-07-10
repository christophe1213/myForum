import { TouchableOpacity,View,TextInput,Text } from "react-native"
import { Ionicons } from "@expo/vector-icons"
import { StyleSheet } from "react-native"
import { useState } from "react"
import FloatingInput from './FloatingInput'
export default function BtnComment({showInputComment=()=>{},nbComment=0,
                                    handleSendReply=()=>{},show=false

                                }){
    const [inputText,setInputText]=useState('')

    return(
        <>
        <TouchableOpacity onPress={showInputComment} style={{ flexDirection: 'row', alignItems: 'center', marginLeft: 16 }}>
            <Ionicons name="chatbubble-outline" size={20} color="gray" />
            <Text style={styles.iconText}>{nbComment}</Text>
        </TouchableOpacity>
       {show && (
    
           <FloatingInput
              value={inputText}
              onChangeText={setInputText}
              onSend={() => handleSendReply(inputText)}
            />
        )}
        </>
    )
}


const styles= StyleSheet.create({
    iconText: { fontSize: 16, color: '#555', marginLeft: 4 },
      replyInputContainer: { marginTop: 12 },
        replyInput: {
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 6,
        padding: 8,
        fontSize: 14,
        marginBottom: 8
  },
  sendButton: {
    backgroundColor: '#007bff',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 6,
    alignSelf: 'flex-start'
  },
  sendButtonText: { color: 'white', fontSize: 14 },
  subReply: {
    marginTop: 10,
    marginLeft: 16,
    paddingLeft: 8,
    borderLeftWidth: 2,
    borderColor: '#eee'
  }
   
})