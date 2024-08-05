import { Image, Pressable, ScrollView, StyleSheet, Text, View } from "react-native"
import { getCachedResponse, setCachedResponse } from "../utils/CacheUtility"
import { useEffect, useState } from "react";
import axios from "axios";
import { LineGraph } from "../components/LineGraph";


export const DetailScreen = ({ navigation, route }: any) => {
    const { symbol, price, profit, type } = route?.params;
    const [details, setDetails] = useState<any>({});
    const [pricesData, setPricesData] = useState<any>({});

    const fetchDataWithCache = async () => {
        const cachedResponse = await getCachedResponse(symbol);
        if (cachedResponse) {
            console.log('Returning cached data');
            return cachedResponse;
        }

        // const companyOverview = await axios.get(`https://www.alphavantage.co/query?function=OVERVIEW&symbol=${symbol}&apikey=ALLR9QLGC0HG1V9E`);
        // const data1 = companyOverview.data;

        // const priceData = await axios.get(`https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${symbol}&apikey=ALLR9QLGC0HG1V9E`);
        // const data2 = priceData.data;

        const companyOverview = await axios.get(`https://www.alphavantage.co/query?function=OVERVIEW&symbol=IBM&apikey=demo`);
        const data1 = companyOverview.data;

        const priceData = await axios.get(`https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=IBM&apikey=demo`);
        const data2 = priceData.data;


        const data = {
            "details": data1,
            "dailyPrices": data2
        }
        await setCachedResponse(symbol, data);
        return data;
    };

    useEffect(() => {
        const fetchDetails = async () => {
            const response = await fetchDataWithCache();
            setDetails(response.details);
            setPricesData(response.dailyPrices);
        }

        fetchDetails();
    }, [symbol]);

    return (
        <ScrollView>
        <View style={styles.detailContainer}>
            {/* header */}
            <View style={styles.headerWrapper}>
                {/* left side */}

                <View style={styles.headerLeft}>
                <Pressable onPress={()=> navigation.goBack()}><Image source={require('../assets/images/goBack.png')} style={styles.goBackBtn} /></Pressable>
                    <Image source={require('../assets/images/company-logo.png')} style={styles.companyWrapper} />
                    <View>
                        <Text style={styles.headerLeftText}>{details?.Name}</Text>
                        <Text style={styles.headerLeftTextBelow}>{details?.Symbol}, {details?.AssetType}</Text>
                        <Text style={styles.headerLeftTextBelow}>{details?.Exchange}</Text>
                    </View></View>


                {/* right side */}
                <View>
                <Text style={styles.price}>${price}</Text>
                <View style={styles.profitWrapper}>
                    <Text style={type === 'loser' ? styles.loss : styles.profit}>{type === 'gainer' && '+'}{Number(profit.slice(0, -1)).toFixed(1)}%</Text>
                    <Image source={type === 'gainer' ? require('../assets/images/high.png') : require('../assets/images/arrowDown.png')} style={styles.arrowUp} />
                </View></View>
            </View>

            {/* line graph */}
            {pricesData && Object.keys(pricesData).length > 0 && <LineGraph props={pricesData}/>}


            {/* description box */}
            <View style={styles.descriptionBox}>
                <Text style={styles.aboutText}>About {details?.Name}</Text>
                <Text style={styles.descriptionText}>{details?.Description}</Text>

                <View style={styles.midBox}>
                    { details?.Industry && <Text style={styles.midBoxStyle}>Industry: {details?.Industry}</Text>}
                    {details?.Sector && <Text style={styles.midBoxStyle}>Sector: {details?.Sector}</Text>}
                </View>

                <View style={styles.weekPrice}>

                    <View>
                    <Text>52-Week Low</Text>
                    <Text style={styles.highlightedText}>${details['52WeekLow']? details['52WeekLow'] : 'NULL'}</Text>
                    </View>

                    <View>
                    <Text>Current Price</Text>
                    <Text style={styles.highlightedText}>${price}</Text>
                    </View>


                    <View>
                    <Text>52-Week High</Text>
                    <Text style={styles.highlightedText}>${details['52WeekHigh']? details['52WeekHigh'] : 'NULL'}</Text>
                    </View>


                </View>


                {/* market detail */}
                <View style={styles.weekPrice}>

                    <View>
                    <Text>Market Cap</Text>
                    <Text style={styles.highlightedText}>${details?.MarketCapitalization ? details?.MarketCapitalization : 'NULL'}</Text>
                    </View>

                    <View>
                    <Text>P/E Ratio</Text>
                    <Text style={styles.highlightedText}>{details?.PERatio ? details?.PERatio : 'NULL'}</Text>
                    </View>


                    <View>
                    <Text>Beta</Text>
                    <Text style={styles.highlightedText}>{details?.Beta ? details?.Beta : 'NULL'}</Text>
                    </View>

                    <View>
                    <Text>Dividend Yield</Text>
                    <Text style={styles.highlightedText}>{details?.DividendYield? details?.DividendYield : 'NULL'}</Text>
                    </View>

                    <View>
                    <Text>Profit Margin</Text>
                    <Text style={styles.highlightedText}>{details?.ProfitMargin ? details?.ProfitMargin : 'NULL'}</Text>
                    </View>


                </View>
            </View>
        </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    detailContainer:{
        margin: 16,
    },
    headerWrapper:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
    },
    headerLeft:{
        flexDirection: 'row',
        gap: 16,
    },
    headerLeftText:{
        color: 'black',
        fontSize: 18,
        fontWeight: '700',
    },
    headerLeftTextBelow:{
        color: 'black',
        fontSize: 16,
        fontWeight: '400',
    },
    companyWrapper: {
        width: 50,
        height: 50,
        borderWidth: 1,
        borderRadius: 50,
        borderColor: 'red',
    },
    goBackBtn:{
        width: 24,
        height: 24,
        marginRight: 4,
        cursor: 'pointer',
    },
    companyName: {
        color: 'black',
        fontSize: 20,
        fontWeight: '700',
        marginVertical: 12,
    },
    profitWrapper: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 8,
        marginTop: 8,
    },
    price: {
        color: '#7393B3',
        fontSize: 18,
    },
    profit: {
        fontWeight: 'bold',
        color: 'green',
    },
    loss: {
        fontWeight: 'bold',
        color: 'red',
    },
    arrowUp: {
        width: 16,
        height: 16,
    },
    weekPrice:{
        marginVertical: 16,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: 12,
    },
    aboutText:{
        borderBottomColor: 'grey',
        borderBottomWidth: 0.6,
        paddingBottom: 12,
        marginBottom: 16,
        paddingHorizontal: 12,
        marginHorizontal: -12,
        fontWeight: '800',
    },
    descriptionText:{
        fontWeight:'600',
        fontSize: 16,
        lineHeight: 19,
    },
    highlightedText:{
        fontWeight: '900',
    },
    descriptionBox:{
        padding: 12,
        borderRadius: 12,
        borderWidth: 0.6,
        borderColor: 'grey',
        marginTop: 32,
    },
    midBox:{
        paddingVertical: 12,
        flexDirection: 'row',
        gap: 16,
        flexWrap: 'wrap',
    },
    midBoxStyle:{
        paddingHorizontal: 16,
        paddingVertical: 8,
        backgroundColor: '#FBE59E',
        color: 'grey',
        borderRadius: 20,
        fontWeight: '700',
    },
    marketDetail:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
    }
});