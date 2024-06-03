import {
    View,
    Text,
    StatusBar,
    Dimensions,
    ScrollView,
    TouchableOpacity,
    TextInput,
    Platform,
    KeyboardAvoidingView,
    Image,
    Alert
} from 'react-native'
import React, { useEffect, useState } from 'react'
import Navbar from '../../../components/Navbar'
import { Picker } from '@react-native-picker/picker'
import BottomBar from '../../../components/BottomBar'
import * as ImagePicker from 'expo-image-picker'
import Context from '../../../components/Context'
import Modal from '../../../components/Modal'
import AsyncStorage from '@react-native-async-storage/async-storage'
import axios from 'axios'
import address from '../../../../config/host'
import { useNavigation } from '@react-navigation/native'
import * as Colors from '../../../../utils/colors'
import Loading from '../../../components/Loading'

const { width, height } = Dimensions.get('window')

const SampleCategory = [
    { id: 1, name: 'Clothes' },
    { id: 2, name: 'Electric' },
    { id: 3, name: 'Goods' },
]

const SampleSizes = [
    { id: 1, name: 'XS' },
    { id: 2, name: 'S' },
    { id: 3, name: 'M' },
    { id: 4, name: 'L' },
    { id: 5, name: 'XL' },
    { id: 6, name: 'XXL' }
]

const SampleShipping = [
    { id: 1, name: 'Delivery' },
    { id: 2, name: 'Pickup' }
]

