import React, { useState, useEffect } from 'react'
import {
    View,
    Text,
    StyleSheet,
    Pressable,
    SafeAreaView,
    ScrollView,
    Dimensions,
} from "react-native";

import * as Clipboard from 'expo-clipboard';
import { MaterialIcons, Feather,  Ionicons } from '@expo/vector-icons';
import { useSelector, } from "react-redux"
import QRCode from 'react-native-qrcode-svg';
import { Card } from "react-native-shadow-cards"
import Loader from '../loaders/Loader'
import {truncate} from "../utils/util"



const RecieveCrypto = ({ navigation }) => {
    let [isLoading, setIsLoading] = useState(true)
    let [walletAddress,setWalletAddress] = useState('')
    let [copyActionStyle,setCopyActionStyle] = useState('')

    let { user,background,importantText,normalText,fadeColor,blue,fadeButtonColor  } = useSelector(state => state.userAuth)

    let timer 

    //preventing memory leak
    useEffect(() => {
        let focus = navigation.addListener('beforeRemove', (e) => {
            if(isLoading){
                e.preventDefault();
            }else{
                //can go back
            }
        });
        return focus
    }, [isLoading]);
    
    const changeStyle = ()=>{
        setCopyActionStyle(false)
        clearTimeout(timer)

    }

    const copyToClipboard = async()=>{
        setCopyActionStyle(true)
        Clipboard.setString(user.currentWallet.address)
        timer = setTimeout(()=>{
            changeStyle()

        },2000)

        
        
    }

    useEffect(() => {
        let coinAddress = user.currentWallet.address
        setWalletAddress(coinAddress)
        setTimeout(()=>{
            setIsLoading(false)
        },6000)
    }, [])

    const navigateToAssets = () => {
        navigation.navigate('WalletAsset')
    }

    if (isLoading) {
        return <Loader/>
    }

    return (<SafeAreaView style={{ flex: 1, backgroundColor:background }}>
        <ScrollView contentContainerStyle={styles.scrollContainer} stickyHeaderIndices={[0]}>
            <View style={{ display: 'flex', width: '100%' }}>
                <View style={{ ...styles.headerContainer, backgroundColor: background, }}>
                    <Pressable onPress={() => navigation.goBack()}>
                        <Ionicons name="close" size={24} color={background==='white'?"black":"white"} />

                    </Pressable>

                    <Pressable style={styles.giftContainer}>

                        <Text style={{...styles.giftText,color:importantText}}>Recieve</Text>




                    </Pressable>


                    <Pressable >
                        <Feather name="share" size={20} color={background==='white'?"black":"white"} />


                    </Pressable>


                </View>
            </View>

            <View style={styles.selectorContainer}>
                <Pressable style={styles.selector} onPress={navigateToAssets}>
                    <Text style={{...styles.selectorText,color:importantText}}>
                        {user.currentWallet.id}
                    </Text>
                    <MaterialIcons name="keyboard-arrow-down" size={28} color={background==='white'?"black":"white"} />

                </Pressable>
                <Text style={{...styles.walletText,color:normalText}}>{user.currentWallet.symbol}</Text>

            </View>


            <Card style={{...styles.qrcard,backgroundColor:background}}>
                <View style={styles.qr}>
                    <QRCode
                        value={user.currentWallet.address}
                        size={210}
                        color='black'
                        backgroundColor={background ==='black'?importantText:'white'}
                        logo={{
                            uri:user.currentWallet.url
                        }}
                        logoSize={50}
                        logoMargin={3}
                        logoBorderRadius={1}
                        logoBackgroundColor={background}

                    />
                </View>

                <View style={{...styles.qraddress,borderColor:background==='white'? 'rgb(180,180,180)':fadeColor}}>
                    <View style={styles.address}>
                        <Text style={{...styles.coinTitle,color:importantText}}>{user.currentWallet.symbol} address</Text>
                        <Text style={{...styles.coinAddress,color:normalText}}> {truncate(user.currentWallet.address, 12)}</Text>

                    </View>
                    <Pressable style={{...styles.copyButton,backgroundColor:copyActionStyle?'green':'#1652f0'}}  onPress={copyToClipboard}>
                        <Text style={{...styles.copyButtonText,color:copyActionStyle?'#fff':'#fff'}}>{copyActionStyle?'copied':'copy'}</Text>
                    </Pressable>
                </View>



            </Card>


            <View style={{...styles.warningContainer,backgroundColor:fadeColor}}>
                <View style={styles.warning}>
                    <Text style={styles.warningText}>i</Text>

                </View>

                <Text style={{...styles.warningInfo,color:normalText}}>Only send {truncate(user.currentWallet.id,6)} ({user.currentWallet.symbol}) to this address</Text>
            </View>

        </ScrollView>
    </SafeAreaView>);
};

