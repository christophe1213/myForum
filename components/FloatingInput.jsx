import React from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet, KeyboardAvoidingView, Platform } from 'react-native';

export default function FloatingCommentInput({ value, onChangeText, onSend }) {
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={80}
      style={styles.container}
    >
      <View style={styles.inputWrapper}>
        <TextInput
          placeholder="Ajouter un commentaire..."
          value={value}
          onChangeText={onChangeText}
          style={styles.input}
          multiline
        />
        <TouchableOpacity onPress={onSend} style={styles.sendButton}>
          <Text style={styles.sendText}>Envoyer</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    backgroundColor: '#fff',
    padding: 8,
    borderTopWidth: 1,
    borderColor: '#ccc',
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 6,
    borderColor: '#ccc',
    borderWidth: 1,
    marginRight: 8,
    fontSize: 14,
    maxHeight: 100
  },
  sendButton: {
    backgroundColor: '#007bff',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 6,
  },
  sendText: {
    color: '#fff',
    fontSize: 14,
  }
});
