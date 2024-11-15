import React, { useState} from 'react'
import { View, Text, Pressable, StyleSheet, Dimensions, Pressable,Image} from 'react-native'


const GiftNotification = ({ chart}) => {


    return (<View style={styles.notificationContainer}>
        <Pressable  style={styles.innerLeft}>
            <View style={styles.topicContainer}>
                <Text style={styles.topic}>Price Alert.</Text>
                <Text style={styles.time}>10 hours</Text>

            </View>
            <View style={styles.aboutTextCon}>
           
                <Text style={styles.aboutTopText}>
                Bitcoin drops
                </Text>
                <Text style={styles.aboutBottomText}>
                 expands bitcoin,crypto trading 100,000 more clients

                </Text>

            </View>
            <Pressable style={styles.actionButton} onPress={()=>chart()}>
                <Text style={styles.buttonText}>View BTCH</Text>
                <Text style={styles.buttonTextPercent}>-45%</Text>
            </Pressable>

        </Pressable>
        <View style={styles.innerRight}>
            <Image source={{uri:'https://assets.coingecko.com/coins/images/279/large/ethereum.png?1595348880'}} style={{width:50,height:50}}/>
            
        </View>



    </View>)
}

const styles = StyleSheet.create({
    
    notificationContainer: {
        paddingHorizontal: 10,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: Dimensions.get('window').width,
        paddingVertical: 25,

    },
    innerLeft: {
        width: '70%'

    },
    topicContainer: {
        display: 'flex',
        flexDirection: 'row',

    },
    topic: {
        fontSize: 18,
        fontFamily: 'Poppins',
        paddingLeft:10

    },

    time: {
        fontSize: 18,
        fontFamily: 'Poppins',
        marginLeft: 15

    },
    aboutTextCon:{
        display:'flex',
        paddingLeft:10

    },
    aboutTopText: {
        fontSize: 18,
        fontFamily: 'ABeeZee',
        color: 'rgb(100,100,100)',
        marginBottom: 10,
        
        
        

    },
    aboutBottomText: {
        fontSize: 18,
        fontFamily: 'ABeeZee',
        color: 'rgb(100,100,100)',
        marginBottom: 10
        
        

    },
    actionButton: {
        paddingHorizontal: 13,
        paddingVertical: 10,
        borderRadius: 25,
        display: 'flex',
        flexDirection: 'row',
        alignItems:'center',
        justifyContent:'space-around',
        borderColor:'rgb(240,240,240)',
        borderWidth:2



    },
    buttonText: {
        fontSize: 18,
        fontFamily: 'Poppins',


    },
    buttonTextPercent: {
        fontSize: 18,
        fontFamily: 'Poppins',
        color: 'red',
        marginLeft: 10

    },
    innerRight: {
        width: '20%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: "center"
    },
    rightTopText: {
        fontSize: 18,
        fontFamily: 'ABeeZee',

    },
    rightBottomText: {
        fontSize: 18,
        fontFamily: 'ABeeZee',
        color: 'red',

    }



})

export default GiftNotification