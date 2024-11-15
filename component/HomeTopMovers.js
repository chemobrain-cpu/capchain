import React from 'react'
import {
  View,
  ScrollView,
  StyleSheet,
} from "react-native";
import CryptoCard from './cryptoMover'


const HomeTopMovers = ({ navigationHandler, coins}) => {
  
  return (
    <View>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerstyle={styles.scrollContainer}
      >
        {coins.map((coin) => <CryptoCard key={coin.id} coin={coin} navigationHandler={navigationHandler} />)}

      </ScrollView>
    </View>
  );
};
let styles = StyleSheet.create({
 
  headerText: {
    fontSize: 20,
    fontFamily: 'Poppins',
    color: "rgb(44, 44, 44)",
    paddingTop: 10,
    paddingBottom: 10
  },


})

export default HomeTopMovers;


