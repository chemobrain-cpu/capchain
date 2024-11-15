import React, { useState, useEffect } from 'react'
import { View, Text, SafeAreaView, ScrollView, Pressable, StyleSheet, ActivityIndicator, Platform, Alert } from 'react-native'
import ContentLoaders from '../loaders/contentLoader'
import WatchList from '../component/HomeWatchList'
import Button from '../component/homeButton'
import TopMovers from "../component/HomeTopMovers"
import TimelineContainer from "../component/homeTimeline"
import { Entypo, Ionicons, AntDesign, Octicons } from '@expo/vector-icons';
import { timelineData } from "../data/data"
import { useDispatch, useSelector } from "react-redux";
import Error from '../component/errorComponent'
import { loadCoins, loadWatchList, addNotificationToken, getUser } from "../store/action/appStorage";
import ShortListLoader from '../loaders/shortListLoader'
import MoversLoader from "../loaders/moversLoader";






const Home = ({ navigation }) => {
    let [isLoading, setIsLoading] = useState(true)
    let [isWatchListLoading, setIsWatchListLoading] = useState(true)
    const [header, setHeader] = useState(false);
    const [headerAction, setHeaderAction] = useState(false);
    const [isError, setIsError] = useState(false)
    const [isMounted, setIsMounted] = useState(false)
    const dispatch = useDispatch()
    const [watchListCoins, setWatchListCoins] = useState([]);
    const [topMoversCoinList, setTopMoversCoinList] = useState([]);
    let [isMoversLoading, setIsMoversLoading] = useState(true)

    //notification
    const [expoPushToken, setExpoPushToken] = useState([]);

    let { user, background, importantText, normalText, fadeColor, blue, fadeButtonColor } = useSelector(state => state.userAuth)


    /*setting up notifications listeners
    useEffect(() => {
        Notifications.addNotificationReceivedListener(notification => {
            //write a logic to update the user
            console.log('working')
            fetchUser().then(() => {
                setIsLoading(false)
            })
        })

        Notifications.addNotificationResponseReceivedListener(response => {
            navigation.navigate('Notification')
            //update user when notification is recieved
        })
    }, [fetchUser]);

    
        //triggering security check
        useEffect(()=>{
            let timer
            if(!isLoading && !isWatchListLoading && !isMoversLoading && !isMounted && !isError){
                timer = setTimeout(()=>{
                    alert('secure your account')
                },1000)
    
            }
    
            return ()=>{
                clearTimeout(timer)
            }
    
        },[])
        */


    let fetchUser = async () => {
        setIsLoading(true)
        let res = await dispatch(getUser())
        if (!res) {
            setIsError(true)
        }
    }

/*
    //use effect for registering notification token
    useEffect(() => {
        setIsLoading(true)
        //registering for push notification
        registerForPushNotificationsAsync().then(token => setExpoPushToken(token));

    }, []);

    const registerForPushNotificationsAsync = async () => {
        let token;
        //configuration for android
        if (Platform.OS === 'android') {
            await Notifications.setNotificationChannelAsync('default', {
                name: 'default',
                importance: Notifications.AndroidImportance.MAX,
                vibrationPattern: [0, 250, 250, 250],
                lightColor: '#FF231F7C',
            });
        }


        const { status: existingStatus } = await Notifications.getPermissionsAsync();

        let finalStatus = existingStatus;
        if (existingStatus !== 'granted') {
            const { status } = await Notifications.requestPermissionsAsync();
            finalStatus = status;
        }
        if (finalStatus !== 'granted') {
            Alert.alert('Permission required',
                'Push notifications need the appropriate permissions.')
            return;
        }
        token = (await Notifications.getExpoPushTokenAsync()).data;
        //save the token in users account

        if (token) {
            let res = await dispatch(addNotificationToken({ notificationToken: token }))
            if (!res.bool) {
                setIsError(true)
            }
        }
        return token;
    }*/

    let fetchData = async () => {
        // You can await here

        let response = await dispatch(loadCoins())
        if (!response.bool) {
            setIsError(true)
        }

        setTopMoversCoinList([...[response.message[5], response.message[6], response.message[15], response.message[7], response.message[11], response.message[10], response.message[8]]])

        setIsMoversLoading(false)
        setIsLoading(false)

    }

    let fetchWatchList = async () => {
        // You can await here
        let response = await dispatch(loadCoins())
        if (!response.bool) {
            setIsError(true)
            setIsWatchListLoading(false)
            return
        }

        setWatchListCoins([...[response.message[0], response.message[1], response.message[2], response.message[3], response.message[4], response.message[5], response.message[6]]]);

        setIsWatchListLoading(false)
        setIsLoading(false)


        /* else {
            let transformIds = user.watchList.join('%2c')
            let response = await dispatch(loadWatchList(transformIds))
            if (!response.bool) {
                setIsError(true)
                setIsWatchListLoading(false)
                return
            }
            setWatchListCoins(response.message);
            setIsWatchListLoading(false)
            setIsLoading(false)
        }*/



    }

    let navigationHandler = (coin) => {

        navigation.navigate('BuyPriceChart',
            {
                price: coin.current_price,
                percentage: parseFloat(coin.price_change_percentage_24h).toFixed(2),
                name: coin.id.toLowerCase(),
                market_cap: coin.market_cap,
                total_volume: coin.total_volume, circulating_supply: coin.circulating_supply,
                market_cap_rank: coin.market_cap_rank
            })
    }

    const scrollHandler = (e) => {
        if (e.nativeEvent.contentOffset.y > 1000) {
            setHeader(true)
            setHeaderAction(true)
        }
        else {
            setHeader(false)
            setHeaderAction(false)
        }
    }

    let tryAgain = () => {
        setIsError(false)
        setIsMounted(true)
        setIsLoading(true)
        registerForPushNotificationsAsync().then(token => setExpoPushToken(token));
        fetchData()
        fetchWatchList()
    }

    /*
    let setupHandler = (url) => {
        navigation.navigate(url)
    }*/

    let actionHandler = (data) => {
        if (data === "Buy") {
            navigation.navigate("BuyCryptoList")
        } else if (data === "Sell") {
            navigation.navigate("SellList")

        } else if (data == "Recieve") {
            navigation.navigate("Recieve")

        } else if (data == "Send") {
            navigation.navigate("Send")

        } else if (data == 'Convert') {

            navigation.navigate("ConvertList")

        } else if (data == 'Receive') {

            navigation.navigate("Recieve")

        }
    }



    useEffect(() => {
        setIsMounted(true)
        setIsLoading(true)
        fetchData()
        setTimeout(() => {
            setIsLoading(false)
        }, 5000)

        return () => {
            setIsMounted(false)
        }

    }, [])


    //use effect for watchlistCoin
    useEffect(() => {
        fetchWatchList()
    }, [])

    const parentErrorHandler = () => {
        if (isMounted) {
            return setIsError(true)
        }
    }


    if (isLoading) {
        return <ContentLoaders />
    }

    if (isError) {
        //navigate to error
        return <Error
            tryAgain={tryAgain}

        />
    }

    return (
        <SafeAreaView style={{ ...styles.screen, backgroundColor: background }}>
            <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false} onScroll={scrollHandler} stickyHeaderIndices={[0]}>
                <View>

                    <View style={{
                        ...styles.headerContainer,
                        backgroundColor: background
                    }}>
                        <Pressable onPress={() => navigation.openDrawer()}>
                            <Entypo name="menu" size={24} color={background === 'white' ? "black" : "white"} />

                        </Pressable>






                        <Pressable onPress={() => navigation.navigate('Notification')} style={styles.notificationCon} >
                            <Ionicons name="notifications" size={30} color={background === 'white' ? "black" : "white"} />
                            <View style={styles.notification}>
                                <View style={styles.notificationTextContainer}>
                                    <Text style={styles.notificationText}>{user.notifications.length}</Text>

                                </View>

                            </View>

                        </Pressable>

                    </View>


                    <View style={styles.balanceContainer}>

                        {user.isHideBalance ? < >
                        </> : <View style={{ ...styles.balanceInnerContainer, backgroundColor: background }}>

                            <Text style={{ ...styles.headText, color: importantText }}>
                                Total Balance

                            </Text>


                            <Text style={{ ...styles.balanceText, color: importantText }}>

                                ${Number(user.accountBalance).toFixed(2)}

                            </Text>
                        </View>}


                    </View>

                    <View style={{ ...styles.actionContainer, borderColor: background === 'white' ? 'rgb(180,180,180)' : fadeColor, backgroundColor: background }}>

                        <Button
                            text="Buy"
                            pressHandler={actionHandler}
                        >
                            <Ionicons name="add" size={30} color="#fff" />
                        </Button>

                        <Button
                            text="Sell"
                            pressHandler={actionHandler}
                        >
                            <AntDesign name="minus" size={22} color="#fff" />
                        </Button>

                        <Button
                            text="Send"
                            pressHandler={actionHandler}
                        >
                            <AntDesign name="arrowup" size={22} color="#fff" />
                        </Button>

                        <Button
                            text="Convert"
                            pressHandler={actionHandler}
                        >
                            <Octicons name="sync" size={22} color="#fff" />
                        </Button>

                        <Button
                            text="Receive"
                            pressHandler={actionHandler}
                        >
                            <AntDesign name="arrowdown" size={22} color="#fff" />
                        </Button>

                    </View>

                </View>


                <View style={{ ...styles.watchListContainer, borderColor: background === 'white' ? 'rgb(180,180,180)' : fadeColor, }}>
                    <View>
                        <Text style={{ ...styles.watchHeader, color: importantText }}>Watchlist</Text>
                    </View>

                    {isWatchListLoading ? <ShortListLoader /> : <WatchList navigationHandler={navigationHandler} parentErrorHandler={parentErrorHandler}
                        coins={watchListCoins}
                    />}

                </View>

                <View style={styles.topMoversContainer}>
                    <Text
                        style={{ ...styles.topMoversHeadingText, color: importantText }}
                    >
                        Top Movers
                    </Text>

                    {isMoversLoading ? <MoversLoader /> : <TopMovers
                        navigationHandler={navigationHandler} parentErrorHandler={parentErrorHandler}
                        coins={topMoversCoinList}
                    />}

                </View>


                {timelineData.map(data => <TimelineContainer key={data.about} data={data} />)}
                <View style={styles.spinnerContainer}>
                    <ActivityIndicator color='#1652f0' size={30} />
                </View>

            </ScrollView>
        </SafeAreaView>
    )
}


