import {
    View,
    Text,
    SafeAreaView,
    ScrollView,
    Image,
    TouchableOpacity,
    StatusBar,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import { useTheme } from '../../page/ThemeContext';

export default function Likes() {
    const navigation = useNavigation()
    const [dataLikes, setDataLikes] = useState()
    const isFocused = useIsFocused();
    const { isDarkMode } = useTheme()
    const getDataLikes = async () => {
        const data = JSON.parse(await AsyncStorage.getItem("Likes"));
        await setDataLikes(data);
    }
    useEffect(() => {
        getDataLikes()
    }, [isFocused]);

    const handleRemoveItem = async (itemId) => {
        const updatedLikes = dataLikes.filter((item) => item?.id !== itemId);
        await AsyncStorage.setItem('Likes', JSON.stringify(updatedLikes));
        setDataLikes(updatedLikes);
        getDataLikes()
    };
    const handleNavigate = (itemId) => {
        if (dataLikes) {
            const selectedItem = dataLikes.find(item => item && item.id === itemId);
            if (selectedItem) {
                navigation.navigate('PersonalDetails', { item: selectedItem });
            }
        }
    };
    return (
        <SafeAreaView
            style={{
                backgroundColor: isDarkMode ? "#121212" : '#FFFFFF',
                padding: 20,
                height: '100%',
                width: '100%',
            }}>
            <StatusBar hidden />
            <View style={{ marginTop: 40 }}>
                <Text style={{ fontSize: 22, paddingHorizontal: 10, color: isDarkMode ? "#FFFFFF" : 'black', fontWeight: '500' }}>Danh sách yêu thích</Text>
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    showsHorizontalScrollIndicator={false}
                    style={{ marginTop: 40, backgroundColor: isDarkMode ? '#121212' : '#FFFFFF' }}>
                    {dataLikes?.map((item, index) => {
                        return <View key={index} style={{ padding: 10 }}>
                            <TouchableOpacity
                                onPress={() => { handleNavigate(item?.id) }}
                                style={{
                                    backgroundColor: isDarkMode ? '#313131' : '#e1e9ee',
                                    padding: 10,
                                    // shadowColor: '#000',
                                    // shadowOffset: {
                                    //     width: 0,
                                    //     height: 8,
                                    // },
                                    // shadowOpacity: 0.44,
                                    // shadowRadius: 10.32,
                                    // elevation: 10,
                                    borderRadius: 10
                                }}>
                                <View
                                    style={{
                                        flexDirection: 'row',
                                        justifyContent: 'space-between',
                                        alignItems: 'center',
                                        gap: 5,
                                    }}>
                                    <View style={{
                                        flexDirection: 'row', gap: 5, alignItems: 'center',

                                    }}>
                                        {item.gender == 0 ? (<View>
                                            <Image
                                                style={{ width: 50, height: 50 }}
                                                source={require('../../../img/female.png')}
                                            />
                                        </View>) : (<View>
                                            <Image
                                                style={{ width: 50, height: 50 }}
                                                source={require('../../../img/male.png')}
                                            />
                                        </View>)}
                                        <View>
                                            <View style={{ flexDirection: 'row', gap: 10, alignItems: 'center', }}>
                                                <View>
                                                    <Text style={{ fontSize: 15, fontWeight: '600', color: isDarkMode ? '#FFFFFF' : 'black' }}>{item.name}</Text>
                                                </View>
                                                <View>
                                                    <Text style={{ fontSize: 14, fontWeight: '500', color: isDarkMode ? '#FFFFFF' : 'black' }}>{item.id}</Text>
                                                </View>
                                            </View>
                                            <View>
                                                <Text style={{ fontSize: 14, fontWeight: '400', color: isDarkMode ? '#FFFFFF' : 'black' }}>{item.department_detail}</Text>
                                            </View>
                                        </View>

                                    </View>
                                    <TouchableOpacity onPress={() => handleRemoveItem(item.id)}>
                                        <View>
                                            <Image
                                                source={require('../../../img/bookmark_yellow.png')}
                                            />
                                        </View>
                                    </TouchableOpacity>
                                </View>
                            </TouchableOpacity>
                        </View>
                    })}

                    {/* ))} */}
                </ScrollView>
            </View>
        </SafeAreaView>
    );
}
