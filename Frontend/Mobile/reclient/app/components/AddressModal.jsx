// AddressModal.js
import React, { useState, useEffect, useContext } from 'react';
import { View, Text, Platform, Dimensions, TouchableOpacity } from 'react-native';
import axios from 'axios';
import { Picker } from '@react-native-picker/picker';
import Context from './Context';

const { width, height } = Dimensions.get('window');

const AddressModal = ({ title, onSelectMunicipality }) => {
    const [IsMunicipality, setIsMunicipality] = useState('');
    const [IsModalOpen, setIsModalOpen] = useContext(Context);
    const [IsAddress, setIsAddress] = useState([]);

    useEffect(() => {
        fetchMunicipality()
    }, []);

    const fetchMunicipality = async () => {
        const response = await axios.get(`https://psgc.gitlab.io/api/provinces/025000000/municipalities`);
        const sortedData = response.data.sort((a, b) => {
            if (a.name < b.name) {
                return -1;
            }
            if (a.name > b.name) {
                return 1;
            }
            return 0;
        })
        setIsAddress(sortedData);
        // setIsMunicipalityCode(data.data.municipalityCode)s
    }

    const handleValueChange = (itemValue) => {
        onSelectMunicipality(itemValue)
        setIsMunicipality(itemValue)
    };

    const handlModal = (value) => {
        setIsModalOpen(value)
    };

    return (
        <>
            {
                IsModalOpen && Platform.OS === 'ios' && (
                    <>
                        <View style={{ position: 'absolute', width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center', backgroundColor: 'black', opacity: .4, zIndex: 1 }} />
                        <View style={{ position: 'absolute', width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center', zIndex: 1 }}>
                            <View style={{ width: '100%', gap: height * 0.01, paddingHorizontal: width * 0.03, justifyContent: 'center' }}>
                                <Text style={{ color: 'white' }}>{title}</Text>
                                <Picker
                                    selectedValue={IsMunicipality}
                                    onValueChange={handleValueChange}
                                    mode='drop'
                                    dropdownIconColor={'#000'}
                                    dropdownIconRippleColor={'#d9d8d7'}
                                    prompt='Select Business Type'
                                    selectionColor={'#000'}
                                    style={{ backgroundColor: '#d9d8d7', color: '#000', borderRadius: height * 0.01 }}
                                >
                                    {Platform.OS === 'ios' && <Picker.Item color={Platform.OS === 'android' ? '#000' : '#000'} label="" value="" />}
                                    {IsAddress.map((item) => (
                                        <Picker.Item key={item.code} color={Platform.OS === 'android' ? '#000' : '#000'} label={item.name} value={item.name} />
                                    ))}
                                </Picker>
                                <View style={{ width: '100%', flexDirection: 'row', justifyContent: 'center', gap: width * 0.05 }}>
                                    <TouchableOpacity
                                        onPress={() => handlModal(false)}
                                        style={{ width: width * 0.4, height: height * 0.06, backgroundColor: '#cf2935', justifyContent: 'center', alignItems: 'center', borderRadius: height * 0.01 }}
                                    >
                                        <Text style={{ color: 'white', fontWeight: 'bold', fontSize: height * 0.02 }}>Cancel</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        onPress={() => handlModal(false)}
                                        style={{ width: width * 0.4, height: height * 0.06, backgroundColor: 'white', justifyContent: 'center', alignItems: 'center', borderRadius: height * 0.01 }}
                                    >
                                        <Text style={{ color: '#111', fontWeight: 'bold', fontSize: height * 0.02 }}>Yes</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    </>
                )
            }
        </>
    );
};

export default AddressModal;
