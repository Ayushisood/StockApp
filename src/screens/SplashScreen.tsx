import React, {useEffect} from 'react';
import { View, StyleSheet, Image, Dimensions,StatusBar } from 'react-native';

export const SplashScreen = () => {
     return (
        <View style={styles.container}>
                <StatusBar hidden={true} />
        <Image style={styles.image} source={require('../assets/images/splash.jpeg')} />
        </View>
     );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ffffff',
  },
  image: {
    height: Dimensions.get('window').height,
    resizeMode: 'cover',
    width: Dimensions.get('window').width,
  },
  logo: {
    height: 164,
    width: 196,
  },
});