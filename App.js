import { StatusBar } from 'react-native';
import React, { useEffect, useState } from 'react';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from './screens/Login/Login';
import BottomTab from './components/BottomTab/BottomTab';
import Home from './screens/Tabs/Home/Home';
import Search from './screens/Tabs/Search/Search';
import Likes from './screens/Tabs/Notifications/Likes';
import Profile from './screens/Tabs/Profile/Profile';
import { Provider, useDispatch } from 'react-redux';
import store from './redux/store/store';
import DepartmentScreen from './screens/Tabs/Likes/Department/DeparmentScreen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DepartmentScreen2 from './screens/Tabs/Likes/Department/DepartmentScreen2';
import PersonalDetails from './screens/Tabs/Likes/PersonalDetails/PersonalDetails';
import Users from './screens/Tabs/Likes/Users';
import { ThemeProvider } from './screens/page/ThemeContext';

export default function App() {
  const Stack = createNativeStackNavigator();
  const [currentRouteName, setCurrentRouteName] = useState('');
  const [isLogin, setIsLogin] = useState(false);
  // const dispatch = useDispatch();
  const [themes, setThemes] = useState('light')
  useEffect(() => {
    const checkLoginRemember = async () => {
      try {
        const accessToken = await AsyncStorage.getItem('accessToken');
        const rememberMe = await AsyncStorage.getItem('RememberMe');
        // console.log('rememberMe', rememberMe, accessToken);
        setIsLogin(rememberMe);

      } catch (error) {
        console.log(error);
      }
    };
    checkLoginRemember();
  }, [])

  return (
    <Provider store={store}>
      <NavigationContainer
        onStateChange={e => {
          // console.log("Step", e);
          const currentRouteName = e.routes[e.index].name;
          // console.log(currentRouteName, 'vo');
          // console.log("Step", currentRouteName);
          setCurrentRouteName(currentRouteName);
        }}>
        <StatusBar hidden />
        <ThemeProvider>
          <Stack.Navigator>
            {!isLogin ? (<
              Stack.Screen
              name="login"
              options={{ headerShown: false }}
              component={Login}
            />) : null}
            {/* <Stack.Screen
            name="home"
            options={{ headerShown: false }}
            component={Home}
          />

          <Stack.Screen
            name="search"
            options={{ headerShown: false }}
            component={Search}
          /> */}
            <Stack.Screen
              name="users"
              options={{ headerShown: false }}
              component={Users}
            />
            <Stack.Screen
              name="likes"
              options={{ headerShown: false }}
              component={Likes}
            />
            <Stack.Screen
              name="profile"
              options={{ headerShown: false }}
              component={Profile}
            >
            </Stack.Screen>
            <Stack.Screen
              name="DepartmentScreen"
              options={{ headerShown: false }}
              component={DepartmentScreen}
            />
            <Stack.Screen
              name="PersonalDetails"
              options={{ headerShown: false }}
              component={PersonalDetails}
            />
          </Stack.Navigator>
          {currentRouteName != 'login' && currentRouteName != '' && (
            <BottomTab currentRouteName={currentRouteName} />
          )}
        </ThemeProvider>
      </NavigationContainer>
    </Provider>
  );
}
