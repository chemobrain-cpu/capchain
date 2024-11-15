import React from 'react'
import {
  View,
  ScrollView,
  StyleSheet,
} from "react-native";
import CryptoCard from './cryptoMover'


const HomeTopList = ({navigationHandler,coins}) => {
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
  scrollContainer: {
    paddingTop: 0,
  },



})

export default HomeTopList;
