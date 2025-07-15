// components/CommentInput.tsx
import { View, TextInput, TouchableOpacity, Text, StyleSheet } from 'react-native';

export default function CommentInput({ value='', onChangeText=()=>{}, onSubmit=()=>{} }) {
  return (
    <View style={styles.inputContainer}>
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder="Écrire un commentaire..."
        style={styles.input}
      />
      <TouchableOpacity onPress={onSubmit} style={styles.button}>
        <Text style={styles.buttonText}>Envoyer</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: 'row',
    padding: 8,
    borderTopWidth:1 ,
    borderColor: '#ccc',
    backgroundColor: '#fafafa',
    position:"relative",
    bottom:50,
  },
  input: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 8,
    paddingHorizontal: 10,
    borderColor: '#ddd',
    borderWidth: 1,
  },
  button: {
    backgroundColor: '#007bff',
    paddingHorizontal: 14,
    justifyContent: 'center',
    marginLeft: 8,
    borderRadius: 6,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});
