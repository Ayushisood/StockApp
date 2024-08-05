/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useState } from 'react';
import type {PropsWithChildren} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import { NavigationContainer } from "@react-navigation/native";
import { AppNavigator } from './src/navigation/AppNavigator';
import { SplashScreen } from './src/screens/SplashScreen';
import { createStackNavigator } from '@react-navigation/stack';
import 'react-native-gesture-handler';
import AsyncStorage from '@react-native-async-storage/async-storage';


function App(): React.JSX.Element {
  const Stack = createStackNavigator<any>();  // stack navigator : inside each tab 
  const [isLoadingTrue, setIsLoadingTrue] = useState(false);
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  // const clearAllCache = async () => {
  //   try {
  //     await AsyncStorage.clear();
  //     console.log('Cache cleared');
  //   } catch (error) {
  //     console.error('Failed to clear cache:', error);
  //   }
  // };
  
  // // Example usage
  // clearAllCache();

  return (
      <NavigationContainer>
       {isLoadingTrue ? <Stack.Navigator screenOptions={{headerShown: false}}>
          <Stack.Screen name='SplashScreen' component={SplashScreen}/>
        </Stack.Navigator>: 
        <AppNavigator setLoading = {setIsLoadingTrue}/>}
      </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
