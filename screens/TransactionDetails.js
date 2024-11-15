import React, { useState, useEffect } from 'react'
import { View, Text, SafeAreaView, ScrollView, StyleSheet, Pressable } from 'react-native'
import { Feather } from '@expo/vector-icons';
import { useDispatch, useSelector } from "react-redux";
import { getTransaction } from "../store/action/appStorage";
import { truncate } from "../utils/util"
import AuthModal from '../modals/authModal'
import Loader from '../loaders/Loader';
import { useRoute } from "@react-navigation/native";
import TransactionDetailCard from '../component/transactionDetailCard';
import moment from 'moment';

const TransactionDetails = ({ navigation }) => {
    const route = useRoute();
    const [header, setHeader] = useState(false);
    let { user, background, importantText, normalText, blue } = useSelector(state => state.userAuth)
    let dispatch = useDispatch()
    const [modalVisible, setModalVisible] = useState(false)
    const [isAuthError, setIsAuthError] = useState(false)
    const [authInfo, setAuthInfo] = useState("")
    const [url, setUrl] = useState("");
    const [isLoading, setIsLoading] = useState(false)
    const [isHideLoading, setIsHideLoading] = useState(false)


    //preventing memory leak
    useEffect(() => {
        let focus = navigation.addListener('beforeRemove', (e) => {
            if (isLoading) {
                e.preventDefault();
            } else {
                //can go back
            }
        });
        return focus
    }, [isLoading]);

    //getting routes data
    const {
        transactionType,
        currencyType,
        date,
        accountNumber,
        accountName,
        nameOfBank,
        routeNumber,
        symbol,
        country,
        state,
        bankAddress,
        walletAddress,
        amount,
        from,
        nameOfCurrency
    } = route.params


    const scrollHandler = (e) => {
        if (e.nativeEvent.contentOffset.y > 70) {
            setHeader(true)
        } else {
            setHeader(false)

        }
    }



    let updateVisibility = async (data) => {
        if (data == "changeInfo") {
            navigation.navigate('UserCard')
            return setModalVisible(false)
        }
        //go further to close account
        if (isLoading) {
            return
        }
        setModalVisible(false)
    }



    const updateAuthError = () => {
        setIsAuthError(prev => !prev)
        return navigation.navigate(url)
    }

    const navigateToDetail = () => {
        navigation.navigate('TransactionDetails')

    }



    if (isLoading || isHideLoading) {
        return <Loader />
    }


    return (<>
        {isAuthError && <AuthModal modalVisible={isAuthError} updateVisibility={updateAuthError} message={authInfo} />}

        <SafeAreaView style={{ ...styles.screen, backgroundColor: background}}>

            <View style={{ ...styles.navigationHeader, backgroundColor: background, top: header ? 0 : 0 }}>
                <Pressable onPress={() => navigation.goBack()} style={styles.iconCon}>

                    <Feather name="arrow-left" size={24} color={background === 'white' ? "black" : "white"} />
                </Pressable>



            </View>

            <ScrollView showsVerticalScrollIndicator={false} style={{...styles.scrollviewContainer}}
                onScroll={scrollHandler}
            >

                <View style={styles.headerNameCon}>
                    <Text style={{ ...styles.headerName, color: importantText, display: header ? 'flex' : 'flex', marginBottom: 10 }}>Sending Information</Text>

                </View>


                {currencyType ? <TransactionDetailCard property={'Currency Type'}
                    value={currencyType}
                /> : <></>}

                {transactionType ? <TransactionDetailCard property={'Transaction Type'}
                    value={transactionType}
                /> : <></>}



                {nameOfCurrency ? <TransactionDetailCard property={'Name Of Currrency'}
                    value={nameOfCurrency}
                /> : <></>}

                {symbol ? <TransactionDetailCard property={'Currency Symbol'}
                    value={symbol}
                /> : <></>}



                {amount ? <TransactionDetailCard property={'Amount'}
                    value={amount}
                /> : <></>}

                {date ? <TransactionDetailCard property={'Date'}
                    value={moment(date).from(moment())}
                /> : <></>}


                {/* Recipient information */}
                <View style={styles.headerNameCon}>
                    <Text style={{ ...styles.headerName, color: importantText, display: header ? 'flex' : 'flex', marginTop: 10 }}>Recipient Information</Text>

                </View>

                {nameOfBank ? <TransactionDetailCard property={'Name Of Bank'}
                    value={nameOfBank}
                /> : <></>}

                {accountName ? <TransactionDetailCard property={'Name Of Account'}
                    value={accountName}
                /> : <></>}

                {routeNumber ? <TransactionDetailCard property={'Route Number'}
                    value={routeNumber}
                /> : <></>}


                {accountNumber ? <TransactionDetailCard property={'Account Number'}
                    value={accountNumber}
                /> : <></>}



                {walletAddress ? <TransactionDetailCard property={'Wallet Address'}
                    value={walletAddress}
                /> : <></>}

                {bankAddress ? <TransactionDetailCard property={'Bank Address'}
                    value={bankAddress}
                /> : <></>}


                {country ? <TransactionDetailCard property={'Country'}
                    value={country}
                /> : <></>}


                {state ? <TransactionDetailCard property={'State'}
                    value={state}
                /> : <></>}













                




            </ScrollView>
        </SafeAreaView>
    </>

    )
}


const styles = StyleSheet.create({
    screen: {
        flex: 1,
        paddingHorizontal: 15
    },
    navigationHeader: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'flex-start',
        paddingTop: 15,
        paddingBottom: 10,
        backgroundColor: '#fff',
        zIndex: 10,

    },
    iconCon: {
        width: '15%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        paddingTop: 5


    },
    headerNameCon: {
        width: '85%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'flex-start'


    },
    headerName: {
        fontFamily: 'Poppins',
        fontSize: 22
    },

    buttonCon: {
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    button: {
        paddingTop: 18,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '80%',
        paddingVertical: 17,
        borderRadius: 30,


    }


})


export default TransactionDetails