import React, { useState, useEffect } from 'react'
import {
    View,
    Text,
    SafeAreaView,
    ScrollView,
    Pressable,
    StyleSheet,
    Dimensions,
    TextInput,
    ActivityIndicator,
    KeyboardAvoidingView,
} from 'react-native'

import { Feather } from '@expo/vector-icons';
import { validateText } from "../utils/util";
import AuthModal from '../modals/authModal'
import { useDispatch, useSelector } from "react-redux";
import { sendCryptoToWallet } from "../store/action/appStorage";
import { useRoute } from "@react-navigation/native";
//importing pdf module
import { truncate } from "../utils/util"
import * as Print from 'expo-print'
import * as MediaLibrary from "expo-media-library"
import * as Sharing from "expo-sharing"


const CryptoForm = ({ navigation }) => {
    let { user, background, importantText, normalText, fadeColor, blue, fadeButtonColor } = useSelector(state => state.userAuth)

    const [walletAddress, setWalletAddress] = useState('')
    const [walletAddressError, setWalletAddressError] = useState('')
    const dispatch = useDispatch()
    const [isLoading, setIsLoading] = useState(false)
    const [isAuthError, setIsAuthError] = useState(false)
    const [authInfo, setAuthInfo] = useState("")
    const [url, setUrl] = useState("")
    const route = useRoute();


    const {
        price,
        name,
        quantity,
        image,
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


    const updateAuthError = () => {
        setIsAuthError(prev => !prev)
        if (!url) {
            //print pdf invoice reciept if no error on server call
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
            <body>
            <h1 style=";font-size:2.5rem;margin-bottom:30px"> capchain DEBIT RECIEPT </h1>

            <div style='width:100%;overflow:scroll'>
                        <table style='width:100%'>
                            <tr style='height:80px;border-bottom:1px;border-bottom-color:rgb(240,240,240);margin-botttom:50px'>
                                <td style='font-size:1.5rem'>
                                Transaction Type
                                </td>
                                
                                <td style='font-size:1.5rem'>
                                Debit
                                </td>
                            
                            </tr>

                            <tr style='height:80px;border-bottom:1px;border-bottom-color:rgb(240,240,240);margin-botttom:50px'>
                                <td style='font-size:1.5rem'>
                                Currency Type
                                </td>
                                <td style='font-size:1.5rem'>
                                Crypto
                                </td>
                            
                            </tr>

                            <tr style='height:80px;border-bottom:1px;border-bottom-color:rgb(240,240,240);margin-botttom:50px'>
                                    <td style='font-size:1.5rem'>
                                    Name Of Currency
                                    </td>
                                    <td style='font-size:1.5rem'>
                                    ${name}
                                    </td>
                        
                            </tr>


                            <tr style='height:80px;border-bottom:1px;border-bottom-color:rgb(240,240,240);margin-botttom:50px'>
                                <td style='font-size:1.5rem'>
                                Quantity Of Asset

                                </td>
                                <td style='font-size:1.5rem'>
                                 ${quantity.toFixed(4)}
                                </td>
                            
                            </tr>

                            <tr style='height:80px;border-bottom:1px;border-bottom-color:rgb(240,240,240);margin-botttom:50px'>
                                <td style='font-size:1.5rem'>
                                Amount Equivalent

                                </td>
                                <td style='font-size:1.5rem'>
                                $ ${price}
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
                        <tr style='height:80px;border-bottom:1px;border-bottom-color:rgb(240,240,240);margin-botttom:50px;width:100%'>
                            <td style='font-size:1.5rem'>
                            Wallet Address
                            </td>
                            <td style='font-size:1.5rem'>
                            ${truncate(walletAddress, 10)}
                            </td>
                        
                        </tr>
                        <tr style='height:80px;border-bottom:1px;border-bottom-color:rgb(240,240,240);margin-botttom:50px'>
                        <td style='font-size:1.5rem'>
                        status
                        </td>

                        <td>
                        <button style="width:100px;height:50px;background-color:green;color:white">
                        sent
                        </button>
                        </td>
                    
                    </tr>
                    
                    

                    </table>
                </div>
            

            
            </body>

            </html>`

            createPdf(pdfContent).then(() => {

            })
            return

        }
        //navigate due to error url
        return navigation.navigate(url)
    }

    let submitHandler = async () => {
        // check for validity of the crypto
        if (walletAddressError) {
            return
        }
        setIsLoading(true)

        let res = await dispatch(sendCryptoToWallet({
            walletAddress: walletAddress,
            assetData: {
                price,
                name,
                quantity,
                image
            }

        }))

        if (!res.bool) {
            setIsAuthError(true)
            setAuthInfo(res.message)
            setIsLoading(false)
            setUrl(res.url)
            return
        }

        setIsAuthError(true)
        setAuthInfo("Transaction successful .check your email and document for transaction receipt")
        setIsLoading(false)




    }

    let changeAddressOne = (e) => {
        setWalletAddress(e)
        let error = validateText(e)
        if (error) {
            return setWalletAddressError(error)
        }
        return setWalletAddressError('')

    }

    const scrollHandler = (e) => {
        if (e.nativeEvent.contentOffset.y > 5) {
            setHeader(true)
        } else {
            setHeader(false)
        }
    }







    return (<>
        {isAuthError && <AuthModal modalVisible={isAuthError} updateVisibility={updateAuthError} message={authInfo} />}

        <SafeAreaView style={{ flex: 1, backgroundColor: background }}>
            <ScrollView showsVerticalScrollIndicator={false} style={styles.scrollviewContainer} onScroll={scrollHandler} stickyHeaderIndices={[0]}>
                <View style={{ ...styles.navigationHeader, backgroundColor: background }}>
                    <Pressable onPress={() => navigation.goBack()} style={{ ...styles.goback }} >
                        <Feather name="arrow-left" size={24} color={background === 'white' ? "black" : "white"} />
                    </Pressable>

                    <Text style={{ ...styles.titleText, color: importantText }}>You're about sending {quantity.toFixed(5)} {name} worthing ${price.toFixed(5)}</Text>

                </View>

                <KeyboardAvoidingView style={styles.formCon}>
                    <TextInput style={{ ...styles.input, color: importantText, borderColor: background === 'black' ? fadeColor : 'rgb(210,210,210)', }}
                        onChangeText={changeAddressOne}
                        placeholder="Enter crypto address"
                        placeholderTextColor={normalText}
                    />


                </KeyboardAvoidingView>


                <View style={styles.footer}>
                    <View style={styles.footerTopSection}>


                        <Pressable style={styles.buttonCon} onPress={submitHandler}>
                            {isLoading ? <ActivityIndicator color='#fff' size='small' /> : <Text style={styles.button}>Send</Text>}
                        </Pressable>
                    </View>



                </View>
            </ScrollView>

        </SafeAreaView>
    </>

    )
}

const styles = StyleSheet.create({
    scrollviewContainer: {
        flex: 1,
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
        paddingHorizontal: 21,


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

    title: {
        width: '100%',
        marginBottom: 40,
        paddingHorizontal: 21,
    },
    titleText: {
        fontSize: 18,
        fontFamily: 'Poppins',
        textAlign: 'center'


    },
    formCon: {
        marginBottom: 100,
        paddingHorizontal: 21,

    },
    label: {
        marginBottom: 10,
        fontWeight: '100',
        color: 'rgb(100,100,100)',
        fontFamily: 'Poppins',

    },
    input: {
        width: '80%',
        borderWidth: .5,
        borderColor: 'rgb(200,200,200)',
        height: 60,
        borderRadius: 10,
        paddingHorizontal: 15,
        fontSize: 18,
        marginRight: 'auto',
        marginLeft: 'auto'

    },
    errorText: {
        color: 'red',
        marginVertical: 1,

    },
    NumberinputContainer: {
        width: '100%',
        borderColor: 'rgb(100,100,100)',
        borderWidth: .5,
        height: 70,
        borderRadius: 3,
        paddingLeft: 30,
        fontSize: 18,
        color: 'black',
        display: 'flex',
        flexDirection: 'column'


    },
    numberinput: {
        alignSelf: 'stretch',
        width: '70%',
        fontSize: 15,

    },
    innerInputContainer: {
        width: '45%'
    },
    footer: {
        height: 220
    },
    footerTopSection: {
        paddingHorizontal: 21,

    },
    statement: {
        fontSize: 15,
        fontFamily: 'ABeeZee',
        marginBottom: 30

    },
    statementCard: {
        fontSize: 15,
        fontFamily: 'ABeeZee',
        color: '#1652f0'

    },
    buttonCon: {
        width: '100%',
        paddingVertical: 17,
        borderRadius: 30,
        backgroundColor: '#1652f0',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 10
    },
    button: {
        fontSize: 16,
        fontFamily: 'Poppins',
        color: '#fff'
    },
    footerBottomSection: {
        height: 85,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderTopColor: 'rgb(100,100,100)',
        borderTopWidth: .5,
        backgroundColor: 'rgb(245,245,245)'
    },
    footerTextCon: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center'
    },
    footerText: {
        marginLeft: 5
    },
    coinbaseText: {
        color: '#1652f0'
    }




})

export default CryptoForm