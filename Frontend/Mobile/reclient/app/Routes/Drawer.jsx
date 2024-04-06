import { createDrawerNavigator } from '@react-navigation/drawer';
import Home from '../screens/Dashboard/Home';
import Account from '../screens/Settings/Account';
import Store from '../screens/Seller/Store';
import Orders from '../screens/Settings/Orders';
import Settings from '../screens/Settings/Settings';
import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage'
import axios from 'axios'
import address from '../../config/host'

const Drawer = createDrawerNavigator();

const DrawerRoutes = () => {
    const [isRenter, setIsRenter] = useState(false)

    useEffect(() => {
        fetchData()
    }, [])

    const fetchData = async () => {
        try {
            const userId = await AsyncStorage.getItem('userId')
            const data = await axios.get(`http:${address}/api/getuser/${userId}`)
            const { UserType } = data.data.data

            if (UserType === 'Renter') {
                setIsRenter(true);
            } else if (UserType === 'Rentee') {
                setIsRenter(false);
            }
        } catch (error) {
            console.error('Error fetching user data:', error);
        }
    }

    return (
        <Drawer.Navigator>
            <Drawer.Screen name="Home" component={Home} options={{ drawerLabel: 'Home', headerTitle: 'Home', headerTitleAlign: 'center', headerShown: false }} />
            {isRenter && <Drawer.Screen name="StoreDashboard" component={Store} options={{ drawerLabel: 'Renters Dashboard', headerTitle: 'Account', headerTitleAlign: 'center', headerShown: false }} />}
            <Drawer.Screen name="Account" component={Account} options={{ drawerLabel: 'Account', headerTitle: 'Account', headerTitleAlign: 'center', headerShown: false }} />
            <Drawer.Screen name="Orders" component={Orders} options={{ drawerLabel: 'Orders', headerTitle: 'Orders', headerTitleAlign: 'center', headerShown: false }} />
            <Drawer.Screen name="Settings" component={Settings} options={{ drawerLabel: 'Settings', headerTitle: 'Settings', headerTitleAlign: 'center', headerShown: false }} />
        </Drawer.Navigator>
    );
}

export default DrawerRoutes