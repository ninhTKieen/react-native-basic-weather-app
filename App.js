import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  ScrollView,
  ImageBackground,
  StyleSheet,
  StatusBar,
  Dimensions,
} from 'react-native';
import LoadedView from './components/LoadedView'
import SearchBar from './components/SearchBar';
import Weather from './components/Weather';
const API_KEY = "3f0269e0346e8b298eb4818ce4ecf446";

const WeatherApp = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [loaded, setLoaded] = useState(true);
  const fetchWeatherData = async(cityName) => {
    setLoaded(false);
    let API;
    if(cityName === 'Rome'.toLowerCase()){
      API = `https://api.openweathermap.org/data/2.5/weather?id=${3169070}&appid=${API_KEY}`
    }
    else {
      API = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${API_KEY}`;
    }
    try {
      const response = await fetch(API);
      if(response.status == 200) {
        const data = await response.json();
        setWeatherData(data);
      }
      else {
        setWeatherData(null);
      }
      setLoaded(true);
    }
    catch(error) {
      console.log(error);
    }
  }

  useEffect(()=> {
    fetchWeatherData('ha noi');
  },[])

  if(!loaded) {
    return (
      <LoadedView />
    )
  }
  else if(weatherData === null) {
    return <View style = {styles.container} >
      <ImageBackground
        source = {require('./assets/background/oops.jpg')}
        style = {styles.primaryView}
      >
        <Text>Say you remember me</Text>
        <SearchBar fetchWeatherData = {fetchWeatherData} />
      </ImageBackground>
    </View>
  }
  return (
    <View style = {styles.container}>
      <Weather weatherData = {weatherData} fetchWeatherData ={fetchWeatherData} />
    </View>
  )
  }
const styles = StyleSheet.create({
  container : {
    flex : 1,
    justifyContent : 'center',
    alignItems : 'center'
  },
  primaryView : {
    width : Dimensions.get('window').width,
    height : Dimensions.get('window').height,
    alignItems : 'center',
    padding : StatusBar.currentHeight
  }
})
export default WeatherApp;