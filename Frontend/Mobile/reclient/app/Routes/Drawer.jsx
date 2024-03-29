import { createDrawerNavigator } from '@react-navigation/drawer';
import Home from '../screens/Dashboard/Home';
import Account from '../screens/Settings/Account';
import Store from '../screens/Seller/Store';
import Orders from '../screens/Settings/Orders';
import Settings from '../screens/Settings/Settings';
import { useState } from 'react';

const Drawer = createDrawerNavigator();

const DrawerRoutes = () => {
    const [isRenter, setIsRenter] = useState(false)

    return (
        <Drawer.Navigator>
            <Drawer.Screen name="Home" component={Home} options={{ drawerLabel: 'Home', headerTitle: 'Home', headerTitleAlign: 'center', headerShown: false }} />
            <Drawer.Screen name="StoreDashboard" component={Store} options={{ drawerLabel: 'Renters Dashboard', headerTitle: 'Account', headerTitleAlign: 'center', headerShown: false }} />
            <Drawer.Screen name="Account" component={Account} options={{ drawerLabel: 'Account', headerTitle: 'Account', headerTitleAlign: 'center', headerShown: false }} />
            <Drawer.Screen name="Orders" component={Orders} options={{ drawerLabel: 'Orders', headerTitle: 'Orders', headerTitleAlign: 'center', headerShown: false }} />
            <Drawer.Screen name="Settings" component={Settings} options={{ drawerLabel: 'Settings', headerTitle: 'Settings', headerTitleAlign: 'center', headerShown: false }} />
        </Drawer.Navigator>
    );
}

export default DrawerRoutes