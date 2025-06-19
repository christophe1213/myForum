import React, { useEffect, useState } from 'react';
import { View,SafeAreaView,TextInput, Text, FlatList, ActivityIndicator, StyleSheet, TouchableOpacity } from 'react-native';

const API_URL = 'http://192.168.43.203:3000/tasks'; // ⬅️ Remplace par l'adresse IP de ton backend

const TasksScreen = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [task,setTask]=useState('')
  const [description,setDescription]=useState('')
  const fetchTasks = async () => {
    try {
      const response = await fetch(API_URL);
      const data = await response.json();
      setTasks(data);
    } catch (error) {
      console.error('Erreur lors du fetch des tâches :', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const renderItem = ({ item }) => (
    <View style={styles.task}>
      <Text style={styles.title}>{item.title}</Text>
      <Text>{item.description}</Text>
      <Text>Status : {item.completed ? '✅ Terminé' : '🕒 En cours'}</Text>
    </View>
  );

  if (loading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color="#444" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Mes Tâches</Text>
      <SafeAreaView>
           <Text style={styles.title}>Ajouter un tache</Text>
               <TextInput
                    style={styles.input}
                    placeholder="tâche"
                    placeholderTextColor="#999"
                    keyboardType="email-address"
                    autoCapitalize="none"
                    value={task}
                    onChangeText={setTask}
                  />
                   <TextInput
                    style={styles.input}
                    placeholder="tâche"
                    placeholderTextColor="#999"
                    keyboardType="email-address"
                    autoCapitalize="none"
                    value={task}
                    onChangeText={setTask}
                  />
      </SafeAreaView>
      <FlatList
        data={tasks}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        onRefresh={fetchTasks}
        refreshing={loading}
      />
    </View>
  );
};

export default TasksScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  task: {
    padding: 12,
    marginVertical: 8,
    backgroundColor: '#f1f1f1',
    borderRadius: 8,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  header: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
    input: {
    backgroundColor: '#fff',
    padding: 14,
    borderRadius: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#CBD5E1',
  },
});
