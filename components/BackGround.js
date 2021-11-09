const haze = require('../assets/background/haze.jpg');
const rainy = require('../assets/background/rainy.jpg');
const sunny = require('../assets/background/sunny.jpg');
const snow = require('../assets/background/snow.jpg');
const clouds = require('../assets/background/clouds.jpg');
const drizzle = require('../assets/background/drizzle.jpg');
const thunderstorm = require('../assets/background/thunderstorm.jpg');
const nightClouds = require('../assets/background/nightClouds.jpg');
const nightClear = require('../assets/background/nightSky.jpg');
const BackGround = (weather, time) => {
    if(weather == "Clear" && (time >= 18 || time <= 5)) {
        return nightClear;
    }
    if(weather == 'Clear') {
        return sunny;
    }
    if(weather == 'Snow') {
        return snow;
    }
    if(weather == 'Haze' || weather == 'Fog' || weather == 'Mist') {
        return haze;
    }
    if(weather == 'Rain') {
        return rainy;
    }
    if(weather == "Clouds" && (time >= 18 || time <= 5)) {
        return nightClouds;
    }
    if(weather == "Clouds") {
        return clouds;
    }
    if(weather == 'Drizzle') {
        return drizzle;
    }
    if(weather == 'Thunderstorm') {
        return thunderstorm;
    }
    
}
// export {haze, rainy, sunny, snow, clouds, drizzle, thunderstorm};
export default BackGround;