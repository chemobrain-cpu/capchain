import React, { useState, useEffect } from 'react'
import {
    View,
    Text,
    StyleSheet,
    Pressable,
    SafeAreaView,
    ScrollView,
    Image,
    Dimensions,
} from "react-native";

import { Feather, AntDesign, MaterialCommunityIcons } from '@expo/vector-icons';
import { useSelector, useDispatch } from "react-redux"
import { Card } from "react-native-shadow-cards"
import Error from "../component/errorComponent";
import { useRoute } from "@react-navigation/native";
import CalculatorModal from "../modals/calculatorModal";
import { buyCrypto, sellCrypto } from "../store/action/appStorage";
import Loader from '../loaders/Loader';
import { truncate } from "../utils/util"

const Calculator = ({ navigation }) => {
    const route = useRoute();
    const [coin, setCoin] = useState(null);
    let [value, setValue] = useState("")
    let [isLoading, setIsLoading] = useState(true)
    let [isError, setIsError] = useState(false)
    let [conversionRate, setConversionRate] = useState(0)
    const [modalVisible, setModalVisible] = useState(false);
    const [invert, setInvert] = useState(false);
    const [userAsset, setUserAsset] = useState(null);
    const [modalTopic, setModalTopic] = useState('');
    const [modalText, setModalText] = useState("")
    const [userStatus, setUserStatus] = useState("")
    const [cryptoQuantity, setCryptoQuantity] = useState(0)

    const dispatch = useDispatch()

    let { user, background, importantText, normalText, fadeColor, blue, fadeButtonColor } = useSelector(state => state.userAuth)

    const {
        id,
        image,
        price,
        name,
        action

    } = route.params

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




    //check if the user has the asset 
    let invertPriceHandler = () => {
        setInvert(prev => !prev)
    }

    //deciding where to go depending on the action
    let navigateToCard = () => {
        setModalVisible(false)
        setUserStatus('')
        setModalTopic("")
        setModalText("")

        if (userStatus == 'pay') {
            setModalVisible(true)
            navigation.navigate('LinkToCard')
        }
        else if (userStatus == "id") {
            setModalVisible(false)
            navigation.navigate('VerifyId')
        }
        else if (userStatus == "unverified") {
            setModalVisible(false)
            setModalVisible(false)
            setModalTopic("")
            setModalText("")
        }
        else if (userStatus == 'insufficient') {
            //navigate user to topup
            setModalVisible(false)
            navigation.navigate('TopUp')
            return

        }
        else if (userStatus == 'insufficient_crypto') {
            //navigate user to topup
            setModalVisible(false)
            return

        }
        else if (userStatus == "error") {
            setModalVisible(false)
            return
        }
        else if (userStatus == "bought") {
            setModalVisible(false)
            //i should be able to navigate to my asset
            return navigation.navigate("Assets")
        }
        else if (userStatus == "sell") {
            //i should be able to navigate to my asset
            setModalVisible(false)
            return navigation.navigate("Assets")
        }
    }


    //button function
    let button = (num) => {
        setValue(prev => {
            if (prev.length > 10) {
                return prev
            }
            return prev + num
        })
    }

    //dot fun
    let point = () => {

        setValue(prev => {
            //check if it already contains decimal point 
            let pointExist = prev.includes(".")
            if (!pointExist) {
                let num = Number(prev)
                let decimalNum = num.toFixed(1)
                let numChar = decimalNum.toString()
                return numChar.slice(0, -1)

            }
            return prev


        })
    }

    //deleting algorithm
    let deleteHandler = () => {
        //get the value string and remove the last element
        setValue(prev => prev.slice(0, -1))
    }

    //executing action like buy,sell,send e.t.c
    let proceedHandler = async () => {
        if (action == 'buy') {
            if (!value || Number(value) == 0) {
                return
            }
            //if user has no payment method
            if (!user.isPayVerified) {
                setModalVisible(true)
                setUserStatus('pay')
                setModalTopic("You'll need to top up")
                setModalText("You need to activate your account by adding a payment method to use available funds and top up funds later")
                return
            }
            //if user has no identity
            if (!user.isFrontIdVerified || !user.isBackIdVerified) {
                setModalVisible(true)
                setUserStatus('id')
                setModalTopic("verify your identity")
                setModalText("please you need to verify your identity before you can start trading on crypto assets")
                return

            }
            //check for trading status

            if (!user.status) {
                setIsLoading(false)
                setModalVisible(true)
                setUserStatus('unverified')
                setModalTopic("Account unverified")
                setModalText("Account has not been verified.it will take a period of 24 hours.contact support if it exceeds!")
                return

            }

            if (invert) {
                if ((Number(value) * conversionRate) > Number(user.accountBalance)) {
                    setModalVisible(true)
                    setUserStatus('insufficient')
                    setModalTopic("You'll need to top up")
                    setModalText("Your available balance is not enough")
                    return
                }

            } else {
                if (Number(value) > Number(user.accountBalance)) {
                    setModalVisible(true)
                    setUserStatus('insufficient')
                    setModalTopic("You'll need to top up")
                    setModalText("Your available balance is not enough")
                    return
                }

            }
            


            //hence proceexd to buy
            let cryptoQuantity = (Number(value) / Number(conversionRate))
            //decrement here mean amount to remove from current balance
            let data = {
                decrement: Number(value),
                name,
                quantity: cryptoQuantity,

            }
            if (invert) {
                data.decrement = Number(value) * conversionRate
                data.quantity = Number(value)
            }
            setIsLoading(true)

            if (user.isRequiredPin) {
                setIsLoading(false)
                return navigation.navigate('Authorize',
                    {
                        data: data,
                        action: 'buy'
                    })
            }


            let res = await dispatch(buyCrypto(data))

            if (!res.bool) {
                setModalVisible(true)
                setUserStatus('error')
                setModalTopic("Try again later")
                setModalText("An error occured on the server")
                setIsLoading(false)

            }
            setModalVisible(true)
            setUserStatus('bought')
            setModalTopic("sucessful")
            setModalText("you have sucessfully purchase the asset")
            setIsLoading(false)


        } else if (action == 'sell') {

            if (!value || Number(value) == 0) {
                return
            }
            //if user has no payment method
            if (!user.isPayVerified) {
                setModalVisible(true)
                setUserStatus('pay')
                setModalTopic("You'll need to top up")
                setModalText("You need to activate your account by adding a payment method to use available funds and top up funds later")
                return
            }
            //if user has no identity
            if (!user.isFrontIdVerified || !user.isBackIdVerified) {
                setModalVisible(true)
                setUserStatus('id')
                setModalTopic("verify your identity")
                setModalText("please you need to verify your identity before you can start trading on crypto assets")
                return

            }
            //check for trading status

            if (!user.status) {
                setIsLoading(false)
                setModalVisible(true)
                setUserStatus('unverified')
                setModalTopic("Account unverified")
                setModalText("Account has not been verified.it will take a period of 24 hours.contact support if it exceeds!")
                return

            }
            if (!invert) {
                //i should not sell more than what i have

                if ((Number(value) / Number(conversionRate)) > Number(cryptoQuantity)) {
                    setModalVisible(true)
                    setUserStatus('insufficient_crypto')
                    setModalTopic("Insufficient asset !")
                    setModalText("Your available asset balance is not enough")
                    return
                }

            } else {
                //i should not sell more than what i have

                if ((Number(value)) > Number(cryptoQuantity)) {
                    setModalVisible(true)
                    setUserStatus('insufficient')
                    setModalTopic("You'll need to top up")
                    setModalText("Your available balance is not enough")
                    return
                }

            }




            //hence proceexd to sell
            let cryptoQuantityToSend = (Number(value) / Number(conversionRate))

            let data = {
                price: Number(value),
                name,
                quantity: cryptoQuantityToSend,

            }
            if (invert) {
                data.price = Number(value) * conversionRate
                data.quantity = Number(value)
            }
            setIsLoading(true)

            if (user.isRequiredPin) {
                setIsLoading(false)
                return navigation.navigate('Authorize',
                    {
                        data: data,
                        action: 'sell'
                    })
            }

            let res = await dispatch(sellCrypto(data))

            if (!res.bool) {
                setModalVisible(true)
                setUserStatus('error')
                setModalTopic("Try again later")
                setModalText("An error occured on the server")
                setIsLoading(false)

            }
            setModalVisible(true)
            setUserStatus('sell')
            setModalTopic("Successful sale")
            setModalText("you have successfully sold the asset.continue to view assets in this account")
            setIsLoading(false)


        } else if (action == "send") {
            if (!value) {
                return
            }
            //if user has no payment method
            if (!user.isPayVerified) {
                setModalVisible(true)
                setUserStatus('pay')
                setModalTopic("You'll need to top up")
                setModalText("You need to activate your account by adding a payment method before you can start sending asset")
                return
            }
            //if user has no identity
            if (!user.isFrontIdVerified || !user.isBackIdVerified) {
                setModalVisible(true)
                setUserStatus('id')
                setModalTopic("verify your identity")
                setModalText("please you need to verify your identity before you can start sending asset")
                return

            }
            //check for trading status

            if (!user.status) {
                setIsLoading(false)
                setModalVisible(true)
                setUserStatus('unverified')
                setModalTopic("Account unverified")
                setModalText("Account has not been verified.it will take a period of 24 hours.contact support if it exceeds!")
                return

            }
            //proceed to send
            if (invert) {
                //i should not send more than what i have

                if (Number(value) > Number(cryptoQuantity)) {
                    setModalVisible(true)
                    setUserStatus('insufficient')

                    setModalTopic("You'll need to top up")

                    setModalText("Your available asset balance is not enough")
                    return
                }

                return navigation.navigate("CryptoForm", {
                    price: Number(value) * conversionRate,
                    name: name,
                    quantity: Number(value)

                })



            }
            //i should not send more than what i have

            if ((Number(value) / conversionRate) > Number(cryptoQuantity)) {
                setModalVisible(true)
                setUserStatus('insufficient')

                setModalTopic("You'll need to top up")

                setModalText("Your available asset balance is not enough")
                return
            }

            let data = {
                price: Number(value),
                name: name,
                quantity: Number(value) / conversionRate

            }

            if (user.isRequiredPin) {
                setIsLoading(false)
                return navigation.navigate('Authorize',
                    {
                        data: data,
                        action: 'send'
                    })
            }


            return navigation.navigate("CryptoForm", data)





        }
    }
    //testing


    let changeVisibility = () => {
        setModalVisible(prev => !prev)
    }
    //useeffect compute if user has the coin
    useEffect(() => {
        let assets = user.personalAssets.filter(data => {
            if (data.id.toLowerCase() === name.toLowerCase()) {
                return data
            }
        })

        if (assets.length > 0) {
            setUserAsset(assets[0])
            let cryptoQuantity = assets[0].quantity
            console.log(cryptoQuantity)
            setCryptoQuantity(cryptoQuantity)
        }

        setConversionRate(price)
        setIsLoading(false)
    }, []);


    let dataUi = (data) => {
        if (data.length <= 8) {
            return <Text style={{ ...styles.dollarPrice, fontSize: 25 }}>${data}</Text>
        }
        return <Text style={{ ...styles.dollarPrice, fontSize: 18 }}>${data}</Text>
    }

    let inverteddataUi = (data) => {
        if (data.length <= 8) {
            return <Text style={{ ...styles.dollarPrice, fontSize: 20 }}>${data}</Text>
        }
        return <Text style={{ ...styles.dollarPrice, fontSize: 15 }}>${data}</Text>

    }
    let invertedCryptoPriceUi = (data) => {
        if (data.length <= 8) {
            return <Text style={{ ...styles.cryptoPrice, fontSize: 18,color:blue }}>{data} {id}</Text>
        }
        return <Text style={{ ...styles.cryptoPrice, fontSize: 15,color:blue  }}>{data} {truncate(id, 4)}</Text>

    }


    let cryptoPriceUi = (data) => {
        if (data.length <= 8) {
            return <Text style={{ ...styles.cryptoPrice, fontSize: 18,color:blue  }}>{data} {id}</Text>
        }
        return <Text style={{ ...styles.cryptoPrice, fontSize: 15,color:blue  }}>{data} {truncate(id, 4)}</Text>

    }



    if (isLoading) {
        return <Loader />
    }

    if (isError) {
        return <Error />
    }


    return (<>
        <CalculatorModal modalVisible={modalVisible} changeVisibility={changeVisibility} navigateToCard={navigateToCard} modalTopic={modalTopic} modalText={modalText} />

        <SafeAreaView style={{ backgroundColor: background, flex: 1 }}>
            <ScrollView contentContainerStyle={styles.scrollContainer} stickyHeaderIndices={[0]}>
                <View style={{ display: 'flex', width: '100%' }}>
                    <View style={{ ...styles.headerContainer, backgroundColor: background }}>
                        <Pressable onPress={() => navigation.goBack()} style={styles.headerContainerIcon} >
                            <AntDesign name="close" size={23} color={background === 'white' ? "black" : "white"} />
                        </Pressable>

                        {userAsset ?
                            <Pressable style={styles.headerContainerTitle} >
                                <Text style={{ ...styles.title, color: importantText }}>Enter amount</Text>
                                {userAsset ? <Text style={{ ...styles.balance, color: normalText }}> {Number(cryptoQuantity).toFixed(4)} of {truncate(id, 5)} available </Text> : <Text style={styles.balance}> 0 of {id} available </Text>}
                            </Pressable> : <Pressable style={styles.headerContainerTitle} >
                                <Text style={{ ...styles.title, color: importantText }}>Enter amount</Text>
                                <Text style={{ ...styles.balance, color: normalText }}>0 of {id} available </Text>
                            </Pressable>}

                    </View>
                </View>


                <View style={styles.priceContainer}>

                    <Pressable style={{...styles.maxButtonCon,backgroundColor:fadeColor}}>
                        <Text style={{...styles.maxText,color:importantText}}>Max</Text>
                    </Pressable>

                    <View style={styles.valueCon}>
                        {value == '' ? <View style={styles.moneyCon}>
                            {invert?<Text style={styles.money}> 0 qty</Text>:<Text style={styles.money}>$ 0</Text>}

                        </View> : <View style={styles.twoPriceColumn}>
                            {invert ? <View style={styles.dollarPriceCon}>
                                {invertedCryptoPriceUi(value)}
                                {inverteddataUi((conversionRate * Number(value)).toFixed(4))}

                            </View> : <View style={styles.dollarPriceCon}>
                                {dataUi(value)}
                                {cryptoPriceUi((Number(value) / conversionRate).toFixed(4))}
                            </View>}




                        </View>}

                    </View>

                    <Pressable style={{...styles.invertButtonCon,backgroundColor:fadeColor}} onPress={invertPriceHandler}>
                        <MaterialCommunityIcons name="swap-vertical" size={24} color={background === 'white' ? "black" : "white"} />
                    </Pressable>


                </View>

                <Card style={{...styles.card,backgroundColor:background,borderColor:background=='black'?fadeColor:""}}>
                    <View style={styles.cryptoCon}>
                        <View style={styles.cryptoLogo}>
                            <Image source={{ uri: image }}
                                style={styles.image} />

                        </View>
                        <View style={styles.cryptoNameCon}>
                            <Text style={{...styles.cryptoName,color:importantText}}>{truncate(name, 5)}</Text>

                        </View>

                    </View>
                    <View style={styles.cryptoWorth}>
                        <Text style={{...styles.cryptoWorthCash,color:importantText}}>$ 1.0</Text>
                        <Text style={{...styles.cryptoWorthText,color:importantText}}>{(1 / conversionRate).toFixed(3)} {truncate(id, 4)}</Text>

                    </View>
                </Card>



                <View style={styles.calculatorCon}>
                    <View style={styles.numberContainer}>
                        <Pressable style={{...styles.numberButton,color:importantText}} onPress={() => button('1')}>
                            <Text style={{...styles.number,color:importantText}}>1</Text>
                        </Pressable>

                        <Pressable style={{...styles.numberButton,color:importantText}} onPress={() => button('2')}>
                            <Text style={{...styles.number,color:importantText}}>2</Text>
                        </Pressable>

                        <Pressable style={{...styles.numberButton,color:importantText}} onPress={() => button('3')}>
                            <Text style={{...styles.number,color:importantText}}>3</Text>
                        </Pressable>

                    </View>
                    <View style={styles.numberContainer}>
                        <Pressable style={{...styles.numberButton,color:importantText}} onPress={() => button('4')}>
                            <Text style={{...styles.number,color:importantText}}>4</Text>
                        </Pressable>

                        <Pressable style={{...styles.numberButton,color:importantText}} onPress={() => button('5')}>
                            <Text style={{...styles.number,color:importantText}}>5</Text>
                        </Pressable>

                        <Pressable style={{...styles.numberButton,color:importantText}} onPress={() => button('6')}>
                            <Text style={{...styles.number,color:importantText}}>6</Text>
                        </Pressable>

                    </View>
                    <View style={styles.numberContainer}>
                        <Pressable style={{...styles.numberButton,color:importantText}} onPress={() => button('7')}>
                            <Text style={{...styles.number,color:importantText}}>7</Text>
                        </Pressable>

                        <Pressable style={{...styles.numberButton,color:importantText}} onPress={() => button('8')}>
                            <Text style={{...styles.number,color:importantText}}>8</Text>
                        </Pressable>

                        <Pressable style={{...styles.numberButton,color:importantText}} onPress={() => button('9')}>
                            <Text style={{...styles.number,color:importantText}}>9</Text>
                        </Pressable>

                    </View>

                    <View style={styles.numberContainer}>
                        <Pressable style={{...styles.numberButton,color:importantText}} onPress={() => point(".")}>
                            <Text style={{...styles.number,color:importantText}}>.</Text>
                        </Pressable>

                        <Pressable style={{...styles.numberButton,color:importantText}} onPress={() => button('0')}>
                            <Text style={{...styles.number,color:importantText}}>0</Text>
                        </Pressable>

                        <Pressable style={{...styles.numberButton,color:importantText}} onPress={() => deleteHandler()}>
                            <Feather name="arrow-left" size={30} color={background === 'white' ? "black" : "white"} />
                        </Pressable>

                    </View>

                </View>

                <View style={styles.buttonCon}>
                    <Pressable style={{ ...styles.button }} onPress={proceedHandler}>
                        <Text style={styles.buttonText}>Continue</Text>

                    </Pressable>

                </View>



            </ScrollView>

        </SafeAreaView>
    </>)
};

