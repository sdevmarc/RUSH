import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Drawer } from 'expo-router/drawer';
import { StyleSheet } from 'react-native';


const _layout = () => {
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