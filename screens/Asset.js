import React, { useState, useEffect } from 'react'
import { View, Text, SafeAreaView, ScrollView, Pressable, StyleSheet, Image} from 'react-native'
import { Entypo,Ionicons} from '@expo/vector-icons';
import AssetsLoaders from '../loaders/assetsLoader'
import {useSelector } from "react-redux";

const Assets = ({navigation}) => {
    let [isLoading, setIsLoading] = useState(true)
    let { user,background,importantText,normalText,fadeColor,blue,fadeButtonColor } = useSelector(state => state.userAuth)

   
   

    useEffect(() => {
        setIsLoading(true)
        setTimeout(() => {
            setIsLoading(false)
        }, 1000)

    },[])
    //navigating to buy assets list

    let navigateToAsset = ()=>{
        //navigate to my personal asset
        navigation.navigate('SellList')
    }

    let buyAssetHandler = ()=>{
        //go to buy crypto list
        navigation.navigate('BuyCryptoList')
    }
    
    if(isLoading){
        return <AssetsLoaders/>
    }
    return (
        <SafeAreaView style={{...styles.screen,backgroundColor:background}}>
            <ScrollView stickyHeaderIndices={[0]} contentContainerStyle={styles.scrollContainer}>
                <View style={{ display: 'flex', width: '100%' }}>
                    <View style={{...styles.headerContainer,backgroundColor: background,}}>
                        <Pressable onPress={() => navigation.openDrawer()}>
                            <Entypo name="menu" size={24} color={background==='white'?"black":"white"} />

                        </Pressable>

                        <Pressable  style={styles.giftContainer}>

                            <Text style={styles.giftText}>Assets</Text>


                        </Pressable>


                        <Pressable onPress={() => navigation.navigate('Notification')}>
                        <Ionicons name="notifications"  size={30} color={background==='white'?"black":"white"} />
                            <View style={styles.notification}>
                                <View style={styles.notificationTextContainer}>
                                    <Text style={styles.notificationText}>{user.notifications.length}</Text>

                                </View>

                            </View>

                        </Pressable>


                    </View>
                </View>

                <View style={styles.balanceContainer}>
                    {user.isHideBalance?<Text style={styles.balanceText}></Text>:<Text style={{...styles.balanceText,color:normalText}}>Your balance</Text>}

                    {user.isHideBalance ?<Text></Text>:<Text style={{...styles.balanceAmount,color:importantText}}>$ {Number(user.accountBalance).toFixed(2)}</Text>}


                </View>


                <View style={styles.imageContainer}>
                    <Image
                        source={require('../assets/icons/graphics9.png')}
                        style={{ width: 100, height: 100 }} />
                </View>

                <View style={styles.starterContainer}>

                    <Text style={{...styles.starterHead,color:importantText}}>Get started with crypto</Text>

                    <Text style={{...styles.starterInfo,color:importantText}}>Purchase crypto to earn.</Text>

                    <Pressable style={{...styles.buttonContainer,backgroundColor:fadeColor}} onPress={navigateToAsset}>
                        <Text style={{...styles.buttonText,color:importantText}}>Your assets</Text>

                    </Pressable>
                </View>

                <View style={styles.buyContainer}>
                    <Text style={{...styles.buyHead,color:importantText}}>Recurring buys</Text>
                    <View style={styles.buySubContainer}>
                        <View style={styles.subImageContainer}>
                        <Image
                            source={require('../assets/icons/graphics8.png')}
                            style={styles.subImage} />

                        </View>
                        

                        <View style={styles.subHeadContainer}>
                            <Text style={{...styles.subHead,color:importantText}}> Learn more about recurring buys</Text>
                            <Text style={{...styles.subText,color:importantText}}>Invest daily,weekly, or monthly </Text>
                        </View>

                        

                    </View>

                    <Pressable style={{...styles.buttonContainer,backgroundColor:fadeColor}} onPress={buyAssetHandler}>
                        <Text style={{...styles.buttonText,color:importantText}}>Buy assets</Text>
                    </Pressable>
                </View>


            </ScrollView>






        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    screen: {
        flex: 1
    },
    scrollContainer: {
        paddingBottom: 100,
        paddingHorizontal: '5%',
    },
    headerContainer: {
        paddingTop: 15,
        display: "flex",
        flexDirection: "row",
        justifyContent: 'space-between',
        position: 'relative',
        

    },
    giftContainer: {
        display: "flex",
        flexDirection: 'row',
        borderRadius: 10,
        alignItems: "center",
        height: 40,
        paddingHorizontal: 30,
    },
    giftText: {
        fontSize: 18,
        fontFamily: 'Poppins',
        marginLeft: 10,
        alignSelf: 'center'
    },
    notification: {
        width: 20,
        height: 20,
        position: 'relative',
        padding: 10,
        marginRight: 20
    },
    notificationTextContainer: {
        width: 25,
        height: 25,
        backgroundColor: 'red',
        position: 'absolute',
        bottom: 35,
        left: 15,
        display: 'flex',
        alignItems: "center",
        justifyContent: 'center',
        borderRadius: 25

    },
    notificationText: {
        color: '#fff',
        fontFamily: 'Poppins',
    },
    balanceContainer:{

    },
    balanceText:{
        fontSize: 16,
        fontFamily: 'ABeeZee',
        color:'grey'

    },
    balanceAmount:{
        fontSize: 30,
        fontFamily: 'Poppins',

    },
    
    imageContainer: {
        display: 'flex',
        alignItems: "center",
        justifyContent: 'center',
    


    },
    starterContainer: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        marginBottom: 35
    },
    starterHead: {
        fontSize: 20,
        fontFamily: 'Poppins'


    },
    starterInfo: {
        fontSize: 18,
        fontFamily: 'ABeeZee',
        marginBottom: 20,

    },
    buttonContainer: {
        paddingVertical: 17,
        borderRadius: 30,
        width: '95%',
        display: 'flex',
        alignItems: "center",
        justifyContent: 'center',
        alignSelf: 'center',


    },
    buttonText: {
        fontSize: 15,
        fontFamily: 'Poppins'

    },

    buyHead: {
        fontSize: 20,
        fontFamily: 'Poppins',
        marginBottom:20
    },
    buySubContainer: {
        display: 'flex',
        flexDirection: 'row',
        marginBottom:30

    },
    subImageContainer: {
        display:'flex',
        flexDirection:'row',
        justifyContent:'center'
    },
    subImage: {
        width: 30,
        height: 30,
        marginRight:10
    },
    subHeadContainer:{
        width:'80%'

    },
    subHead:{
        fontSize: 17,
        fontFamily: 'Poppins',

    },
    subText:{
        fontSize: 16,
        fontFamily: 'ABeeZee',
        color:'grey'

    },

})

export default Assets