import React, {useState} from 'react';
import {
    View,
    StyleSheet,
    TouchableOpacity,
    TextInput
} from 'react-native';

import Icon from 'react-native-vector-icons/MaterialIcons';

const SearchBar = ({fetchWeatherData}) => {
    const [cityName, setCityName] = useState(''); 
    return (
        <View style = {styles.container}>
            <TextInput 
                placeholder = 'Enter the city name'
                onChangeText = {(text) => setCityName(text)}
            />
            <TouchableOpacity onPress = {() => fetchWeatherData(cityName)}>
                <Icon name = 'search' color = 'black' size = {40} />
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container : {
        backgroundColor : 'lightgray',
        justifyContent : 'space-between',
        flexDirection : 'row',
        alignItems : 'center',
        borderRadius : 20,
        margin : 10,
        width : '90%'       
    }
})

export default SearchBar;