import { FlatList, View } from "react-native"
import { Card } from "../../components/Card"
import { styles } from "../TopGainers/topGainerStyles"

export const TopLosersScreen=({route}: any)=>{
    const {loserList} = route?.params;
    return(
        <View style={styles.container}>
        <FlatList
        data={loserList}
        renderItem={({ item }) => (
          <Card  props = {item} type= 'loser'/>
        )}
        keyExtractor={item => item.ticker}
        numColumns={2} // Number of columns in the grid
        contentContainerStyle={styles.grid}
      />
        </View>
    )
}