const AddProducts = () => {
    const navigation = useNavigation()
    const [isLoading, setIsLoading] = useState(false)
    const [selectedPicture, setSelectedPicture] = useState({
        gallery: []
    })
    const [IsModalOpen, setIsModalOpen] = useState({
        category: false,
        sizes: false,
        shipping: false
    })
    const [values, setValues] = useState({
        storeId: '',
        productInformation: {
            productName: '',
            productDescription: '',
            days: '',
            isAvailable: 'Available',
            category: [],
            gallery: [],
            sizes: [],
            shippingAvailability: [],
            price: '',
            shippingFee: ''
        }
    })

    useEffect(() => {
        fetchData()
        if (values.productInformation.gallery.length > 0) {
            sendData()
        }
    }, [values.productInformation.gallery])

    const fetchData = async () => {
        const storeId = await AsyncStorage.getItem('storeId')
        setValues((prevValue) => ({
            ...prevValue,
            storeId: storeId
        }))
    }

    const sendData = async () => {
        try {
            const res = await axios.post(`${address}/api/addproduct`, values);

            if (res.data.success) {
                Alert.alert(res.data.message);
                navigation.reset({
                    index: 0,
                    routes: [{ name: 'DrawerRoutes' }]
                })
                await AsyncStorage.removeItem('storeId')
            } else {
                Alert.alert(res.data.message);
            }
        } catch (error) {
            console.log('Error', error);
        }
    }

    const handlePublish = async () => {
        try {
            const { storeId, productInformation } = values;
            const {
                productName,
                productDescription,
                days,
                category,
                gallery,
                price,
                isAvailable,
                shippingFee
            } = productInformation

            if (selectedPicture.length <= 0) {
                Alert.alert('Error', 'Please select an image of yor product!')
                return;
            }

            if (!Number.isInteger(Number(days))) {
                Alert.alert('Error', 'The "Days of Rent" field must be an integer.');
                return;
            }

            if (!Number.isInteger(Number(price))) {
                Alert.alert('Error', 'The "Price" field must be an integer.');
                return;
            }

            if (!Number.isInteger(Number(shippingFee))) {
                Alert.alert('Error', 'The "Shipping Fee" field must be an integer.');
                return;
            }


            if (!storeId || !productName || !productDescription || !days || !isAvailable || category.length === 0 || !price || !shippingFee) {
                Alert.alert('Please fill-up the required fields!')
                console.log(values)
                return
            }

            setIsLoading(true)
            const uploadPromises = selectedPicture.gallery.map(async (image) => {
                return await handleUploadImage(image.uri);
            })

            const uploadedImages = await Promise.all(uploadPromises)
            setValues(prevState => ({
                ...prevState,
                productInformation: {
                    ...prevState.productInformation,
                    gallery: uploadedImages
                }
            }))

        } catch (error) {
            console.log('Error', error)
            Alert.alert(error)
        } finally {
            setIsLoading(false)
        }
    }

    const pickImage = async () => {
        if (selectedPicture.gallery.length >= 8) {
            Alert.alert('Maximum 8 images allowed');
            return;
        }

        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        })

        if (!result.canceled) {
            try {
                const newGalleryItem = { uri: result.assets[0].uri }

                setSelectedPicture((prevValue) => ({
                    ...prevValue,
                    gallery: [...prevValue.gallery, newGalleryItem]
                }))
            } catch (error) {
                console.log(`Error: ${error}`)
            }
        }
    }

    const handleUploadImage = async (value) => {
        try {
            const data = new FormData();
            data.append('file', {
                uri: value,
                name: `photo.${value.split('.').pop()}`,
                type: `image/${value.split('.').pop()}`
            })
            data.append('upload_preset', '_products')
            data.append('cloud_name', 'do1p9llzd')
            data.append('folder', 'products_image')

            const res = await axios.post(`https://api.cloudinary.com/v1_1/do1p9llzd/image/upload`, data, {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'multipart/form-data'
                }
            })

            if (res) {
                console.log(`There is a res:`, res.data.url)
                return { uri: res.data.url }
            } else {
                console.log(`Error data`)
            }
        } catch (error) {
            console.log(`Error Handle Image Upload ${error}`)
        }
    }

    const handleModalState = (e, value) => {
        setIsModalOpen((prevValue => ({ ...prevValue, [e]: value })))
    }

    const handleOnChangeProductInformationArray = (e, object, value, limit) => {
        if (values.productInformation[e].length >= limit) {
            Alert.alert('Maximum requirements are already met');
            return
        }

        setValues(prevValue => ({
            ...prevValue,
            productInformation: {
                ...prevValue.productInformation,
                [e]: [...prevValue.productInformation[e], { [object]: value }]
            }
        }))
    }

    const handleOnChangeText = (e, value) => {
        setValues((prevValue) => ({
            ...prevValue,
            productInformation: {
                ...prevValue.productInformation,
                [e]: value
            }
        }))
    }

    return (
        <>
            <StatusBar translucent backgroundColor="transparent" barStyle="light-content" />
            <View style={{ width: width, height: height, backgroundColor: Colors.backgroundColor }}>
                {isLoading && <Loading title={`Publishing`} />}
                <Navbar title='Add Product' backgroundColor={Colors.backgroundColor} tintColor={Colors.fontColor} />
                <Context.Provider value={{ IsModalOpen, setIsModalOpen }}>
                    <Modal onSelectedValue={(item) => handleOnChangeProductInformationArray('category', 'name', item, 3)} fetchedData={SampleCategory} modalId='category' />
                    <Modal onSelectedValue={(item) => handleOnChangeProductInformationArray('sizes', 'size', item, 6)} fetchedData={SampleSizes} modalId='sizes' />
                    <Modal onSelectedValue={(item) => handleOnChangeProductInformationArray('shippingAvailability', 'shippingName', item, 2)} fetchedData={SampleShipping} modalId='shipping' />
                </Context.Provider>
                <KeyboardAvoidingView behavior="padding">
                    <ScrollView>
                        <View style={{ width: width, paddingHorizontal: width * 0.03, paddingVertical: height * 0.03 }}>
                            <View style={{ width: '100%', paddingTop: height * 0.1, paddingBottom: height * 0.2, gap: height * 0.01 }}>
                                <View style={{ width: '100%', flexDirection: 'row' }}>
                                    <Text style={{ color: Colors.fontColor, textAlign: 'justify', fontWeight: 'bold' }}>
                                        Product Gallery
                                    </Text>
                                </View>
                                <View style={{ width: '100%', justifyContent: 'flex-start', flexDirection: 'row', gap: width * 0.02, flexWrap: 'wrap' }}>
                                    {selectedPicture.gallery.length !== 0
                                        ? (
                                            <>
                                                {
                                                    selectedPicture.gallery.map((item, index) => (
                                                        <View key={index} style={{ width: '22%', height: height * 0.1, overflow: 'hidden' }}>
                                                            <Image
                                                                source={{ uri: `${item.uri}` }}
                                                                resizeMode='cover'
                                                                style={{ width: '100%', height: '100%' }}
                                                            />
                                                        </View>
                                                    ))
                                                }
                                            </>
                                        )
                                        : <View style={{ width: '22%', height: height * 0.1, overflow: 'hidden', justifyContent: 'center', alignItems: 'center', backgroundColor: '#AEAEAE' }}>
                                            <Text style={{ color: Colors.whiteColor, fontWeight: '500' }}>
                                                None
                                            </Text>
                                        </View>
                                    }
                                </View>
                                <TouchableOpacity
                                    onPress={pickImage}
                                    style={{ width: '100%', gap: height * 0.003, backgroundColor: Colors.black, padding: width * 0.03, borderRadius: height * 0.01, justifyContent: 'space-between' }}
                                >
                                    <View style={{ width: '100%', gap: height * 0.005, flexDirection: 'row', paddingHorizontal: width * 0.02, paddingVertical: height * 0.01, justifyContent: 'space-between' }}>
                                        <Text style={{ color: Colors.whiteColor, textAlign: 'justify', fontWeight: '600' }}>
                                            Add Photo
                                        </Text>
                                        <Text style={{ width: '50%', color: Colors.whiteColor, textAlign: 'right' }} numberOfLines={1} ellipsizeMode='tail'>
                                            {selectedPicture.gallery.length}/8
                                        </Text>
                                    </View>
                                </TouchableOpacity>
                                <View style={{ width: '100%', gap: height * 0.01 }}>
                                    <Text style={{ color: Colors.fontColor, fontWeight: 'bold' }}>
                                        Product Name
                                    </Text>
                                    <TextInput
                                        onChangeText={(value) => handleOnChangeText('productName', value)}
                                        style={{ height: height * 0.06, backgroundColor: '#e8e8e8', borderRadius: 10, paddingHorizontal: width * 0.05, fontSize: width * 0.035 }} placeholder='What is the name of your product?' />
                                </View>
                                <View style={{ width: '100%', gap: height * 0.01 }}>
                                    <Text style={{ color: Colors.fontColor, fontWeight: 'bold' }}>
                                        Product Description
                                    </Text>
                                    <TextInput
                                        onChangeText={(value) => handleOnChangeText('productDescription', value)}
                                        style={{ height: height * 0.06, backgroundColor: '#e8e8e8', borderRadius: 10, paddingHorizontal: width * 0.05, fontSize: width * 0.035 }} placeholder='Can you describe what your product is?' />
                                </View>
                                <View style={{ width: '100%', flexDirection: 'column', gap: height * 0.005 }}>
                                    <Text style={{ color: Colors.fontColor, textAlign: 'justify', fontWeight: 'bold' }}>
                                        Category
                                    </Text>
                                    <View style={{ width: '100%', gap: width * 0.02, alignItems: 'flex-start', flexDirection: 'row', flexWrap: 'wrap' }}>
                                        {values.productInformation.category.map((item, index) => (
                                            <TouchableOpacity key={index} style={{ paddingHorizontal: width * 0.07, paddingVertical: height * 0.007, backgroundColor: '#d7a152', borderRadius: height * 0.01 }}>
                                                <Text style={{ color: Colors.whiteColor, fontWeight: '500' }}>
                                                    {item.name}
                                                </Text>
                                            </TouchableOpacity>
                                        ))}
                                    </View>
                                </View>
                                <TouchableOpacity
                                    onPress={() => handleModalState('category', true)}
                                    style={{ width: '100%', gap: height * 0.003, backgroundColor: Colors.black, padding: width * 0.03, borderRadius: height * 0.01, justifyContent: 'space-between' }}
                                >
                                    <View style={{ width: '100%', gap: height * 0.005, flexDirection: 'row', paddingHorizontal: width * 0.02, paddingVertical: height * 0.01, justifyContent: 'space-between' }}>
                                        <Text style={{ color: Colors.whiteColor, textAlign: 'justify', fontWeight: '600' }}>
                                            Add Category
                                        </Text>
                                        <Text style={{ width: '50%', color: Colors.whiteColor, textAlign: 'right' }} numberOfLines={1} ellipsizeMode='tail'>
                                            {values.productInformation.category.length}/3
                                        </Text>
                                    </View>
                                </TouchableOpacity>
                                <View style={{ width: '100%', flexDirection: 'row' }}>
                                    <Text style={{ color: Colors.fontColor, textAlign: 'justify', fontWeight: 'bold' }}>
                                        Days of Rent
                                    </Text>
                                </View>
                                <View style={{ width: '100%', gap: height * 0.01 }}>
                                    <TextInput
                                        onChangeText={(value) => handleOnChangeText('days', value)}
                                        style={{ height: height * 0.06, backgroundColor: '#e8e8e8', borderRadius: 10, paddingHorizontal: width * 0.05, fontSize: width * 0.035 }} placeholder='Days are you willing rent this product?' />
                                </View>
                                <View style={{ width: '100%', flexDirection: 'column', gap: height * 0.005 }}>
                                    <Text style={{ color: Colors.fontColor, textAlign: 'justify', fontWeight: 'bold' }}>
                                        Variation
                                    </Text>
                                    <View style={{ width: '100%', gap: width * 0.02, alignItems: 'flex-start', flexDirection: 'row', flexWrap: 'wrap' }}>
                                        {values.productInformation.sizes.map((item, index) => (
                                            <TouchableOpacity key={index} style={{ paddingHorizontal: width * 0.07, paddingVertical: height * 0.007, backgroundColor: '#d7a152', borderRadius: height * 0.01 }}>
                                                <Text style={{ color: Colors.whiteColor, fontWeight: '500' }}>
                                                    {item.size}
                                                </Text>
                                            </TouchableOpacity>
                                        ))}

                                    </View>
                                </View>

                                {Platform.OS === 'ios'
                                    ? (
                                        <>

                                            <TouchableOpacity
                                                onPress={() => handleModalState('sizes', true)}
                                                style={{ width: '100%', gap: height * 0.003, backgroundColor: Colors.black, padding: width * 0.03, borderRadius: height * 0.01, justifyContent: 'space-between' }}
                                            >
                                                <View style={{ width: '100%', gap: height * 0.005, flexDirection: 'row', paddingHorizontal: width * 0.02, paddingVertical: height * 0.01, justifyContent: 'space-between' }}>
                                                    <Text style={{ color: Colors.whiteColor, textAlign: 'justify', fontWeight: '600' }}>
                                                        Add Sizes
                                                    </Text>
                                                    <Text style={{ width: '50%', color: Colors.whiteColor, textAlign: 'right' }} numberOfLines={1} ellipsizeMode='tail'>
                                                        Optional
                                                    </Text>
                                                </View>
                                            </TouchableOpacity>

                                        </>
                                    )
                                    :
                                    (
                                        null
                                        // <>
                                        //     <View style={{ width: '100%', paddingHorizontal: width * 0.03, gap: height * 0.01 }}>
                                        //         <View style={{ width: '100%', gap: height * 0.01 }}>
                                        //             <Picker
                                        //                 selectedValue={handleOnChangeProductInformationArray}
                                        //                 onValueChange={(value) => handleOnChangeAddress('municipality', value)}
                                        //                 mode='drop'
                                        //                 dropdownIconColor={'#000'}
                                        //                 dropdownIconRippleColor={'#d9d8d7'}
                                        //                 prompt='Select Municipality'
                                        //                 selectionColor={'#000'}
                                        //                 style={{ backgroundColor: '#d9d8d7', color: '#000', borderRadius: height * 0.01 }}
                                        //             >
                                        //                 {
                                        //                     Platform.OS === 'android' && <Picker.Item color={Platform.OS === 'android' && '#000'} label="" value="" />
                                        //                 }
                                        //                 {
                                        //                     IsAddress.map((item) => (
                                        //                         <Picker.Item key={item.code} color={Platform.OS === 'android' && '#000'} label={item.name} value={item.name} />
                                        //                     ))
                                        //                 }

                                        //             </Picker>
                                        //         </View>
                                        //     </View>

                                        // </>
                                    )
                                }
                                <View style={{ width: '100%', flexDirection: 'column', gap: height * 0.005 }}>
                                    <Text style={{ color: Colors.fontColor, textAlign: 'justify', fontWeight: 'bold' }}>
                                        Shipping Availability
                                    </Text>
                                    <View style={{ width: '100%', gap: width * 0.02, alignItems: 'flex-start', flexDirection: 'row', flexWrap: 'wrap' }}>
                                        {values.productInformation.shippingAvailability.map((item, index) => (
                                            <TouchableOpacity key={index} style={{ paddingHorizontal: width * 0.07, paddingVertical: height * 0.007, backgroundColor: '#d7a152', borderRadius: height * 0.01 }}>
                                                <Text style={{ color: Colors.whiteColor, fontWeight: '500' }}>
                                                    {item.shippingName}
                                                </Text>
                                            </TouchableOpacity>
                                        ))}

                                    </View>
                                </View>
                                <TouchableOpacity
                                    onPress={() => handleModalState('shipping', true)}
                                    style={{ width: '100%', gap: height * 0.003, backgroundColor: Colors.black, padding: width * 0.03, borderRadius: height * 0.01, justifyContent: 'space-between' }}
                                >
                                    <View style={{ width: '100%', gap: height * 0.005, flexDirection: 'row', paddingHorizontal: width * 0.02, paddingVertical: height * 0.01, justifyContent: 'space-between' }}>
                                        <Text style={{ color: Colors.whiteColor, textAlign: 'justify', fontWeight: '600' }}>
                                            Add Shipping Option
                                        </Text>
                                        <Text style={{ width: '50%', color: Colors.whiteColor, textAlign: 'right' }} numberOfLines={1} ellipsizeMode='tail'>
                                            {values.productInformation.shippingAvailability.length}/2
                                        </Text>
                                    </View>
                                </TouchableOpacity>
                                <View style={{ width: '100%', gap: height * 0.01 }}>
                                    <Text style={{ color: Colors.fontColor, fontWeight: 'bold' }}>
                                        Price
                                    </Text>
                                    <TextInput
                                        onChangeText={(value) => handleOnChangeText('price', value)}
                                        style={{ height: height * 0.06, backgroundColor: '#e8e8e8', borderRadius: 10, paddingHorizontal: width * 0.05, fontSize: width * 0.035 }} placeholder='How much is the price of the product?' />
                                </View>
                                <View style={{ width: '100%', gap: height * 0.01 }}>
                                    <Text style={{ color: Colors.fontColor, fontWeight: 'bold' }}>
                                        Shipping Fee
                                    </Text>
                                    <TextInput
                                        onChangeText={(value) => handleOnChangeText('shippingFee', value)}
                                        style={{ height: height * 0.06, backgroundColor: '#e8e8e8', borderRadius: 10, paddingHorizontal: width * 0.05, fontSize: width * 0.035 }} placeholder='How much is the shipping fee of the product?' />
                                </View>
                            </View>
                        </View>
                    </ScrollView>
                </KeyboardAvoidingView>
                <BottomBar title='Publish' redirect={handlePublish} />
            </View >
        </>
    )
}

export default AddProducts