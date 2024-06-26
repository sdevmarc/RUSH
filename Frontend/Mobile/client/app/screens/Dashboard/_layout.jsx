import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Drawer } from 'expo-router/drawer';
import { useRouter } from 'expo-router';


const _layout = () => {
    const navigation = useRouter()
    const handleLogout = () => {
        navigation.replace('screens/intro/Login')
    }

    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <Drawer
                screenOptions=
                {{
                    headerShown: false,
                    drawerActiveBackgroundColor: 'white',
                    drawerActiveTintColor: 'black',
                    drawerInactiveTintColor: 'white',
                    drawerStyle: {
                        backgroundColor: '#EE3C3C'
                    },
                }} >
                <Drawer.Screen name="Home" options={{ drawerLabel: 'Home', title: 'Home' }} />
            </Drawer>
        </GestureHandlerRootView>
    )
}
export default _layout