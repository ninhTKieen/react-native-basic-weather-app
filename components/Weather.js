import React, {useState, useEffect} from 'react';
import {
    View,
    Text,
    StyleSheet,
    Dimensions,
    ImageBackground,
    StatusBar,
    Image
} from 'react-native';
import BackGround from './BackGround';
import SearchBar from './SearchBar';
const formatttedTime = (unixTime) => {
    var date = new Date(unixTime);
    // var hours = date.getHours();
    // var minutes = date.getMinutes();
    // return `${hours}:${minutes}`;
    return date.toLocaleTimeString();
}
const dateBuilder = (dt, timezone) => {
    let d = new Date();
    let localTime = d.getTime();
    let localOffset = d.getTimezoneOffset()*60000;
    let curr_time = localTime + localOffset + (1000*timezone);
    let date = new Date(curr_time);
    let hours = date.getHours();
    let minutes = date.getMinutes();
    return `${hours}:${minutes}`
}
const Weather = ({weatherData, fetchWeatherData}) => {
    const [imgBackGround, setImgBackGround] = useState(null);
    const {
        weather : [
            {
                main,
                description,
                icon
            }],
        name,
        main : {
            temp,
            humidity
        },
        wind : {
            speed
        },
        dt,
        sys : {
            country,
            sunrise,
            sunset
        },
        timezone
    } = weatherData;
    const getImgBackGround = (weather) => {
        return BackGround(weather);
    }
    useEffect(()=>{
        setImgBackGround(getImgBackGround(main));
    },[weatherData])
    return (
        <View style = {styles.container}>
            <ImageBackground
                source = {imgBackGround}
                style = {styles.imgBrg}
                resizeMode = 'cover'
            >
                <View style = {styles.weatherStatis}>
                    <View >
                        <Text style = {styles.staticText}>{name}/{country}</Text>
                        <Text style = {styles.staticText}>{Math.round(temp - 273.15)}°C</Text>
                        <Text style = {styles.staticText}>{formatttedTime(sunrise)} am</Text>
                        <Text style = {styles.staticText}>{formatttedTime(sunset)} pm</Text>
                        <Text style = {styles.staticText}>{dateBuilder(dt, timezone)}</Text>
                    </View>
                    <View style = {styles.itemRight}>
                        <Image 
                            source = {{
                                width : 100,
                                height : 100,
                                uri : `http://openweathermap.org/img/wn/${icon}@2x.png`
                            }}
                        />
                        <Text style = {styles.staticText}>{main}/{description}</Text>
                    </View>
                </View>
                <SearchBar fetchWeatherData = {fetchWeatherData} />
            </ImageBackground>
        </View>
    )
}
const styles = StyleSheet.create({
    container : {
        alignItems : 'center',
        justifyContent : 'center'
    },
    imgBrg : {
        width : Dimensions.get('window').width,
        height : Dimensions.get('window').height,
        // alignItems : 'center',
        paddingTop : StatusBar.currentHeight
    },
    weatherStatis : {
        backgroundColor : '#18181b99',
        flexDirection : 'row',
        justifyContent : 'space-between',
        marginBottom : 20,
        width : '100%',
        // position : 'absolute',
    },
    staticText : {
        fontSize : 25
    },
    itemRight : {
        flex : 0.4,
    }
})
export default Weather;