import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native'
import React, { useRef, useEffect } from 'react';
import LottieView from 'lottie-react-native';
import Onboarding from 'react-native-onboarding-swiper'

const OnBoarding = () => {
    const animation = useRef(null);
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

    return (
        <View style={styles.Container}>
            <Onboarding
                DotComponent={Custom}
                bottomBarHighlight={false}
                DoneButtonComponent={handleDone}
                containerStyles={{ paddingHorizontal: 15 }}
                titleStyles={{ fontWeight: 'bold', textAlign: 'left' }}
                pages={[
                    {
                        backgroundColor: '#a7f3d0',
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
                        backgroundColor: '#fef3c7',
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
                        backgroundColor: '#a78bfa',
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
        width: 70,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        borderTopLeftRadius: 30,
        borderBottomLeftRadius: 30,
        backgroundColor: 'white'
    },
    doneText: {
        fontSize: 13
    }
})