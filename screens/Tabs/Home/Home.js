import { View, Text, SafeAreaView, ScrollView, Image, TouchableOpacity, FlatList } from 'react-native'
import React, { useState } from 'react'
import dataList from '../../../data/dataList.json'
import { useNavigation } from '@react-navigation/native';
export default function Home() {
    <View>
        <Text>Home</Text>
    </View>
    // const DepartmentItem = ({ department }) => {
    //     const navigation = useNavigation();

    //     const handleDepartmentPress = () => {
    //         navigation.navigate('EmployeeScreen', { employees: department.employees });
    //     };

    //     return (
    //         <TouchableOpacity onPress={handleDepartmentPress}>
    //             <Text>{department.name}</Text>
    //         </TouchableOpacity>
    //     );
    // };
    // return (
    //     <SafeAreaView>
    //         <ScrollView>
    //             <View>
    //                 <View>
    //                     <FlatList
    //                         data={dataList.departments}
    //                         keyExtractor={(item) => item.name}
    //                         renderItem={({ item }) => (
    //                             <DepartmentItem department={item} onPress={() => handleDepartmentPress(item)} />
    //                         )}
    //                     />
    //                 </View>
    //             </View>
    //         </ScrollView>
    //     </SafeAreaView>
    // )
}

