import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { useNavigation } from "@react-navigation/native";

export const Card = ({props, type}: any) =>{
    const navigation: any = useNavigation();
    return(
        <View style={[type === 'loser' ? styles.loserBg: styles.gainerBg ,styles.container]}>
            <Pressable onPress={()=> navigation.navigate('DetailScreen', {symbol : props.ticker, price: props.price, profit: props.change_percentage, type: type})}>
            {/* image */}
            <View><Image source={require('../assets/images/company-logo.png')} style={styles.companyWrapper}/></View>

            {/* company name (ticker)*/}
            <Text style={styles.companyName}>{props?.ticker}</Text>

            {/* price */}
            <Text style={styles.price}>${props?.price}</Text>

            {/* profit */}
            <View style={styles.profitWrapper}> 
            <Text style={ type==='loser' ? styles.loss :styles.profit}>{type==='gainer' && '+'}{Number(props?.change_percentage.slice(0, -1)).toFixed(1)}%</Text>
            <Image source={ type==='gainer' ? require('../assets/images/high.png') : require('../assets/images/arrowDown.png')} style={styles.arrowUp}/>
            </View>
            </Pressable>
        </View>
    )
};

const styles = StyleSheet.create({
    container:{
        display: 'flex',
        padding: 28,
        backgroundColor: '#ffffff',
        //borderColor: '#ffd6a4',
        borderWidth: 2,
        borderRadius: 16,
        elevation: 5,
        width: '45%',
        minWidth: 100,
        justifyContent: "center",
    alignItems: 'flex-start',
    marginVertical: 12,
    marginHorizontal: 'auto',
    },
    gainerBg:{
        borderColor: '#C7F6C7',
    },
    loserBg: {
        borderColor: 'red',
    },
    companyWrapper:{
        width: 50,
        height: 50,
        borderWidth: 1,
        borderRadius: 50,
        borderColor: 'red',
    },
    companyName:{
        color: 'black',
        fontSize: 20,
        fontWeight: '700',
        marginVertical: 12,
    },
    profitWrapper:{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 8,
        marginTop: 8,
    },
    price:{
        color: '#7393B3',
        fontSize: 18,
    },
    profit:{
        fontWeight: 'bold',
        color: 'green',
    },
    loss:{
        fontWeight: 'bold',
        color: 'red',
    },
    arrowUp:{
        width: 16,
        height: 16,
    },
  });