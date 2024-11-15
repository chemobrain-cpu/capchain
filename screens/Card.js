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
    KeyboardAvoidingView
} from 'react-native'

import { Feather, MaterialIcons } from '@expo/vector-icons';
import { validateText, validatePhoneNumber,addTrailingSpaces } from "../utils/util";
import AuthModal from '../modals/authModal'
import { useDispatch, useSelector } from "react-redux";
import { addPaymentMethod } from "../store/action/appStorage";
import Loader from '../loaders/Loader';


const Card = ({ navigation }) => {
    let { user,background,importantText,normalText,fadeColor,blue,fadeButtonColor } = useSelector(state => state.userAuth)
    const dispatch = useDispatch()
    const [header, setHeader] = useState(false);
    const [modalVisible, setModalVisible] = useState(false)

    const [nameOnCard, setNameOnCard] = useState('')
    const [nameOnCardError, setNameOnCardError] = useState('')

    const [cardNumber, setCardNumber] = useState('')
    const [cardNumberError, setCardNumberError] = useState('')

    const [cardExpiration, setCardExpiration] = useState('')
    const [cardExpirationError, setCardExpirationError] = useState('')

    const [cardCvc, setCardCvc] = useState('')
    const [cardCvcError, setCardCvcError] = useState('')

    const [postalCode, setPostalCode] = useState('')
    const [postalCodeError, setPostalCodeError] = useState('')


    const [bankName, setBankName] = useState('')
    const [bankNameError, setBankNameError] = useState('')

    const [bankAccount, setBankAccount] = useState('')
    const [bankAccountError, setBankAccountError] = useState('')


    const [bankAddress, setBankAddress] = useState('')
    const [bankAddressError, setBankAddressError] = useState('')

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


    const updateAuthError = () => {
        setIsAuthError(prev => !prev)
    }

    let addCardHandler = async () => {
        setIsLoading(true)
      
        let res = await dispatch(addPaymentMethod({
            bankAddress,
            bankAccount,
            bankName,
            postalCode,
            cardCvc,
            cardExpiration,
            cardNumber,
            nameOnCard,
            user
        }))

        if (!res.bool) {
            setIsAuthError(true)
            setAuthInfo(res.message)
            setIsLoading(false)
            return
        }
        setIsAuthError(true)
        setAuthInfo('Payment method was sucessfully added')
        setIsLoading(false)
        //go to verification page passing the email as a parameter
        setTimeout(() => {
            setIsAuthError(false)
            setAuthInfo('')
            setIsLoading(false)
            navigation.navigate('Home')
        }, 3000)


    }

    const scrollHandler = (e) => {
        if (e.nativeEvent.contentOffset.y > 5) {
            setHeader(true)
        } else {
            setHeader(false)
        }
    }

    let changeNameOnCard = (e) => {
        setNameOnCard(e)
        let error = validateText(e)
        if (error) {
            return setNameOnCardError(error)
        }
        return setNameOnCardError('')
    }

    

    let changeCardNumber = (e) => {
        //add trailing spaces
        let formattedCardNumber = e
        if(formattedCardNumber.length == 4){
            formattedCardNumber = formattedCardNumber + " "

        }else if(formattedCardNumber.length == 9){
            formattedCardNumber = formattedCardNumber + " "
        }
        else if(formattedCardNumber.length == 14){
            formattedCardNumber = formattedCardNumber + " "
        }
        
        setCardNumber(formattedCardNumber)
        let error = validatePhoneNumber(e)
        if (error) {
            return setCardNumberError(error)
        }
        return setCardNumberError('')

    }
    
    //onblur for card number formatting
    let onBlurCardNumber = ()=>{
        let formattedCardNumber = cardNumber
        if(!formattedCardNumber.includes(' ')){
            formattedCardNumber = addTrailingSpaces(formattedCardNumber)
        }
        setCardNumber(formattedCardNumber)
        
        //if no space
        //convert and add spaces
        if (formattedCardNumber.length !== 19) {
            let error = validatePhoneNumber("")
            if (error) {
                return setCardNumberError("invalid card number")
            }
            return setCardNumberError('invalid card number')
        }
       
    }

    let changeCardExpiration = (e) => {
        let textTemp = e;
        if (textTemp[0] !== '1' && textTemp[0] !== '0') {
            textTemp = '';
        }
        if (textTemp.length === 2) {
            if (parseInt(textTemp.substring(0, 2)) > 12 || parseInt(textTemp.substring(0, 2)) == 0) {
                textTemp = textTemp[0];
            } else if (e.length === 2) {
                textTemp += '/';
            } else {
                textTemp = textTemp[0];
            }
        }

        setCardExpiration(textTemp)
        let error = validatePhoneNumber(textTemp)
        if (error) {
            return setCardExpirationError(error)
        }
        return setCardExpirationError('')

    }

    //onblur for card expiry
    let onBlurCardExpiry = () => {
        if (cardExpiration.length < 5) {
            setCardExpiration('')

            let error = validatePhoneNumber("")
            if (error) {
                return setCardExpirationError("Expiry invalid")
            }
            return setCardExpirationError('Expiry invalid')


        } else if (!cardExpiration.includes('/')) {
            setCardExpiration('')

            let error = validatePhoneNumber("")
            if (error) {
                return setCardExpirationError('Expiry invalid')
            }
            return setCardExpirationError('Expiry invalid')

        }

    }

    let changeCardCvc = (e) => {
        setCardCvc(e)
        let error = validatePhoneNumber(e)
        if (error) {
            return setCardCvcError(error)
        }
        return setCardCvcError('')

    }

    let changePostalcode = (e) => {
        setPostalCode(e)
        let error = validatePhoneNumber(e)
        if (error) {
            return setPostalCodeError(error)
        }
        return setPostalCodeError('')

    }

    let changeBankName = (e) => {
        setBankName(e)
        let error = validateText(e)
        if (error) {
            return setBankNameError(error)
        }
        return setBankNameError('')

    }

    let changeAccountNumber = (e) => {
        setBankAccount(e)
        let error = validatePhoneNumber(e)
        if (error) {
            return setBankAccountError(error)
        }
        return setBankAccountError('')

    }


    let changeAddressOne = (e) => {
        setBankAddress(e)
        let error = validateText(e)
        if (error) {
            return setBankAddressError(error)
        }
        return setBankAddressError('')

    }

    if (isScreenLoading) {
        return <Loader />
    }

    return (<>
        {isAuthError && <AuthModal modalVisible={isAuthError} updateVisibility={updateAuthError} message={authInfo} />}

        <SafeAreaView style={{ flex: 1, backgroundColor: background }}>
            <ScrollView showsVerticalScrollIndicator={false} style={styles.scrollviewContainer} onScroll={scrollHandler} stickyHeaderIndices={[0]}>
                <View style={{...styles.navigationHeader,backgroundColor: background}}>
                    <Pressable onPress={() => navigation.goBack()} style={{ ...styles.goback }} >
                        <Feather name="arrow-left" size={24} color={background === 'white' ? "black" : "white"} />
                    </Pressable>
                </View>


                <View style={styles.title}>
                    <Text style={{...styles.titleText,color:importantText}}>Card Information</Text>
                </View>

                <KeyboardAvoidingView style={styles.formCon}>
                    <Text style={{...styles.label,color:normalText}}>Name on Card</Text>

                    <TextInput
                        style={{...styles.input,color: importantText,borderColor:background==='black'? fadeColor:'rgb(210,210,210)',}}
                        placeholder='Harry'
                        onChangeText={changeNameOnCard}
                        placeholderTextColor={normalText}
                    />
                    <Text style={styles.errorText}>{nameOnCardError ? nameOnCardError : ""}</Text>
                </KeyboardAvoidingView>


                


                <KeyboardAvoidingView style={styles.formCon}>
                    <Text style={{...styles.label,color:normalText}}> Card number</Text>
                    <View style={{...styles.NumberinputContainer,borderColor: fadeColor}}>
                        <TextInput style={{...styles.numberinput,color: importantText}} placeholder='XXXX XXXX XXXX XXXX'
                            keyboardType='numeric'
                            onChangeText={changeCardNumber}
                            onBlur={onBlurCardNumber}
                            value={cardNumber}
                            placeholderTextColor={normalText}
                             />


                    </View>
                    <Text style={styles.errorText}>{cardNumberError ? cardNumberError : ""}</Text>


                </KeyboardAvoidingView>



                <KeyboardAvoidingView style={{ ...styles.formCon, display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>

                    <View style={styles.innerInputContainer}>
                        <Text style={{...styles.label,color:normalText}}> Expiration</Text>
                        <TextInput style={{...styles.input,color: importantText,borderColor:background==='black'? fadeColor:'rgb(210,210,210)',}} placeholder="MM/YY"
                            onChangeText={changeCardExpiration}
                            keyboardType='numeric'
                            value={cardExpiration}
                            maxLength={5}
                            onBlur={onBlurCardExpiry}
                            placeholderTextColor={normalText}
                        />

                        <Text style={styles.errorText}>{cardExpirationError ? cardExpirationError : ""}</Text>

                    </View>
                    <View style={styles.innerInputContainer}>
                        <Text style={{...styles.label,color:normalText}}> CVC</Text>
                        <TextInput 
                        style={{...styles.input,color: importantText,borderColor:background==='black'? fadeColor:'rgb(210,210,210)',}}
                         placeholder="123"
                            onChangeText={changeCardCvc}
                            keyboardType='numeric'
                            maxLength={3}
                            placeholderTextColor={normalText} />
                        <Text style={styles.errorText}>{cardCvcError ? cardCvcError : ""}</Text>

                    </View>


                </KeyboardAvoidingView>

                <KeyboardAvoidingView style={styles.formCon}>
                    <Text style={{...styles.label,color:normalText}}>Postal code</Text>
                    <TextInput style={{...styles.input,color: importantText,borderColor:background==='black'? fadeColor:'rgb(210,210,210)',}}
                        onChangeText={changePostalcode}
                        keyboardType='numeric'
                        placeholderTextColor={normalText} />
                    <Text style={styles.errorText}>{postalCodeError ? postalCodeError : ""}</Text>

                </KeyboardAvoidingView>

                <View style={styles.title}>
                    <Text style={{...styles.titleText,color: importantText}}>Account Information</Text>


                </View>


                <KeyboardAvoidingView style={styles.formCon}>
                    <Text style={{...styles.label,color:normalText}}>Name of bank</Text>
                    <TextInput style={{...styles.input,color: importantText,borderColor:background==='black'? fadeColor:'rgb(210,210,210)',}}
                        onChangeText={changeBankName} />

                    <Text style={styles.errorText}>{bankNameError ? bankNameError : ""}</Text>

                </KeyboardAvoidingView>


                <KeyboardAvoidingView style={styles.formCon}>
                    <Text style={{...styles.label,color:normalText}}>Account Number</Text>
                    <TextInput style={{...styles.input,color: importantText,borderColor:background==='black'? fadeColor:'rgb(210,210,210)',}}
                        keyboardType='numeric'
                        onChangeText={changeAccountNumber} />

                    <Text style={styles.errorText}>{bankAccountError ? bankAccountError : ""}</Text>

                </KeyboardAvoidingView>

                <KeyboardAvoidingView style={styles.formCon}>
                    <Text style={{...styles.label,color:normalText}}>Address 1</Text>
                    <TextInput style={{...styles.input,color: importantText,borderColor:background==='black'? fadeColor:'rgb(210,210,210)',}}
                        onChangeText={changeAddressOne} />

                    <Text style={styles.errorText}>{bankAddressError ? bankAddressError : ""}</Text>

                </KeyboardAvoidingView>

                <View style={styles.footer}>
                    <View style={styles.footerTopSection}>
                        <Text style={{...styles.statement,color:normalText}}>By adding a new card,you agree to the <Text style={styles.statementCard}>credit/debit card terms.</Text></Text>

                        <Pressable style={styles.buttonCon} onPress={addCardHandler}>
                            {isLoading ? <ActivityIndicator color='#fff' size='small' /> : <Text style={styles.button}>Add Card</Text>}
                        </Pressable>
                    </View>



                    <View style={{...styles.footerBottomSection,backgroundColor:fadeColor}}>
                        <View>

                        </View>
                        <View style={styles.footerTextCon}>
                            <MaterialIcons name="lock" size={24} color="black" />
                            <Text style={styles.footerText}>
                                Processed by <Text style={styles.coinbaseText}>capchain</Text>
                            </Text>

                        </View>


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

export default Card