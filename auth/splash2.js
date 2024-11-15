import React, { useEffect, useState, useCallback } from 'react';
import { View, Text, SafeAreaView, Pressable, StyleSheet, Image, Dimensions, FlatList } from 'react-native';
import { FontAwesome, } from '@expo/vector-icons';
import { useDispatch, useSelector } from "react-redux";
import CryptoCard from '../component/currencyContainer';
import { loadCoins,changeToBlackBackground,changeToWhiteBackground} from "../store/action/appStorage";
import Error from '../component/errorComponent';
import SplashLoader from '../loaders/splashLoader';



let Welcome = ({ navigation }) => {
    //getting crypto data from coinmarcap
    let dispatch = useDispatch()
    let [coins, setCoins] = useState([{}, {}])
    let [isLoading, setIsLoading] = useState(true)
    let [error, setError] = useState(false)
    const [tradable, setTradable] = useState(true)
    const [refetch, setRefetch] = useState(true)
    const [pageNumber, setPageNumber] = useState(1)
    //let [backgroundColorInit,setBackgroundColorInit] = useState('')
    let { background,importantText,normalText,fadeColor,blue,fadeButtonColor } = useSelector(state => state.userAuth)

    



    useEffect(() => {
        let isSuscribe = true
        setError(false)
        setIsLoading(true)
        dispatch(loadCoins(pageNumber)).then(response => {
            if (isSuscribe) {
                if (!response.bool) {
                    setIsLoading(false)
                    setError(true)
                    return
                }
                //removing duplicate
                //removing duplicate
                let arr = [...coins, ...response.message]
                let uniqueIds = []
                const unique = arr.filter(element => {
                    const isDuplicate = uniqueIds.includes(element.id)
                    if (!isDuplicate) {
                        uniqueIds.push(element)
                        return true
                    }
                    return false
                })
                let selectedCoin = unique.filter((data, index) => {
                    if (index < 30) {
                        return data
                    }
                })
                setCoins(selectedCoin);
                setTimeout(() => {
                    setIsLoading(false)
                }, 10000)
            }
        })
        
        //removing all subscription
        return () => {
            isSuscribe = false
        }

    }, [dispatch, pageNumber, loadCoins, refetch,background]);

    useEffect(() => {
        let focus = navigation.addListener('beforeRemove', (e) => {
            e.preventDefault();
        });
        return focus
    }, [navigation]);


    let navigationHandler = (coin) => {
        navigation.navigate('PriceChart', { price: coin.current_price, percentage: parseFloat(coin.price_change_percentage_24h).toFixed(3), name: coin.id, market_cap: coin.market_cap, total_volume: coin.total_volume, circulating_supply: coin.circulating_supply, market_cap_rank: coin.market_cap_rank })
    }



    let onEndFetch = useCallback(async (pageNumber) => {
        // You can await here
        return
    })

    const refetchData = useCallback(() => {
        setRefetch(prev => !prev)
    }, [])



    const changeTradable = useCallback((data) => {
        setIsLoading(true)
        setTradable(data)
        setTimeout(() => {
            setIsLoading(false)
        }, 3000)
    }, [])

    const navigateToLogin = async () => {
        //await dispatch(changeToWhiteBackground())
        navigation.navigate('Login')


    }
    const navigateToSignup = async () => {
        //await dispatch(changeToBlackBackground())
        navigation.navigate('Signup')

    }


    if (isLoading) {
        return <SplashLoader />
    }

    if (error) {
        return <Error tryAgain={refetchData} />
    }

    const renderUi = ({ item, index }) => {
        if (index == 0) {
            return <View>
                <View style={styles.header}>
                    <Text style={{ ...styles.headerText, color: importantText }}>Over 89 million people trust us to trade crypto</Text>
                    <Text style={styles.terms}>*Terms Apply</Text>
                </View>
                <View style={styles.imageContainer}>
                    <Image
                        source={require('../assets/icons/starter.png')}
                        style={{ width: 250, height: 250, }} />




                </View>

            </View>

        }
        if (index == 1) {
            return <View style={{ ...styles.headerContainer, backgroundColor: background }}>
                <View style={styles.assetsheaderCon}>
                    <Pressable style={{
                        padding: tradable ? 0 : 10,
                        borderRadius: tradable ? 0 : 8,
                        backgroundColor: tradable ? "" : fadeColor
                    }} onPress={() => changeTradable(false)} >
                        <Text style={{ ...styles.tradableText, color: importantText }}>Tradable </Text>

                    </Pressable>
                    <Pressable style={{
                        padding: tradable ? 10 : 0,
                        borderRadius: tradable ? 8 : 0,
                        backgroundColor: tradable ? fadeColor : ''
                    }} onPress={() => changeTradable(true)}>
                        <Text style={{ ...styles.assetText,color: importantText}}>
                            All Assets
                        </Text>


                    </Pressable>

                    <Pressable style={{ ...styles.searchIconContainer, backgroundColor: fadeColor }} onPress={() => {
                        navigation.navigate('SearchSplash')
                    }}>
                        <FontAwesome name="search" size={18} color={importantText} />
                    </Pressable>
                </View>
            </View>
        }

        return <CryptoCard coin={item}
            navigationHandler={() => navigationHandler(item)}
        />

    }





    return <SafeAreaView style={{ ...styles.screen, backgroundColor: background }}>
        <FlatList
            stickyHeaderIndices={[1]}
            data={coins}
            initialNumToRender={50}
            keyExtractor={(item, index) => Math.random().toFixed(10)}
            renderItem={renderUi}
            onEndReached={() => onEndFetch(coins.length / 50 + 1)}


        />

        <View style={{ ...styles.bottomsection, backgroundColor: background, borderTopColor: fadeColor }} >
            <Pressable style={{ ...styles.bottombuttonsignup, backgroundColor: fadeColor }} onPress={navigateToSignup}>
                <Text style={{ ...styles.bottombuttonsignupText, color: importantText }}>Sign up</Text>

            </Pressable>
            <Pressable style={{ ...styles.bottombuttonsignin, backgroundColor: blue }} onPress={navigateToLogin}>
                <Text style={{ ...styles.bottombuttonsigninText, color:'#fff' }}>Sign in</Text>

            </Pressable>


        </View>
    </SafeAreaView>

}



