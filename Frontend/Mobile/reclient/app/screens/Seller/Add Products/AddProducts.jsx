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

const { width, height } = Dimensions.get('window')

const SampleCategory = [
    { id: 1, name: 'PiaCat' },
    { id: 2, name: 'Pia1' },
    { id: 3, name: 'Pia2' },
]

const SampleDays = [
    { id: 1, name: 'Day' },
    { id: 2, name: 'Day1' },
    { id: 3, name: 'Day2' },
]


const AddProducts = () => {
    const [IsModalOpen, setIsModalOpen] = useState({
        category: false,
        days: false,
        size: false,
        shipping: false
    })
    const [IsModalValueTest, setIsModalValueTest] = useState({
        category: '',
        days: '',
        size: '',
        shipping: 'false'
    })
    const [IsFetched, setIsFetched] = ([])
    const [values, setValues] = useState({
        storeId: '',
        productInformation: {
            productName: '',
            productDescription: '',
            date: '',
            category: [],
            gallery: [],
            sizes: [],
            shippingAvailability: [],
            price: '',
            shippingFee: ''
        }
    })

    useEffect(() => {
        console.log(values.productInformation.gallery)
    }, [values])

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.canceled) {
            const newGalleryItem = { uri: result.assets[0].uri };
            setValues(prevState => ({
                ...prevState,
                productInformation: {
                    ...prevState.productInformation,
                    gallery: [...prevState.productInformation.gallery, newGalleryItem]
                }
            }))
        }
    }

    const handleModalState = (e, value) => {
        setIsModalOpen((prevValue => ({ ...prevValue, [e]: value })))
        console.log(IsModalOpen)
    }

    const handleOnChangeModal = (e, value) => {
        Alert.alert(value)
        setIsModalValueTest((prevValue => ({
            ...prevValue,
            [e]: value
        })))
    }

    const handleOnChangeProductInformationArray = (e, object, value) => {
        setValues(prevValue => ({
            ...prevValue,
            productInformation: {
                ...prevValue.productInformation,
                [e]: [...prevValue.productInformation[e], { [object]: value }]
            }
        }))
    }

    return (
        <>
            <StatusBar translucent backgroundColor="transparent" barStyle="light-content" />
            <View style={{ width: width, height: height, backgroundColor: '#323d48' }}>
                <Navbar title='Add Product' backgroundColor='#323d48' />
                <Context.Provider value={{ IsModalOpen, setIsModalOpen }}>
                    <Modal title='Category' onSelectedValue={(item) => handleOnChangeProductInformationArray('category', 'name', item)} fetchedData={SampleCategory} modalId='category' />
                    <Modal title='Days' onSelectedValue={(item) => handleOnChangeProductInformationArray('sizes', 'size', item)} fetchedData={SampleDays} modalId='size' />
                    <Modal title='Shipping Availability' onSelectedValue={(item) => handleOnChangeProductInformationArray('shippingAvailability', 'shippingName', item)} fetchedData={SampleDays} modalId='shipping' />
                </Context.Provider>
                <KeyboardAvoidingView behavior="padding">
                    <ScrollView>
                        <View style={{ width: width, paddingHorizontal: width * 0.03, paddingVertical: height * 0.03 }}>
                            <View style={{ width: '100%', paddingTop: height * 0.1, paddingBottom: height * 0.2, gap: height * 0.01 }}>
                                <View style={{ width: '100%', flexDirection: 'row' }}>
                                    <Text style={{ color: 'white', textAlign: 'justify', fontWeight: 'bold' }}>
                                        Product Gallery
                                    </Text>
                                </View>
                                <View style={{ width: '100%', justifyContent: 'flex-start', flexDirection: 'row', gap: width * 0.02, flexWrap: 'wrap' }}>
                                    <View style={{ width: '22%', height: height * 0.1, overflow: 'hidden', justifyContent: 'center', alignItems: 'center', backgroundColor: '#AEAEAE' }}>
                                        <Text style={{ color: 'white', fontWeight: '500' }}>
                                            None
                                        </Text>
                                    </View>
                                    {/* {values.productInformation.gallery.uri !== ''
                                        ? (
                                            <>
                                                {
                                                    values.productInformation.gallery.map((item, index) => (
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
                                            <Text style={{ color: 'white', fontWeight: '500' }}>
                                                None
                                            </Text>
                                        </View>
                                    } */}
                                </View>
                                <TouchableOpacity
                                    onPress={pickImage}
                                    style={{ width: '100%', gap: height * 0.003, backgroundColor: '#4a4c59', padding: width * 0.03, borderRadius: height * 0.01, justifyContent: 'space-between' }}
                                >
                                    <View style={{ width: '100%', gap: height * 0.005, flexDirection: 'row', paddingHorizontal: width * 0.02, paddingVertical: height * 0.01, justifyContent: 'space-between' }}>
                                        <Text style={{ color: 'white', textAlign: 'justify', fontWeight: '600' }}>
                                            Add Photo
                                        </Text>
                                        <Text style={{ width: '50%', color: 'white', textAlign: 'right' }} numberOfLines={1} ellipsizeMode='tail'>
                                            0/8
                                        </Text>
                                    </View>
                                </TouchableOpacity>
                                <View style={{ width: '100%', gap: height * 0.01 }}>
                                    <Text style={{ color: 'white', fontWeight: 'bold' }}>
                                        Product Name
                                    </Text>
                                    <TextInput
                                        // onChangeText={(value) => handleOnChangeAddress('barangay', value)}
                                        style={{ height: height * 0.06, backgroundColor: '#e8e8e8', borderRadius: 10, paddingHorizontal: width * 0.05, fontSize: width * 0.035 }} placeholder='What is the name of your product?' />
                                </View>
                                <View style={{ width: '100%', gap: height * 0.01 }}>
                                    <Text style={{ color: 'white', fontWeight: 'bold' }}>
                                        Product Description
                                    </Text>
                                    <TextInput
                                        // onChangeText={(value) => handleOnChangeAddress('barangay', value)}
                                        style={{ height: height * 0.06, backgroundColor: '#e8e8e8', borderRadius: 10, paddingHorizontal: width * 0.05, fontSize: width * 0.035 }} placeholder='Can you describe what your product is?' />
                                </View>
                                <View style={{ width: '100%', flexDirection: 'row' }}>
                                    <Text style={{ color: 'white', textAlign: 'justify', fontWeight: 'bold' }}>
                                        Category
                                    </Text>
                                </View>
                                <TouchableOpacity
                                    onPress={() => handleModalState('category', true)}
                                    style={{ width: '100%', gap: height * 0.003, backgroundColor: '#4a4c59', padding: width * 0.03, borderRadius: height * 0.01, justifyContent: 'space-between' }}
                                >
                                    <View style={{ width: '100%', gap: height * 0.005, flexDirection: 'row', paddingHorizontal: width * 0.02, paddingVertical: height * 0.01, justifyContent: 'space-between' }}>
                                        <Text style={{ color: 'white', textAlign: 'justify', fontWeight: '600' }}>
                                            Add Category
                                        </Text>
                                        <Text style={{ width: '50%', color: 'white', textAlign: 'right' }} numberOfLines={1} ellipsizeMode='tail'>
                                            {IsModalValueTest.category}
                                        </Text>
                                    </View>
                                </TouchableOpacity>
                                <View style={{ width: '100%', flexDirection: 'row' }}>
                                    <Text style={{ color: 'white', textAlign: 'justify', fontWeight: 'bold' }}>
                                        Days of Rent
                                    </Text>
                                </View>
                                <TouchableOpacity
                                    onPress={() => handleModalState('days', true)}
                                    style={{ width: '100%', gap: height * 0.003, backgroundColor: '#4a4c59', padding: width * 0.03, borderRadius: height * 0.01, justifyContent: 'space-between' }}
                                >
                                    <View style={{ width: '100%', gap: height * 0.005, flexDirection: 'row', paddingHorizontal: width * 0.02, paddingVertical: height * 0.01, justifyContent: 'space-between' }}>
                                        <Text style={{ color: 'white', textAlign: 'justify', fontWeight: '600' }}>
                                            Add Days
                                        </Text>
                                        <Text style={{ width: '50%', color: 'white', textAlign: 'right' }} numberOfLines={1} ellipsizeMode='tail'>
                                            {IsModalValueTest.days}
                                        </Text>
                                    </View>
                                </TouchableOpacity>
                                <View style={{ width: '100%', flexDirection: 'row' }}>
                                    <Text style={{ color: 'white', textAlign: 'justify', fontWeight: 'bold' }}>
                                        Variation
                                    </Text>
                                </View>

                                {Platform.OS === 'ios'
                                    ? (
                                        <>
                                            <TouchableOpacity
                                                // onPress={() => handleModal('municipality', true)}
                                                style={{ width: '100%', gap: height * 0.003, backgroundColor: '#4a4c59', padding: width * 0.03, borderRadius: height * 0.01, justifyContent: 'space-between' }}
                                            >
                                                <View style={{ width: '100%', gap: height * 0.005, flexDirection: 'row', paddingHorizontal: width * 0.02, paddingVertical: height * 0.01, justifyContent: 'space-between' }}>
                                                    <Text style={{ color: 'white', textAlign: 'justify', fontWeight: '600' }}>
                                                        Add Sizes
                                                    </Text>
                                                    <Text style={{ width: '50%', color: 'white', textAlign: 'right' }} numberOfLines={1} ellipsizeMode='tail'>
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
                                        //                 selectedValue={values.pickupAddress.municipality}
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
                                <View style={{ width: '100%', flexDirection: 'row' }}>
                                    <Text style={{ color: 'white', textAlign: 'justify', fontWeight: 'bold' }}>
                                        Shipping Availability
                                    </Text>
                                </View>
                                <TouchableOpacity
                                    // onPress={() => handleModal('municipality', true)}
                                    style={{ width: '100%', gap: height * 0.003, backgroundColor: '#4a4c59', padding: width * 0.03, borderRadius: height * 0.01, justifyContent: 'space-between' }}
                                >
                                    <View style={{ width: '100%', gap: height * 0.005, flexDirection: 'row', paddingHorizontal: width * 0.02, paddingVertical: height * 0.01, justifyContent: 'space-between' }}>
                                        <Text style={{ color: 'white', textAlign: 'justify', fontWeight: '600' }}>
                                            Add Shipping Option
                                        </Text>
                                        <Text style={{ width: '50%', color: 'white', textAlign: 'right' }} numberOfLines={1} ellipsizeMode='tail'>
                                            Required
                                        </Text>
                                    </View>
                                </TouchableOpacity>
                                <View style={{ width: '100%', gap: height * 0.01 }}>
                                    <Text style={{ color: 'white', fontWeight: 'bold' }}>
                                        Price
                                    </Text>
                                    <TextInput
                                        // onChangeText={(value) => handleOnChangeAddress('barangay', value)}
                                        style={{ height: height * 0.06, backgroundColor: '#e8e8e8', borderRadius: 10, paddingHorizontal: width * 0.05, fontSize: width * 0.035 }} placeholder='How much is the price of the product?' />
                                </View>
                                <View style={{ width: '100%', gap: height * 0.01 }}>
                                    <Text style={{ color: 'white', fontWeight: 'bold' }}>
                                        Shipping Fee
                                    </Text>
                                    <TextInput
                                        // onChangeText={(value) => handleOnChangeAddress('barangay', value)}
                                        style={{ height: height * 0.06, backgroundColor: '#e8e8e8', borderRadius: 10, paddingHorizontal: width * 0.05, fontSize: width * 0.035 }} placeholder='How much is the shipping fee of the product?' />
                                </View>
                            </View>
                        </View>
                    </ScrollView>
                </KeyboardAvoidingView>
                <BottomBar title='Publish' />
            </View>
        </>
    )
}

export default AddProducts