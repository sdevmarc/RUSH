import { Image, Modal, ScrollView, StatusBar, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
const bgSample = require('../../../assets/bgIntro.png')

const Home = () => {
    const [isModal, setModal] = useState(false)

    if (isModal) {
        return (
            <Modal
                visible={isModal}
                onRequestClose={() => setModal(false)}
                animationType='slide'
                presentationStyle='pageSheet'
            >
                <View style={{ flex: 1,justifyContent: 'center', alignItems: 'center' }}>
                    <Text>Hello World</Text>
                </View>
            </Modal>
        )
    }


    return (
        <>
            <StatusBar translucent backgroundColor="white" barStyle="dark-content" />
            <SafeAreaView style={styles.safeAreaViewContainer}>
                <ScrollView contentContainerStyle={styles.scrollViewContainer}>
                    <View>
                        <Text style={{ fontWeight: 'bold' }}>Menu</Text>
                    </View>
                    <View style={{ gap: 6 }}>
                        <Text style={{ fontSize: 25, fontWeight: 'bold' }}>Welcome!</Text>
                        <Text style={{ fontSize: 18, color: '#8a8a8a', fontWeight: 'bold' }}>Our Rental Shops</Text>
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                        <TextInput style={styles.formInput} placeholder='Search...' />
                        <TouchableOpacity style={styles.touchableSort}>
                            <Text style={{ color: 'white' }}>Sort</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{ gap: 10 }}>
                        <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Categories</Text>
                        <View style={{ flexDirection: 'row', gap: 10 }}>
                            <TouchableOpacity style={styles.touchableActiveCategory}>
                                <Text style={{ color: 'white', fontWeight: 'bold' }}>Clothes</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.touchableNotActiveCategory}>
                                <Text style={{ color: '#111' }}>Electronics</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.touchableNotActiveCategory}>
                                <Text style={{ color: '#111' }}>Car</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.touchableNotActiveCategory}>
                                <Text style={{ color: '#111' }}>Camera</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.touchableNotActiveCategory}>
                                <Text style={{ color: '#111' }}>Cleaning</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.touchableNotActiveCategory}>
                                <Text style={{ color: '#111' }}>Tools</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={{ gap: 20 }}>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                            <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Top Stores</Text>
                            <TouchableOpacity>
                                <Text style={{ fontSize: 15 }}>View all</Text>
                            </TouchableOpacity>
                        </View>

                        <View style={{ flexWrap: 'wrap', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', gap: 20 }}>
                            <TouchableOpacity onPress={() => setModal(true)}>
                                <View style={{ width: 170, overflow: 'hidden', justifyContent: 'center', alignItems: 'center', gap: 10 }}>
                                    <View style={{ width: 170, height: 170, borderRadius: 10, overflow: 'hidden', alignItems: 'center' }}>
                                        <Image source={bgSample} style={{ width: 200, height: 200 }} resizeMode='cover' />
                                    </View>
                                    <View style={{ gap: 3 }}>
                                        <Text style={{ fontSize: 16, fontWeight: 'bold' }}>Eko Store</Text>
                                        <Text style={{ fontSize: 13, color: '#8a8a8a' }}>Need clothes? Bumili ka dito sa eko store</Text>
                                        <Text style={{ fontWeight: 'bold' }}>Open Daily</Text>
                                    </View>
                                </View>

                            </TouchableOpacity>


                            <TouchableOpacity>
                                <View style={{ width: 170, overflow: 'hidden', justifyContent: 'center', alignItems: 'center', gap: 10 }}>
                                    <View style={{ width: 170, height: 170, borderRadius: 10, overflow: 'hidden', alignItems: 'center' }}>
                                        <Image source={bgSample} style={{ width: 200, height: 200 }} resizeMode='cover' />
                                    </View>
                                    <View style={{ gap: 3 }}>
                                        <Text style={{ fontSize: 16, fontWeight: 'bold' }}>Eko Store</Text>
                                        <Text style={{ fontSize: 13, color: '#8a8a8a' }}>Need clothes? Bumili ka dito sa eko store</Text>
                                        <Text style={{ fontWeight: 'bold' }}>Open Daily</Text>
                                    </View>
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity>
                                <View style={{ width: 170, overflow: 'hidden', justifyContent: 'center', alignItems: 'center', gap: 10 }}>
                                    <View style={{ width: 170, height: 170, borderRadius: 10, overflow: 'hidden', alignItems: 'center' }}>
                                        <Image source={bgSample} style={{ width: 200, height: 200 }} resizeMode='cover' />
                                    </View>
                                    <View style={{ gap: 3 }}>
                                        <Text style={{ fontSize: 16, fontWeight: 'bold' }}>Eko Store</Text>
                                        <Text style={{ fontSize: 13, color: '#8a8a8a' }}>Need clothes? Bumili ka dito sa eko store</Text>
                                        <Text style={{ fontWeight: 'bold' }}>Open Daily</Text>
                                    </View>
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity>
                                <View style={{ width: 170, overflow: 'hidden', justifyContent: 'center', alignItems: 'center', gap: 10 }}>
                                    <View style={{ width: 170, height: 170, borderRadius: 10, overflow: 'hidden', alignItems: 'center' }}>
                                        <Image source={bgSample} style={{ width: 200, height: 200 }} resizeMode='cover' />
                                    </View>
                                    <View style={{ gap: 3 }}>
                                        <Text style={{ fontSize: 16, fontWeight: 'bold' }}>Eko Store</Text>
                                        <Text style={{ fontSize: 13, color: '#8a8a8a' }}>Need clothes? Bumili ka dito sa eko store</Text>
                                        <Text style={{ fontWeight: 'bold' }}>Open Daily</Text>
                                    </View>
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity>
                                <View style={{ width: 170, overflow: 'hidden', justifyContent: 'center', alignItems: 'center', gap: 10 }}>
                                    <View style={{ width: 170, height: 170, borderRadius: 10, overflow: 'hidden', alignItems: 'center' }}>
                                        <Image source={bgSample} style={{ width: 200, height: 200 }} resizeMode='cover' />
                                    </View>
                                    <View style={{ gap: 3 }}>
                                        <Text style={{ fontSize: 16, fontWeight: 'bold' }}>Eko Store</Text>
                                        <Text style={{ fontSize: 13, color: '#8a8a8a' }}>Need clothes? Bumili ka dito sa eko store</Text>
                                        <Text style={{ fontWeight: 'bold' }}>Open Daily</Text>
                                    </View>
                                </View>
                            </TouchableOpacity>
                        </View>

                    </View>
                </ScrollView>
            </SafeAreaView >
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
        width: 300,
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
        borderRadius: 10
    },
    touchableNotActiveCategory: {
        paddingHorizontal: 10,
        borderWidth: 1,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10
    }
})