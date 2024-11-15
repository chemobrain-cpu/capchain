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

import { Feather, FontAwesome, AntDesign } from '@expo/vector-icons';
import { useDispatch, useSelector } from "react-redux"
import { useRoute } from "@react-navigation/native";
import { convertCrypto, buyCrypto, sellCrypto, withdrawalToMyAccount } from "../store/action/appStorage";
import Loader from '../loaders/Loader';
import AuthModal from '../modals/authModal';
//importing pdf module
import * as Print from 'expo-print'
import * as MediaLibrary from "expo-media-library"
import * as Sharing from "expo-sharing"

const Authorize = ({ navigation }) => {
    const route = useRoute();
    let [value, setValue] = useState("")
    let [isLoading, setIsLoading] = useState(true)
    const [isAuthError, setIsAuthError] = useState(false)
    const [authInfo, setAuthInfo] = useState("")
    const [url, setUrl] = useState("")

    let { user, background, importantText } = useSelector(state => state.userAuth)

    const dispatch = useDispatch()

    useEffect(() => {
        setTimeout(() => {
            setIsLoading(false)
        }, 2000)
    },[])

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


    let dataUi = (data) => {
        data = data.toString()

        //convert string to an array
        let arr = []
        for (let m of data) {
            arr.push(m)
        }

        return <View style={styles.dollarPriceInnerCon}>
            <Text style={{ ...styles.dollarPrice, fontSize: 25 }}>{arr[0] ? <FontAwesome name="asterisk" size={27} color={background === 'white' ? "black" : "white"} /> : <Feather name="circle" size={27} color={background === 'white' ? "black" : "white"} />}</Text>

            <Text style={{ ...styles.dollarPrice, fontSize: 25 }}>{arr[1] ? <FontAwesome name="asterisk" size={27} color={background === 'white' ? "black" : "white"} /> : <Feather name="circle" size={27} color={background === 'white' ? "black" : "white"} />}</Text>

            <Text style={{ ...styles.dollarPrice, fontSize: 25 }}>{arr[2] ? <FontAwesome name="asterisk" size={27} color={background === 'white' ? "black" : "white"} /> : <Feather name="circle" size={27} color={background === 'white' ? "black" : "white"} />}</Text>

            <Text style={{ ...styles.dollarPrice, fontSize: 25 }}>{arr[3] ? <FontAwesome name="asterisk" size={27} color={background === 'white' ? "black" : "white"} /> : <Feather name="circle" size={27} color={background === 'white' ? "black" : "white"} />}</Text>

        </View>
    }

    //button function
    let button = (num) => {
        setValue(prev => {
            if (prev.length > 3) {
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



    let proceedHandler = async () => {
        setIsLoading(true)
        if (route.params.action == "convert") {
            //checking if pin is correct
            if (value !== user.pin) {
                setIsAuthError(true)
                setAuthInfo('Incorrect pin !')
                setIsLoading(false)
                setUrl("authorize")
                return
            }
            //if pin is correct,proceed
            let res = await dispatch(convertCrypto(route.params.data))
            if (!res.bool) {

                setIsAuthError(true)
                setAuthInfo('An error occured on the server!')
                setIsLoading(false)
                setUrl("error")
                return

            }

            setIsAuthError(true)
            setAuthInfo(`conversion successful has been made`)
            setIsLoading(false)
            setUrl('converted')
            return

        } else if (route.params.action == "buy") {
            //checking if pin is correct
            if (value !== user.pin) {
                setIsAuthError(true)
                setAuthInfo('Incorrect pin !')
                setIsLoading(false)
                setUrl("authorize")
                return
            }

            let res = await dispatch(buyCrypto(route.params.data))
            if (!res.bool) {
                setIsAuthError(true)
                setAuthInfo("An error occured on the server")
                setIsLoading(false)
                setUrl("error")
                return

            }



            setIsAuthError(true)
            setAuthInfo("you have sucessfully purchase the asset")
            setIsLoading(false)
            setUrl("bought")
            return

        } else if (route.params.action == "sell") {
            //checking if pin is correct
            if (value !== user.pin) {
                setIsAuthError(true)
                setAuthInfo('Incorrect pin !')
                setIsLoading(false)
                setUrl("authorize")
                return
            }
            let res = await dispatch(sellCrypto(route.params.data))
            if (!res.bool) {

                setIsAuthError(true)
                setAuthInfo('An error occured on the server')
                setIsLoading(false)
                setUrl("error")
                return

            }


            setIsAuthError(true)
            setAuthInfo('you have successfully sold the asset.continue to view assets in this account')
            setIsLoading(false)
            setUrl("sell")
            return


        } else if (route.params.action == "send") {
            if (value !== user.pin) {
                setIsAuthError(true)
                setAuthInfo('Incorrect pin !')
                setIsLoading(false)
                setUrl("authorize")
                return
            }
            return navigation.navigate("CryptoForm", route.params.data)
        } else if (route.params.action == "SendToBank") {
            if (value !== user.pin) {
                setIsAuthError(true)
                setAuthInfo('Incorrect pin !')
                setIsLoading(false)
                setUrl("authorize")
                return
            }
            setIsLoading(false)
            return navigation.navigate("SendToBank", route.params.data)
        } else if (route.params.action == "SendToWallet") {
            if (value !== user.pin) {
                setIsAuthError(true)
                setAuthInfo('Incorrect pin !')
                setIsLoading(false)
                setUrl("authorize")
                return
            }
            setIsLoading(false)
            return navigation.navigate("CryptoForm", route.params.data)
        } else if (route.params.action == "SendCashToMyBank") {
            setIsLoading(true)
            if (value !== user.pin) {
                setIsAuthError(true)
                setAuthInfo('Incorrect pin !')
                setIsLoading(false)
                setUrl("authorize")
                return
            }
            
            //proceed to withdraw passing alongside the data
            let res = await dispatch(withdrawalToMyAccount(route.params.data))
            if (!res.bool) {
                setIsAuthError(true)
                setAuthInfo(res.message)
                //set url to navigate to tax screen
                setUrl(res.url)
                setIsLoading(false)
                return
            }

            setIsAuthError(true)
            setAuthInfo('Transaction successful.Check your email and document for transaction receipt')
            setUrl("Asset")
            setIsLoading(false)
           
            return

        } else if (route.params.action == "SendCashToOtherBank") {
            if (value !== user.pin) {
                setIsAuthError(true)
                setAuthInfo('Incorrect pin !')
                setIsLoading(false)
                setUrl("authorize")
                return
            }
            setIsLoading(false)
            //navigate to send cash to bank
            return navigation.navigate("SendCashToBank", route.params.data)


        }
    }


    let changeVisibility = () => {
        if (url == 'authorize') {
            setIsAuthError(prev => !prev)
        }
        else if (url == "error") {
            setIsAuthError(prev => !prev)
        }
        else if (url == 'converted') {
            //navigate user to topup
            setIsAuthError(prev => !prev)
            return navigation.navigate("SellList")
        }
        else if (url == "bought") {
            setIsAuthError(prev => !prev)
            return navigation.navigate("Assets")
        }
        else if (url == "sell") {
            setIsAuthError(prev => !prev)
            //i should be able to navigate to my asset
            return navigation.navigate("Assets")
        }
        else if (url == 'Tax') {
            setIsAuthError(prev => !prev)
            //i should be able to navigate to my asset
            return navigation.navigate('Tax')
        }
        else if (url == 'Tnt') {
            setIsAuthError(prev => !prev)
            //i should be able to navigate to my asset
            return navigation.navigate('Tnt')
        }
        else if (url == 'Ust') {
            setIsAuthError(prev => !prev)
            //i should be able to navigate to my asset
            return navigation.navigate('Ust')
        }
        else if (url == 'Ktc') {
            setIsAuthError(prev => !prev)
            //i should be able to navigate to my asset
            return navigation.navigate('Ktc')
        }
        else if (url == "Asset") {
            setIsAuthError(prev => !prev)
            //i should be able to navigate to my asset
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
             <h1 style=";font-size:3.5rem;margin-bottom:30px"> capchain RECIEPT </h1>
 
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
 
                     <tr style='height:80px;border-bottom:1px;border-bottom-color:rgb(240,240,240);margin-botttom:50px'>
                         <td style='font-size:1.5rem'>
                         Date Of Transaction
 
                         </td>
                         <td style='font-size:1.5rem'>
                         ${date}
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
                
             })
            
        }
        


    }



    if (isLoading) {
        return <Loader />
    }



    return (<>
        {/* modal for proceeding*/}
        {isAuthError && <AuthModal modalVisible={isAuthError} updateVisibility={changeVisibility} message={authInfo} />}

        <SafeAreaView style={{ flex: 1, backgroundColor: background }}>
            <ScrollView contentContainerStyle={styles.scrollContainer} stickyHeaderIndices={[0]}>
                <View style={{ display: 'flex', width: '100%' }}>
                    <View style={styles.headerContainer}>
                        <Pressable onPress={() => navigation.goBack()} style={styles.headerContainerIcon} >
                            <AntDesign name="close" size={23} color={background === 'white' ? "black" : "white"} />
                        </Pressable>



                        <Pressable style={{ ...styles.headerContainerTitle }} >
                            <Text style={{ ...styles.title, color: importantText }}>Enter pin to confirm</Text>
                        </Pressable>

                    </View>
                </View>



                <View style={styles.priceContainer}>


                    <View style={styles.dollarPriceCon}>

                        {dataUi((value))}

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
                            <Feather name="arrow-left" size={25} color={background === 'white' ? "black" : "white"} />
                        </Pressable>

                    </View>

                </View>

                <View style={styles.buttonCon}>
                    <Pressable style={{ ...styles.button }} onPress={proceedHandler}>
                        <Text style={styles.buttonText}>Confirm</Text>

                    </Pressable>

                </View>



            </ScrollView>

        </SafeAreaView>
    </>);
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
    },

    scrollContainer: {
        width: Dimensions.get('window').width,
        paddingHorizontal: 15

    },
    headerContainer: {
        paddingTop: 15,
        display: "flex",
        flexDirection: "row",
        marginBottom: 45,
        alignItems: 'center',
        justifyContent: 'center'
    },
    headerContainerIcon: {
        width: '20%',
        display: "flex",
        flexDirection: "row",
        justifyContent: 'flex-start'

    },
    headerContainerTitle: {
        width: '80%',
        display: "flex",
        flexDirection: "row",
        justifyContent: 'flex-start'

    },
    title: {
        fontSize: 22,
        fontFamily: 'ABeeZee',
        textAlign: 'center'

    },
    balance: {
        fontSize: 17,
        fontFamily: 'ABeeZee',
        paddingLeft: 8,
        color: 'rgb(100,100,100)'
    },


    /*  styling the price section*/
    priceContainer: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 45,
        marginBottom: 90,
        width: '100%',
        justifyContent: 'center'
    },


    dollarPriceCon: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '75%',
        alignSelf: 'center'
    },
    dollarPriceInnerCon: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%'

    },
    dollarPrice: {
        fontFamily: 'ABeeZee',
        color: '#1652f0',
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
        fontSize: 35,
        fontFamily: 'ABeeZee'
    },


    buttonCon: {
        width: '100%',
        height: 100,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',

    },
    button: {
        width: '95%',
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

export default Authorize;