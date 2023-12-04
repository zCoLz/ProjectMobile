// import React from 'react'
// import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
// import Home from './Home/Home';
// import AntIcon from 'react-native-vector-icons/AntDesign';
// import IonIcon from 'react-native-vector-icons/Ionicons';
// import Search from './Search/Search';
// import Likes from './Likes/Likes';
// import Notifications from './Notifications/Notifications';
// import Profile from './Profile/Profile';
// import styled from 'styled-components/native';

// const Tab = createBottomTabNavigator();

// export default function TabNavigator() {
//     return (
//         <Tab.Navigator
//             tabBarOptions={{
//                 style: {
//                     elevation: 0,
//                     shadowOpacity: 1,
//                 },
//             }}>
//             <Tab.Screen options={{
//                 tabBarIcon: ({ color, size }) => (
//                     <AntIcon name="home" color={color} size={size} />
//                 ), headerShown: false
//             }} name='Home' component={Home} ></Tab.Screen>
//             <Tab.Screen options={{
//                 tabBarIcon: ({ color, size }) => (
//                     <AntIcon name="search1" color={color} size={size} />
//                 ), headerShown: false
//             }} name='Search' component={Search}></Tab.Screen>
//             <Tab.Screen options={{
//                 tabBarIcon: ({ color, size }) => (
//                     <AntIcon name="hearto" color={color} size={size} />
//                 ), headerShown: false
//             }} name='Likes' component={Likes}></Tab.Screen>
//             <Tab.Screen options={{
//                 tabBarIcon: ({ color, size }) => (
//                     <IonIcon name="notifications-outline" color={color} size={size} />
//                 ), headerShown: false
//             }} name='Notifications' component={Notifications}></Tab.Screen>
//             <Tab.Screen options={{
//                 tabBarIcon: ({ color, size }) => (
//                     <IonIcon name="person-outline" color={color} size={size} />
//                 ), headerShown: false
//             }} name='Profile' component={Profile}></Tab.Screen>
//         </Tab.Navigator >
//     )
// }
