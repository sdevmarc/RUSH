import {
    View,
    Text,
    Dimensions,
    StatusBar,
    TouchableOpacity,
    ScrollView,
    ImageBackground,
    Alert
} from 'react-native'
import React, { useCallback, useState } from 'react'
import { useFocusEffect, useNavigation } from '@react-navigation/native'
import { MaterialCommunityIcons, MaterialIcons, Entypo } from '@expo/vector-icons'
import axios from 'axios'
import address from '../../../config/host'
import AsyncStorage from '@react-native-async-storage/async-storage'
import * as Colors from '../../../utils/colors'
import Loading from '../../components/Loading'
import * as ImagePicker from 'expo-image-picker'

const { width, height } = Dimensions.get('window')

const Account = () => {
    const navigation = useNavigation()
    const [isLoading, setIsLoading] = useState(false)
    const [imageLoading, setImageLoading] = useState(true)
    const [values, setValues] = useState([])
    const [isEdit, setEdit] = useState(false)
    const [isImage, setImage] = useState('')

    useFocusEffect(useCallback(() => {
        fetchData()
    }, []))

    const fetchData = async () => {
        try {
            setIsLoading(true)
            const userId = await AsyncStorage.getItem('userId')
            const data = await axios.get(`http:${address}/api/getuser/${userId}`)
            setValues(data?.data?.data)
        } catch (error) {
            console.log(error)
        } finally {
            setIsLoading(false)
        }
    }

    const handleOpenDrawer = () => {
        navigation.openDrawer()
    }

    const handleAddress = async () => {
        const userId = await AsyncStorage.getItem('userId')
        navigation.navigate('Address', { userId: userId })
    }

    const handleStartRenting = () => {
        navigation.navigate('ShopInformation')
    }

    const handleSaveEditedPhoto = () => {
        setIsLoading(true)
        handleUploadImage(isImage);
    }

    const handleOnClickAccountDetails = () => {
        navigation.navigate('EditAccountDetails')
    }

    const handleUploadImage = async (value) => {
        try {
            const userId = await AsyncStorage.getItem('userId')
            const data = new FormData();
            data.append('file', {
                uri: value,
                name: `photo.${value.split('.').pop()}`,
                type: `image/${value.split('.').pop()}`
            })
            data.append('upload_preset', '_products')
            data.append('cloud_name', 'do1p9llzd')
            data.append('folder', 'user_photo')

            setIsLoading(true)
            const res = await axios.post(`https://api.cloudinary.com/v1_1/do1p9llzd/image/upload`, data, {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'multipart/form-data'
                }
            })

            if (res) {
                const updateUserPhoto = await axios.post(`http://${address}/api/updateprofilephoto`, { userId, profilePhoto: res?.data?.url })

                if (updateUserPhoto) {
                    Alert.alert(updateUserPhoto?.data?.message)
                } else {
                    console.log('Error', updateUserPhoto?.data?.message)
                }
            } else {
                console.log(`Error data`)
            }
        } catch (error) {
            console.log(`Error Handle Image Upload ${error}`)
        } finally {
            setImage('')
            setEdit(false)
            setIsLoading(false)
            fetchData()
        }
    }

    const handleEditPhoto = async () => {
        try {
            setIsLoading(true)
            setEdit(true)
            let result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.All,
                allowsEditing: true,
                aspect: [4, 3],
                quality: 1,
            })

            if (!result.canceled) {
                try {
                    setImage(result.assets[0].uri)
                } catch (error) {
                    console.log(`Error: ${error}`)
                }
            } else {
                setEdit(false)
            }

        } catch (error) {
            console.error(error)
        } finally {
            setIsLoading(false)
        }
    }

    const handleCancel = () => {
        setEdit(false)
        setImage('')
    }

    return (
        <>
            <StatusBar translucent backgroundColor="transparent" barStyle="light-content" />
            <View style={{ width: width, backgroundColor: Colors.backgroundColor }}>
                {(isLoading || imageLoading) && <Loading title={`Loading`} />}
                <ImageBackground
                    source={{ uri: isImage ? isImage : values?.profilePhoto }}
                    style={{ width: '100%', height: height * 0.25, }}
                    resizeMode='cover'
                    onLoad={() => setImageLoading(false)}
                    onError={() => setImageLoading(false)}
                >
                    <View style={{ width: '100%', height: '100%', justifyContent: 'flex-end', alignItems: 'flex-start', padding: width * 0.05, backgroundColor: 'rgba(0,0,0,0.2)' }}>
                        <View style={{ width: '100%', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                            <Text style={{ color: Colors.whiteColor, fontWeight: '700', fontSize: width * 0.05 }}>
                                {values.displayName}
                            </Text>
                            {
                                isEdit ? (
                                    <View style={{ gap: height * 0.01 }}>
                                        <TouchableOpacity
                                            onPress={() => handleSaveEditedPhoto()}
                                            style={{ paddingHorizontal: width * 0.07, paddingVertical: height * 0.006, backgroundColor: Colors.orange, justifyContent: 'center', alignItems: 'center' }}>
                                            <Text style={{ color: Colors.whiteColor, fontWeight: '600', fontSize: width * 0.03 }}>
                                                Save
                                            </Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity
                                            onPress={handleCancel}
                                            style={{ paddingHorizontal: width * 0.03, paddingVertical: height * 0.006, backgroundColor: Colors.idleColor, justifyContent: 'center', alignItems: 'center' }}>
                                            <Text style={{ color: Colors.fontColor, fontWeight: '600', fontSize: width * 0.03 }}>
                                                Cancel
                                            </Text>
                                        </TouchableOpacity>
                                    </View>
                                ) : (
                                    <TouchableOpacity
                                        onPress={handleEditPhoto}
                                        style={{ paddingHorizontal: width * 0.03, paddingVertical: height * 0.006, backgroundColor: Colors.orange, justifyContent: 'center', alignItems: 'center' }}>
                                        <Text style={{ color: Colors.whiteColor, fontWeight: '600', fontSize: width * 0.03 }}>
                                            Edit Photo
                                        </Text>
                                    </TouchableOpacity>
                                )
                            }
                        </View>
                        <View style={{ width: '100%', flexDirection: 'row', gap: width * 0.03 }}>
                            <Text style={{ color: Colors.whiteColor, fontWeight: '600', fontSize: width * 0.03 }}>
                                Followers: 30
                            </Text>
                        </View>
                    </View>
                    <View
                        style={{
                            position: 'absolute',
                            width: '100%',
                            height: height * 0.13,
                            overflow: 'hidden',
                            zIndex: 1,
                            paddingBottom: height * 0.009
                        }}
                    >
                        <View
                            style={{
                                width: '100%',
                                height: '100%',
                                paddingHorizontal: width * 0.05,
                                width: width,
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                                alignItems: 'flex-end',
                                zIndex: 1
                            }}
                        >
                            <TouchableOpacity
                                onPress={handleOpenDrawer}
                            >
                                <MaterialCommunityIcons name="dots-grid" size={width * 0.08} color="white" />
                            </TouchableOpacity>
                        </View>
                    </View>
                </ImageBackground>
                <ScrollView>
                    <View style={{ width: width, height: height, paddingHorizontal: width * 0.03, paddingTop: height * 0.01, gap: height * 0.01 }}>
                        <View style={{ width: '100%', gap: height * 0.01 }}>
                            <Text style={{ fontWeight: '600', fontSize: height * 0.02 }}>
                                My Account
                            </Text>
                            <TouchableOpacity
                                onPress={handleOnClickAccountDetails}
                                style={{ width: '100%', gap: height * 0.01, backgroundColor: Colors.idleColor, padding: width * 0.03, borderRadius: height * 0.01, justifyContent: 'space-between' }}
                            >
                                <View style={{ width: '100%', flexDirection: 'row', justifyContent: 'space-between' }}>
                                    <Text style={{ color: Colors.fontColor, textAlign: 'justify', fontWeight: 'bold' }}>
                                        Account Details
                                    </Text>
                                    <Text style={{ color: Colors.fontColor, textAlign: 'justify', fontWeight: '500' }}>
                                        Edit
                                    </Text>
                                </View>
                                <View style={{ width: '100%', gap: height * 0.02 }}>
                                    <View style={{ width: '100%', flexDirection: 'row', paddingHorizontal: width * 0.02, justifyContent: 'space-between' }}>
                                        <Text style={{ color: Colors.fontColor, textAlign: 'justify', fontWeight: '600' }}>
                                            Username
                                        </Text>
                                        <Text style={{ width: '50%', color: Colors.fontColor, textAlign: 'right' }} numberOfLines={1} ellipsizeMode='tail'>
                                            {values.username}
                                        </Text>
                                    </View>
                                    <View style={{ width: '100%', flexDirection: 'row', paddingHorizontal: width * 0.02, justifyContent: 'space-between' }}>
                                        <Text style={{ color: Colors.fontColor, textAlign: 'justify', fontWeight: '600' }}>
                                            Display Name
                                        </Text>
                                        <Text style={{ width: '50%', color: Colors.fontColor, textAlign: 'right' }} numberOfLines={1} ellipsizeMode='tail'>
                                            {values.displayName}
                                        </Text>
                                    </View>
                                    <View style={{ width: '100%', flexDirection: 'row', paddingHorizontal: width * 0.02, justifyContent: 'space-between' }}>
                                        <Text style={{ color: Colors.fontColor, textAlign: 'justify', fontWeight: '600' }}>
                                            Contact Number
                                        </Text>
                                        <Text style={{ width: '50%', color: Colors.fontColor, textAlign: 'right' }} numberOfLines={1} ellipsizeMode='tail'>
                                            {values.contactno}
                                        </Text>
                                    </View>
                                    <View style={{ width: '100%', flexDirection: 'row', paddingHorizontal: width * 0.02, justifyContent: 'space-between' }}>
                                        <Text style={{ color: Colors.fontColor, textAlign: 'justify', fontWeight: '600' }}>
                                            User Type
                                        </Text>
                                        <Text style={{ width: '50%', color: Colors.fontColor, textAlign: 'right' }} numberOfLines={1} ellipsizeMode='tail'>
                                            {values.UserType}
                                        </Text>
                                    </View>
                                </View>
                            </TouchableOpacity>
                        </View>
                        <View style={{ width: '100%', gap: height * 0.01 }}>
                            <Text style={{ fontWeight: '600', fontSize: height * 0.02 }}>
                                Others
                            </Text>
                            <View style={{ width: '100%', flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'flex-start', gap: width * 0.03 }}>
                                <TouchableOpacity
                                    onPress={handleAddress}
                                    style={{
                                        width: width * 0.29,
                                        height: height * 0.13,
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        backgroundColor: Colors.idleColor,
                                        borderRadius: height * 0.02,
                                        gap: height * 0.01
                                    }}
                                >
                                    <Entypo name="address" size={24} color="black" />
                                    <Text style={{ width: '80%', color: Colors.fontColor, fontWeight: '600', textAlign: 'center' }}>
                                        My Addresses
                                    </Text>
                                </TouchableOpacity>
                                {
                                    values.UserType === 'Rentee' && (
                                        <TouchableOpacity
                                            onPress={handleStartRenting}
                                            style={{
                                                width: width * 0.29,
                                                height: height * 0.13,
                                                justifyContent: 'center',
                                                alignItems: 'center',
                                                backgroundColor: Colors.idleColor,
                                                borderRadius: height * 0.02,
                                                gap: height * 0.01
                                            }}
                                        >
                                            <MaterialIcons name="sell" size={24} color="black" />
                                            <Text style={{ width: '80%', color: Colors.fontColor, fontWeight: '600', textAlign: 'center' }}>
                                                Start Renting
                                            </Text>
                                        </TouchableOpacity>
                                    )
                                }
                                {/* <TouchableOpacity
                                    style={{
                                        width: width * 0.29,
                                        height: height * 0.13,
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        backgroundColor: Colors.idleColor,
                                        borderRadius: height * 0.02,
                                        gap: height * 0.01
                                    }}
                                >
                                    <MaterialIcons name="manage-accounts" size={24} color="black" />
                                    <Text style={{ width: '80%', color: Colors.fontColor, fontWeight: '600', textAlign: 'center' }}>
                                        Account Settings
                                    </Text>
                                </TouchableOpacity> */}
                            </View>
                        </View>
                    </View>
                </ScrollView>

            </View>
        </>
    )
}

export default Account