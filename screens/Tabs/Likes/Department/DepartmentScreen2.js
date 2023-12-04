// import { View, Text, SafeAreaView, TouchableOpacity, ScrollView } from 'react-native'
// import React, { useEffect, useState } from 'react'
// import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated'
// import axios from 'axios'
// import { useSelector } from 'react-redux'

// export default function DepartmentScreen2({ route }) {
//     // Animation
//     const [selectedIndexes, setSelectedIndexes] = useState([])
//     const heightValue = useSharedValue(50);

//     const handleTouchSelection = (index) => {
//         if (selectedIndexes.includes(index)) {
//             setSelectedIndexes(selectedIndexes.filter(i => i !== index)) // Xóa index khỏi selectedIndexes nếu đã tồn tại

//         } else {
//             setSelectedIndexes([...selectedIndexes, index]) // Thêm index vào selectedIndexes nếu chưa tồn tại
//         }
//     }

//     // Fetching data department
//     const { key } = route.params
//     const { user } = useSelector(state => state.authReducer);
//     const [dataDepartment, setDataDepartment] = useState([])

//     useEffect(() => {
//         axios.get(`http://erp.lacty.com.vn:5000/user/department/${key}`, { headers: { 'X-Access-Token': user?.accessToken } },).then((response) => {
//             console.log(response?.data);
//             const data = response?.data;
//             setDataDepartment(data)
//         }).catch((error) => {
//             console.error('Error fetching department:', error);
//         })
//     }, [key])
//     return (
//         <SafeAreaView style={{ backgroundColor: '#dadada' }}>
//             <ScrollView>
//                 <View style={{ paddingHorizontal: 10, gap: 10, padding: 10 }}>
//                     {dataDepartment?.map((item, index) => (
//                         <Animated.View key={index} style={{ backgroundColor: '#fafafa' }}>
//                             <TouchableOpacity onPress={() => { handleTouchSelection(index) }} style={{ width: '100%', height: selectedIndexes.includes(index) ? 100 : 50, padding: 3 }}>
//                                 <Text>
//                                     {item.name}
//                                 </Text>
//                             </TouchableOpacity>
//                         </Animated.View>
//                     ))}
//                 </View>
//             </ScrollView>
//         </SafeAreaView >
//     )
// }