const styles = StyleSheet.create({
    /*end of modal*/
    scrollContainer: {
        paddingBottom: 100,
        width: Dimensions.get('window').width,
        paddingHorizontal: '7%'

    },
    headerContainer: {
        paddingTop: 15,
        display: "flex",
        flexDirection: "row",
        justifyContent: 'space-between',
        position: 'relative',
        marginBottom: 15,

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
        alignSelf: 'flex-start'
    },
    notification: {
        width: 20,
        height: 20,
        position: 'relative',
        padding: 10,
        marginRight: 20
    },
    notificationTextContainer: {
        width: 20,
        height: 20,
        backgroundColor: 'red',
        position: 'absolute',
        bottom: 35,
        left: 15,
        display: 'flex',
        alignItems: "center",
        justifyContent: 'center',
        borderRadius: 20
    },
    notificationText: {
        color: '#fff',
        fontFamily: 'Poppins',
    },
    /*end of header styling */
    selectorContainer: {
        marginBottom: 30,
        display: 'flex',
        flexDirection: 'column',
    },
    selector: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',



    },
    selectorText: {
        fontSize: 24,
        fontFamily: 'Poppins',
        marginBottom: 0,
        paddingBottom: 0


    },
    walletText: {
        fontSize: 17,
        fontFamily: 'ABeeZee',
        marginTop: -10,
        color: 'grey'
    },
    /*end of selector styling */

    qrcard: {
        width: '100%',
        height: Dimensions.get('window').height / 2,
        paddingTop: 40,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        borderRadius: 10,
        marginBottom: 30
    },
    qr: {
        flex: 3

    },
    qraddress: {
        width: '100%',
        borderTopWidth: .5,
        borderColor: 'rgb(180,180,180)',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        alignSelf: 'stretch',
        flex: 1


    },
    address:{
        display:'flex',
        alignItems:'flex-start'

    },
    copyButton: {
        width: '40%',
        backgroundColor: 'rgb(240,240,240)',
        paddingVertical: 10,
        borderRadius: 25,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',

    },
    copyButtonText: {
        fontSize: 17,
        fontFamily: 'Poppins'

    },
    coinTitle: {
        fontSize: 16,
        fontFamily: 'ABeeZee',
        paddingLeft:8
    },
    coinAddress: {
        fontSize: 18,
        fontFamily: 'ABeeZee',
    },
    /* styling warning */
    warningContainer: {
        width: '100%',
        backgroundColor: 'rgb(240,240,240)',
        display: 'flex',
        flexDirection: 'row',
        borderRadius: 8,
        justifyContent: 'space-around',
        alignItems: 'flex-start',
        paddingHorizontal: 12,
        flex: 1,
        paddingVertical: 10
    },
    warning: {
        width: 20,
        height: 20,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 20,
        backgroundColor: 'grey'
    },
    warningText: {
        color: '#fff',
        fontSize: 15,
        fontFamily: 'ABeeZee'
    },
    warningInfo: {
        fontSize: 15,
        fontFamily: 'ABeeZee',
        color: 'grey'

    }
})

export default RecieveCrypto;