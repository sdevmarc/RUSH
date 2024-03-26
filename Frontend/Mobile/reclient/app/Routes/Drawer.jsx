import { createDrawerNavigator } from '@react-navigation/drawer';
import Home from '../screens/Dashboard/Home';

const Drawer = createDrawerNavigator();

const DrawerRoutes = () => {
    return (
        <Drawer.Navigator>
            <Drawer.Screen name="Home" component={Home} options={{ drawerLabel: 'Home', headerTitle: 'Home', headerTitleAlign: 'center', headerShown: false }} />
            <Drawer.Screen name="Account" component={Home} options={{drawerLabel: 'Account', headerTitle: 'Account', headerTitleAlign: 'center', headerShown: false }} />
            <Drawer.Screen name="DeliverAddress" component={Home} options={{drawerLabel: 'Address', headerTitle: 'Address', headerTitleAlign: 'center', headerShown: false }} />
            <Drawer.Screen name="Orders" component={Home} options={{drawerLabel: 'Orders', headerTitle: 'Orders', headerTitleAlign: 'center', headerShown: false }} />
            <Drawer.Screen name="Settings" component={Home} options={{drawerLabel: 'Settings',headerTitle: 'Settings', headerTitleAlign: 'center', headerShown: false }} />
        </Drawer.Navigator>
    );
}

export default DrawerRoutes