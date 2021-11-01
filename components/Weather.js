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
import WeatherItem from './WeatherItem';
const formatttedTime = (unixTime) => {
    var date = new Date(unixTime);
    var hours = date.getHours();
    var minutes = date.getMinutes();
    if(minutes < 10) {
        minutes = '0' + minutes;
    }
    return `${hours}:${minutes}`;
}
const dateBuilder = (timezone) => {
    let d = new Date();
    let localTime = d.getTime();
    let localOffset = d.getTimezoneOffset()*60000;
    let curr_time = localTime + localOffset + (1000*timezone);
    let date = new Date(curr_time);
    let hours = date.getHours();
    let minutes = date.getMinutes();
    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();
    let unit = (hours > 12) ? 'pm' : 'am';
    if(hours > 12) {
        hours -=12;
    }
    if(minutes < 10) {
        minutes = '0' +minutes;
    }
    return `${hours}:${minutes} ${unit}\n${day}/${month}/${year}`;
}
const checkTimeInDay = (timezone) => {
    let d = new Date();
    let localTime = d.getTime();
    let localOffset = d.getTimezoneOffset()*60000;
    let curr_time = localTime + localOffset + (1000*timezone);
    let date = new Date(curr_time);
    let hours = date.getHours();
    return hours;
}
const Weather = ({weatherData, fetchWeatherData}) => {
    const [imgBackGround, setImgBackGround] = useState(null);
    const [timer, setTimer] = useState("");
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
            humidity,
            pressure
        },
        sys : {
            country,
            sunrise,
            sunset
        },
        timezone
    } = weatherData;
    const getImgBackGround = (weather) => {
        const timeOfDay = checkTimeInDay(timezone);
        return BackGround(weather, timeOfDay);
    }
    useEffect(()=>{
        setImgBackGround(getImgBackGround(main));
        setTimer(dateBuilder(timezone));
    },[weatherData]);
    useEffect(() => {
        setInterval(() => {
            setTimer(dateBuilder(timezone))
        }, 10000)
    }, [])
    return (
        <View style = {styles.container}>
            <ImageBackground
                source = {imgBackGround}
                style = {styles.imgBrg}
                resizeMode = 'cover'
            >
                <View style = {styles.weatherStatis}>
                    <View style = {{flex : 0.6}} >
                        <Text style = {styles.staticText}>{name}</Text>
                        <Text style = {styles.staticText}>{country}</Text>
                        <Text style = {styles.staticText}>{timer}</Text>
                    </View>
                    <View style = {styles.itemRight}>
                        <WeatherItem title = "Sunrise" value = {formatttedTime(sunrise)} unit = "am" />
                        <WeatherItem title = "Sunset" value = {formatttedTime(sunset)} unit = "pm" />
                        <WeatherItem title = "Humidity" value = {humidity} unit = "%" />
                        <WeatherItem title = "Pressure" value = {pressure} unit = "hPa" />                        
                    </View>
                </View>
                <View style = {styles.weatherBottom}>
                    <View style = {styles.weatherBottomLeft}>
                        <View style = {styles.iconAndTemp}>
                            <Image
                                source = {{
                                    width : 80,
                                    height : 70,
                                    uri : `http://openweathermap.org/img/wn/${icon}@2x.png`,
                                }}            
                            />
                            <Text style = {{fontSize : 40, fontWeight : 'bold'}}>{Math.round(temp - 273.15)}°C</Text>
                        </View>
                        <Text style = {styles.staticText}>{main}</Text>
                        <Text style = {{fontSize : 22, fontWeight : 'bold'}}>{description}</Text>
                    </View>
                    <View style = {styles.weatherBottomRight}>
                        <SearchBar fetchWeatherData = {fetchWeatherData} />
                    </View>
                </View>
            </ImageBackground>
        </View>
    )
}
const styles = StyleSheet.create({
    container : {
        justifyContent : 'center',
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
    weatherBottom : {
        flexDirection : 'row',
        justifyContent : 'space-between',
        width : '100%',
            
    },
    weatherBottomLeft : {
        justifyContent : 'center',
        alignItems : 'center',
        backgroundColor : '#18181b85',
        width : '100%',
        height : 180,
        margin : 10,
        flex : 0.5,
        borderRadius : 50
    },
    weatherBottomRight : {
        flex : 0.5,
        justifyContent : 'center',
        alignItems : 'center'
    },
    staticText : {
        fontSize : 22,
        fontWeight : 'bold'
    },
    itemRight : {
        flex : 0.7,
    },
    iconAndTemp : {
        flexDirection : 'row',
        alignItems : 'center'
    }
})
export default Weather;