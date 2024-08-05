
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { DetailScreen } from "../screens/DetailScreen";
import { Image, StyleSheet, Text } from 'react-native';
import { TopGainersScreen } from '../screens/TopGainers/TopGainersScreen';
import { TopLosersScreen } from '../screens/TopLosers/TopLosersScreen';
import { useCallback, useEffect, useState } from 'react';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { getCachedResponse, setCachedResponse } from '../utils/CacheUtility';

//caching
const CACHE_KEY = 'apiData';
const GAINERS_DETAIL_KEY = 'gianersList';
const LOSERS_DETAIL_KEY = 'losersList';
const EXPIRATION_TIME = 24 * 60 * 60 * 1000; // 24 hours

const Tab = createBottomTabNavigator(); // bottom tab navigator : Top level navigator
const Stack = createStackNavigator();  // stack navigator : inside each tab 


export const AppNavigator = ({setLoading}: any) => {
    const [gainerList, setGainerList] = useState([]);
    const [loserList, setLoserList] = useState([]);

    const fetchAllData = async () => {
        setLoading(true);
        try {
          // Fetch initial data
          const response = await axios.get('https://www.alphavantage.co/query?function=TOP_GAINERS_LOSERS&apikey=demo');
          //const response = await axios.get('https://www.alphavantage.co/query?function=TOP_GAINERS_LOSERS&apikey=ALLR9QLGC0HG1V9E');
          const data = response.data;

          setGainerList(data?.top_gainers);
          setLoserList(data?.top_losers);
          return data;
  
        } catch (error) {
          console.log(error);
        } finally {
          setLoading(false);
        }
      };


    //   check for cache data and if it is not then cache the data
    const fetchDataWithCache = async () => {
        try {
        //   const cachedData = await AsyncStorage.getItem(CACHE_KEY);
        //   const cacheTimestamp = await AsyncStorage.getItem(`${CACHE_KEY}_timestamp`);
  
        //   if (cachedData && cacheTimestamp) {
        //     const now = Date.now();
        //     if (now - parseInt(cacheTimestamp) < EXPIRATION_TIME) {
        //       setGainerList(JSON.parse(cachedData)?.top_gainers);
        //       setLoserList(JSON.parse(cachedData)?.top_losers);
        //       return;
        //     }
        //   }
        const cachedResponse = await getCachedResponse('main');
        if (cachedResponse) {
            console.log('Returning cached data');
            setGainerList(cachedResponse?.top_gainers);
              setLoserList(cachedResponse?.top_losers);
              return;
        }
  
          const newData = await fetchAllData();
        //   await AsyncStorage.setItem(CACHE_KEY, JSON.stringify(newData));
        //   await AsyncStorage.setItem(`${CACHE_KEY}_timestamp`, Date.now().toString());
        await setCachedResponse('main', newData);
        } catch (error) {
         console.log(error);
        }
      };

    useEffect(() => {
      
          fetchDataWithCache();
      }, []);

    const TabBarIcon = (source: any) => {
        return <Image source={source} style={styles.tabBarIconStyle} />;
      };
      
      
      const TabBarLabel = (focused: boolean, title: string) => {
      
        return (
          <Text style={focused ? styles.focusedStyle : styles.notFocusedStyle}>
            {title}
          </Text>
        );
      };


    const GainersTab = () => {
        return(
            <Stack.Navigator initialRouteName='GainersScreen' screenOptions={{
                headerShown: false,
            }}>
                <Stack.Screen name="GainersScreen" component={TopGainersScreen} initialParams={{gainerList: gainerList}}/>
                <Stack.Screen name="DetailScreen" component={DetailScreen}/>
            </Stack.Navigator>
        )
    };
    const LosersTab = () =>{
        return(
            <Stack.Navigator initialRouteName='LosersScreen' screenOptions={{
                headerShown: false,
            }}>
                <Stack.Screen name="LosersScreen" component={TopLosersScreen} initialParams={{loserList: loserList}}/>
                <Stack.Screen name="DetailScreen" component={DetailScreen}/>
            </Stack.Navigator>
        )
    };

    return(
         <Tab.Navigator initialRouteName='TopGainers' screenOptions={{
            tabBarLabelPosition: 'below-icon',
            headerShown: false,
            tabBarActiveBackgroundColor: '#DEEFF5',
            tabBarStyle:{
                height: 65,
            },
         }} 
         >
            <Tab.Screen name="TopGainers" component={GainersTab}  options={{
                tabBarIcon: () => TabBarIcon(require('../assets/images/gainers.png')),
                tabBarLabel: ({focused}) => TabBarLabel(focused, 'Top Gainers'),
                tabBarLabelStyle:{
                    paddingVertical: 4,
                },
            }}/>
            <Tab.Screen name="TopLosers" component={LosersTab} options={{
                tabBarIcon: () => TabBarIcon(require('../assets/images/lose.png')),
                tabBarLabel: ({focused}) => TabBarLabel(focused, 'Top Losers'),
                tabBarLabelStyle:{
                    paddingVertical: 4,
                },
            }}/>
         </Tab.Navigator>
    )
};

const styles = StyleSheet.create({
    focusedStyle: {
      fontWeight: '600',
      fontSize: 12,
      color: '#2176A5',
      marginBottom: 8,
    },
    notFocusedStyle: {
        fontWeight: '400',
        fontSize: 12,
        color: 'black',
        marginBottom: 8,
    },
    tabBarIconStyle: {height: 32, width: 32},
  });
