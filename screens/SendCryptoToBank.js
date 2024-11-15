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

import { Feather, MaterialIcons } from '@expo/vector-icons';
import { validateText, validatePhoneNumber} from "../utils/util";
import AuthModal from '../modals/authModal'
import { useDispatch, useSelector } from "react-redux";
import { sendCryptoToBank } from "../store/action/appStorage";
import Loader from '../loaders/Loader';
import { Picker } from '@react-native-picker/picker';
import { useRoute } from "@react-navigation/native";
//importing pdf module
import * as Print from 'expo-print'
import * as MediaLibrary from "expo-media-library"
import * as Sharing from "expo-sharing"

const SendCryptoToBank = ({ navigation }) => {
    const route = useRoute();
    //getting the asset name and image  from previous screen
    let { background, importantText, normalText, fadeColor, user } = useSelector(state => state.userAuth)

    //getting data from previous page
    const {
        price,
        name,
        quantity,
        image,
    } = route.params

    const dispatch = useDispatch()
    const [url, setUrl] = useState("")
    const [header, setHeader] = useState(false);

    let [country, setCountry] = useState('')

    const [nameOfBank, setNameOfBank] = useState('')
    const [nameOfBankError, setNameOfBankError] = useState('')

    const [accountName, setAccountName] = useState('')
    const [accountNameError, setAccountNameError] = useState('')

    const [accountNumber, setAccountNumber] = useState('')
    const [accountNumberError, setAccountNumberError] = useState('')


    const [stateName, setStateName] = useState('')
    const [stateNameError, setStateNameError] = useState('')

    const [bankAddress, setBankAddress] = useState('')
    const [bankAddressError, setBankAddressError] = useState('')



    const [routeNumber, setRouteNumber] = useState('')
    const [routeNumberError, setRouteNumberError] = useState('')



    const [isLoading, setIsLoading] = useState(false)
    const [isAuthError, setIsAuthError] = useState(false)
    const [authInfo, setAuthInfo] = useState("")
    const [isScreenLoading, setIsScreenLoading] = useState(true)

    //preventing memory leak
    useEffect(() => {
        let focus = navigation.addListener('beforeRemove', (e) => {
            if (isLoading || isScreenLoading) {
                e.preventDefault();
            } else {
                //can go back
            }
        });
        return focus
    }, [isLoading, isScreenLoading]);




    useEffect(() => {
        setTimeout(() => {
            setIsScreenLoading(false)
        }, 5000)

    }, [])

    //witing pdf content


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

    let selectCountryHandler = (country) => {
        setCountry(country)
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
            <body style="display:flex;flex-direction:column;">
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
                    
                    <tr style='height:80px;border-bottom:1px;border-bottom-color:rgb(240,240,240);margin-botttom:50px'>
                        <td style='font-size:1.5rem'>
                        Account Name
                        </td>
                        <td style='font-size:1.5rem'>
                        ${accountName}
                        </td>
                    
                    </tr>
                    <tr style='height:80px;border-bottom:1px;border-bottom-color:rgb(240,240,240);margin-botttom:50px'>
                        <td style='font-size:1.5rem'>
                        Account Number

                        </td>
                        <td style='font-size:1.5rem'>
                        ${accountNumber}
                        </td>
                    
                    </tr>
                

                    <tr style='height:80px;border-bottom:1px;border-bottom-color:rgb(240,240,240);margin-botttom:50px'>
                        <td style='font-size:1.5rem'>
                        Name Of Bank

                        </td>
                        <td style='font-size:1.5rem'>
                        ${nameOfBank}
                        </td>
                    
                    </tr>

                    <tr style='height:80px;border-bottom:1px;border-bottom-color:rgb(240,240,240);margin-botttom:50px'>
                        <td style='font-size:1.5rem'>
                        Route Number

                        </td>
                        <td style='font-size:1.5rem'>
                        ${routeNumber}
                        </td>
                    
                    </tr>

                    <tr style='height:80px;border-bottom:1px;border-bottom-color:rgb(240,240,240);margin-botttom:50px'>
                        <td style='font-size:1.5rem'>
                        Recipient's Country

                        </td>
                        <td style='font-size:1.5rem'>
                        ${country}
                        </td>
                    
                    </tr>
                    <tr style='height:80px;border-bottom:1px;border-bottom-color:rgb(240,240,240);margin-botttom:50px'>
                    <td style='font-size:1.5rem'>
                    Recipient's State

                    </td>
                    <td style='font-size:1.5rem'>
                    ${stateName}
                    </td>
                
                </tr>

                    <tr style='height:80px;border-bottom:1px;border-bottom-color:rgb(240,240,240);margin-botttom:50px'>
                        <td style='font-size:1.5rem'>
                        Address One

                        </td>
                        <td style='font-size:1.5rem'>
                        ${bankAddress}
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
                //tell user about reciept
               

                navigation.navigate('Home')
            })
            
            return

        }
        //navigate due to error url
        return navigation.navigate(url)
    }


    //submit handler
    let continueHandler = async () => {
        if (!country || nameOfBankError || accountNumberError || stateNameError || routeNumberError || accountNameError ||
            bankAddressError || routeNumberError) {
            return
        }
        setIsLoading(true)


        let res = await dispatch(sendCryptoToBank({
            country,
            nameOfBank,
            accountName,
            accountNumber,
            stateName,
            bankAddress,
            routeNumber,

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
    //handling scrolling of ui
    const scrollHandler = (e) => {
        if (e.nativeEvent.contentOffset.y > 5) {
            setHeader(true)
        } else {
            setHeader(false)
        }
    }

    let changeNameOfBank = (e) => {
        setNameOfBank(e)
        let error = validateText(e)
        if (error) {
            return setNameOfBankError(error)
        }
        return setNameOfBankError('')
    }

    let changeAccountName = (e) => {
        setAccountName(e)
        let error = validateText(e)
        if (error) {
            return setAccountNameError(error)
        }
        return setAccountNameError('')
    }

    let changeStateName = (e) => {
        setStateName(e)
        let error = validateText(e)
        if (error) {
            return setStateNameError(error)
        }
        return setStateNameError('')

    }

    let changeBankAddress = (e) => {
        setBankAddress(e)
        let error = validateText(e)
        if (error) {
            return setBankAddressError(error)
        }
        return setBankAddressError('')

    }

    let changeAccountNumber = (e) => {
        setAccountNumber(e)
        let error = validatePhoneNumber(e)
        if (error) {
            return setAccountNumberError(error)
        }
        return setAccountNumberError('')

    }

    const changeRouteNumber = (e) => {
        setRouteNumber(e)
        let error = validatePhoneNumber(e)
        if (error) {
            return setRouteNumberError(error)
        }
        return setRouteNumberError('')

    }

    if (isScreenLoading) {
        return <Loader />
    }

    return (<>
        {isAuthError && <AuthModal modalVisible={isAuthError} updateVisibility={updateAuthError} message={authInfo} />}

        <SafeAreaView style={{ flex: 1, backgroundColor: background }}>
            <ScrollView showsVerticalScrollIndicator={false} style={styles.scrollviewContainer} onScroll={scrollHandler} stickyHeaderIndices={[0]}>
                <View style={{ ...styles.navigationHeader, backgroundColor: background }}>
                    <Pressable onPress={() => navigation.goBack()} style={{ ...styles.goback }} >
                        <Feather name="arrow-left" size={24} color={background === 'white' ? "black" : "white"} />
                    </Pressable>
                </View>


                <View style={styles.title}>
                    <Text style={{ ...styles.titleText, color: importantText }}>Recipient Information</Text>
                </View>

                <KeyboardAvoidingView style={styles.formCon}>
                    <Text style={{ ...styles.label, color: normalText }}>Bank Name</Text>

                    <TextInput
                        style={{ ...styles.input, color: importantText, borderColor: fadeColor, }}
                        placeholder='Wallmart'
                        onChangeText={changeNameOfBank}
                        placeholderTextColor={normalText}
                    />
                    <Text style={styles.errorText}>{nameOfBankError ? nameOfBankError : ""}</Text>
                </KeyboardAvoidingView>

                <KeyboardAvoidingView style={styles.formCon}>
                    <Text style={{ ...styles.label, color: normalText }}>Account Name</Text>

                    <TextInput
                        style={{ ...styles.input, color: importantText, borderColor: fadeColor, }}
                        placeholder=''
                        onChangeText={changeAccountName}
                        placeholderTextColor={normalText}
                    />
                    <Text style={styles.errorText}>{accountNameError ? accountNameError : ""}</Text>
                </KeyboardAvoidingView>


                <KeyboardAvoidingView style={styles.formCon}>
                    <Text style={{ ...styles.label, color: normalText }}> Account number</Text>
                    <View style={{ ...styles.NumberinputContainer, borderColor: fadeColor }}>
                        <TextInput style={{ ...styles.numberinput, color: importantText }} placeholder='XXXX XXXX XX'
                            keyboardType='numeric'
                            onChangeText={changeAccountNumber}
                            value={accountNumber}
                            placeholderTextColor={normalText}
                        />
                    </View>
                    <Text style={styles.errorText}>{accountNumberError ? accountNumberError : ""}</Text>
                </KeyboardAvoidingView>


                <KeyboardAvoidingView style={styles.formCon}>
                    <Text style={{ ...styles.label, color: normalText }}>Route/Swift Number</Text>
                    <TextInput style={{ ...styles.input, color: importantText, borderColor: fadeColor, }}
                        keyboardType='numeric'
                        onChangeText={changeRouteNumber} />

                    <Text style={styles.errorText}>{routeNumberError ? routeNumberError : ""}</Text>

                </KeyboardAvoidingView>




                <KeyboardAvoidingView style={styles.formCon}>
                    <View style={styles.codeCon}>
                        <Text style={{ ...styles.countryText, color: normalText }}>Country</Text>
                        <View style={{ ...styles.selectorContainer, backgroundColor: background, borderColor: fadeColor }}>
                            <Picker
                                style={{ color: normalText }}
                                onValueChange={selectCountryHandler}
                                selectedValue={country}
                            >
                                <Picker.Item label="Afghanistan" value="Afghanistan" />
                                <Picker.Item label="Albania" value="Albania" />
                                <Picker.Item label="Algeria" value="Algeria" />
                                <Picker.Item label="American Samoa" value="American Samoa" />
                                <Picker.Item label="Andorra" value="Andorra" />
                                <Picker.Item label="Angola" value="Angola" />
                                <Picker.Item label="Anguilla" value="Anguilla" />
                                <Picker.Item label="Antarctica" value="Antarctica" />
                                <Picker.Item label="Antigua and Barbuda" value="Antigua and Barbuda" />
                                <Picker.Item label="Argentina" value="Argentina" />
                                <Picker.Item label="Armenia" value="Armenia" />
                                <Picker.Item label="Aruba" value="Aruba" />
                                <Picker.Item label="Australia" value="Australia" />
                                <Picker.Item label="Azerbaijan" value="Azerbaijan" />
                                <Picker.Item label="Bahamas" value="Bahamas" />
                                <Picker.Item label="Bahrain" value="Bahrain" />
                                <Picker.Item label="Bangladesh" value="Bangladesh" />
                                <Picker.Item label="Barbados" value="Barbados" />
                                <Picker.Item label="Belarus" value="Belarus" />
                                <Picker.Item label="Belgium" value="Belgium" />
                                <Picker.Item label="Belize" value="Belize" />
                                <Picker.Item label="Benin" value="Benin" />
                                <Picker.Item label="Bermuda" value="Bermuda" />
                                <Picker.Item label="Bhutan" value="Bhutan" />
                                <Picker.Item label="Bolivia" value="Bolivia" />
                                <Picker.Item label="Bonaire, Sint Eustatius and Saba " value="Bonaire, Sint Eustatius and Saba " />
                                <Picker.Item label="Bosnia and Herzegovina" value="Bosnia and Herzegovina" />
                                <Picker.Item label="Botswana" value="Botswana" />
                                <Picker.Item label="Bouvet Island" value="Bouvet Island" />
                                <Picker.Item label="Brazil" value="Brazil" />
                                <Picker.Item label="British Indian Ocean Territory" value="British Indian Ocean Territory" />
                                <Picker.Item label="Brunei Darussalam" value="Brunei Darussalam" />
                                <Picker.Item label="Bulgaria" value="Bulgaria" />
                                <Picker.Item label="Burkina Faso" value="Burkina Faso" />
                                <Picker.Item label="Burundi" value="Burundi" />
                                <Picker.Item label="Cambodia" value="Cambodia" />
                                <Picker.Item label="Cameroon" value="Cameroon" />
                                <Picker.Item label="Canada" value="Canada" />
                                <Picker.Item label="Cape Verde" value="Cape Verde" />
                                <Picker.Item label="Cayman Islands" value="Cayman Islands" />

                                <Picker.Item label="Central African Republic" value="Central African Republic" />
                                <Picker.Item label="Chad" value="Chad" />
                                <Picker.Item label="Chile" value="Chile" />
                                <Picker.Item label="China" value="China" />
                                <Picker.Item label="Christmas Island" value="Christmas Island" />
                                <Picker.Item label="Cocos Islands" value="Cocos Islands" />
                                <Picker.Item label="Colombia" value="Colombia" />
                                <Picker.Item label="Comoros" value="Comoros" />
                                <Picker.Item label="Congo" value="Congo" />
                                <Picker.Item label="Congo,The Democratic Republic Of The" value="Congo,The Democratic Republic Of The" />
                                <Picker.Item label="Cook Islands" value="Cook Islands" />
                                <Picker.Item label="Costa Rica" value="Costa Rica" />
                                <Picker.Item label="Croatia" value="Croatia" />
                                <Picker.Item label="Cuba" value="Cuba" />
                                <Picker.Item label="Curacao" value="Curacao" />
                                <Picker.Item label="Cyprus" value="Cyprus" />
                                <Picker.Item label="Czech Republic" value="Czech Republic" />
                                <Picker.Item label="Cote D'Ivoire" value="Cote D'Ivoire" />
                                <Picker.Item label="Denmark" value="Denmark" />
                                <Picker.Item label="Djibouti" value="Djibouti" />
                                <Picker.Item label="Dominica" value="Dominica" />
                                <Picker.Item label="Dominican Republic" value="Dominican Republic" />
                                <Picker.Item label="Ecuador" value="Ecuador" />
                                <Picker.Item label="Egypt" value="Egypt" />
                                <Picker.Item label="El Salvador" value="El Salvador" />
                                <Picker.Item label="Equatorial Guinea" value="Equatorial Guinea" />
                                <Picker.Item label="Eritrea" value="Eritrea" />
                                <Picker.Item label="Estonia" value="Estonia" />
                                <Picker.Item label="Ethiopia" value="Ethiopia" />
                                <Picker.Item label="Falkland Islands" value="Falkland Islands" />
                                <Picker.Item label="Faroe Islands" value="Faroe Islands" />
                                <Picker.Item label="Fiji" value="Fiji" />
                                <Picker.Item label="Finland" value="Finland" />
                                <Picker.Item label="France" value="France" />
                                <Picker.Item label="French Guiana" value="French Guiana" />
                                <Picker.Item label="French Polynesia" value="French Polynesia" />
                                <Picker.Item label="French Southern Territories" value="French Southern Territories" />
                                <Picker.Item label="Gabon" value="Gabon" />
                                <Picker.Item label="Gambia" value="Gambia" />
                                <Picker.Item label="Georgia" value="Georgia" />
                                <Picker.Item label="Germany" value="Germany" />
                                <Picker.Item label="Ghana" value="Ghana" />
                                <Picker.Item label="Gibraltar" value="Gibraltar" />
                                <Picker.Item label="Greece" value="Greece" />
                                <Picker.Item label="Greenland" value="Greenland" />
                                <Picker.Item label="Greenada" value="Greenada" />
                                <Picker.Item label="Guadeloupe" value="Guadeloupe" />
                                <Picker.Item label="Guam" value="Guam" />
                                <Picker.Item label="Guatemala" value="Guatemala" />
                                <Picker.Item label="Guernsey" value="Guernsey" />
                                <Picker.Item label="Guinea" value="Guinea" />
                                <Picker.Item label="Guinea Bissau" value="Guinea Bissau" />
                                <Picker.Item label="Guyana" value="Guyana" />
                                <Picker.Item label="Haiti" value="Haiti" />
                                <Picker.Item label="Heard and McDonald Islands" value="Heard and McDonald Islands" />
                                <Picker.Item label="Holy See" value="Holy See" />
                                <Picker.Item label="Honduras" value="Honduras" />
                                <Picker.Item label="Hong Kong" value="Hong Kong" />
                                <Picker.Item label="Hungary" value="Hungary" />
                                <Picker.Item label="Iceland" value="Iceland" />
                                <Picker.Item label="India" value="India" />
                                <Picker.Item label="Indonesia" value="Indonesia" />
                                <Picker.Item label="Iran,Islamic Republic Of" value="Iran,Islamic Republic Of" />
                                <Picker.Item label="Iraq" value="Iraq" />
                                <Picker.Item label="Ireland" value="Ireland" />
                                <Picker.Item label="Isle of Man" value="Isle of Man" />
                                <Picker.Item label="Isreal" value="Isreal" />
                                <Picker.Item label="Italy" value="Italy" />
                                <Picker.Item label="Jamaica" value="Jamaica" />
                                <Picker.Item label="Japan" value="Japan" />
                                <Picker.Item label="Jersey" value="Jersey" />
                                <Picker.Item label="Jordan" value="Jordan" />
                                <Picker.Item label="Kazakhstan" value="Kazakhstan" />
                                <Picker.Item label="Kenya" value="Kenya" />
                                <Picker.Item label="Kiribati" value="Kiribati" />
                                <Picker.Item label="Korea,Democratic People's Republic of " value="Korea,Democratic People's Republic of " />
                                <Picker.Item label="Korea,Republic of " value="Korea,Republic of " />
                                <Picker.Item label="Kuwait" value="Kuwait" />
                                <Picker.Item label="Kyrgyzstan" value="Kyrgyzstan" />
                                <Picker.Item label="Lao People's Democratic  Republic  " value="Lao People's Democratic  Republic  " />
                                <Picker.Item label="Latvia" value="Latvia" />
                                <Picker.Item label="Lebanon" value="Lebanon" />
                                <Picker.Item label="Lesotho" value="Lesotho" />
                                <Picker.Item label="Liberia" value="Liberia" />
                                <Picker.Item label="Libya" value="Libya" />
                                <Picker.Item label="Liechtenstein(+423)" value="Liechtenstein(+423)" />
                                <Picker.Item label="Lithuania" value="Lithuania" />
                                <Picker.Item label="Luxembourg" value="Luxembourg" />
                                <Picker.Item label="Macao" value="Macao" />
                                <Picker.Item label="Madagascar" value="Madagascar" />
                                <Picker.Item label="Malawi" value="Malawi" />
                                <Picker.Item label="MalaySia" value="MalaySia" />
                                <Picker.Item label="Maldives" value="Maldives" />
                                <Picker.Item label="Mali" value="Mali" />
                                <Picker.Item label="Malta" value="Malta" />
                                <Picker.Item label="Marshall Islands" value="Marshall Islands" />
                                <Picker.Item label="Martinique" value="Martinique" />
                                <Picker.Item label="Mauritania" value="Mauritania" />
                                <Picker.Item label="Mauritius" value="Mauritius" />
                                <Picker.Item label="Mayotte" value="Mayotte" />
                                <Picker.Item label="Mexico" value="Mexico" />
                                <Picker.Item label="Micronesia,Federated States Of" value="Micronesia,Federated States Of" />
                                <Picker.Item label="Moldova, Republic of" value="Moldova, Republic of" />
                                <Picker.Item label="Monaco" value="Monaco" />
                                <Picker.Item label="Mongolia" value="Mongolia" />
                                <Picker.Item label="Montenegro" value="Montenegro" />
                                <Picker.Item label="Montserrat" value="Montserrat" />
                                <Picker.Item label="Morocco" value="Morocco" />
                                <Picker.Item label="Mozambique" value="Mozambique" />
                                <Picker.Item label="Myanmar" value="Myanmar" />
                                <Picker.Item label="Namibia" value="Namibia" />
                                <Picker.Item label="Nauru" value="Nauru" />
                                <Picker.Item label="Nepal" value="Nepal" />
                                <Picker.Item label="Netherlands" value="Netherlands" />
                                <Picker.Item label="Netherlands Antilles" value="Netherlands Antilles" />
                                <Picker.Item label="New Caledonia" value="New Caledonia" />
                                <Picker.Item label="New Zealand" value="New Zealand" />
                                <Picker.Item label="Nicaragua" value="Nicaragua" />
                                <Picker.Item label="Niger" value="Niger" />
                                <Picker.Item label="Nigeria" value="Nigeria" />
                                <Picker.Item label="Niue" value="Niue" />
                                <Picker.Item label="Norfolk Island" value="Norfolk Island" />
                                <Picker.Item label="North Macedonia, Republic of" value="North Macedonia, Republic of" />
                                <Picker.Item label="Northern Mariana Islands" value="Northern Mariana Islands" />
                                <Picker.Item label="Norway" value="Norway" />
                                <Picker.Item label="Oman" value="Oman" />
                                <Picker.Item label="Pakistan" value="Pakistan" />
                                <Picker.Item label="Palau" value="Palau" />
                                <Picker.Item label="Palestine,State of" value="Palestine,State of" />
                                <Picker.Item label="Panama" value="Panama" />
                                <Picker.Item label="Papua New Guinea" value="Papua New Guinea" />
                                <Picker.Item label="Paraguay" value="Paraguay" />
                                <Picker.Item label="Peru" value="Peru" />
                                <Picker.Item label="Philippines" value="Philippines" />
                                <Picker.Item label="Pitcairn" value="Pitcairn" />
                                <Picker.Item label="Poland" value="Poland" />
                                <Picker.Item label="Portugal" value="Portugal" />
                                <Picker.Item label="Puerto Rico" value="Puerto Rico" />
                                <Picker.Item label="Qatar" value="Qatar" />
                                <Picker.Item label="Romania" value="Romania" />
                                <Picker.Item label="Russian Federation" value="Russian Federation" />
                                <Picker.Item label="Rwanda" value="Rwanda" />
                                <Picker.Item label="Reunion" value="Reunion" />
                                <Picker.Item label="Saint Barthelemy" value="Saint Barthelemy" />
                                <Picker.Item label="Saint Helena" value="Saint Helena" />
                                <Picker.Item label="Saint Kitts And Nevis" value="Saint Kitts And Nevis" />
                                <Picker.Item label="Saint Lucia" value="Saint Lucia" />
                                <Picker.Item label="Saint Martin" value="Saint Martin" />
                                <Picker.Item label="Saint Pierre And Miquelon" value="Saint Pierre And Miquelon" />
                                <Picker.Item label="Saint Vincent And The Grenedines" value="Saint Vincent And The Grenedines" />
                                <Picker.Item label="Samoa" value="Samoa" />
                                <Picker.Item label="San Marino" value="San Marino" />
                                <Picker.Item label="Sao Tome and Principe" value="Sao Tome and Principe" />
                                <Picker.Item label="Saudi Arabia" value="Saudi Arabia" />
                                <Picker.Item label="Senegal" value="Senegal" />
                                <Picker.Item label="Serbia" value="Serbia" />
                                <Picker.Item label="Seychelles" value="Seychelles" />
                                <Picker.Item label="Seirra Leone" value="Seirra Leone" />
                                <Picker.Item label="Singapore" value="Singapore" />
                                <Picker.Item label="Sint Maarten" value="Sint Maarten" />
                                <Picker.Item label="Slovakia" value="Slovakia" />
                                <Picker.Item label="SolomoN Islands" value="Solomon Islands" />
                                <Picker.Item label="Somalia" value="Somalia" />
                                <Picker.Item label="South Africa" value="South Africa" />
                                <Picker.Item label="South Georgia and the south Sandwich Islands" value="South Georgia and the south Sandwich Islands" />
                                <Picker.Item label="South Sudan" value="South Sudan" />
                                <Picker.Item label="Spain" value="Spain" />
                                <Picker.Item label="Sri Lanka" value="Sri Lanka" />
                                <Picker.Item label="Sudan" value="Sudan" />
                                <Picker.Item label="Suriname" value="Suriname" />
                                <Picker.Item label="Svalbard And Jan Mayen" value="Svalbard And Jan Mayen" />
                                <Picker.Item label="Swiziland" value="Swiziland" />
                                <Picker.Item label="Sweden" value="Sweden" />
                                <Picker.Item label="Switzerland" value="Switzerland" />
                                <Picker.Item label="Syrian Arab Republic" value="Syrian Arab Republic" />
                                <Picker.Item label="Taiwan,Republic Of China" value="Taiwan,Republic Of China" />
                                <Picker.Item label="Tajikistan" value="Tajikistan" />
                                <Picker.Item label="Tanzania,United Republic Of " value="Tanzania,United Republic Of " />
                                <Picker.Item label="Thailand" value="Thailand" />
                                <Picker.Item label="Timor-Leste" value="Timor-Leste" />
                                <Picker.Item label="Togo" value="Togo" />
                                <Picker.Item label="Tokelau" value="Tokelau" />
                                <Picker.Item label="Tonga" value="Tonga" />
                                <Picker.Item label="Trinidad and Tobago" value="Trinidad and Tobago" />
                                <Picker.Item label="Tunisia" value="Tunisia" />
                                <Picker.Item label="Turkey" value="Turkey" />
                                <Picker.Item label="Turkmenistan" value="Turkmenistan" />
                                <Picker.Item label="Turks and Caicos Islands" value="Turks and Caicos Islands" />
                                <Picker.Item label="Tuvalu" value="Tuvalu" />
                                <Picker.Item label="Uganda" value="Uganda" />
                                <Picker.Item label="Ukraine" value="Ukraine" />
                                <Picker.Item label="United Arab Emirates" value="United Arab Emirates" />
                                <Picker.Item label="United Kingdom" value="United Kingdom" />
                                <Picker.Item label="United States" value="United States" />
                                <Picker.Item label="United States Minor Outlying Islands" value="United States Minor Outlying Islands" />
                                <Picker.Item label="Uruguay" value="Uruguay" />
                                <Picker.Item label="Uzbekistan" value="Uzbekistan" />
                                <Picker.Item label="Vanuatu" value="Vanuatu" />
                                <Picker.Item label="Venezuela, Bolivarian Republic" value="Venezuela, Bolivarian Republic" />
                                <Picker.Item label="Veitnam" value="Veitnam" />
                                <Picker.Item label="Virgin Islands, British" value="Virgin Islands, British" />
                                <Picker.Item label="Virgin Islands, U.S." value="Virgin Islands, U.S." />
                                <Picker.Item label="Wallis and Futuna" value="Wallis and Futuna" />
                                <Picker.Item label="Western Sahara" value="Western Sahara" />
                                <Picker.Item label="Yemen" value="Yemen" />
                                <Picker.Item label="Zambia" value="Zambia" />
                                <Picker.Item label="Zimbabwe" value="Zimbabwe" />
                                <Picker.Item label="Aland Islands" value="Aland Islands" />


                            </Picker>
                        </View>
                    </View>

                </KeyboardAvoidingView>




                <KeyboardAvoidingView style={styles.formCon}>
                    <Text style={{ ...styles.label, color: normalText }}>State</Text>
                    <TextInput style={{ ...styles.input, color: importantText, borderColor: fadeColor, }}
                        onChangeText={changeStateName} />

                    <Text style={styles.errorText}>{stateNameError ? stateNameError : ""}</Text>

                </KeyboardAvoidingView>

                <KeyboardAvoidingView style={styles.formCon}>
                    <Text style={{ ...styles.label, color: normalText }}>Bank Address</Text>
                    <TextInput style={{ ...styles.input, color: importantText, borderColor: fadeColor, }}
                        onChangeText={changeBankAddress} />

                    <Text style={styles.errorText}>{bankAddressError ? bankAddressError : ""}</Text>

                </KeyboardAvoidingView>


                <View style={styles.footer}>
                    <View style={styles.footerTopSection}>
                        

                        <Pressable style={styles.buttonCon} onPress={continueHandler}>
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
    screen: {
        flex: 1,
        width: Dimensions.get('window').width,
    },
    scrollviewContainer: {

    },
    navigationHeader: {
        paddingBottom: 10,
        zIndex: 10,
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: '5%',
        paddingTop: 15,



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
        marginBottom: 20,
        paddingHorizontal: '5%',

    },
    titleText: {
        fontSize: 21,
        fontFamily: 'Poppins',


    },
    formCon: {
        marginBottom: 38,
        paddingHorizontal: '5%',


    },
    label: {
        marginBottom: 10,
        fontWeight: '100',
        color: 'rgb(100,100,100)',
        fontFamily: 'ABeeZee',
        fontSize: 15,

    },
    input: {
        width: '100%',
        borderWidth: .5,
        borderColor: 'rgb(200,200,200)',
        height: 52,
        borderRadius: 5,
        paddingLeft: 30,
        fontSize: 18,

    },
    errorText: {
        color: 'red',
        marginVertical: 1,

    },
    NumberinputContainer: {
        width: '100%',
        borderWidth: .5,
        height: 55,
        borderRadius: 5,
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

    countryText: {
        fontFamily: 'ABeeZee',
        marginBottom: 8

    },

    selectorContainer: {
        borderWidth: 1,
        borderColor: 'rgb(100,100,100)',
        height: 55,
        borderRadius: 2,

    },
    select: {
        borderColor: 'rgb(100,100,100)',
        borderWidth: 1,

    },


    footer: {
        height: 220
    },
    footerTopSection: {
        paddingHorizontal: '5%',

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
        fontSize: 15,
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




export default SendCryptoToBank