import React, { useState } from 'react'
import { View, Text, SafeAreaView, ScrollView, Pressable, StyleSheet, Image, Dimensions, TextInput, Linking, Share } from 'react-native'
import { Feather, MaterialCommunityIcons, MaterialIcons, Ionicons,EvilIcons} from '@expo/vector-icons';


const Wallet = ({ navigation }) => {
    const [header, setHeader] = useState(false);
    let [copyActionStyle, setCopyActionStyle] = useState('')
    //the user link will be gotten from redux

    const scrollHandler = (e) => {
        if (e.nativeEvent.contentOffset.y > 5) {
            setHeader(true)
        } else {
            setHeader(false)
        }
    }
    const openGoogleStore =async()=>{
        const isSupported = await   Linking.canOpenURL(`https://play.google.com/apps/details?id=coinbase_wallet`)

        if(!isSupported){
            return
        }
        //whatsapp://send?text=precious
       // return await Linking.openURL('mailto:')
       return await Linking.openURL(`market://details?id=googoo.android.btgps`)

    }

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
            <ScrollView showsVerticalScrollIndicator={false} style={styles.scrollViewContainer} onScroll={scrollHandler} stickyHeaderIndices={[0]}>

                <View style={{ ...styles.navigationHeader,borderBottomWidth:header? 0.5:0,bordBottomColor:header?'rgb(240,240,240)':'#fff' }}>

                    <Pressable onPress={() => navigation.goBack()} style={{ ...styles.goback }} >
                        <Feather name="arrow-left" size={24} color="rgb(44, 44, 44)" />
                        <Text style={{ ...styles.headerName }}>Coinapp Wallet</Text>
                    </Pressable>
                </View>


                <View style={styles.imageContainer}>
                    <Image
                        source={require('../assets/icons/wallet.png')}
                        style={{ width: 250, height: 125, }} />
                </View>


                <View style={styles.featureContainer}>
                    <View style={styles.iconContainer}>
                        <Ionicons name="swap-horizontal-outline" size={24} color="black" />

                    </View>
                    <View style={styles.infoContainer}>

                        <Text style={styles.infoHeading}>Trade more assets</Text>
                        <Text style={styles.infoText}>Keep your crypto secure and trade even more assets</Text>




                    </View>

                </View>

                <View style={styles.featureContainer}>
                    <View style={styles.iconContainer}>
                        <MaterialCommunityIcons name="percent" size={24} color="black" />

                    </View>
                    <View style={styles.infoContainer}>

                        <Text style={styles.infoHeading}>Earn interest on your crypto</Text>
                        <Text style={styles.infoText}>Explore all the ways to earn interest on the crypto you hold</Text>




                    </View>

                </View>

                <View style={{...styles.featureContainer,marginBottom:180}}>
                    <View style={styles.iconContainer}>
                    <EvilIcons name="share-google" size={28} color="black" />

                    </View>
                    <View style={styles.infoContainer}>
                        <Text style={styles.infoHeading}>Explore decentralized apps</Text>
                        <Text style={styles.infoText}>Check out the world of decentralized finance and all Dapps have to offer</Text>




                    </View>

                </View>






            </ScrollView>
            <View style={styles.footerSection}>
                
                <Pressable style={styles.footerButton} onPress={openGoogleStore}>
                <Text style={styles.footerButtonText}> Download Wallet</Text>

                </Pressable>
            </View>

        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    scrollViewContainer: {
        width: Dimensions.get('window').width,


    },
    navigationHeader: {
        paddingBottom: 10,
        backgroundColor: '#fff',
        zIndex: 10,
        width: '100%',
        borderBottomColor: 'rgb(197, 197, 197)',
        paddingTop: 15,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 25,
        paddingHorizontal: 17
    },
    headerName: {
        fontFamily: 'ABeeZee',
        fontSize: 20,
        marginLeft: '20%',
        fontFamily: 'Poppins'

    },
    goback: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center'

    },
    imageContainer: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 43,
        paddingHorizontal: 17
    },
    featureContainer: {
        display: 'flex',
        flexDirection: 'row',
        paddingHorizontal: 17,
        marginBottom: 30
    },
    iconContainer: {
        flex: 1
    },
    infoContainer: {
        flex: 5,
        display: 'flex',
        alignItems: 'flex-start',


    },
    infoHeading: {
        fontSize: 17,
        fontFamily: 'Poppins',
        textAlign: 'left',


    },
    infoText: {
        fontSize: 17,
        fontFamily: 'ABeeZee',
        color: 'grey',
        textAlign: 'left'

    },
    footerSection:{
        height:200,
        position:'absolute',
        width:'100%',
        top:'85%',
        height:'15%',
        borderTopWidth:.5,
        borderTopColor:'rgb(210,210,210)',
        display:'flex',
        alignItems:'center',
        justifyContent:'center',
        paddingHorizontal:17,
        backgroundColor:'#fff'
    },
    footerButton:{
        paddingVertical:17,
        borderRadius:30,
        backgroundColor:'#1652f0',
        width:'100%',
        display:'flex',
        alignItems:'center',
        justifyContent:'center',
    },
    footerButtonText:{
        color:'#fff',
        fontSize:17,
        fontFamily:'Poppins'
    }
   




})

export default Wallet