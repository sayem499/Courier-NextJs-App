import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import DeliveriesScreen from '../views/deliveriesScreen';
import HomeScreen from '../views/homeScreen';
import PickupsScreen from '../views/pickupsScreen';
import SettingsScreen from '../views/settingsScreen';
import Ionicons from '@expo/vector-icons/Ionicons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useSelector, } from 'react-redux';

const Tab = createBottomTabNavigator();

const Tabs = () => {
    const {appTheme} = useSelector(state => state.themeState);
    return (
        <Tab.Navigator backBehavior='firstRoute' initialRouteName="Home" screenOptions={{
            headerShown: false,
            tabBarStyle: {
                height: 60,
                position: 'absolute',
                bottom: 20,
                left: 18,
                right: 18,
                elevation: 0,
                backgroundColor: appTheme === 'dark' ? '#263375' : '#ffff',
                borderRadius: 10,
                borderTopWidth: 0,
            }
        }}>

            <Tab.Screen name='Home' component={HomeScreen} options={{
                tabBarLabel: 'Home',
                tabBarLabelStyle: {
                    color: appTheme === 'dark' ? 'white' : 'black', fontSize: 13, paddingBottom: 5,
                },
                tabBarIcon: ({ color }) => (
                    <Ionicons name="home-outline" size={22} color={color} />
                ),
            }} />

            <Tab.Screen name='DeliveriesScreen' component={DeliveriesScreen} options={{
                tabBarLabel: 'Deliveries',
                tabBarLabelStyle: {
                    color: appTheme === 'dark' ? 'white' : 'black', fontSize: 13, paddingBottom: 5,
                },
                tabBarIcon: ({ color }) => (
                    <MaterialCommunityIcons name="truck-fast-outline" size={26} color={color} />
                )
            }} />

            <Tab.Screen name='PickupScreen' component={PickupsScreen} options={{
                tabBarLabel: 'Pick-ups',
                tabBarLabelStyle: {
                    color: appTheme === 'dark' ? 'white' : 'black', fontSize: 13, paddingBottom: 5,
                },
                tabBarIcon: ({ color }) => (
                    <MaterialCommunityIcons name="truck-plus-outline" size={26} color={color} />
                )
            }} />

            <Tab.Screen name='SettingsScreen' component={SettingsScreen} options={{
                tabBarLabel: 'Settings',
                tabBarLabelStyle: {
                    color: appTheme === 'dark' ? 'white' : 'black', fontSize: 13, paddingBottom: 5,
                },
                tabBarIcon: ({ color }) => (
                    <Ionicons name="settings-outline" size={22} color={color} />
                )
            }} />
        </Tab.Navigator>
    )
}

export default Tabs;