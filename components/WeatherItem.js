import React from "react";
import {
    Text,
    View,
    StyleSheet
} from 'react-native'

const WeatherItem = ({title, value, unit}) => {
    return (
        <View style = {styles.container}>
            <Text style = {styles.textStyle}>{title}</Text>
            <Text style = {styles.textStyle}>{value} {unit}</Text>
        </View>
    )
}

const styles= StyleSheet.create({
    container : {
        flexDirection : 'row',
        justifyContent : 'space-between'
    },
    textStyle :{
        fontSize : 22,
        fontWeight : 'bold'
    }
})

export default WeatherItem