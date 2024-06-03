import {
    View,
    Text,
    Modal,
    TouchableOpacity,
    Dimensions,
    ImageBackground,
    ScrollView,
    TextInput,
    Alert
} from 'react-native'
import React, { useCallback, useState } from 'react'
import * as Colors from '../../utils/colors'
import { Ionicons } from '@expo/vector-icons';
import { useFocusEffect, useNavigation } from '@react-navigation/native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import axios from 'axios'
import Loading from './Loading'
import * as ImagePicker from 'expo-image-picker'
import BottomBar from './BottomBar';

const { width, height } = Dimensions.get('window')

export default function RNModal({ isVisible, onClose }) {
    const [details, setDetails] = useState({
        shopName: '',
        shopImage: ''
    })
    const [isEdit, setEdit] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [imageLoading, setImageLoading] = useState(true)
    const [isImage, setImage] = useState('')

    useFocusEffect(useCallback(() => {
        fetchStore()
    }, []))

    const fetchStore = async () => {
        try {
            setIsLoading(true)
            const userId = await AsyncStorage.getItem('userId')
            const token = await AsyncStorage.getItem('token')

            const storeDetails = await axios.get(`${process.env.EXPO_PUBLIC_SERVER}/api/getstore/${userId}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            setDetails((prev) => ({
                ...prev,
                shopImage: storeDetails?.data?.data?.shopInformation?.shopImage,
                shopName: storeDetails?.data?.data?.shopInformation?.shopName
            }))

        } catch (error) {
            console.log('Error', error);
        } finally {
            setIsLoading(false)
        }
    }

    const handleUpdateDetails = async () => {
        try {
            const storeId = await AsyncStorage.getItem('storeId')
            const { shopName } = details

            if (!shopName)  {
                Alert.alert('Error', 'Please enter a shop name!')
                fetchStore()
                return
            } 

            setIsLoading(true)
            setImageLoading(true)
            if (isImage) {
                handleUploadImage(isImage);
            } else {
                const updateUserPhoto = await axios.post(`${process.env.EXPO_PUBLIC_SERVER}/api/updatestoredetails`, { storeId, shopName: shopName })

                if (updateUserPhoto) {
                    Alert.alert('Success!',updateUserPhoto?.data?.message)
                  
                } else {
                    console.log('Error', updateUserPhoto?.data?.message)
                }
            }
        } catch (error) {
            console.error(error)
        } finally {
            setIsLoading(false)
            setImageLoading(false)
        }
    }

    const handleUploadImage = async (value) => {
        try {
            const storeId = await AsyncStorage.getItem('storeId')
            const data = new FormData();
            data.append('file', {
                uri: value,
                name: `photo.${value.split('.').pop()}`,
                type: `image/${value.split('.').pop()}`
            })
            data.append('upload_preset', '_products')
            data.append('cloud_name', 'do1p9llzd')
            data.append('folder', 'store_photo')

            setIsLoading(true)
            const res = await axios.post(process.env.EXPO_PUBLIC_CLOUDINARY_URL, data, {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'multipart/form-data'
                }
            })
            if (res) {
                const updateUserPhoto = await axios.post(`${process.env.EXPO_PUBLIC_SERVER}/api/updatestoredetails`, { storeId, shopImage: res?.data?.url, shopName: details?.shopName })

                if (updateUserPhoto) {
                    Alert.alert('Success!',updateUserPhoto?.data?.message)
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
            fetchStore()
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

    const handleOnChange = (value) => {
        setDetails((prev) => ({
            ...prev,
            shopName: value
        }))
    }


    return (
        <Modal visible={isVisible} animationType="slide" onRequestClose={onClose} presentationStyle="pageSheet">
            <View style={{ width: width, height: height, backgroundColor: Colors.backgroundColor }}>
                {(isLoading || imageLoading) && <Loading title={`Loading`} />}
                <ImageBackground
                    source={{ uri: isImage ? isImage : details?.shopImage }}
                    style={{ width: '100%', height: height * 0.25, }}
                    resizeMode='cover'
                    onLoad={() => setImageLoading(false)}
                    onError={() => setImageLoading(false)}
                >
                    <View style={{ width: '100%', height: '100%', justifyContent: 'flex-end', alignItems: 'flex-start', padding: width * 0.05, backgroundColor: 'rgba(0,0,0,0.2)' }}>
                        <View style={{ width: '100%', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                            <Text style={{ width: '50%', color: Colors.whiteColor, fontWeight: '700', fontSize: width * 0.05 }} numberOfLines={2} ellipsizeMode='tail'>
                                {details?.shopName}
                            </Text>
                            {
                                isEdit ? (
                                    <View style={{ gap: height * 0.01 }}>
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
                                Rating 3.5
                            </Text>
                            <Text style={{ color: Colors.whiteColor, fontWeight: '600', fontSize: width * 0.03 }}>
                                Followers 30
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
                                onPress={onClose}
                            >
                                <Ionicons name="chevron-back-circle" size={width * 0.08} color="#dedede" />
                            </TouchableOpacity>
                        </View>
                    </View>
                </ImageBackground>
                <ScrollView>
                    <View style={{ width: width, paddingHorizontal: width * 0.03, paddingTop: height * 0.02, gap: height * 0.01, paddingBottom: height * 0.5 }}>
                        <View style={{ width: '100%', gap: height * 0.01 }}>
                            <Text style={{ fontSize: width * 0.05, color: Colors.fontColor, fontFamily: 'Poppins-Regular' }}>
                                Shop Details
                            </Text>
                        </View>
                        <View style={{ width: '100%', flexDirection: 'row', gap: width * 0.03, flexWrap: 'wrap', justifyContent: 'space-between' }}>
                            <View style={{ width: '100%', gap: height * 0.01 }}>
                                <Text style={{ color: Colors.fontColor, fontWeight: 'bold' }}>
                                    Store Name
                                </Text>
                                <TextInput
                                    onChangeText={(value) => handleOnChange(value)}
                                    value={details?.shopName}
                                    style={{ height: height * 0.06, backgroundColor: Colors.idleColor, borderRadius: 10, paddingHorizontal: width * 0.05, fontSize: width * 0.035 }}
                                    placeholder='What is your display name?' />
                            </View>
                        </View>
                    </View>
                    <BottomBar title='UPDATE' redirect={handleUpdateDetails} />
                </ScrollView>

            </View >
        </Modal>
    )
}