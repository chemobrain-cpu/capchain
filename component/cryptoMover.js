import React  from 'react'
import { View, Text, StyleSheet, Image, Pressable } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { Card } from "react-native-shadow-cards";
import { useSelector } from "react-redux"


let CryptoCard = ({ navigationHandler, coin }) => {
    //destructuring the coin datastructure
    let { image, symbol, current_price, price_change_percentage_24h } = coin

    let { background,importantText,normalText,fadeColor,blue,fadeButtonColor } = useSelector(state => state.userAuth)


    return <Pressable onPress={()=>navigationHandler(coin)}>
        <Card key={coin.id}
            style={{...styles.cardContainer,backgroundColor:background}}>

            <View>
                <Image
                    source={{ uri: image }}
                    style={styles.image} />
            </View>

            <View style={styles.priceContainer}>
                <Text style={{...styles.symbol,color:importantText}}>{symbol}</Text>
                <Text style={{...styles.price,color:normalText}}>${current_price.toFixed(2)}</Text>
            </View>

            <View style={styles.percentageContainer}>
                {price_change_percentage_24h < 0 ? <Feather name="arrow-down-right" size={25} color="red" /> : <Feather name="arrow-up-right" size={25} color="green" />}
                <Text style={{ ...styles.percentage, color: price_change_percentage_24h < 0 ? "red" : "green" }}>${Math.abs(price_change_percentage_24h).toFixed(3)}%</Text>
            </View>



        </Card>

    </Pressable>
}

const styles = StyleSheet.create({

    cardContainer: {
        width: 180,
        height: 160,
        borderWidth: 0.5,
        borderColor: "#ddd",
        borderRadius: 10,
        marginRight: 15,
        paddingHorizontal: 15,
        

    },
    image: {
        width: 30,
        height: 30,
        marginTop: 10
    },
    priceContainer: {
        marginTop: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    symbol: {
        fontSize: 17,
        fontWeight: "500",
        fontFamily: 'Poppins',
        marginRight: 15
    },
    price: {
        fontSize: 17,
        paddingLeft: 5,
        color: "#5D616D",
        fontFamily: 'Poppins',
    },

    percentage: {
        fontSize: 22,
        paddingLeft: 5,
        fontFamily: 'Poppins',
    },
    percentageContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: "center"
    }


})



export default CryptoCard