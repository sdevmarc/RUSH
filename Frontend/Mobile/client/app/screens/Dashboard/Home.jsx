import {
    Image,
    Modal,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
    Dimensions,
    ImageBackground
} from 'react-native'
import { useNavigation } from 'expo-router';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
const bgSample = require('../../../assets/bgIntro.png')
const { width, height } = Dimensions.get('window')

const Home = () => {
    const [isModal, setModal] = useState(false)
    const navigation = useNavigation()


    if (isModal) {
        return (
            <Modal
                visible={isModal}
                onRequestClose={() => setModal(false)}
                animationType='slide'
                presentationStyle='pageSheet'
            >
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <Text>Hello World</Text>
                </View>
            </Modal>
        )
    }


    return (
        <>
            {/* <StatusBar translucent backgroundColor="white" barStyle="dark-content" /> */}
            <View style={{ backgroundColor: '#fff' }}>
                <ScrollView>
                    <ImageBackground source={{ uri: 'https://source.unsplash.com/woman-wearing-black-and-white-floral-dress-walks-inside-dark-room-tH_Byj_IWbo' }}
                        resizeMode='cover'
                        style={{ width: width, height: height * 0.23, justifyContent: 'flex-end', gap: width * 0.04 }}>
                        <TouchableOpacity
                            style={{ paddingHorizontal: width * 0.03 }}
                            onPress={() => navigation.openDrawer()}
                        >
                            <Text style={{ color: '#fff', fontSize: width * 0.04, fontWeight: 'bold' }}>
                                Menu
                            </Text>
                        </TouchableOpacity>
                        <View style={{
                            paddingHorizontal: width * 0.03,
                        }}>
                            <Text style={{ fontSize: width * 0.08, fontWeight: 'bold', color: '#fff' }}>Discover</Text>
                            <Text style={{ fontSize: width * 0.045, color: '#fff', fontWeight: 'bold' }}>Our Rental Shops</Text>
                        </View>
                    </ImageBackground>
                    <View style={{ paddingVertical: height * 0.03, gap: height * 0.03 }}>
                        <View style={{ gap: height * 0.02, marginHorizontal: width * 0.03 }}>
                            <Text style={{ fontSize: width * 0.047, fontWeight: 'bold', color: '#222' }}>
                                Categories
                            </Text>
                            <ScrollView contentContainerStyle={{ flexDirection: 'row', gap: width * 0.02 }} horizontal={true} showsHorizontalScrollIndicator={false}>
                                <TouchableOpacity
                                    style={{
                                        paddingHorizontal: width * 0.05,
                                        paddingVertical: height * 0.0065,
                                        borderRadius: height * 0.01,
                                        backgroundColor: '#222',
                                        borderWidth: width * 0.003
                                    }}>
                                    <Text style={{ color: '#fff' }}>Clothes</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={{ paddingHorizontal: width * 0.05, paddingVertical: height * 0.0065, borderRadius: height * 0.01, backgroundColor: '#fff', borderWidth: width * 0.003 }}>
                                    <Text>Clothes</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={{ paddingHorizontal: width * 0.05, paddingVertical: height * 0.0065, borderRadius: height * 0.01, backgroundColor: '#fff', borderWidth: width * 0.003 }}>
                                    <Text>Clothes</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={{ paddingHorizontal: width * 0.05, paddingVertical: height * 0.0065, borderRadius: height * 0.01, backgroundColor: '#fff', borderWidth: width * 0.003 }}>
                                    <Text>Clothes</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={{ paddingHorizontal: width * 0.05, paddingVertical: height * 0.0065, borderRadius: height * 0.01, backgroundColor: '#fff', borderWidth: width * 0.003 }}>
                                    <Text>Clothes</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={{ paddingHorizontal: width * 0.05, paddingVertical: height * 0.0065, borderRadius: height * 0.01, backgroundColor: '#fff', borderWidth: width * 0.003 }}>
                                    <Text>Clothes</Text>
                                </TouchableOpacity>

                            </ScrollView>
                        </View>

                        <View style={{ gap: height * 0.02, marginLeft: width * 0.03 }}>
                            <Text style={{ fontSize: width * 0.047, fontWeight: 'bold', color: '#222' }}>
                                Hot Trends 🔥
                            </Text>
                            <ScrollView contentContainerStyle={{ flexDirection: 'row', gap: width * 0.02 }} horizontal={true} showsHorizontalScrollIndicator={false}>
                                <TouchableOpacity style={{
                                    width: width * 0.55,
                                    height: height * 0.25,
                                    borderRadius: height * 0.01,
                                    backgroundColor: 'grey',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                }}>
                                    <Text style={{ color: '#fff' }}>Clothes</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={{
                                    width: width * 0.55,
                                    height: height * 0.25,
                                    borderRadius: height * 0.01,
                                    backgroundColor: 'grey',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                }}>
                                    <Text style={{ color: '#fff' }}>Clothes</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={{
                                    width: width * 0.55,
                                    height: height * 0.25,
                                    borderRadius: height * 0.01,
                                    backgroundColor: 'grey',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                }}>
                                    <Text style={{ color: '#fff' }}>Clothes</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={{
                                    width: width * 0.55,
                                    height: height * 0.25,
                                    borderRadius: height * 0.01,
                                    backgroundColor: 'grey',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                }}>
                                    <Text style={{ color: '#fff' }}>Clothes</Text>
                                </TouchableOpacity>
                            </ScrollView>
                        </View>
                        <View style={{ gap: height * 0.02, marginHorizontal: width * 0.03 }}>
                            <Text style={{ fontSize: width * 0.047, fontWeight: 'bold', color: '#222' }}>
                                Stores 😍
                            </Text>
                            <ScrollView contentContainerStyle={{ flexDirection: 'row', gap: width * 0.04, flexWrap: 'wrap', justifyContent: 'space-evenly' }}>
                                <TouchableOpacity style={{
                                    width: width * 0.4,
                                    height: height * 0.2,
                                    borderRadius: height * 0.01,
                                    backgroundColor: '#222',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                }}>
                                    <Text style={{ color: '#fff' }}>Clothes</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={{
                                    width: width * 0.4,
                                    height: height * 0.2,
                                    borderRadius: height * 0.01,
                                    backgroundColor: '#222',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                }}>
                                    <Text style={{ color: '#fff' }}>Clothes</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={{
                                    width: width * 0.4,
                                    height: height * 0.2,
                                    borderRadius: height * 0.01,
                                    backgroundColor: '#222',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                }}>
                                    <Text style={{ color: '#fff' }}>Clothes</Text>
                                </TouchableOpacity>

                                <TouchableOpacity style={{
                                    width: width * 0.4,
                                    height: height * 0.2,
                                    borderRadius: height * 0.01,
                                    backgroundColor: '#222',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                }}>
                                    <Text style={{ color: '#fff' }}>Clothes</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={{
                                    width: width * 0.4,
                                    height: height * 0.2,
                                    borderRadius: height * 0.01,
                                    backgroundColor: '#222',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                }}>
                                    <Text style={{ color: '#fff' }}>Clothes</Text>
                                </TouchableOpacity>

                            </ScrollView>
                        </View>
                    </View>
                </ScrollView >
            </View >
        </>

    )
}

export default Home

const styles = StyleSheet.create({
    safeAreaViewContainer: {
        flex: 1,
        backgroundColor: 'white'
    },
    scrollViewContainer: {
        backgroundColor: 'white',
        paddingVertical: 60,
        paddingHorizontal: 15,
        gap: 30
    },
    formInput: {
        width: 260,
        height: 50,
        backgroundColor: '#e8e8e8',
        borderRadius: 10,
        padding: 13
    },
    touchableSort: {
        width: 50,
        height: 50,
        backgroundColor: 'black',
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center'
    },
    touchableActiveCategory: {
        paddingHorizontal: 10,
        paddingVertical: 7,
        backgroundColor: 'black',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        marginHorizontal: 5
    },
    touchableNotActiveCategory: {
        paddingHorizontal: 10,
        borderWidth: 1,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        marginHorizontal: 5
    }
})