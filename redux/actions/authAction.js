import React from 'react'
import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage'

export const LoginAction = (username, password, navigation,) => {
    return (dispatch) => {
        axios.post('http://erp.lacty.com.vn:5000/user/login', { username, password }).then(async (response) => {
            if (response?.data?.authenticated) {
                dispatch({ type: 'SET_USER', payload: response.data });
                const jsonValue = JSON.stringify(response.data);
                await AsyncStorage.setItem('SET_USER', jsonValue)
                navigation.replace('users')
            }
            else {
                dispatch({ type: 'SET_ERROR', payload: response.data.message })
            }
        })
            .catch((error) => {
                dispatch({ type: 'SET_ERROR', payload: error.message })
            })
    }
}
export const DepartmentAction = (accessToken, setFilterData) => {
    try {
        return async (dispatch) => {
            const response = await axios.get('http://erp.lacty.com.vn:5000/user/department', { headers: { 'X-Access-Token': accessToken } })
            setFilterData(response?.data)
            dispatch({ type: "FETCH_DEPARTMENT_SUCCESS", payload: response?.data })
        }
    } catch (error) {
    }
}
