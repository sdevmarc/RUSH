import {
    createDrawerNavigator,
    DrawerItemList,
    DrawerContentScrollView
} from '@react-navigation/drawer'
import {
    Dimensions,
    Text,
    View
} from 'react-native'
import Home from '../screens/Dashboard/Home'
import Account from '../screens/Settings/Account'
import Store from '../screens/Seller/Store'
import Orders from '../screens/Settings/Orders'
import Settings from '../screens/Settings/Settings'
import {
    useEffect,
    useState
} from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import axios from 'axios'
import address from '../../config/host'
import { Ionicons, MaterialIcons, Entypo, MaterialCommunityIcons, FontAwesome5 } from '@expo/vector-icons';

const Drawer = createDrawerNavigator()

const { width, height } = Dimensions.get('window')

const DrawerRoutes = () => {
    const [isRenter, setIsRenter] = useState(false)
    const [values, setValues] = useState({
        activeTint: '',
        iconColor: ''
    })

    useEffect(() => {
        fetchData()
    }, [])

    const fetchData = async () => {
        try {
            const userId = await AsyncStorage.getItem('userId')
            const data = await axios.get(`http:${address}/api/getuser/${userId}`)
            const { UserType } = data.data.data

            if (UserType === 'Renter') {
                setIsRenter(true)
            } else if (UserType === 'Rentee') {
                setIsRenter(false)
            }
        } catch (error) {
            console.error('Error fetching user data:', error)
        }
    }

    return (
        <Drawer.Navigator
            screenOptions={{
                drawerStyle: {
                    backgroundColor: '#d7a152'
                },
                drawerActiveBackgroundColor: 'white',
                drawerActiveTintColor: 'black',
                drawerInactiveTintColor: 'white',

            }}
            drawerContent={
                (props) => {
                    return (
                        <>
                            <DrawerContentScrollView>
                                <View style={{ width: '100%', height: height * 0.2, justifyContent: 'center', alignItems: 'flex-start', paddingHorizontal: width * 0.05 }}>
                                    <Text style={{ color: 'white', fontWeight: 'bold', fontSize: width * 0.1 }}>
                                        RUSh
                                    </Text>
                                    <Text style={{ color: 'white', fontWeight: '500', fontSize: width * 0.05 }}>
                                        Rent-up and Share!
                                    </Text>
                                </View>
                                <DrawerItemList {...props} />
                            </DrawerContentScrollView >
                        </>
                    )
                }
            }
        >
            <Drawer.Screen
                name="Home"
                component={Home}
                options={{
                    drawerLabel: 'Home',
                    headerTitle: 'Home',
                    headerTitleAlign: 'center',
                    headerShown: false,
                    drawerIcon: ({ focused }) => (
                        <FontAwesome5 name="home" size={24} color={focused ? 'black' : 'white'} />
                    )
                }} />

            {isRenter
                &&
                <Drawer.Screen
                    name="StoreDashboard"
                    component={Store}
                    options={{
                        drawerLabel: 'Renters Dashboard',
                        headerTitle: 'Account',
                        headerTitleAlign: 'center',
                        headerShown: false,
                        drawerIcon: ({ focused }) => (
                            <MaterialIcons name="sell" size={24} color={focused ? 'black' : 'white'} />
                        )
                    }}
                />}

            <Drawer.Screen
                name="Account"
                component={Account}
                options={{
                    drawerLabel: 'Account',
                    headerTitle: 'Account',
                    headerTitleAlign: 'center',
                    headerShown: false,
                    drawerIcon: ({ focused }) => (
                        <Ionicons name="person-sharp" size={24} color={focused ? 'black' : 'white'} />
                    )
                }}
            />

            <Drawer.Screen
                name="Orders"
                component={Orders}
                options={{
                    drawerLabel: 'Orders',
                    headerTitle: 'Orders',
                    headerTitleAlign: 'center',
                    headerShown: false,
                    drawerIcon: ({ focused }) => (
                        <MaterialIcons name="inventory" size={24} color={focused ? 'black' : 'white'} />
                    )
                }}
            />

            <Drawer.Screen
                name="Settings"
                component={Settings}
                options={{
                    drawerLabel: 'Settings',
                    headerTitle: 'Settings',
                    headerTitleAlign: 'center',
                    headerShown: false,
                    drawerIcon: ({ focused }) => (
                        <Ionicons name="settings" size={24} color={focused ? 'black' : 'white'} />
                    )
                }}
            />
        </Drawer.Navigator >
    )
}

export default DrawerRoutes