import React from 'react'
import {ActivityIndicator,View,StyleSheet} from "react-native"


const IndicatorLoader =()=>{
    return <View style={styles.screen}>
    <ActivityIndicator size="large" color="#1652f0" />
  </View>

}

const styles = StyleSheet.create({
    screen:{ 
        flex: 1, 
        alignItems: 'center', 
        justifyContent: 'center' 
    }

})

export default IndicatorLoader