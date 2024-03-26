import { createDrawerNavigator } from '@react-navigation/drawer';
import Home from '../screens/Dashboard/Home';

const Drawer = createDrawerNavigator();

const DrawerRoutes = () => {
  return (
    <Drawer.Navigator>
      <Drawer.Screen name="Home" component={Home} options={{ headerTitle: 'Home', headerTitleAlign: 'center', headerShown: false }}/>
    </Drawer.Navigator>
  );
}

export default DrawerRoutes