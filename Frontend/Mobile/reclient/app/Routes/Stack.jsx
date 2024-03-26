import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Login from '../screens/Start/Login';
import Register from '../screens/Start/Register';
import SuccessfulLogin from '../screens/Start/Successful';
import DrawerRoutes from './Drawer';
import SelectedStore from '../screens/Dashboard/SelectedStore';
import SelectedItem from '../screens/Dashboard/SelectedItem';
import Cart from '../screens/Dashboard/Cart';
import SuccessfulCheckout from '../screens/Dashboard/Successful';


const Stack = createNativeStackNavigator()

function StackRoutes() {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="Login" component={Login} options={{ headerTitle: 'Login', headerTitleAlign: 'center', headerShown: false }} />
                <Stack.Screen name="Register" component={Register} options={{ headerTitle: 'Register', headerTitleAlign: 'center', headerShown: false }} />
                <Stack.Screen name="SuccessfulLogin" component={SuccessfulLogin} options={{ headerTitle: 'Successful', headerTitleAlign: 'center', headerShown: false }} />
                <Stack.Screen name="DrawerRoutes" component={DrawerRoutes} options={{ headerTitle: 'Drawer', headerTitleAlign: 'center', headerShown: false }} />
                <Stack.Screen name="SelectedStore" component={SelectedStore} options={{ headerTitle: 'Store', headerTitleAlign: 'center', headerShown: false }} />
                <Stack.Screen name="SelectedItem" component={SelectedItem} options={{ headerTitle: 'Item', headerTitleAlign: 'center', headerShown: false }} />
                <Stack.Screen name="Cart" component={Cart} options={{ headerTitle: 'Cart', headerTitleAlign: 'center', headerShown: false }} />
                <Stack.Screen name="SuccessfulCheckout" component={SuccessfulCheckout} options={{ headerTitle: 'Cart', headerTitleAlign: 'center', headerShown: false }} />
                {/*  <Stack.Screen name="Login" component={Home} options={{ headerTitle: 'Login', headerTitleAlign: 'center', headerShown: false }} /> */}
            </Stack.Navigator>
        </NavigationContainer>
    );
}

export default StackRoutes