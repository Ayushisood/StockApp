import { FlatList, Text, View } from "react-native";
import { Card } from "../../components/Card";
import { styles } from "./topGainerStyles";

export const TopGainersScreen=({route}: any)=>{
    const {gainerList} = route?.params;
    return(
        <View style={styles.container}>
        <FlatList
        data={gainerList}
        renderItem={({ item }) => (
          <Card  props = {item} type = 'gainer'/>
        )}
        keyExtractor={item => item.ticker}
        numColumns={2} // Number of columns in the grid
        contentContainerStyle={styles.grid}
      />
        </View>
    )
}