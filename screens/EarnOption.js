import React, { useState } from 'react'
import { View, Text, SafeAreaView, ScrollView, Pressable, StyleSheet, Image, Dimensions} from 'react-native'
import { Feather, } from '@expo/vector-icons'
import TopMovers from "../component/HomeTopMovers"

const EarnAsset = ({ navigation }) => {
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


    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
            <ScrollView showsVerticalScrollIndicator={false} style={styles.scrollViewContainer} onScroll={scrollHandler} stickyHeaderIndices={[0]}>

                <View style={{ ...styles.navigationHeader }}>

                    <Pressable onPress={() => navigation.goBack()} style={{ ...styles.goback }} >
                        <Feather name="arrow-left" size={24} color="rgb(44, 44, 44)" />

                    </Pressable>
                </View>


                <View style={styles.imageContainer}>
                    <Image
                        source={require('../assets/icons/earn.png')}
                        style={{ width: 330, height: '100%', marginRight: 15 }}
                         />
                </View>


                <View style={styles.infoContainer}>
                    <Text style={styles.infoHeading}>Earn crypto by holding crypto</Text>
                    <Text style={styles.infoText}>You can earn passive yield over time when you hold certain assets on capchain.Get started by buying or depositing a yield-earning asset today.</Text>

                    <Text style={styles.linkText}>Learn more</Text>

                </View>


                <View style={{ marginLeft: '5%', paddingTop: 15, marginBottom: 50 }}>

                    <TopMovers />

                </View>

                <View style={styles.discoverContainer}>
                    <Text style={styles.discoverHeading}>Discover more assets</Text>
                    <View style={styles.walletContainer}>
                        <View style={styles.walletInfoContainer}>
                            <Text style={styles.walletInfoHeadiing}>Get wallet...</Text>
                            <Text style={styles.walletInfoText}>Earn interest on more assets with wallet</Text>

                        </View>
                        <View style={styles.walletImageContainer}>
                            <Image
                                source={require('../assets/icons/explore.png')}
                                style={styles.walletImage} />

                        </View>

                    </View>
                </View>




            </ScrollView>

        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    scrollViewContainer: {
        paddingBottom: 100,
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
        marginBottom: 20,
        paddingHorizontal: 17
    },
    goback: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center'

    },
    imageContainer: {
        height: 210,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 20,
        paddingHorizontal: 17
    },
    infoContainer: {
        borderBottomWidth: .5,
        borderBottomColor: 'rgb(200,200,200)',
        paddingBottom: 10,
        paddingHorizontal: 17,
        marginBottom: 20
    },
    infoHeading: {
        fontSize: 20.5,
        fontFamily: 'Poppins'
    },
    infoText: {
        fontSize: 18,
        fontFamily: 'ABeeZee',
        color: 'rgb(100,100,100)',
        lineHeight: 25,
        marginBottom: 5
    },
    linkText: {
        color: '#1652f0',
        fontSize: 18,
        fontFamily: 'ABeeZee',
    },

    discoverContainer: {
        paddingHorizontal: 17,

    },
    discoverHeading: {
        fontSize: 19,
        fontFamily: 'Poppins',
        marginBottom:25
    },
    walletContainer:{
        display:'flex',
        flexDirection:'row',
        width:'100%',
        alignItems:'center',
        marginBottom:60
    },
    walletInfoContainer:{
        flex:1,
    },
    walletInfoHeadiing:{
        fontSize: 17,
        fontFamily: 'Poppins',
        marginBottom:5,
    

    },
    
    walletInfoText:{
        fontSize: 18,
        fontFamily: 'ABeeZee',
        color: 'rgb(100,100,100)',
        lineHeight: 25,
        marginBottom: 5

    },
    walletImageContainer:{
        flex:1,
        display:'flex',
        alignItems:'flex-end',
        justifyContent:'flex-start',
    },
    walletImage:{
        width:100,
        height:100,
    }






})

export default EarnAsset