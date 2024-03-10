import { useEffect, useState, useRef } from 'react';
import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';

import Constants from 'expo-constants'; 

import { Platform } from 'react-native';

export const usePushNotifications = () => {

    Notifications.setNotificationHandler({
        handleNotification: async () => ({
            shouldPlaySound: false,
            shouldShowAlert: true,
            shouldSetBadge: false,
        }),
    });

    const [expoPushToken, setExpoPushToken] = useState(Notifications.ExpoPushToken);
    const [notification, setNotification] = useState(Notifications.Notification);

    const notificationListener = useRef();
    const responseListener = useRef();

    const registerForPushNotificationsAsync = async () => {
        let token;
        if(Device.isDevice){
            const { status: existingStatus } = await Notifications.getPermissionsAsync();
            let finalStatus = existingStatus;   
            
            if(existingStatus !== 'granted'){
                const { status }  = await Notifications.requestPermissionsAsync();
                finalStatus = status;
            }

            if( finalStatus !== 'granted'){
                alert("Failed to get token for push notification.");
                return;
            }

            token = await Notifications.getExpoPushTokenAsync({
                projectId: Constants.expoConfig.extra?.eas?.projectId,
            });

        } else {
            alert("Must be using a physical device for push motifications.");
        }
        

        if(Platform.OS === 'android'){
            Notifications.setNotificationChannelAsync("default", {
                name: 'default',
                importance: Notifications.AndroidImportance.MAX,
                vibrationPattern: [0, 250, 250, 250],
                lightColor: "#FF231F7C",
            });
        }

        return token;

    }

    useEffect(() => {
        registerForPushNotificationsAsync().then((token)=>{
            setExpoPushToken(token);
        })

        notificationListener.current = Notifications.addNotificationReceivedListener((notification) => {
            setNotification(notification);
        })

        responseListener.current = Notifications.addNotificationResponseReceivedListener((response) => {
            console.log(response);
        })

        return () => {
            Notifications.removeNotificationSubscription(
                notificationListener.current
            )

            Notifications.removeNotificationSubscription(
                responseListener.current
            )
        }

    }, [])

    return {
        expoPushToken,
        notification,
    }

}