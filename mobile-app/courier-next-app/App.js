import 'react-native-get-random-values';
import { store } from './store';
import { Provider } from 'react-redux';
import { StyleSheet } from 'react-native';
import SplashScreen from './views/splashScreen';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from './views/loginScreen';
import PickupsScreen from './views/pickupsScreen';
import DeliveryDetailsScreen from './views/deliveryDetailsScreen';
import DeliveredParcelScreen from './views/deliveredParcelScreen';
import PickedParcelScreen from './views/pickedParcelScreen';
import { usePushNotifications } from './utils/notifications';
import Tabs from './components/bottomTabs';

const Stack = createNativeStackNavigator();


export default function App() {
  const { expoPushToken } = usePushNotifications();
  console.log(expoPushToken);
  return (
    <Provider store={store}>
    <NavigationContainer>
      <Stack.Navigator initialRouteName='SplashScreen' screenOptions={{headerShown: false}}> 
        <Stack.Screen name='SplashScreen' component={SplashScreen}/>
        <Stack.Screen name='LoginScreen' component={LoginScreen}/>
        <Stack.Screen name='HomeScreen' component={Tabs}/>
        <Stack.Screen name='PickupsScreen' component={PickupsScreen}/>
        <Stack.Screen name='DeliveryDetailsScreen' component={DeliveryDetailsScreen}/>
        <Stack.Screen name='PickedParcelScreen' component={PickedParcelScreen}/>
        <Stack.Screen name='DeliveredParcelScreen' component={DeliveredParcelScreen}/>
      </Stack.Navigator>
    </NavigationContainer>
    </Provider>
    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
