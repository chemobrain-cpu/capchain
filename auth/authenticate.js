import React, { useState } from 'react'
import { View, Text,  Pressable, StyleSheet, TextInput, ScrollView, Dimensions, ActivityIndicator, KeyboardAvoidingView } from 'react-native';

import {
    SafeAreaView,
  } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import * as Progress from 'react-native-progress'
import { useDispatch, useSelector } from "react-redux";
import { confirmPhone } from "../store/action/appStorage";
import { useRoute } from "@react-navigation/native";
import AuthModal from '../modals/authModal'

const Authenticate = ({ navigation }) => {
    let [confirmationCode, setConfirmationCode] = useState('')
    const [isAuthError, setIsAuthError] = useState(false)
    const [authInfo, setAuthInfo] = useState("")
    const [isLoading, setIsLoading] = useState(false)
    const route = useRoute();
    let { background, importantText, normalText, fadeColor, blue, fadeButtonColor } = useSelector(state => state.userAuth)

   
    let dispatch = useDispatch()


    const {
        email
    } = route.params



    let changeConfirmationCode = (e) => {
        setConfirmationCode(e)
    }


    let gobackHandler = () => {
        navigation.goBack()
    }

    let continueHandler = async () => {
        //after verificationn was suceesfull
        //validation
        if (!confirmationCode) {
            return
        }
        setIsLoading(true)

        let res = await dispatch(confirmPhone({
            confirmationCode: confirmationCode,
            email: email
        }))
        if (!res) {
            setIsLoading(false)
            setAuthInfo(res.message)
            setIsAuthError(true)
            return

        }
        navigation.navigate('VerifySuccess')









    }



    const updateAuthError = () => {
        setIsAuthError(prev => !prev)
    }

    return (<>
        {isAuthError && <AuthModal modalVisible={isAuthError} updateVisibility={updateAuthError} message={authInfo} />}

        <SafeAreaView style={{ ...styles.screen, backgroundColor: background }}>
            <View style={{ ...styles.navigationHeader, backgroundColor: background, borderColor: background }}>
                <Pressable style={{...styles.close,color:normalText}} onPress={() => navigation.goBack()}>
                    <Ionicons name="arrow-back" size={22} fontWeight={100} color={normalText} />
                </Pressable>

                <View style={styles.progress}>
                    <View style={styles.progressbar}>
                        <Progress.Bar progress={1} width={50} height={4} unfilledColor='rgb(240,240,240)' borderColor='#fff' />

                    </View>
                    <View style={styles.progressbar}>
                        <Progress.Bar progress={0.6} width={50} height={4} unfilledColor='rgb(240,240,240)' borderColor='#fff' />

                    </View>
                    <View style={styles.progressbar}>
                        <Progress.Bar progress={0} width={50} height={4} unfilledColor='rgb(240,240,240)' borderColor='#fff' />

                    </View>


                </View>

            </View>

            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.body}>
                <Text style={{ ...styles.headerText, color: importantText }}>
                    Enter authentication code
                </Text >
                <Text style={{ ...styles.text, color: normalText }}>Enter the 7-digit code we just texted to your phone number, xxxxxxxxx.</Text>

                <View style={styles.formContainer}>

                    <KeyboardAvoidingView style={styles.CodeCon}>
                        <Text style={styles.CodeText}>Code</Text>
                        <TextInput
                            style={{ ...styles.input, color: importantText }}
                            onChangeText={changeConfirmationCode}
                            value={confirmationCode}
                            placeholder='7-digit code from SMS'
                            keyboardType='phone-pad'
                            maxLength={7}
                        />

                    </KeyboardAvoidingView>

                </View>


                <View style={{ ...styles.buttonContainer }}>
                    <Pressable style={styles.buttonContinue} onPress={() => continueHandler(navigation)}>

                        {isLoading ? <ActivityIndicator color='#fff' size='large' /> : <Text style={styles.buttonContinueText}>
                            Continue
                        </Text>}

                    </Pressable>
                    <Pressable style={{
                        ...styles.buttonResend,
                        backgroundColor: fadeColor,
                    }} onPress={gobackHandler}>
                        <Text style={{ ...styles.buttonResendText, color: importantText }}>
                            Resend
                        </Text>

                    </Pressable>
                </View>


            </ScrollView>

        </SafeAreaView>
    </>)
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        paddingTop: 15,
        paddingHorizontal: '5%',
    },

    navigationHeader: {
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'flex-start',
        zIndex: 10,
        borderColor: '#fff',

    },
    close: {
        width: '20%',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'flex-start',

    },
    progress: {
        width: '80%',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        height: '100%',
        paddingLeft: 40,
        justifyContent: 'space-around'

    },
    progressbar: {

    },
    close: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',


    },
    body: {
        paddingTop: 15,
        display: 'flex',
        flexDirection: 'column',
    },
    headerText: {
        marginBottom: 15,
        fontSize: 20,
        color: 'rgb(44, 44, 44)',
        fontFamily: 'Poppins',

    },
    text: {
        marginBottom: 25,
        fontSize: 16,
        color: 'rgb(100,100,100)',
        fontFamily: 'ABeeZee'

    },
    input: {
        borderWidth: .5,
        borderColor: 'rgb(200,200,200)',
        height: 55,
        borderRadius: 5,
        paddingLeft: 10,
    },
    selectorContainer: {
        borderWidth: 1,
        borderColor: 'rgb(100,100,100)',
        height: 55,
        borderRadius: 2,

    },
    select: {
        borderColor: 'rgb(100,100,100)',
        borderWidth: 1


    },

    formContainer: {
        display: 'flex',
        flexDirection: 'row',
        width: Dimensions.get('window').width,
        alignItems: 'center',
        marginBottom: Dimensions.get('window').height / 3

    },
    CodeCon: {
        width: '90%'

    },


    CodeText: {
        fontFamily: 'Poppins',
        color: '#1652f0',

        fontSize: 16

    },
    buttonContainer: {
        paddingBottom: 20

    },


    buttonContinue: {
        width: '100%',
        paddingVertical: 17,
        borderRadius: 30,
        backgroundColor: '#1652f0',
        marginBottom: 20,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'

    },
    buttonResend: {
        width: '100%',
        paddingVertical: 17,
        borderRadius: 30,
        marginBottom: 20,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'

    },
    buttonContinueText: {
        color: '#fff',
        fontFamily: 'Poppins',
        fontSize: 15,
    },
    buttonResendText: {
        color: '#fff',
        fontFamily: 'Poppins',
        fontSize: 15,
        color: 'rgb(44, 44, 44)'
    },

});



export default Authenticate