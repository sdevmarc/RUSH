import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native'
import React, { useRef, useEffect } from 'react';
import LottieView from 'lottie-react-native';
import Onboarding from 'react-native-onboarding-swiper'
import { useRouter } from 'expo-router';

const OnBoarding = () => {
    const animation = useRef(null);
    const router = useRouter()
    
    useEffect(() => {
        // You can control the ref programmatically, rather than using autoPlay
        // animation.current?.play();
    }, []);

    const Custom = ({ isLight, selected }) => {
        let backgroundColor;
        if (isLight) {
            backgroundColor = selected ? 'rgba(0, 0, 0, 0.8)' : 'rgba(0, 0, 0, 0.3)'
            width = selected ? 20 : 6
        } else {
            backgroundColor = selected ? '#fff' : 'rgba(255, 255, 255, 0.5)'
            width = selected ? 20 : 6
        }
        return (
            <View
                style={{
                    width,
                    height: 6,
                    marginHorizontal: 3,
                    backgroundColor,
                    borderRadius: 10
                }}
            />
        );
    };

    const handleDone = ({ ...props }) => {
        return (
            <TouchableOpacity style={styles.doneButton} {...props}>
                <Text style={styles.doneText}>Done</Text>
            </TouchableOpacity>
        )
    }
    
    const handleSkip = ({ ...props }) => {
        return (
            <TouchableOpacity style={{display: 'none'}} {...props}>
                <Text style={styles.doneText}>Done</Text>
            </TouchableOpacity>
        )
    }
    const handleNext = ({ ...props }) => {
        return (
            <TouchableOpacity style={{display: 'none'}} {...props}>
                <Text style={styles.doneText}>Done</Text>
            </TouchableOpacity>
        )
    }
    return (
        <View style={styles.Container}>
            <Onboarding
                onDone={() => router.navigate('screens/intro/Login')}
                DotComponent={Custom}
                bottomBarHighlight={false}
                NextButtonComponent={handleNext}
                SkipButtonComponent={handleSkip}
                DoneButtonComponent={handleDone}
                containerStyles={{ paddingHorizontal: 15 }}
                titleStyles={{ fontWeight: 'bold', textAlign: 'left' }}
                pages={[
                    {
                        backgroundColor: '#ffffff',
                        image: (
                            <View style={styles.animationContainer}>
                                <LottieView
                                    ref={animation}
                                    source={require('../../../assets/SahekHands.json')}
                                    autoPlay
                                    loop
                                    style={{
                                        width: 200, height: 200
                                    }} />
                            </View>
                        ),
                        title: 'Rent-up and Share',
                        subtitle: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. ',


                    },
                    {
                        backgroundColor: '#ffffff',
                        image: (
                            <View style={styles.animationContainer}>
                                <LottieView
                                    ref={animation}
                                    source={require('../../../assets/Pickup.json')}
                                    autoPlay
                                    loop
                                    style={{
                                        width: 200, height: 200
                                    }} />
                            </View>
                        ),
                        title: 'Pick-up things you want',
                        subtitle: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.'
                    },
                    {
                        backgroundColor: '#ffffff',
                        image: (
                            <View style={styles.animationContainer}>
                                <LottieView
                                    ref={animation}
                                    source={require('../../../assets/Pay.json')}
                                    autoPlay
                                    loop
                                    style={{
                                        width: 200, height: 200
                                    }} />
                            </View>
                        ),
                        title: 'Online Payment',
                        subtitle: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.'
                    },
                ]}



            />
        </View>
    )

}

export default OnBoarding

const styles = StyleSheet.create({
    Container: {
        flex: 1,
        backgroundColor: 'white'
    },
    animationContainer: {
        height: 200
    },
    doneButton: {
        width: 100,
        height: 80,
        justifyContent: 'center',
        alignItems: 'center',
        borderTopLeftRadius: 50,
        borderBottomLeftRadius: 50,
        backgroundColor: '#111',
        marginBottom: 100
    },
    doneText: {
        color: 'white',
        fontSize: 15
    }
})