const styles = StyleSheet.create({
    screen: {
        flex: 1,


    },
    container: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    text: {
        fontSize: 35,
        fontFamily: 'ABeeZee'

    },

    header: {
        paddingVertical: 60,
        paddingTop: 50,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',


    },
    headerText: {
        fontFamily: 'ABeeZee',
        fontSize: 25,
        fontWeight: '600',
        width: '80%',
        textAlign: 'center',
    },
    terms: {
        fontSize: 15,
        textAlign: 'center',
        fontFamily: 'Poppins',
        color: '#1652f0'
    },
    imageContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },

    headerContainer: {
        paddingTop: 15,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
        zIndex: 10,
        paddingVertical: 20,
        paddingTop: 15,
        paddingHorizontal: 15,

    },
    searchIconContainer: {
        width: 50,
        height: 50,
        borderRadius: 50,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',


    },
    assetsheaderCon: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%',

    },
    tradableContainer: {
        padding: 10,
        borderRadius: 8,

    },
    assetText: {
        fontSize: 16,
        fontFamily: 'Poppins',
        
    },

    tradableText: {
        fontSize: 16,
        fontFamily: 'Poppins',
    },
    /*
    styling crypto info

    */
    cryptoInfoCon: {
        paddingTop: 25,
        flexDirection: "row",
        alignItems: "center",
    }
    ,
    /* styling bottom section */
    bottomsection: {
        position: 'absolute',
        top: '85%',
        width: '100%',
        height: '15%',
        borderTopWidth: 1,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center'

    },
    bottombuttonsignin: {
        paddingVertical: 17,
        borderRadius: 25,
        width: '42%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        fontFamily: 'ABeeZee',
        fontSize: 20

    },
    bottombuttonsignup: {
        paddingVertical: 17,
        borderRadius: 25,

        width: '42%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        color: '#fff',
        fontFamily: 'ABeeZee',
        fontSize: 20

    },
    bottombuttonsignupText: {
        fontFamily: 'ABeeZee',
        fontSize: 20,
        color: '#fff'

    },
    bottombuttonsigninText: {
        fontFamily: 'ABeeZee',
        fontSize: 20,

    },


})



export default Welcome