import React, { useEffect, useRef, useState } from 'react';
import { Text, View, Button, Platform } from 'react-native';
import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';

// Affiche les notifications même si l’app est ouverte
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

export default function TestNotify() {
  const [expoPushToken, setExpoPushToken] = useState('');
  const notificationListener = useRef();
  const responseListener = useRef();

  useEffect(() => {
    registerForPushNotificationsAsync().then(token => setExpoPushToken(token));

    // Écoute des notifications reçues
    notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
      console.log("Notification reçue :", notification);
    });

    // Écoute des réponses (quand l'utilisateur clique dessus)
    responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
      console.log("Réponse à la notification :", response);
    });

    return () => {
      Notifications.removeNotificationSubscription(notificationListener.current);
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Push Token : {expoPushToken}</Text>
      <Button
        title="Envoyer une notification test locale"
        onPress={async () => {
          await Notifications.scheduleNotificationAsync({
            content: {
              title: "Notification test 📬",
              body: 'Ceci est un test de notification locale.',
              data: { info: 'Données supplémentaires' },
            },
            trigger: null, // immédiat
          });
        }}
      />
    </View>
  );
}

// Fonction d’enregistrement
async function registerForPushNotificationsAsync() {
  if (Device.isDevice) {
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== 'granted') {
      alert('Échec de l’obtention de la permission pour les notifications push !');
      return;
    }
    const token = (await Notifications.getExpoPushTokenAsync()).data;
    console.log('Token Expo :', token);
    return token;
  } else {
    alert('Doit être utilisé sur un appareil physique.');
  }

  if (Platform.OS === 'android') {
    Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
    });
  }
}
