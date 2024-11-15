import React from 'react'
import {
  View,
  ScrollView,
  StyleSheet,
} from "react-native";
import CardLoader from "./cardLoader";


const MoversLoader= () => {
  
    return <View>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerstyle={styles.scrollContainer}
      >
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((coin) => <CardLoader key={coin} />)}
      </ScrollView>
    </View>
  


};
let styles = StyleSheet.create({
  scrollContainer: {
    paddingTop: 0
  },
 


})

export default MoversLoader
