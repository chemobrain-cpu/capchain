import React, { useState, useEffect } from 'react'
import { View, Text, SafeAreaView, ScrollView, Pressable, StyleSheet, Image, Switch } from 'react-native'
import { Feather, AntDesign } from '@expo/vector-icons';
import { useDispatch, useSelector } from "react-redux";
import { getTransactions } from "../store/action/appStorage";
import SettingModal from '../modals/profileSettingModal';
import AuthModal from '../modals/authModal'
import Loader from '../loaders/Loader';
import TransactionAssetCard from '../component/transactionAssetCard';
import TransactionCashCard from '../component/transactionCashCard';

const Transactions = ({ navigation }) => {

    const [header, setHeader] = useState(false);
    let { user, background, importantText, normalText, fadeColor, blue, fadeButtonColor } = useSelector(state => state.userAuth)
    let dispatch = useDispatch()
    const [modalVisible, setModalVisible] = useState(false)
    const [isAuthError, setIsAuthError] = useState(false)
    const [authInfo, setAuthInfo] = useState("")
    const [url, setUrl] = useState("");
    const [isLoading, setIsLoading] = useState(true)

    const [isTopic, setIsTopic] = useState("")
    const [isInfo, setIsInfo] = useState("")
    const [action, setAction] = useState("")


    const [allTransactions, setAllTransactions] = useState([])
    const [actualTransactions, setActualTransactions] = useState([])

    const [transactionType, setTransactionType] = useState('Crypto')


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

    //fetch all transactions from the server
    useEffect(() => {
        fetchTransactions()
    }, [fetchTransactions]);

    let fetchTransactions = async () => {
        setIsLoading(true)
        let res = await dispatch(getTransactions())
        if (!res) {
            return
        }
        if (!res.bool) {
            setIsAuthError(true)
            setAuthInfo(res.message)
            setIsLoading(false)
            return
        }

        //filtering transaction by default
        let filteredtransactions = res.message.filter(data => data.currencyType === 'Crypto')
        setActualTransactions(res.message)
        setAllTransactions(filteredtransactions)
        setIsLoading(false)

    }

    //useEffect that helps with filtering the transaction data

    const filterCash = async () => {
        setTransactionType('Cash')
        let filteredTransactions = actualTransactions.filter(data => data.currencyType === 'Cash')
        setAllTransactions(filteredTransactions)
    }


    const filterAsset = async () => {
        setTransactionType('Crypto')
        let filteredTransactions = actualTransactions.filter(data => data.currencyType === 'Crypto')
        setAllTransactions(filteredTransactions)
    }



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
        if(!url){
            return
        }
        return navigation.navigate(url)
    }

    const navigateToDetail = (transactionObject) => {
        navigation.navigate('TransactionDetails', transactionObject)

    }



    if (isLoading) {
        return <Loader />
    }


    return (<>
        {isAuthError && <AuthModal modalVisible={isAuthError} updateVisibility={updateAuthError} message={authInfo} />}

        <SettingModal modalVisible={modalVisible}
            updateVisibility={updateVisibility} topic={isTopic} info={isInfo} action={action} />

        <SafeAreaView style={{ ...styles.screen, backgroundColor: background }}>

            <View style={{ ...styles.navigationHeader, backgroundColor: background, top: header ? 0 : 0 }}>
                <Pressable onPress={() => navigation.goBack()} style={styles.iconCon}>

                    <Feather name="arrow-left" size={24} color={background === 'white' ? "black" : "white"} />
                </Pressable>
                <View style={styles.headerNameCon}>
                    <Text style={{ ...styles.headerName, color: importantText, display: header ? 'flex' : 'flex' }}>Transaction history</Text>

                </View>


            </View>

            <ScrollView showsVerticalScrollIndicator={false} style={styles.scrollviewContainer}
                onScroll={scrollHandler}
                stickyHeaderIndices={[0]}
            >
                <View style={{ backgroundColor: background }}>
                    <Text style={{ ...styles.username, color: normalText }}>General overview of cash and assets transaction for this account</Text>


                    <View style={{ ...styles.buttonContainer, backgroundColor: background }}>
                        <Pressable style={{ ...styles.button, backgroundColor: transactionType === 'Crypto' ? fadeColor : background }}
                            onPress={filterAsset}>
                            <Text style={{ ...styles.buttonText, color: importantText }}>Assets</Text>

                        </Pressable>

                        <Pressable style={{ ...styles.button, backgroundColor: transactionType === 'Cash' ? fadeColor : background }}
                            onPress={filterCash}>
                            <Text style={{ ...styles.buttonText, color: importantText }}>Cash</Text>

                        </Pressable>

                    </View>

                </View>

                {allTransactions === 0 ? <View style={{ ...styles.bottomSection, backgroundColor: background, display: 'flex', justifyContent: 'center', alignItems: 'center', height: 400 }}>

                    <Text style={{ ...styles.emptyTextStyle, color: importantText, textAlign: 'center' }}> No {transactionType} transaction history

                    </Text>

                </View> :
                    <View style={{ ...styles.bottomSection, backgroundColor: background }}>

                        {allTransactions.map(data => {
                            if (data.currencyType === 'Crypto') {
                                return <TransactionAssetCard navigateToDetail={() => navigateToDetail(data)}
                                    key={data._id}
                                    data={data}
                                />
                            } else {
                                return <TransactionCashCard
                                    navigateToDetail={() => navigateToDetail(data)}
                                    key={data._id}
                                    data={data}
                                />

                            }

                        })}

                    </View>}









            </ScrollView>
        </SafeAreaView>
    </>

    )
}


const styles = StyleSheet.create({
    screen: {
        flex: 1,
        paddingHorizontal: 5
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
        fontSize: 20
    },
    scrollviewContainer: {
        width: '100%',
        paddingHorizontal: 15,
    },
    email: {
        color: 'rgb(80, 80, 80)',
        fontFamily: 'Poppins',
        fontSize: 16,
    },
    username: {
        color: "black",
        fontSize: 20,
        fontFamily: 'ABeeZee',
        marginBottom: 30,
        textAlign: 'center',
    },

    buttonContainer: {
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
    },
    button: {
        width: '50%',
        backgroundColor: 'red',
        height: 50,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10
    },
    buttonText: {
        color: 'rgb(80, 80, 80)',
        fontFamily: 'Poppins',
        fontSize: 16,

    },
    imageLogo: {
        width: 35,
        height: 35,
        borderRadius: 18,
        borderWidth: 0.5,
        borderColor: "#ddd",
    },

    bottomSection: {
        paddingTop: 20,
        width: '100%'
    },
    detailButton: {

    },
    transactionCard: {
        paddingTop: 15,
        paddingBottom: 15

    },
    transactionTopSection: {
        display: 'flex',
        flexDirection: 'row'

    },
    imageCon: {
        flex: .5

    },
    textCon: {
        flex: 2,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'flex-start',

    },
    actionText: {
        fontFamily: 'Poppins',
        fontSize: 20,
        fontFamily: 'ABeeZee',


    },
    timeText: {
        fontFamily: 'ABeeZee',
        fontSize: 15,
        fontWeight: '500'


    },
    buttonCon: {
        flex: .8

    },
    detailButton: {
        width: '100%',
        height: 50,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5

    },
    emptyTextStyle: {
        fontSize: 20,
        fontFamily: 'ABeeZee',

    }







})


export default Transactions