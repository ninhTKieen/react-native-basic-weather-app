const haze = require('../assets/background/haze.jpg');
const rainy = require('../assets/background/rainy.jpg');
const sunny = require('../assets/background/sunny.jpg');
const snow = require('../assets/background/snow.jpg');
const clouds = require('../assets/background/clouds.jpg');
const drizzle = require('../assets/background/drizzle.jpg');
const thunderstorm = require('../assets/background/thunderstorm.jpg')
const BackGround = (weather) => {
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