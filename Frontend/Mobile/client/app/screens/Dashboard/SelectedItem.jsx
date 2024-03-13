import {
    View,
    Dimensions,
    Text,
    StatusBar,
    Animated,
    TouchableOpacity
} from 'react-native'
import React, { useRef } from 'react'
import { useNavigation } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';
import { Ionicons } from '@expo/vector-icons';

const { width, height } = Dimensions.get('window')

const SelectedItem = () => {
    const navigation = useNavigation()
    const scrollY = useRef(new Animated.Value(0)).current;

    const headerHeight = scrollY.interpolate({
        inputRange: [0, height * 0.2],
        outputRange: [height * 0.2, height * 0.11],
        extrapolate: 'clamp',
    })

    const opacityTitle1 = scrollY.interpolate({
        inputRange: [0, height * 0.2 - height * 0.05],
        outputRange: [0, 1],
        extrapolate: 'clamp',
    });

    const opacity = scrollY.interpolate({
        inputRange: [0, height * 0.15 - height * 0.05],
        outputRange: [1, 0],
        extrapolate: 'clamp',
    });

    return (
        <>
            <StatusBar barStyle="dark-content" />
            <View>
                <Animated.View style={{ width: width, height: headerHeight, backgroundColor: '#ad3232', overflow: 'hidden' }}>
                    <View style={{ position: 'absolute', top: height * 0, left: width * 0, width: width * 0.3, height: width * 0.3, backgroundColor: '#7668fc', borderRadius: width * 0.5 }} />
                    <View style={{ position: 'absolute', top: height * 0.1, left: width * 0.7, width: width * 0.5, height: width * 0.5, backgroundColor: '#f5e5ba', borderRadius: width * 0.5 }} />
                    <LinearGradient
                        colors={['transparent', 'rgba(34, 34, 34, 0.7)']}
                        style={{ position: 'absolute', top: 0, left: 0, width: width, height: height * 0.2 }}
                    />
                    <BlurView intensity={50} style={{ flex: 1 }}>
                        <View style={{ position: 'absolute', top: height * 0.05, paddingHorizontal: width * 0.05, width: width, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                            <TouchableOpacity onPress={() => navigation.navigate('SelectedStore')} >
                                <Ionicons name="chevron-back-circle" size={height * 0.04} color="white" />
                            </TouchableOpacity>
                            <Animated.View style={{ opacity: opacityTitle1 }}>
                                <Text style={{ fontSize: width * 0.04, color: '#fff', fontFamily: 'Poppins-Bold' }}>
                                    STORE
                                </Text>
                            </Animated.View>
                            <TouchableOpacity style={{ paddingHorizontal: width * 0.02, paddingVertical: width * 0.02 }}>
                                <Ionicons name="search" size={24} color="white" />
                            </TouchableOpacity>
                        </View>
                        <Animated.View style={{ opacity, position: 'absolute', top: height * 0.12, paddingHorizontal: width * 0.05, width: width }}>
                            <Text style={{ fontSize: width * 0.07, color: '#fff', fontWeight: '700', fontFamily: 'Poppins-Bold' }}>
                                ITEM
                            </Text>
                        </Animated.View>
                    </BlurView>
                </Animated.View>
            </View>
        </>
    )
}

export default SelectedItem