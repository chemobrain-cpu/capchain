import React, { useState, useEffect, useCallback } from 'react'
import { View, Text, Pressable, StyleSheet, TextInput,ActivityIndicator, KeyboardAvoidingView } from 'react-native'
import { Feather } from '@expo/vector-icons';
import * as WebBrowser from 'expo-web-browser';
import { login } from "../store/action/appStorage";
import LoginModal from '../modals/loginModal';
import { validateEmail, validatePassword } from "../utils/util";
import { useDispatch,useSelector } from "react-redux";
import AuthModal from '../modals/authModal';
import Loader from '../loaders/Loader';
import {
    SafeAreaView,
  } from 'react-native-safe-area-context';



const Login = ({ navigation }) => {
    const dispatch = useDispatch()
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState(' ');
    const [modalVisible, setModalVisible] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [emailError, setEmailError] = useState('')
    const [passwordError, setPasswordError] = useState('')
    const [isAuthError, setIsAuthError] = useState(false)
    const [authInfo, setAuthInfo] = useState("")
    const [url, setUrl] = useState("")
    const [isPageLoading, setIsPageLoading] = useState(true)

    let { background,importantText,normalText,fadeColor,blue,fadeButtonColor } = useSelector(state => state.userAuth)

    useEffect(() => {
        if(isLoading){
            return
        }
        let focus = navigation.addListener('beforeRemove', (e) => {
            e.preventDefault();
            setModalVisible(true)
        });
        return focus

    }, [navigation]);


 

    let navigateHandler = useCallback(() => {
        navigation.removeListener('beforeRemove')
        setModalVisible(false)
        navigation.goBack()
    }, [])

    let navigateToBrowser = async (data) => {
        if (data == 'password') {
            //navigate to password reset page
            await WebBrowser.openBrowserAsync('https://www.capchains.cloud/forgetPassword')
        } else {
            //navigate to policy page
            await WebBrowser.openBrowserAsync('https://www.capchains.cloud/policy')
        }
    }

    let updateVisibility = useCallback(() => {
        setModalVisible(false)
    }, [])

    const changePassword = (e) => {
        setPassword(e)
        let error = validatePassword(e)
        if (error) {
            return setPasswordError(error)
        }
        return setPasswordError('')
    }

    const changeEmail = (e) => {
        setEmail(e)
        let error = validateEmail(e)
        if (error) {
            return setEmailError(error)
        }
        return setEmailError('')
    }


    let formValid = email && password && !emailError && !passwordError

    const submitHandler = async () => {
        if (!formValid) {
            return
        }
        setIsLoading(true)
        let res = await dispatch(login({
            email: email,
            password: password
        }))

        if (!res.bool) {
            setIsLoading(false)
            setIsAuthError(true)
            setAuthInfo(res.message)
            setUrl(res.url)
            return
        }

    }
     useEffect(()=>{
        setTimeout(()=>{
            setIsPageLoading(false)

        },5000)

    },[])

    const updateAuthError = useCallback(() => {
        setIsAuthError(prev => !prev)
        setAuthInfo('')
        navigation.navigate(url,{
            email:email
        })
    }, [url])


    if (isPageLoading) {
        return <Loader />
    }


    return (<>
        <LoginModal modalVisible={modalVisible}
            updateVisibility={updateVisibility} navigateHandler={navigateHandler} />

        {isAuthError && <AuthModal modalVisible={isAuthError} updateVisibility={updateAuthError} message={authInfo} />}

        <SafeAreaView style={{ flex: 1,backgroundColor:background}}>
            <View style={{...styles.container,backgroundColor:background}}>
                <View style={styles.navigationHeader}>
                    <Pressable onPress={() => navigation.goBack()}>
                        <Feather name="arrow-left" size={30} color={importantText} />
                    </Pressable>
                </View>

                <Text style={{...styles.headerText,color:importantText}}>Sign in to capchain </Text>
                <KeyboardAvoidingView>
                    <Text style={{...styles.emailText,color:normalText}}>Email</Text>
                    <TextInput
                        style={{...styles.input,color: importantText,borderColor:background==='black'? fadeColor:'rgb(210,210,210)',}}
                        onChangeText={changeEmail}
                        value={email}
                        placeholder='you@example.com'
                        placeholderTextColor={normalText}
                    />
                    <Text style={styles.errorText}>{emailError ? emailError : ""}</Text>

                    <Text style={{...styles.passwordText,color:normalText}}>Password</Text>

                    <TextInput
                        style={{...styles.input,color: importantText,borderColor:background==='black'? fadeColor:'rgb(210,210,210)',}}
                        onChangeText={changePassword}
                        value={password}
                        maxLength={8}
                        placeholder='1234567'
                        keyboardType='numeric'
                        placeholderTextColor={normalText}
                    />

                    <Text style={styles.errorText}>{passwordError ? passwordError : ""}</Text>

                    <Pressable style={{ ...styles.submitBtn, color: background, }} onPress={submitHandler}>
                        {isLoading ? <ActivityIndicator color={background} size='small' /> : <Text style={{color:background}}>Sign In</Text>}
                    </Pressable>

                </KeyboardAvoidingView>

                <View style={styles.forgetPasswordCon}>
                    <Pressable style={styles.forgetPasswordText}>
                        <Text onPress={() => navigateToBrowser('password')} style={{ color:blue }}>Forget password?</Text>

                    </Pressable>
                    <Pressable style={styles.privacyText}>

                        <Text onPress={() => navigateToBrowser('policy')} style={{ color: blue }}>Privacy Policy</Text>

                    </Pressable>
                </View>
            </View>
        </SafeAreaView>
    </>

    )
}

const styles = StyleSheet.create({
    container: {
        width: '90%',
        marginHorizontal: '5%',
    },
    navigationHeader: {
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'flex-start',
        paddingTop: 15,
        paddingBottom: 30

    },
    headerText: {
        fontSize: 25,
        fontWeight: '600',
        fontFamily: 'ABeeZee',
        marginBottom: 30,
    },
    emailText: {
        fontSize: 15,
        fontWeight: '500',
        fontFamily: 'ABeeZee',
        marginBottom: 15,
    },
    input: {
        borderWidth: .5,
        borderRadius: 2,
        height: 50,
        paddingHorizontal: 10,
        fontFamily: 'ABeeZee',
        marginBottom: 15,


    },
    errorText: {
        color: 'red',
        marginVertical: 5,

    },
    passwordText: {
        fontSize: 15,
        fontWeight: '500',
        fontFamily: 'ABeeZee',
        marginBottom: 15,

    },
    submitBtn: {
        width: '100%',
        height: 70,
        borderRadius: 10,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#1652f0',
        fontFamily: 'ABeeZee',
        fontWeight: "500",
        marginBottom: 30
    },
    
    forgetPasswordCon: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center'
    },
    forgetPasswordText: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'flex-start'

    },
    privacyText: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'flex-end'

    },



})




export default Login