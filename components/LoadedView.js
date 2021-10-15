import React from 'react';

import  {
    View,
    Dimensions,
    StyleSheet,
    ActivityIndicator,
    ImageBackground
} from 'react-native';

const LoadedView = () => {
    return (
        <View style = {styles.container}>
            <ImageBackground
                source = {require('../assets/crop.jpeg')}
                style = {styles.imgBackGround}
            >
                <ActivityIndicator color = "orange" size = {45} />
            </ImageBackground>
        </View>
    )
}

const styles = StyleSheet.create({
    container : {
        flex : 1,
        justifyContent : 'center',
        alignItems : 'center',
    },
    imgBackGround : {
        width : Dimensions.get('window').width,
        height : Dimensions.get('window').height,
        justifyContent : 'center',
        alignItems : 'center',
    }
})

export default LoadedView