const styles = StyleSheet.create({

    scrollContainer: {
        width: Dimensions.get('window').width,
        paddingHorizontal: 15,
    },
    headerOuterCon: {
        flex: 1,
    },
    headerContainer: {
        paddingTop: 15,
        display: "flex",
        flexDirection: "row",
        marginBottom: 45,
        alignItems: 'center',
    },
    headerContainerIcon: {
        width: '10%',
        display: "flex",
        flexDirection: "row",
        alignItems: 'center',
        justifyContent: 'flex-start'

    },
    headerContainerTitle: {
        width: '90%',
        display: "flex",
        flexDirection: "column",
        alignItems: 'flex-start',
    },

    title: {
        fontSize: 17,
        fontFamily: 'Poppins',
        alignSelf: 'center'
    },
    balance: {
        fontSize: 18,
        fontFamily: 'ABeeZee',
        alignSelf: 'center'
    },
    priceContainer: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 65,
        width: '100%'
    },
    valueCon: {
        alignSelf: 'center',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'

    },
    twoPriceColumn: {
        display:'flex',
        justifyContent: 'center',
        alignItems: 'center'

    },
    dollarPriceCon: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    dollarPrice: {
        fontFamily: 'ABeeZee',
        color: '#1652f0'

    },
    cryptoPrice: {
        fontFamily: 'ABeeZee'

    },
    moneyCon: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',


    },
    money: {
        fontSize: 40,
        color: '#1652f0',
        fontFamily: 'Poppins'

    },
    maxButtonCon: {
        width: 50,
        height: 50,
        borderRadius: 50,
        backgroundColor: 'rgb(240,240,240)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'

    },
    maxText: {
        fontSize: 16,
        fontFamily: 'Poppins',

    },
    invertButtonCon: {
        width: 50,
        height: 50,
        borderRadius: 50,
        backgroundColor: 'rgb(240,240,240)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'

    },
    card: {
        height: 80,
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        marginBottom: 35,
        borderWidth:.5
    },
    cryptoCon: {
        flex: 1,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    cryptoWorth: {
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-end',
        paddingRight: 15,
        justifyContent: 'center'
    },
    cryptoWorthCash: {
        fontSize: 17,
        fontFamily: 'ABeeZee'

    },
    cryptoWorthText: {
        fontSize: 17,
        fontFamily: 'ABeeZee'

    },
    image: {
        width: 30,
        height: 30

    },
    cryptoNameCon: {
        marginLeft: 10

    },
    cryptoName: {
        fontSize: 17,
        fontFamily: 'Poppins'
    },
    calculatorCon: {
        width: '100%',
    },
    numberContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around'
    },
    numberButton: {
        width: 60,
        height: 60,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',

    },
    number: {
        fontSize: 30,
        fontFamily: 'ABeeZee'
    },


    buttonCon: {
        width: '100%',
        height: 100,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    },
    button: {
        width: '100%',
        backgroundColor: '#1652f0',
        paddingVertical: 18,
        borderRadius: 30,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    },
    buttonText: {
        fontSize: 20,
        fontFamily: "ABeeZee",
        color: '#fff',

    }
})

export default Calculator;