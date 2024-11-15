import React, { useState, useEffect } from 'react'
import {
    View,
    Text,
    StyleSheet,
    Pressable,
    SafeAreaView,
    ScrollView,
    Dimensions,
    Platform,
} from "react-native";

import { Feather, AntDesign } from '@expo/vector-icons';
import { useDispatch, useSelector } from "react-redux";
import Error from "../component/errorComponent";
import { useRoute } from "@react-navigation/native";
import { withdrawalToOtherAccount, withdrawalToMyAccount } from "../store/action/appStorage";
import Loader from '../loaders/Loader';
import AuthModal from '../modals/authModal';
import SendModal from "../modals/sendOptionModal";
//importing pdf module
import * as Print from 'expo-print'
import * as MediaLibrary from "expo-media-library"
import * as Sharing from "expo-sharing"


const Withdraw = ({ navigation }) => {
    const route = useRoute();
    let [value, setValue] = useState("")
    let [isLoading, setIsLoading] = useState(false)
    let [isError, setIsError] = useState(false)
    const [userStatus, setUserStatus] = useState("")
    const [isAuthError, setIsAuthError] = useState(false)
    const [authInfo, setAuthInfo] = useState("")
    const [modalVisible, setModalVisible] = useState("")
    const [sendModalVisible, setSendModalVisible] = useState("")

    const [url, setUrl] = useState("")

    let { user, background, importantText, normalText, fadeColor, blue, fadeButtonColor } = useSelector(state => state.userAuth)



    const dispatch = useDispatch()

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

    let dollarPriceUi = (data) => {
        if (data.length <= 8) {
            return <Text style={{ ...styles.dollarPrice, fontSize: 30 }}>${data}</Text>

        }
        return <Text style={{ ...styles.dollarPrice, fontSize: 25 }}>${data}</Text>



    }

    const createPdf = async (html) => {
        try {
            const { uri } = await Print.printToFileAsync({ html });
            if (Platform.OS === 'ios') {
                await Sharing.shareAsync(uri)

            } else {
                const permission = await MediaLibrary.requestPermissionsAsync();
                if (permission.granted) {
                    await MediaLibrary.createAssetAsync(uri)
                }

            }

        } catch (err) {
            console.log(err)

        }
    }

    //deciding where to go depending on the action

    /*
        let modalHandler = () => {
            setModalVisible(prev => !prev)
        }*/

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

    let proceedHandler = async () => {
        //check if user has that amount
        setSendModalVisible(prev => !prev)
        if (Number(user.accountBalance) < Number(value)) {
            setIsAuthError(true)
            setAuthInfo('insufficient fund')
            setIsLoading(false)
            setUrl('WithdrawFund')
            return
        }

        //if pin enabled,go to authorization screen
        if (user.isRequiredPin) {
            return navigation.navigate('Authorize',
                {
                    data: { amount: Number(value) },
                    action: "SendCashToMyBank"
                })
        }
        setIsLoading(true)

        let res = await dispatch(withdrawalToMyAccount({ amount: Number(value) }))

        if (!res.bool) {
            setIsAuthError(true)
            setAuthInfo(res.message)
            setIsLoading(false)
            setUrl(res.url)
            return
        }
        setIsAuthError(true)
        setIsAuthError(true)
        setAuthInfo("Transaction successful .check your email and document for transaction receipt")
        //generate pdf reciept
        let date = new Date().toLocaleDateString()
        const pdfContent = `<!DOCTYPE html>
            <html lang='en'>
            <head>
            <meta charset="UTF-8">
            <meta name="viewport"
            content="width=device-width,initial-scale=1.0"
            >
            <title>Reciept </title>
            
            </head>
            <body style="display:flex;flex-direction:column;">
            <h1 style=";font-size:3.5rem;margin-bottom:30px"> capchain DEBIT RECIEPT </h1>

            <div style='width:100%;overflow:scroll'>
                <table style='width:100%'>
                    
                    
                    <tr style='height:80px;border-bottom:1px;border-bottom-color:rgb(240,240,240);margin-botttom:50px'>
                        <td style='font-size:1.5rem'>
                        Transaction Type
                        </td>
                        <td style='font-size:1.5rem'>
                        Cash withdrawal
                        </td>
                    
                    </tr>
                    <tr style='height:80px;border-bottom:1px;border-bottom-color:rgb(240,240,240);margin-botttom:50px'>
                        <td style='font-size:1.5rem'>
                        Withdrawal Amount

                        </td>
                        <td style='font-size:1.5rem'>
                        $ ${Number(value)}
                        </td>
                    
                    </tr>
                    
                    
                </table>
                </div>

                <h1 style="font-size:2.5rem;margin-bottom:30px">  RECIPIENT INFORMATION </h1>

                <div style='width:100%;overflow:scroll'>

                <table style='width:100%'>

           
                    
                
       
                    <tr style='height:80px;border-bottom:1px;border-bottom-color:rgb(240,240,240);margin-botttom:50px'>
                        <td style='font-size:1.5rem'>
                        Account Name
                        </td>
                        <td style='font-size:1.5rem'>
                        ${user.nameOnCard}
                        </td>
                    
                    </tr>
                    <tr style='height:80px;border-bottom:1px;border-bottom-color:rgb(240,240,240);margin-botttom:50px'>
                        <td style='font-size:1.5rem'>
                        Account Number

                        </td>
                        <td style='font-size:1.5rem'>
                        ${user.accountNumber}
                        </td>
                    
                    </tr>

                    <tr style='height:80px;border-bottom:1px;border-bottom-color:rgb(240,240,240);margin-botttom:50px'>
                <td style='font-size:1.5rem'>
                Name Of Bank

                </td>
                <td style='font-size:1.5rem'>
                ${user.NameOfBank}
                </td>
            
                </tr>
                

                    
                    

                    <tr style='height:80px;border-bottom:1px;border-bottom-color:rgb(240,240,240);margin-botttom:50px'>
                        <td style='font-size:1.5rem'>
                        Recipient's Country

                        </td>
                        <td style='font-size:1.5rem'>
                        ${user.country}
                        </td>
                    
                    </tr>
                   

                    <tr style='height:80px;border-bottom:1px;border-bottom-color:rgb(240,240,240);margin-botttom:50px'>
                        <td style='font-size:1.5rem'>
                        Bank Address

                        </td>
                        <td style='font-size:1.5rem'>
                        ${user.AddressOne}
                        </td>
                    
                    </tr>
                    <tr style='height:80px;border-bottom:1px;border-bottom-color:rgb(240,240,240);margin-botttom:50px'>
                        <td style='font-size:1.5rem'>
                        status
                        </td>

                        <td>
                        <button style="width:100px;height:50px;background-color:green;color:white">
                        withdawn
                        </button>
                        </td>
                    
                    </tr>

                </table>
                </div>
            
            
            

            
            </body>

            </html>`


        createPdf(pdfContent).then(() => {
            setIsLoading(false)
            
        }).catch(()=>{
            setIsLoading(false)
        })
        

    }


    let changeVisibility = () => {
        setIsAuthError(prev => !prev)
        if (url) {
            navigation.navigate(url)

        }
        return
    }

    let changeSendModalVisibility = () => {
        if(!value){
            return
        }
        setSendModalVisible(prev => !prev)

    }


    let otherAccountHandler = (coin) => {
        setSendModalVisible(prev => !prev)
        if (Number(user.accountBalance) < Number(value)) {
            setIsAuthError(true)
            setAuthInfo('insufficient fund')
            setIsLoading(false)
            setUrl('WithdrawFund')
            return
        }
        //if pin enabled,go to authorization screen
        if (user.isRequiredPin) {
            return navigation.navigate('Authorize',
                {
                    data: { amount: Number(value) },
                    action: "SendCashToOtherBank"
                })
        }
        
        return navigation.navigate('SendCashToBank', {
            amount: Number(value)
        })

    }

    let modalHandler = (coin) => {
        setSendModalVisible(true)
        return

    }


    if (isLoading) {
        return <Loader />
    }

    if (isError) {
        return <Error />
    }


    return (<>
        {/* modal for proceeding*/}
        {isAuthError && <AuthModal modalVisible={isAuthError} updateVisibility={changeVisibility} message={authInfo} />}

        <SendModal
            modalVisible={sendModalVisible}
            changeVisibility={changeSendModalVisibility} navigationHandler_1={proceedHandler}
            navigationHandler_2={otherAccountHandler}
            asset={`$ ${value}`}
            option_1="Personal account"
            option_2="Other account"
        />

        <SafeAreaView style={{ flex: 1, backgroundColor: background }}>
            <ScrollView contentContainerStyle={styles.scrollContainer} stickyHeaderIndices={[0]}>
                <View style={{ display: 'flex', width: '100%' }}>
                    <View style={{ ...styles.headerContainer, backgroundColor: background }}>

                        <Pressable onPress={() => navigation.goBack()} style={styles.headerContainerIcon} >
                            <AntDesign name="close" size={23} color={background === 'white' ? "black" : "white"} />
                        </Pressable>

                        <Pressable style={styles.headerContainerTitle} >
                            <Text style={{ ...styles.title, color: importantText }}>${Number(user.accountBalance).toFixed(2)} available !</Text>

                        </Pressable>





                    </View>
                </View>



                <View style={styles.priceContainer}>
                    <View style={styles.valueCon}>
                        {value == '' ? <View style={styles.moneyCon}>
                            <Text style={styles.money}>$ 0</Text>

                        </View> : <View style={styles.twoPriceColumn}>

                            <View style={styles.dollarPriceCon}>

                                {dollarPriceUi(Number(value))}

                            </View>




                        </View>}

                    </View>
                </View>



                <View style={styles.calculatorCon}>
                    <View style={styles.numberContainer}>
                        <Pressable style={styles.numberButton} onPress={() => button('1')}>
                            <Text style={{ ...styles.number, color: importantText }}>1</Text>
                        </Pressable>

                        <Pressable style={styles.numberButton} onPress={() => button('2')}>
                            <Text style={{ ...styles.number, color: importantText }}>2</Text>
                        </Pressable>

                        <Pressable style={styles.numberButton} onPress={() => button('3')}>
                            <Text style={{ ...styles.number, color: importantText }}>3</Text>
                        </Pressable>

                    </View>
                    <View style={styles.numberContainer}>
                        <Pressable style={styles.numberButton} onPress={() => button('4')}>
                            <Text style={{ ...styles.number, color: importantText }}>4</Text>
                        </Pressable>

                        <Pressable style={styles.numberButton} onPress={() => button('5')}>
                            <Text style={{ ...styles.number, color: importantText }}>5</Text>
                        </Pressable>

                        <Pressable style={styles.numberButton} onPress={() => button('6')}>
                            <Text style={{ ...styles.number, color: importantText }}>6</Text>
                        </Pressable>

                    </View>
                    <View style={styles.numberContainer}>
                        <Pressable style={styles.numberButton} onPress={() => button('7')}>
                            <Text style={{ ...styles.number, color: importantText }}>7</Text>
                        </Pressable>

                        <Pressable style={styles.numberButton} onPress={() => button('8')}>
                            <Text style={{ ...styles.number, color: importantText }}>8</Text>
                        </Pressable>

                        <Pressable style={styles.numberButton} onPress={() => button('9')}>
                            <Text style={{ ...styles.number, color: importantText }}>9</Text>
                        </Pressable>

                    </View>

                    <View style={styles.numberContainer}>
                        <Pressable style={styles.numberButton} onPress={() => point(".")}>
                            <Text style={{ ...styles.number, color: importantText }}>.</Text>
                        </Pressable>

                        <Pressable style={styles.numberButton} onPress={() => button('0')}>
                            <Text style={{ ...styles.number, color: importantText }}>0</Text>
                        </Pressable>

                        <Pressable style={styles.numberButton} onPress={() => deleteHandler()}>
                            <Feather name="arrow-left" size={22} color={background === 'white' ? "black" : "white"} />
                        </Pressable>

                    </View>

                </View>

                <View style={styles.buttonCon}>
                    <Pressable style={{ ...styles.button }} onPress={modalHandler}>
                        <Text style={styles.buttonText}>Withdraw fund</Text>

                    </Pressable>

                </View>



            </ScrollView>

        </SafeAreaView>
    </>);
};

