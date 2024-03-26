import {
    Animated,
    ScrollView,
    Text,
    View,
    Dimensions,
    TouchableOpacity,
    Image,
    StatusBar
} from 'react-native'
import React, { useRef } from 'react'
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native'
import { BlurView } from 'expo-blur';
import { LinearGradient } from 'expo-linear-gradient';

const { width, height } = Dimensions.get('window')

const Products = [
    { id: 1, name: 'Sando', status: { isAvailable: 'Available', bgColor: '#008048' } },
    { id: 2, name: 'Skirt', status: { isAvailable: 'Available', bgColor: '#008048' } },
    { id: 3, name: 'Shorts', status: { isAvailable: 'Rented', bgColor: '#e31243' } },
    { id: 4, name: 'Shirt', status: { isAvailable: 'Available', bgColor: '#008048' } },
    { id: 5, name: 'Underwear', status: { isAvailable: 'Rented', bgColor: '#e31243' } },
    { id: 6, name: 'Polo', status: { isAvailable: 'Rented', bgColor: '#e31243' } },
    { id: 7, name: 'Pajama', status: { isAvailable: 'Rented', bgColor: '#e31243' } }
]

const SelectedStore = () => {
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

    const handleSelectItem = () => {
        navigation.navigate('SelectedItem')
    }

    return (
        <>
            <StatusBar barStyle="light-content" />
            <View>
                <Animated.View style={{ width: width, height: headerHeight, backgroundColor: '#ad3232', overflow: 'hidden' }}>
                    <LinearGradient
                        colors={['transparent', 'rgba(34, 34, 34, 0.7)']}
                        style={{ position: 'absolute', top: 0, left: 0, width: width, height: height * 0.2 }}
                    />
                    <BlurView intensity={50} style={{ width: '100%', height: '100%' }}>
                        <View
                            style={{
                                position: 'absolute',
                                width: '100%',
                                height: '100%',
                                paddingHorizontal: width * 0.05,
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                zIndex: 1
                            }}>
                            <TouchableOpacity onPress={() => navigation.goBack()} >
                                <Ionicons name="chevron-back-circle" size={height * 0.04} color="white" />
                            </TouchableOpacity>
                            <Animated.View style={{ opacity: opacityTitle1 }}>
                                <Text style={{ fontSize: width * 0.04, color: '#fff', fontFamily: 'Poppins-Bold' }}>
                                    BARASSI
                                </Text>
                            </Animated.View>
                            <TouchableOpacity style={{ paddingHorizontal: width * 0.02, paddingVertical: width * 0.02 }}>
                                <Ionicons name="search" size={24} color="white" />
                            </TouchableOpacity>
                        </View>
                        <Animated.View 
                        style={{ 
                            opacity, 
                            width: '100%',
                            height: '100%',
                            justifyContent: 'flex-end', 
                            alignItems: 'flex-start', 
                            paddingHorizontal: width * 0.05, 
                            paddingVertical: height * 0.02, 
                             }}>
                            <Text style={{ fontSize: width * 0.07, color: '#fff', fontWeight: '700', fontFamily: 'Poppins-Bold' }}>
                                BARASSI
                            </Text>
                        </Animated.View>
                    </BlurView>
                </Animated.View>
                <ScrollView
                    onScroll={
                        Animated.event(
                            [{ nativeEvent: { contentOffset: { y: scrollY } } }],
                            { useNativeDriver: false }
                        )}
                    scrollEventThrottle={16}
                >
                    <View style={{ paddingVertical: height * 0.03, gap: height * 0.03, backgroundColor: 'white' }}>
                        <View style={{ gap: height * 0.02, marginHorizontal: width * 0.03, paddingBottom: height * 0.06 }}>
                            <View style={{ flexDirection: 'row', alignItems: 'center', gap: width * 0.03 }}>
                                <Ionicons name="storefront" size={24} color="#ad3232" />
                                <Text style={{ fontSize: width * 0.047, color: '#ad3232', fontFamily: 'Poppins-Bold' }}>
                                    PRODUCTS
                                </Text>
                            </View>
                            <View style={{ flexDirection: 'row', gap: width * 0.02, flexWrap: 'wrap', justifyContent: 'space-evenly' }}>
                                {Products.map((item) => (
                                    <TouchableOpacity
                                        key={item.id}
                                        onPress={handleSelectItem}
                                        style={{
                                            width: width * 0.45,
                                            height: height * 0.25,
                                            // borderRadius: height * 0.01,
                                            // backgroundColor: '#ad3232',
                                            padding: width * 0.02
                                        }}
                                    >
                                        <View style={{ width: '100%', height: '100%' }}>
                                            <View style={{ overflow: 'hidden', width: '100%', height: '80%', backgroundColor: 'white', borderRadius: height * 0.006 }}>
                                                <Image
                                                    source={{ uri: 'https://source.unsplash.com/white-v-neck-shirt-on-brown-clothes-hanger-p8Drpg_duLw' }}
                                                    resizeMode='cover'
                                                    style={{ width: '100%', height: '100%' }}
                                                />
                                            </View>
                                            <View style={{ width: '100%', height: '20%', alignItems: 'flex-start' }}>
                                                <Text style={{ color: '#222', fontSize: width * 0.04, fontFamily: 'Poppins-Bold' }} >
                                                    {item.name}
                                                </Text>
                                                <Text
                                                    style={{
                                                        color: '#fff',
                                                        backgroundColor: '#222',
                                                        paddingHorizontal: width * 0.03,
                                                        paddingVertical: width * 0.005,
                                                        borderRadius: height * 0.005,
                                                        fontSize: width * 0.03,
                                                        fontFamily: 'Poppins-Regular'
                                                    }}
                                                >
                                                    {item.status.isAvailable}
                                                </Text>
                                            </View>
                                        </View>
                                    </TouchableOpacity>
                                ))}
                            </View>
                        </View>
                    </View>
                </ScrollView>
            </View >
        </>
    )
}

export default SelectedStore