import {
    View,
    Text,
    Platform,
    Dimensions,
    TouchableOpacity,
    Alert
} from 'react-native'
import React, { useState, useContext, useEffect } from 'react'
import Context from './Context'
import { Picker } from '@react-native-picker/picker'

const { width, height } = Dimensions.get('window')

const Modal = ({ title, onSelectedValue, fetchedData, modalId }) => {
    const [IsSelect, setIsSelect] = useState('')
    const { IsModalOpen, setIsModalOpen } = useContext(Context)

    const handleModalState = (IsTrue) => {
        if (IsTrue) {
            setIsModalOpen(false);
        } else {
            onSelectedValue(IsSelect)
            setIsModalOpen(false);
        }
    }

    const handleValueChange = (value) => {
        setIsSelect(value)
    }

    return (
        <>
            {
                IsModalOpen[modalId] &&
                (
                    <>
                        <View style={{ position: 'absolute', width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center', backgroundColor: 'black', opacity: .4, zIndex: 1 }} />
                        <View style={{ position: 'absolute', width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center', zIndex: 1 }}>
                            <View style={{ width: '100%', gap: height * 0.01, paddingHorizontal: width * 0.03, justifyContent: 'center' }}>
                                <Text style={{ color: 'white' }}>
                                    {title}
                                </Text>
                                <Picker
                                    selectedValue={IsSelect}
                                    onValueChange={handleValueChange}
                                    mode='drop'
                                    dropdownIconColor={'#000'}
                                    dropdownIconRippleColor={'#d9d8d7'}
                                    prompt='Select Business Type'
                                    selectionColor={'#000'}
                                    style={{ backgroundColor: '#d9d8d7', color: '#000', borderRadius: height * 0.01 }}
                                >
                                    {Platform.OS === 'ios' && <Picker.Item color='#000' label="" value="" />}
                                    {fetchedData.map((item) => (
                                        <Picker.Item key={item.id} color={Platform.OS === 'android' ? '#000' : '#000'} label={item.name} value={item.name} />
                                    ))}
                                </Picker>
                                <View style={{ width: '100%', flexDirection: 'row', justifyContent: 'center', gap: width * 0.05 }}>
                                    <TouchableOpacity
                                        onPress={() => handleModalState(true)}
                                        style={{ width: width * 0.4, height: height * 0.06, backgroundColor: '#cf2935', justifyContent: 'center', alignItems: 'center', borderRadius: height * 0.01 }}
                                    >
                                        <Text style={{ color: 'white', fontWeight: 'bold', fontSize: height * 0.02 }}>
                                            Cancel
                                        </Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        onPress={() => handleModalState(false)}
                                        style={{ width: width * 0.4, height: height * 0.06, backgroundColor: 'white', justifyContent: 'center', alignItems: 'center', borderRadius: height * 0.01 }}
                                    >
                                        <Text style={{ color: '#111', fontWeight: 'bold', fontSize: height * 0.02 }}>
                                            Yes
                                        </Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    </>
                )
            }
        </>
    )
}

export default Modal