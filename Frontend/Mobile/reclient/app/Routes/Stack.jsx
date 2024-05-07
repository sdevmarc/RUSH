import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Login from '../screens/Start/Login'
import Register from '../screens/Start/Register'
import SuccessfulLogin from '../screens/Start/Successful'
import DrawerRoutes from './Drawer'
import SelectedStore from '../screens/Dashboard/SelectedStore'
import SelectedItem from '../screens/Dashboard/SelectedItem'
import Cart from '../screens/Dashboard/Cart'
import SuccessfulCheckout from '../screens/Dashboard/Successful'
import DeliveryAddress from '../screens/Settings/DeliveryAddress'
import PaymentOption from '../screens/Dashboard/PaymentOption'
import Product from '../screens/Seller/Product'
import ShopInformation from '../screens/Seller/AddStore/ShopInformation'
import BusinessInformation from '../screens/Seller/AddStore/BusinessInformation'
import AddProducts from '../screens/Seller/Add Products/AddProducts'
import CreateOrLogin from '../screens/Start/CreateOrLogin'
import AddAddress from '../screens/Settings/Address/AddAddress'
import ToShip from '../screens/Seller/OrderStatus/ToShip'
import Summary from '../screens/Seller/Summary'
import Cancelled from '../screens/Seller/OrderStatus/Cancelled'
import Unreturned from '../screens/Seller/OrderStatus/Unreturned'
import Reviews from '../screens/Seller/OrderStatus/Reviews'

const Stack = createNativeStackNavigator()

function StackRoutes() {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                {/* START */}
                <Stack.Screen name="CreateOrLogin" component={CreateOrLogin} options={{ headerTitle: 'CreateOrLogin', headerTitleAlign: 'center', headerShown: false }} />
                <Stack.Screen name="Login" component={Login} options={{ headerTitle: 'Login', headerTitleAlign: 'center', headerShown: false }} />
                <Stack.Screen name="Register" component={Register} options={{ headerTitle: 'Register', headerTitleAlign: 'center', headerShown: false }} />
                <Stack.Screen name="SuccessfulLogin" component={SuccessfulLogin} options={{ headerTitle: 'Successful', headerTitleAlign: 'center', headerShown: false }} />
                {/* DASHBOARD */}
                <Stack.Screen name="DrawerRoutes" component={DrawerRoutes} options={{ headerTitle: 'Drawer', headerTitleAlign: 'center', headerShown: false }} />
                <Stack.Screen name="SelectedStore" component={SelectedStore} options={{ headerTitle: 'Store', headerTitleAlign: 'center', headerShown: false }} />
                <Stack.Screen name="SelectedItem" component={SelectedItem} options={{ headerTitle: 'Item', headerTitleAlign: 'center', headerShown: false }} />
                <Stack.Screen name="Cart" component={Cart} options={{ headerTitle: 'Cart', headerTitleAlign: 'center', headerShown: false }} />
                <Stack.Screen name="PaymentOption" component={PaymentOption} options={{ headerTitle: 'ShippingOption', headerTitleAlign: 'center', headerShown: false }} />
                <Stack.Screen name="SuccessfulCheckout" component={SuccessfulCheckout} options={{ headerTitle: 'SuccessfulCheckout', headerTitleAlign: 'center', headerShown: false }} />
                {/* ACCOUNT */}
                <Stack.Screen name="Address" component={DeliveryAddress} options={{ headerTitle: 'Address', headerTitleAlign: 'center', headerShown: false }} />
                <Stack.Screen name="ShopInformation" component={ShopInformation} options={{ headerTitle: 'ShopInformation', headerTitleAlign: 'center', headerShown: false }} />
                <Stack.Screen name="BusinessInformation" component={BusinessInformation} options={{ headerTitle: 'BusinessInformation', headerTitleAlign: 'center', headerShown: false }} />
                <Stack.Screen name="AddAddress" component={AddAddress} options={{ headerTitle: 'AddAddress', headerTitleAlign: 'center', headerShown: false }} />
                {/* SELLER */}
                <Stack.Screen name="Products" component={Product} options={{ headerTitle: 'Products', headerTitleAlign: 'center', headerShown: false }} />
                <Stack.Screen name="AddProduct" component={AddProducts} options={{ headerTitle: 'AddProducts', headerTitleAlign: 'center', headerShown: false }} />
                <Stack.Screen name="ToShip" component={ToShip} options={{ headerTitle: 'ToShip', headerTitleAlign: 'center', headerShown: false }} />
                <Stack.Screen name="Summary" component={Summary} options={{ headerTitle: 'Summary', headerTitleAlign: 'center', headerShown: false }} />
                <Stack.Screen name="Cancelled" component={Cancelled} options={{ headerTitle: 'Cancelled', headerTitleAlign: 'center', headerShown: false }} />
                <Stack.Screen name="Unreturned" component={Unreturned} options={{ headerTitle: 'Unreturned', headerTitleAlign: 'center', headerShown: false }} />
                <Stack.Screen name="Reviews" component={Reviews} options={{ headerTitle: 'Reviews', headerTitleAlign: 'center', headerShown: false }} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default StackRoutes