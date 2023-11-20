import { StatusBar } from 'expo-status-bar';
import { store } from './store';
import { Provider } from 'react-redux';
import { StyleSheet } from 'react-native';
import SplashScreen from './views/splashScreen';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from './views/loginScreen';
import Tabs from './components/bottomTabs';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <Provider store={store}>
    <NavigationContainer>
      <Stack.Navigator initialRouteName='SplashScreen' screenOptions={{headerShown: false}}> 
        <Stack.Screen name='SplashScreen' component={SplashScreen}/>
        <Stack.Screen name='LoginScreen' component={LoginScreen}/>
        <Stack.Screen name='HomeScreen' component={Tabs}/>
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
