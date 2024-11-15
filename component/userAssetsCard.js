import React from 'react'
import { View, Text, Pressable, StyleSheet, Image } from 'react-native'
import { AntDesign } from '@expo/vector-icons'
import {truncate} from "../utils/util"
import { useDispatch, useSelector } from "react-redux";


let UserAssetCard = ({ navigationHandler, coin,user }) => {
    let {background,importantText,normalText,fadeColor,blue,fadeButtonColor } = useSelector(state => state.userAuth)
    //destructuring the coin datastructure
    
    let { image, name, id, symbol,current_price } = coin

    
    
   
    return <Pressable 
    key={id} style={{ ...styles.cryptoContainer, backgroundColor: user.currentWallet.id == symbol ? fadeColor : background }}
     onPress={(user)=>navigationHandler({id:id,user:user,symbol:symbol,url:image})}  
     >
        <View style={styles.containerLeft} >
            <Image
                source={{ uri: image }}
                style={styles.imageLogo}
            />
            <View style={styles.nameContainer}>
                <Text style={{...styles.nameText,color:importantText}}>{truncate(name, 7)}</Text>
                <Text style={{...styles.symbolText,color:normalText}}>{symbol.toUpperCase()}</Text>

            </View>
        </View>

        <View style={styles.containerRight}>
            <View style={styles.innerContainerRight}>
               
                {user.currentWallet.id === id.toLowerCase()?<Text style={{...styles.priceText,color:importantText}}>$0.00</Text>:<Text style={{...styles.priceText,color:importantText}}>$0.00</Text>}
                <Text style={{ ...styles.iconText, color: normalText }}>{symbol.toUpperCase()}</Text>

            </View>

            {user.currentWallet.id === id.toLowerCase() && <AntDesign name="check" size={24} color="#1652f0" />}
        </View>

    </Pressable>
}

const styles = StyleSheet.create({

    cryptoContainer: {
        paddingVertical: 10,
        borderRadius: 5,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
        width: "100%",

    },
    containerLeft: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
        width: '50%',

    },
    containerRight: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        width: '50%',
    },
    innerContainerRight: {
        width: '60%',
        display: 'flex',
        alignContent: 'flex-start',
        marginRight: 5



    },
    imageLogo: {
        width: 32,
        height: 32,
        borderRadius: 16,
        borderWidth: 0.5,
        borderColor: "#ddd",
    },
    nameContainer: {
        flex: 1,
        paddingLeft: 10
    },
    nameText: {
        fontSize: 18,
        fontFamily: 'Poppins'
    },
    symbolText: {
        fontSize: 18,
        fontFamily: 'Poppins',
        color: "#5d616d"
    },
    priceText: {
        fontSize: 20,
        fontFamily: 'Poppins',
        alignSelf: 'flex-end'
    },
    iconText: {
        fontSize: 18,
        fontFamily: 'Poppins',
        color: "#5d616d",
        alignSelf: 'flex-end'
    }

})



export default UserAssetCard