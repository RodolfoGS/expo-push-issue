import * as Notifications from 'expo-notifications';
import React, { useEffect, useRef } from 'react';
import { View, Button } from 'react-native';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

let counter = 1;

async function sendPushNotification() {
  await Notifications.scheduleNotificationAsync({
    content: {
      title: `Test notification number ${counter++}`,
      body: 'Here is the notification body',
      data: { data: 'goes here' },
    },
    trigger: { seconds: 1 },
  });
}

export default function App() {
  const responseListener = useRef();

  useEffect(() => {
    // This listen when you tap the notification and show the title in an alert
    responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
      alert(response.notification.request.content.title);
    });

    return () => {
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);

  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-around',
      }}>
      <Button
        title="Press to Send Notification"
        onPress={async () => {
          await sendPushNotification();
        }}
      />
    </View>
  );
}
