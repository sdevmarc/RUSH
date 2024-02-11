import { ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View, Dimensions } from 'react-native'
import React, { useEffect, useRef } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import LottieView from 'lottie-react-native';
import { useRouter } from 'expo-router';

const Successful = () => {
    const animation = useRef(null);
    const router = useRouter()
    const { width, height } = Dimensions.get('window');

    const handleLogin = () => {
        router.replace('screens/intro/Login')
    }

    useEffect(() => {
        // You can control the ref programmatically, rather than using autoPlay
        // animation.current?.play();
    }, []);

    return (
        <>
            <StatusBar translucent backgroundColor="white" barStyle="dark-content" />

            <SafeAreaView style={styles.safeAreaViewContainer}>
                <ScrollView contentContainerStyle={styles.scrollViewContainer}>
                    <View style={{ position: 'absolute', width, height }}>
                        <LottieView
                            ref={animation}
                            source={require('../../../assets/Celebrate.json')}
                            autoPlay
                            loop
                            resizeMode='cover'
                            style={{ width, height }}
                        />
                    </View>
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>

                        <View>
                            <LottieView
                                ref={animation}
                                source={require('../../../assets/WallE.json')}
                                autoPlay
                                loop
                                width={300}
                                height={300}
                            />
                        </View>
                        <View style={{ gap: 10 }}>
                            <View style={{ gap: 10 }}>
                                <Text style={{ textAlign: 'center', fontSize: 30, fontWeight: 'bold' }}>
                                    Successfull
                                </Text>
                                <Text style={{ textAlign: 'center', fontSize: 13, color: '#8a8a8a', paddingHorizontal: 50 }}>
                                    You have successfully registered in our app and start working on it.
                                </Text>
                            </View>
                        </View>
                    </View>

                    <View>
                        <TouchableOpacity onPress={handleLogin} style={styles.LoginTouchableStyle}>
                            <Text style={styles.LoginTouchableText}>Proceed to Login</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </SafeAreaView>
        </>
    )
}

export default Successful

const styles = StyleSheet.create({
    safeAreaViewContainer: {
        flex: 1,
        backgroundColor: 'white'
    },
    scrollViewContainer: {
        flex: 1,
        justifyContent: 'space-between',
        backgroundColor: 'white',
        paddingVertical: 60,
        paddingHorizontal: 25
    },
    LoginTouchableStyle: {
        width: 360,
        height: 50,
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#111'
    },
    LoginTouchableText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 15
    },
})