import {
    FlatList,
    Image,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';
import React, { useEffect, useState } from 'react';
const DATA = [
    {
        id: 1,
        title: 'list 1',
        content: 'Lorem Ipsum is simply dummy ',
        time: '11:00',
        image: 'https://reactnative.dev/img/tiny_logo.png',
    },
    {
        id: 2,
        title: 'list 2',
        content: 'Lorem Ipsum is simply dummy ',
        time: '11:00',
        image: 'https://reactnative.dev/img/tiny_logo.png',
    },
    {
        id: 3,
        title: 'list3',
        content: 'Lorem Ipsum is simply dummy ',
        time: '11:00',
        image: 'https://reactnative.dev/img/tiny_logo.png',
    },
];

const Home = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const handSearch = text => {
        return DATA.filter(item =>
            item.title.toLowerCase().includes(text.toLowerCase()),
        );
    };
    return (
        <SafeAreaView style={styles.container}>
            <ScrollView>
                <View style={styles.header}>
                    <View>
                        <Image
                            style={styles.imgLogo}
                            source={{
                                uri: 'https://reactnative.dev/img/tiny_logo.png',
                            }}></Image>
                    </View>
                    <View>
                        <Text>Welcome</Text>
                        <Text style={styles.text}>Hello world</Text>
                    </View>
                </View>
                <View style={{ marginTop: 40 }}>
                    <Text style={{ fontSize: 28, fontWeight: '600' }}>Features</Text>
                    <TouchableOpacity style={styles.focusSeachBar}>
                        <TextInput
                            placeholder="Search..."
                            value={searchQuery}
                            onChangeText={text => setSearchQuery(text)}
                        />
                    </TouchableOpacity>
                    {/* <FlatList
              data={filterData}
              renderItem={renderItem}
              keyExtractor={item => item.id.toString()}></FlatList> */}
                    {handSearch(searchQuery).map(item => (
                        <View style={styles.dataList}>
                            <View style={styles.dataItem}>
                                <View style={{ alignItems: 'center', alignContent: 'center' }}>
                                    <Image
                                        style={styles.logoItem}
                                        source={{ uri: item.image }}></Image>
                                </View>
                                <View style={{ flexWrap: 'wrap' }}>
                                    <Text style={{ fontSize: 20 }}>{item.title}</Text>
                                    <Text style={{ fontSize: 16 }}>{item.content}</Text>
                                </View>
                            </View>
                            <Text>{item.time}</Text>
                        </View>
                        // <Text>{item.content}</Text>
                        // <Text>{item.time}</Text>
                    ))}
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};
export default Home;

const styles = StyleSheet.create({
    container: {
        padding: 25,
    },
    imgLogo: {
        alignItems: 'center',
        width: 50,
        height: 50,
        borderRadius: 50,
    },
    text: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    header: {
        gap: 10,
        flexDirection: 'row',
        alignItems: 'center',
    },
    listItem: {
        fontSize: 20,
    },
    logoItem: {
        alignItems: 'center',
        width: 50,
        height: 50,
    },
    dataList: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 10,
        // alignContent: 'center',
    },
    dataItem: {
        flexDirection: 'row',
        marginTop: 18,
        alignItems: 'center',
        gap: 20,
    },
    focusSeachBar: {
        backgroundColor: '#DDDDDD',
        borderRadius: 25,
        paddingLeft: 10,
        paddingRight: 10,
    },
});