const styles = StyleSheet.create({
    screen: {
        flex: 1,
        paddingHorizontal: 0,

    },
    header: {
        display: 'flex',
        flexDirection: "row",

    },
    scrollContainer: {
        paddingBottom: 100,
    },
    headerContainer: {
        paddingTop: 15,
        display: "flex",
        flexDirection: "row",
        justifyContent: 'space-between',
        position: 'relative',
        paddingHorizontal: 15,
        alignItems: 'flex-start',

    },
    headText: {
        paddingHorizontal: 15,
        fontSize: 18,
        fontFamily: 'ABeeZee',
    },
    balanceContainer: {
        backgroundColor: '#fff',
        marginBottom: 0

    },

    balanceText: {
        fontSize: 28,
        fontFamily: 'Poppins',
        marginLeft: 10,
    },
    notificationCon: {
        paddingTop: 5,

    },

    notification: {
        position: 'relative',
        padding: 10,
        marginRight: 20,
        alignSelf: 'center',
        display: 'flex',
        alignItems: "center",
        justifyContent: 'center',
    },
    notificationTextContainer: {
        width: 25,
        height: 25,
        position: 'absolute',
        bottom: 35,
        backgroundColor: 'red',
        left: 15,
        display: 'flex',
        alignItems: "center",
        justifyContent: 'center',
        borderRadius: 25,

    },
    notificationText: {
        color: '#fff',
        fontFamily: 'Poppins',
    },


    actionContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderBottomWidth: .5,
        paddingBottom: 10,
        paddingHorizontal: '5%',
    },

    watchListContainer: {
        borderBottomWidth: .5,
        marginBottom: 20,

    },
    watchHeader: {
        fontSize: 20,
        fontFamily: 'Poppins',
        color: "rgb(44, 44, 44)",
        paddingTop: 10,
        marginHorizontal: '5%',
    },
    topMoversContainer: {
        marginLeft: '5%',
        paddingTop: 2,
        marginBottom: 50
    },
    spinnerContainer: {
        paddingVertical: 10,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    topMoversHeadingText: {
        fontSize: 20,
        fontFamily: 'Poppins',
        color: "rgb(44, 44, 44)",
        paddingTop: 10,
        paddingBottom: 10
    },

})


export default Home





































