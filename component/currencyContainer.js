import React, { memo,useEffect } from "react";
import { View, Text, Pressable, StyleSheet, Image, Dimensions } from 'react-native'
import { Feather } from '@expo/vector-icons'
import {truncate} from "../utils/util"
import { useDispatch,useSelector } from "react-redux"


  




let CryptoCard = ({ navigationHandler, coin }) => {
    //destructuring the coin datastructure
    let { background,importantText,normalText,fadeColor,blue,fadeButtonColor } = useSelector(state => state.userAuth)


    let { image, name, id, symbol, current_price, price_change_percentage_24h } = coin


    if(!coin){
        return <></>
    }


    return <Pressable key={Math.random().toFixed(20)} style={styles.cryptoContainer} onPress={navigationHandler}  >


        <View style={styles.containerLeft} >
            <Image
                source={{ uri: image }}
                style={styles.imageLogo}
            />
            <View style={styles.nameContainer}>
                <Text style={{...styles.nameText,color:importantText}}>{truncate(name, 7)}</Text>
                <Text style={{...styles.symbolText,color: normalText}}>{symbol}</Text>

            </View>
        </View>

        <View style={styles.containerRight}>
            <Text style={{...styles.priceText,
        color:importantText}}>${parseFloat(current_price).toFixed(3)}</Text>

            <Text style={{ ...styles.iconText, color: price_change_percentage_24h < 0 ? 'red' : 'green' }}>
                {price_change_percentage_24h < 0 ? <Feather name="arrow-down-right" size={20} color="red" /> : <Feather name="arrow-up-right" size={20} color="green" />}{Math.abs(price_change_percentage_24h)?.toFixed(3)}%
            </Text>

        </View>
    </Pressable>
}




const styles = StyleSheet.create({

    cryptoContainer: {
        paddingVertical: 18,
        borderRadius: 5,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
        width: Dimensions.get('window').width,
        paddingHorizontal: 15,
    },
    containerLeft: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
        width: '48%',
    },
    containerRight: {
        display: 'flex',
        flexDirection: 'column',
        width: '48%',
    },
    imageLogo: {
        width: 34,
        height: 34,
        borderRadius: 18,
        borderWidth: 0.5,
        borderColor: "#ddd",
    },
    nameContainer: {
        flex: 1,
        paddingLeft: 10
    },
    nameText: {
        fontSize: 19,
        fontFamily: 'Poppins',
        
    
    },
    symbolText: {
        fontSize: 19,
        fontFamily: 'Poppins',
        
    },
    priceText: {
        fontSize: 20,
        fontFamily: 'Poppins',
        alignSelf: 'flex-end',
    },
    iconText: {
        fontSize: 18,
        fontFamily: 'Poppins',
        alignSelf: 'flex-end'
    }

})



export default memo(CryptoCard)