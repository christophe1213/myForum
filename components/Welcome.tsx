import { Link } from 'expo-router';
import React from 'react';
import { Image, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function WelcomeScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.logoContainer}>
        {/* Tu peux remplacer ceci par une vraie image si tu as un logo */}
        <Text style={styles.logo}>💬 ForumApp</Text>
      </View>

      <Text style={styles.welcomeText}>
        Bienvenue sur notre forum communautaire. Rejoignez des discussions, posez vos questions et échangez avec les membres !
      </Text>

      {/* Illustration optionnelle */}
      <Image
        source={{ uri: 'https://cdn-icons-png.flaticon.com/512/3564/3564005.png' }}
        style={styles.image}
      />

      <View style={styles.buttonsContainer}>
        <Link href="/signUp" asChild>
          <TouchableOpacity style={styles.primaryButton}>
            <Text style={styles.primaryText}>Créer un compte</Text>
          </TouchableOpacity>
        </Link>

        <Link href="/login" asChild>
          <TouchableOpacity style={styles.secondaryButton}>
            <Text style={styles.secondaryText}>Se connecter</Text>
          </TouchableOpacity>
        </Link>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: '#ffffff',
    justifyContent: 'center',
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 24,
  },
  logo: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#007bff',
  },
  welcomeText: {
    fontSize: 16,
    textAlign: 'center',
    marginVertical: 16,
    color: '#444',
  },
  image: {
    width: 160,
    height: 160,
    alignSelf: 'center',
    marginBottom: 32,
  },
  buttonsContainer: {
    marginTop: 16,
  },
  primaryButton: {
    backgroundColor: '#007bff',
    paddingVertical: 14,
    borderRadius: 8,
    marginBottom: 12,
  },
  primaryText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: '600',
    fontSize: 16,
  },
  secondaryButton: {
    borderColor: '#007bff',
    borderWidth: 1,
    paddingVertical: 14,
    borderRadius: 8,
  },
  secondaryText: {
    color: '#007bff',
    textAlign: 'center',
    fontWeight: '600',
    fontSize: 16,
  },
});
