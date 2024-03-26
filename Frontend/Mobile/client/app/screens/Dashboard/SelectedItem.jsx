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
import { BlurView } from 'expo-blur';
import { Ionicons } from '@expo/vector-icons';

const { width, height } = Dimensions.get('window')

const SelectedItem = () => {
    const router = useNavigation()
    const scrollY = useRef(new Animated.Value(0)).current;

    const headerHeight = scrollY.interpolate({
        inputRange: [0, height * 0.2],
        outputRange: [height * 0.2, height * 0.11],
        extrapolate: 'clamp',
    })
    return (
        <>
             <StatusBar barStyle="light-content" />
            <View>
                <Animated.View style={{ width: width, height: headerHeight, backgroundColor: '#ad3232', overflow: 'hidden' }}>
                    <BlurView intensity={50} style={{ width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center' }}>
                        <View style={{ width: '100%', height: '100%', paddingHorizontal: width * 0.05, width: width, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                            <TouchableOpacity onPress={() => router.goBack()} >
                                <Ionicons name="chevron-back-circle" size={height * 0.04} color="white" />
                            </TouchableOpacity>
                            <TouchableOpacity style={{ paddingHorizontal: width * 0.02, paddingVertical: width * 0.02 }}>
                                <Ionicons name="search" size={24} color="white" />
                            </TouchableOpacity>
                        </View>
                    </BlurView>
                </Animated.View>
            </View >
        </>
    )
}

export default SelectedItem