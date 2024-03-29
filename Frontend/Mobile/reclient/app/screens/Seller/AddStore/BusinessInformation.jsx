import {
    View,
    Text,
    ScrollView,
    Dimensions,
    StatusBar,
    TextInput,
    Platform
} from 'react-native'
import React, { useRef, useState } from 'react'
import Navbar from '../../../components/Navbar'
import { useNavigation } from '@react-navigation/native'
import BottomBar from '../../../components/BottomBar'
import { Picker } from '@react-native-picker/picker';

const { width, height } = Dimensions.get('window')

const BusinessInformation = () => {
    const navigation = useNavigation()
    const [IsPicker, setIsPicker] = useState();

    const pickerRef = useRef();

    function open() {
        pickerRef.current.focus();
    }

    function close() {
        pickerRef.current.blur();
    }

    const handleNext = () => {
        navigation.navigate('BusinessInformation')
    }

    return (
        <>
            <StatusBar translucent backgroundColor="transparent" barStyle="light-content" />
            <View style={{ width: width, height: height, backgroundColor: '#323d48' }}>
                <Navbar title='Business Information' backgroundColor='#323d48' />
                <ScrollView>
                    <View style={{ width: width, paddingHorizontal: width * 0.03, paddingVertical: height * 0.03 }}>
                        <View style={{ width: '100%', paddingTop: height * 0.1, gap: height * 0.01 }}>
                            <View style={{ width: '100%', gap: height * 0.01 }}>
                                <Text style={{ color: 'white', fontWeight: 'bold' }}>
                                    Seller Type
                                </Text>
                                <Picker
                                    ref={pickerRef}
                                    selectedValue={IsPicker}
                                    onValueChange={(itemValue, itemIndex) => setIsPicker(itemValue)}
                                    mode='drop'
                                    dropdownIconColor={'white'}
                                    dropdownIconRippleColor={'white'}
                                    prompt='Select Business Type'
                                    selectionColor={'white'}
                                    style={{ backgroundColor: 'transparent', color: 'white' }}
                                >
                                    <Picker.Item color={Platform.OS === 'android' ? '#000' : '#fff'} label="Individual" value="Individual" />
                                    <Picker.Item color={Platform.OS === 'android' ? '#000' : '#fff'} label="JavaScript" value="js" />
                                </Picker>
                            </View>
                        </View>
                    </View>
                </ScrollView>
                <BottomBar title='Next' />
            </View>
        </>
    )
}

export default BusinessInformation