const styles = StyleSheet.create({

    scrollContainer: {
        width: Dimensions.get('window').width,
        paddingHorizontal: 15,
    },
    headerContainer: {
        paddingTop: 15,
        display: "flex",
        flexDirection: "row",
        alignItems: 'center',
        marginBottom: 45,
        width: '100%'
    },
    headerContainerTitle: {
        width: '90%',
        display: "flex",
        flexDirection: "row",
        alignItems: 'flex-start',

    },
    headerContainerIcon: {
        width: '10%',
        display: "flex",
        flexDirection: "row",
        alignItems: 'flex-start',

    },



    title: {
        fontSize: 20,
        fontFamily: 'Poppins',

        textAlign: 'center'
    },
    /*
    balance: {
        fontSize: 17,
        fontFamily: 'ABeeZee',
        paddingLeft: 8,
        color: 'rgb(100,100,100)'
    },*/
    priceContainer: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 45,
        marginBottom: 80,
        width: '100%'
    },
    valueCon: {
        alignSelf: 'center',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'

    },
    twoPriceColumn: {
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
        color: '#1652f0',

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
        marginBottom: 35
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
        height: 250
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
        fontSize: 28,
        fontFamily: 'Poppins'
    },


    buttonCon: {
        width: '100%',
        height: 100,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    },
    button: {
        width: '95%',
        backgroundColor: '#1652f0',
        paddingVertical: 20,
        borderRadius: 30,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    },
    buttonText: {
        fontSize: 17,
        fontFamily: "ABeeZee",
        color: '#fff',

    }
})

export default Withdraw;