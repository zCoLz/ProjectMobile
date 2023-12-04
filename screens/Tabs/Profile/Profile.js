import {
    View,
    Text,
    TouchableOpacity,
    Switch,
    ScrollView,
    Image,
    useColorScheme,
} from 'react-native';
import React, { useCallback, useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import IconIon from 'react-native-vector-icons/Ionicons';
import IconFeather from 'react-native-vector-icons/Feather';
import { useTheme } from '../../page/ThemeContext';

export default function Profile() {
    const navigation = useNavigation();
    // const [isEnabled, setIsEnabled] = useState(colorScheme == 'dark'); // Khởi tạo giá trị isEnabled dựa trên colorScheme

    const handleLogoutPress = async () => {
        try {
            await AsyncStorage.removeItem('RememberMe');
            await AsyncStorage.removeItem('SET_USER');
            // Reset the navigation stack to prevent going back to the logged-out state
            navigation.reset({
                index: 0,
                routes: [{ name: 'login' }],
            });
        } catch (error) {
            console.log(error);
        }
    };
    const [dataUser, setDataUser] = useState({})
    const getDataUser = async () => {
        const data = await AsyncStorage.getItem('SET_USER');
        if (data) {
            const userData = JSON.parse(data)
            await setDataUser(userData)
        }

    }
    useEffect(() => {
        getDataUser()
    }, [])

    const { isDarkMode, toggleTheme } = useTheme();
    return (
        <SafeAreaView style={{ flex: 1, padding: 10, paddingHorizontal: 20, backgroundColor: isDarkMode ? '#121212' : "#FFFFFF" }}>
            <View
                style={{
                    padding: 30,
                    flexDirection: 'row',
                    alignItems: 'center',
                    gap: 10,
                }}>
                <IconIon color={isDarkMode ? '#FFFFFF' : "#121212"} size={30} name="settings-sharp" />
                <Text style={{ fontSize: 25, color: isDarkMode ? '#FFFFFF' : "#121212", fontWeight: '500' }}>
                    Setting
                </Text>
            </View>
            <View
                style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    gap: 10,
                    paddingHorizontal: 20,
                    color: isDarkMode ? '#FFFFFF' : "#121212"
                }}>
                <Image
                    style={{ width: 55, height: 55, borderColor: isDarkMode ? '#00b0ff' : '#d6d6d6', borderWidth: isDarkMode ? 1 : 2, borderRadius: 40 }}
                    source={require('../../../img/avatar.png')}
                />
                <Text style={{ fontSize: 20, color: isDarkMode ? '#FFFFFF' : "#121212", fontWeight: '500' }}>
                    {dataUser?.username}
                </Text>
            </View>
            <View
                style={{
                    borderBottomColor: isDarkMode ? '#313131' : '#d6d6d6',
                    borderBottomWidth: 1,
                    marginTop: 10,
                }}
            />
            <ScrollView style={{ height: '66%', backgroundColor: isDarkMode ? '#121212' : "#FFFFFF" }}>
                <View
                    style={{
                        flexGrow: 2,
                        padding: 10,
                        marginTop: 20,
                        flex: 1,
                        justifyContent: 'space-between',
                    }}>
                    <View
                        style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                        }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
                            <IconFeather size={22} color={isDarkMode ? '#FFFFFF' : "#121212"} name="moon" />
                            <Text style={{ fontSize: 18, color: isDarkMode ? '#FFFFFF' : "#121212", fontWeight: '600' }}>
                                Dark mode
                            </Text>
                        </View>
                        <View
                            style={{
                                backgroundColor: '#FFFFFF',
                                width: 45,
                                alignItems: 'center',
                                borderRadius: 15,
                            }}>

                        </View>
                        <Switch
                            trackColor={{ false: '#dddddd', true: '#0079e4' }}
                            thumbColor={isDarkMode ? '#FFFFFF' : '#f4f3f4'}
                            value={isDarkMode}
                            onValueChange={toggleTheme}
                        />
                    </View>

                </View>
            </ScrollView>
            <View style={{ borderTopWidth: 1, borderTopColor: isDarkMode ? '#313131' : '#d6d6d6' }}></View>
            <View style={{ width: '45%', alignSelf: 'center', marginTop: 20 }}>
                <TouchableOpacity onPress={handleLogoutPress}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                        <View>
                            <IconIon size={30} color={isDarkMode === 'light' ? '#121212' : '#FFFFFF'} name="log-out-outline" />
                        </View>
                        <View>
                            <Text
                                style={{
                                    fontSize: 20,
                                    padding: 10,
                                    borderRadius: 10,
                                    color: isDarkMode ? '#FFFFFF' : "#121212",
                                    fontWeight: '500'
                                }}>
                                LOG OUT
                            </Text>
                        </View>
                    </View>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}
