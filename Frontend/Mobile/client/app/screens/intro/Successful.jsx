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

            <SafeAreaView style={{ flex: 1 }}>
                <ScrollView contentContainerStyle={{ flex: 1 }}>
                    <LottieView
                        ref={animation}
                        source={require('../../../assets/Celebrate.json')}
                        autoPlay
                        loop
                        resizeMode='cover'
                        style={{ position: 'absolute', width: width, height: height }}
                    />
                    <View style={{ flex: 1, justifyContent: 'space-between', marginVertical: height *0.05 }}>
                        <View style={{ gap: 10 }}>
                            <View>
                                <LottieView
                                    ref={animation}
                                    source={require('../../../assets/Check.json')}
                                    autoPlay
                                    loop
                                    width={width * 1}
                                    height={height * 0.3}
                                />
                            </View>
                            <View style={{ gap: height * 0.03 }}>
                                <Text style={{ textAlign: 'center', fontSize: width * 0.08, fontWeight: 'bold' }}>
                                    Successful
                                </Text>
                                <Text style={{ textAlign: 'center', fontSize: width * 0.035, color: '#8a8a8a', paddingHorizontal: width * 0.2}}>
                                    You have successfully registered in our app and start working on it.
                                </Text>
                            </View>
                        </View>
                        <TouchableOpacity onPress={handleLogin} style={{ height: height * 0.06, borderRadius: height * 0.03, justifyContent: 'center', alignItems: 'center', backgroundColor: 'black', marginHorizontal: width * 0.1 }}>
                            <Text style={{ fontSize: width * 0.035, color: 'white', fontWeight: 'bold' }}>
                                Proceed to Login
                            </Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </SafeAreaView >
        </>
    )
}

export default Successful