import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import DeliveriesScreen from '../views/deliveriesScreen';
import HomeScreen from '../views/homeScreen';
import PickupsScreen from '../views/pickupsScreen';
import SettingsScreen from '../views/settingsScreen';
import Ionicons from '@expo/vector-icons/Ionicons';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const Tab = createBottomTabNavigator();

const Tabs = () => {
    return (
        <Tab.Navigator backBehavior='firstRoute' initialRouteName="Home" screenOptions={{
            headerShown: false,
            tabBarStyle: {
                height: 60,
                position: 'absolute',
                bottom: 25,
                left: 20,
                right: 20,
                elevation: 0,
                backgroundColor: '#ffff',
                borderRadius: 15
            }
        }}>

            <Tab.Screen name='Home' component={HomeScreen} options={{
                tabBarLabel: 'Home',
                tabBarLabelStyle: {
                    color: 'black', fontSize: 13,
                },
                tabBarIcon: ({ color }) => (
                    <Ionicons name="home-outline" size={22} color={color} />
                ),
            }} />

            <Tab.Screen name='DeliveriesScreen' component={DeliveriesScreen} options={{
                tabBarLabel: 'Deliveries',
                tabBarLabelStyle: {
                    color: 'black', fontSize: 13,
                },
                tabBarIcon: ({ color }) => (
                    <MaterialCommunityIcons name="truck-fast-outline" size={26} color={color} />
                )
            }} />

            <Tab.Screen name='PickupScreen' component={PickupsScreen} options={{
                tabBarLabel: 'Pick-ups',
                tabBarLabelStyle: {
                    color: 'black', fontSize: 13,
                },
                tabBarIcon: ({ color }) => (
                    <MaterialCommunityIcons name="truck-plus-outline" size={26} color={color} />
                )
            }} />

            <Tab.Screen name='SettingsScreen' component={SettingsScreen} options={{
                tabBarLabel: 'Settings',
                tabBarLabelStyle: {
                    color: 'black', fontSize: 13,
                },
                tabBarIcon: ({ color }) => (
                    <Ionicons name="settings-outline" size={22} color={color} />
                )
            }} />
        </Tab.Navigator>
    )
}

export default Tabs;