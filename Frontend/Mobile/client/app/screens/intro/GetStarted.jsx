import React from 'react';
import { StyleSheet, View, Text, ImageBackground, ScrollView, StatusBar, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router'
const bgIntro = require('../../../assets/bgIntro.png')
const Logo = require('../../../assets/LogoLight.png')


const GetStarted = () => {
    const router = useRouter()

    const handleGetStarted = () => {
        router.replace('screens/intro/Login')
    }

    return (
        <>
            <StatusBar translucent backgroundColor="transparent" barStyle="light-content" />
            <View style={styles.container}>
                <ImageBackground
                    source={bgIntro}
                    style={styles.container}
                >
                    <SafeAreaView style={styles.container}>
                        <ScrollView contentContainerStyle={styles.scrollViewContainer}>
                            <View style={styles.viewLogoContainer}>
                                <View style={styles.viewLogoContainer}>
                                    <Image source={Logo} />
                                </View>

                                <View style={styles.viewTouchacbleOpacity}>
                                    {/* <TouchableOpacity style={styles.LoginTouchableStyle}>
                                        <Text style={styles.LoginTouchableText}>Login</Text>
                                    </TouchableOpacity> */}
                                    <TouchableOpacity style={styles.SignUpTouchableStyle} onPress={handleGetStarted}>
                                        <Text style={styles.SignUpTouchableText}>Get started</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>


                        </ScrollView>
                    </SafeAreaView>
                </ImageBackground>
            </View>
        </>

    );
};

export default GetStarted;

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    scrollViewContainer: {
        flex: 1,
        paddingVertical: 60
    },
    viewTouchacbleOpacity: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
        gap: 20
    },
    viewLogoContainer: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center'
    },
    LoginTouchableStyle: {
        width: 300,
        height: 50,
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white'
    },
    LoginTouchableText: {
        color: '#111',
        fontWeight: 'bold',
        fontSize: 18
    },
    SignUpTouchableStyle: {
        width: 350,
        height: 50,
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white'
    },
    SignUpTouchableText: {
        color: '#111',
        fontWeight: 'bold',
        fontSize: 18
    }
});
