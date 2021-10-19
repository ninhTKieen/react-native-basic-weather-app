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
    var hours = date.getHours();
    var minutes = date.getMinutes();
    if(minutes < 10) {
        minutes = '0' + minutes;
    }
    return `${hours}:${minutes}`;
}
const dateBuilder = (dt, timezone) => {
    let d = new Date();
    let localTime = d.getTime();
    let localOffset = d.getTimezoneOffset()*60000;
    let curr_time = localTime + localOffset + (1000*timezone);
    let date = new Date(curr_time);
    let hours = date.getHours();
    let minutes = date.getMinutes();
    let unit = (hours > 12) ? 'pm' : 'am';
    if(hours > 12) {
        hours -=12;
    }
    if(minutes < 10) {
        minutes = '0' +minutes;
    }
    return `${hours}:${minutes} ${unit}`
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
            <SearchBar fetchWeatherData = {fetchWeatherData} />

                <View style = {styles.weatherStatis}>
                    <View style = {{flex : 0.7}} >
                        <Text style = {styles.staticText}>{name}/{country}</Text>
                        <Text style = {styles.staticText}>{Math.round(temp - 273.15)}°C</Text>
                        <Text style = {styles.staticText}>Sunrise : {formatttedTime(sunrise)} am</Text>
                        <Text style = {styles.staticText}>Sunset : {formatttedTime(sunset)} pm</Text>
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
                        <Text style = {styles.staticText}>{main}</Text>
                        <Text style = {styles.staticText}>{description}</Text>
                    </View>
                </View>
            </ImageBackground>
        </View>
    )
}
const styles = StyleSheet.create({
    container : {
        justifyContent : 'center',
        // paddingTop : StatusBar.currentHeight,
    },
    imgBrg : {
        width : Dimensions.get('window').width,
        height : Dimensions.get('window').height,
        paddingTop : 20,
        alignItems : 'center',
    },
    weatherStatis : {
        backgroundColor : '#18181b99',
        flexDirection : 'row',
        justifyContent : 'space-between',
        marginTop : 20,
        width : '100%',
        borderRadius : 20,
        padding : 10
    },
    staticText : {
        fontSize : 25
    },
    itemRight : {
        flex : 0.4,
        alignItems : 'center'
    }
})
export default Weather;