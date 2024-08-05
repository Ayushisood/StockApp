import { View } from "react-native";
import { LineChart } from "react-native-chart-kit";
import { Dimensions } from "react-native";
import { useState } from "react";

export const LineGraph = ({props}: any) => {
    const screenWidth = Dimensions.get("window").width;
        let prices =  Object.values(props['Time Series (Daily)'])?.map((day: any) => day["1. open"]);

        prices = prices?.map((item: any)=> {
            if(!item) return 0;
            else return Number(item);
        }).filter((_, index)=> index < 6);  

        const datas = {
        labels: Object.keys(props['Time Series (Daily)']).filter((_, index)=> index < 6).map((item)=> item.slice(2)),
        datasets: [
          {
            data: prices,
            color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`, // optional
            strokeWidth: 2 // optional
          }
        ],
        legend: ["Daily - Open Prices "] // optional
      };
    const chartConfig = {
        backgroundGradientFrom: "#1E2923",
        backgroundGradientFromOpacity: 0,
        backgroundGradientTo: "#08130D",
        backgroundGradientToOpacity: 0,
        color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
        strokeWidth: 2,
        barPercentage: 0.5,
        useShadowColorFromDataset: false // optional
      };

    return (
        <View style={{marginVertical: 28}}>
            <LineChart
                data={datas}
                width={screenWidth}
                height={220}
                chartConfig={chartConfig}
            />
        </View>
    )
}