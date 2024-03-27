import {
    View,
    Text,
    Dimensions,
    StatusBar,
    TouchableOpacity,
    ScrollView,
    Image
} from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'
import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';

const { width, height } = Dimensions.get('window')

const Account = () => {
    const navigation = useNavigation()

    const handleAddress = () => {
        navigation.navigate('Address')
    }

    return (
        <>
            <StatusBar translucent backgroundColor="transparent" barStyle="light-content" />
            <View style={{ width: width, height: height, backgroundColor: '#323d48' }}>
                <View style={{ position: 'absolute', width: '100%', height: '10%', overflow: 'hidden', zIndex: 1 }}>
                    <View
                        style={{
                            width: '100%',
                            height: '100%',
                            paddingHorizontal: width * 0.05,
                            width: width,
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            alignItems: 'flex-end'
                        }}
                    >
                        <TouchableOpacity
                            onPress={() => navigation.openDrawer()}
                        >
                            <MaterialCommunityIcons name="dots-grid" size={24} color="white" />
                        </TouchableOpacity>
                    </View>
                </View>
                <ScrollView>
                    <View style={{ width: width, height: height }}>
                        <View style={{ width: '100%', height: '40%', justifyContent: 'center', alignItems: 'center', gap: height * 0.01, paddingTop: height * 0.05 }}>
                            <View
                                style={{
                                    overflow: 'hidden',
                                    width: '55%',
                                    height: '75%',
                                    backgroundColor: 'white',
                                    borderRadius: height * 0.04,
                                    borderWidth: 6,
                                    borderColor: '#fff'

                                }}
                            >
                                <Image
                                    source={{ uri: 'https://source.unsplash.com/white-v-neck-shirt-on-brown-clothes-hanger-p8Drpg_duLw' }}
                                    resizeMode='cover'
                                    style={{ width: '100%', height: '100%' }}
                                />
                            </View>
                            <Text style={{ color: 'white', fontSize: width * 0.05 }}>
                                Marc Edison
                            </Text>
                        </View>
                        <View style={{ width: '100%', height: '60%', gap: height * 0.01 }}>
                            <TouchableOpacity
                                style={{
                                    height: '10%',
                                    flexDirection: 'row',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                    paddingHorizontal: width * 0.03,
                                    marginHorizontal: width * 0.03,
                                    backgroundColor: '#4a4c59',
                                    borderRadius: height * 0.02
                                }}
                            >
                                <Text style={{ color: '#fff', fontWeight: 'bold' }}>
                                    Edit Profile
                                </Text>
                                <MaterialIcons name="arrow-forward-ios" size={width * 0.05} color="white" />
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={handleAddress}
                                style={{
                                    height: '10%',
                                    flexDirection: 'row',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                    paddingHorizontal: width * 0.03,
                                    marginHorizontal: width * 0.03,
                                    backgroundColor: '#4a4c59',
                                    borderRadius: height * 0.02
                                }}
                            >
                                <Text style={{ color: '#fff', fontWeight: 'bold' }}>
                                    My Addresses
                                </Text>
                                <MaterialIcons name="arrow-forward-ios" size={width * 0.05} color="white" />
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={{
                                    height: '10%',
                                    flexDirection: 'row',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                    paddingHorizontal: width * 0.03,
                                    marginHorizontal: width * 0.03,
                                    backgroundColor: '#4a4c59',
                                    borderRadius: height * 0.02
                                }}
                            >
                                <Text style={{ color: '#fff', fontWeight: 'bold' }}>
                                    Account Security
                                </Text>
                                <MaterialIcons name="arrow-forward-ios" size={width * 0.05} color="white" />
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={{
                                    height: '10%',
                                    flexDirection: 'row',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                    paddingHorizontal: width * 0.03,
                                    marginHorizontal: width * 0.03,
                                    backgroundColor: '#4a4c59',
                                    borderRadius: height * 0.02
                                }}
                            >
                                <Text style={{ color: '#fff', fontWeight: 'bold' }}>
                                    Bank Accounts/ Cards
                                </Text>
                                <MaterialIcons name="arrow-forward-ios" size={width * 0.05} color="white" />
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={{
                                    height: '10%',
                                    flexDirection: 'row',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                    paddingHorizontal: width * 0.03,
                                    marginHorizontal: width * 0.03,
                                    backgroundColor: '#4a4c59',
                                    borderRadius: height * 0.02
                                }}
                            >
                                <Text style={{ color: '#fff', fontWeight: 'bold' }}>
                                    My Likes
                                </Text>
                                <MaterialIcons name="arrow-forward-ios" size={width * 0.05} color="white" />
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={{
                                    height: '10%',
                                    flexDirection: 'row',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                    paddingHorizontal: width * 0.03,
                                    marginHorizontal: width * 0.03,
                                    backgroundColor: '#4a4c59',
                                    borderRadius: height * 0.02
                                }}
                            >
                                <Text style={{ color: '#fff', fontWeight: 'bold' }}>
                                    Start Renting
                                </Text>
                                <MaterialIcons name="arrow-forward-ios" size={width * 0.05} color="white" />
                            </TouchableOpacity>
                        </View>
                    </View>
                </ScrollView>

            </View>
        </>
    )
}

export default Account