import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Login from '../screens/Start/Login';
import Register from '../screens/Start/Register';
import Successful from '../screens/Start/Successful';
import DrawerRoutes from './Drawer';
import SelectedStore from '../screens/Dashboard/SelectedStore';
import SelectedItem from '../screens/Dashboard/SelectedItem';


const Stack = createNativeStackNavigator()

function StackRoutes() {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="Login" component={Login} options={{ headerTitle: 'Login', headerTitleAlign: 'center', headerShown: false }} />
                <Stack.Screen name="Register" component={Register} options={{ headerTitle: 'Register', headerTitleAlign: 'center', headerShown: false }} />
                <Stack.Screen name="Successful" component={Successful} options={{ headerTitle: 'Successful', headerTitleAlign: 'center', headerShown: false }} />
                <Stack.Screen name="DrawerRoutes" component={DrawerRoutes} options={{ headerTitle: 'Home', headerTitleAlign: 'center', headerShown: false }} />
                <Stack.Screen name="SelectedStore" component={SelectedStore} options={{ headerTitle: 'Home', headerTitleAlign: 'center', headerShown: false }} />
                <Stack.Screen name="SelectedItem" component={SelectedItem} options={{ headerTitle: 'Home', headerTitleAlign: 'center', headerShown: false }} />
                {/*  <Stack.Screen name="Login" component={Home} options={{ headerTitle: 'Login', headerTitleAlign: 'center', headerShown: false }} /> */}
            </Stack.Navigator>
        </NavigationContainer>
    );
}

export default StackRoutes