import React from 'react'
import {ActivityIndicator,View,StyleSheet} from "react-native"


const FooterLoader =()=>{

    return <View style={styles.container}>
    <ActivityIndicator size={24} color="blue"/>


</View>

}

const styles = StyleSheet.create({
    container:{
        height:100,
        width:'100%',
        display:'flex',
        justifyContent:'center',
        alignItems:'center'
    }

})

export default React.memo(FooterLoader)