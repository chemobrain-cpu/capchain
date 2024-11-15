import React, { useState, useEffect, useCallback } from 'react'
import { View, Text, SafeAreaView, Pressable, StyleSheet, TextInput, ScrollView, ActivityIndicator, KeyboardAvoidingView } from 'react-native'
import CheckBox from 'expo-checkbox'
import { AntDesign } from '@expo/vector-icons';
import * as Progress from 'react-native-progress'
import { useDispatch, useSelector } from "react-redux";
import { validateEmail, validateText, validatePassword } from "../utils/util";

//importing modals
import AuthModal from '../modals/authModal'
import SignupModal from '../modals/signupModal'
import { signup } from "../store/action/appStorage";
//importing loader
import Loader from '../loaders/Loader'



const Signup = ({ navigation }) => {
    const dispatch = useDispatch()
    const [isSelected, setSelection] = useState(false);
    const [firstName, setFirstName] = useState('');
    const [firstNameError, setFirstNameError] = useState('')
    const [lastName, setLastName] = useState('');
    const [lastNameError, setLastNameError] = useState('')
    const [email, setEmail] = useState('');
    const [emailError, setEmailError] = useState('')
    const [password, setPassword] = useState(' ');
    const [passwordError, setPasswordError] = useState('')
    const [modalVisible, setModalVisible] = useState(false);
    const [isAuthError, setIsAuthError] = useState(false)
    const [authInfo, setAuthInfo] = useState("")
    const [isLoading, setIsLoading] = useState(false)
    const [isPageLoading, setIsPageLoading] = useState(true)
    const [url, setUrl] = useState("")

    let { background, importantText, normalText, fadeColor, blue, fadeButtonColor } = useSelector(state => state.userAuth)

    //turn off error modal
    const updateAuthError = useCallback(() => {
        setIsAuthError(prev => !prev)
        navigation.navigate(url, {
            email: email
        })
    }, [])

    useEffect(() => {
        setTimeout(() => {
            setIsPageLoading(false)

        }, 5000)

    }, [])

    const changeFirstName = (e) => {
        setFirstName(e)
        let error = validateText(e)
        if (error) {
            return setFirstNameError(error)
        }
        return setFirstNameError('')

    }

    const changeEmail = (e) => {
        setEmail(e)
        let error = validateEmail(e)
        if (error) {
            return setEmailError(error)
        }
        return setEmailError('')


    }

    const changeLastName = (e) => {
        setLastName(e)
        let error = validateText(e)
        if (error) {
            return setLastNameError(error)
        }
        return setLastNameError('')
    }



    const changePassword = (e) => {
        setPassword(e)
        let error = validatePassword(e)
        if (error) {
            return setPasswordError(error)
        }
        return setPasswordError('')
    }


    //back handler lsitener
    useEffect(() => {
        if (isLoading) {
            return
        }
        let focus = navigation.addListener('beforeRemove', (e) => {
            e.preventDefault();
            setModalVisible(true)
        });
        return focus
    }, [navigation]);


    let formValid = firstName && lastName && email && password && !firstNameError && !lastNameError && !emailError && !passwordError && isSelected

    let navigateHandler = useCallback(() => {
        navigation.removeListener('beforeRemove')
        setModalVisible(false)
        navigation.goBack()
    }, [])

    let submitHandler = async () => {
        if (!formValid) {
            return
        }

        setIsLoading(true)
        try {
            let res = await dispatch(signup({
                firstName,
                lastName,
                email,
                password
            }))

            if (!res.bool) {
                setIsLoading(false)
                setIsAuthError(true)
                setAuthInfo(res.message)
                setUrl(res.url)
                return
            }
            setIsLoading(false)
            //go to verification page passing the email as a parameter
            navigation.navigate('Verification', {
                email: email
            })

        } catch (err) {
            setIsLoading(false)
            setIsAuthError(true)
            setAuthInfo(err.message)
            return
        }
    }

    let updateVisibility = useCallback(() => {
        setModalVisible(false)
    }, [])



    if (isPageLoading) {
        return <Loader />
    }


    return (<>
        <SignupModal
            modalVisible={modalVisible}
            updateVisibility={updateVisibility}
            navigateHandler={navigateHandler} />

        {isAuthError && <AuthModal modalVisible={isAuthError} updateVisibility={updateAuthError} message={authInfo} />}

        <SafeAreaView style={{ flex: 1, backgroundColor: background }}>
            <View style={{ ...styles.container, backgroundColor: background }}>
                <View style={{ ...styles.navigationHeader, backgroundColor: background }}>
                    <Pressable style={styles.close} onPress={() => navigation.goBack()}>
                        <AntDesign name="close" size={22} fontWeight='Poppins' color={importantText} />
                    </Pressable>
                    <View style={styles.progress}>
                        <View style={styles.progressbar}>
                            <Progress.Bar progress={0.3} width={50} height={4} unfilledColor={fadeColor} borderColor='#fff' />

                        </View>
                        <View style={styles.progressbar}>
                            <Progress.Bar progress={0} width={50} height={4} unfilledColor={fadeColor} borderColor='#fff' />

                        </View>
                        <View style={styles.progressbar}>
                            <Progress.Bar progress={0} width={50} height={4} unfilledColor={fadeColor} borderColor='#fff' />

                        </View>


                    </View>

                </View>

                <ScrollView showsVerticalScrollIndicator={false} style={styles.form}>
                    <Text style={{ ...styles.headerText, color: importantText }}>Create your account</Text>

                    <KeyboardAvoidingView>
                        <Text style={{ ...styles.emailText, color: normalText }}>First Name</Text>

                        <TextInput
                            style={{ ...styles.input, color: importantText, borderColor: background === 'black' ? fadeColor : 'rgb(210,210,210)', }}
                            onChangeText={changeFirstName}
                            value={firstName}
                            placeholder='John'
                            placeholderTextColor={normalText}
                        />
                        <Text style={styles.errorText}>{firstNameError ? firstNameError : ""}</Text>

                        <Text style={{ ...styles.passwordText, color: normalText }}>Last Name</Text>

                        <TextInput
                            style={{ ...styles.input, color: importantText, borderColor: background === 'black' ? fadeColor : 'rgb(210,210,210)', }}
                            onChangeText={changeLastName}
                            value={lastName}
                            placeholder="Holly"
                            placeholderTextColor={normalText}
                        />
                        <Text style={styles.errorText}>{lastNameError ? lastNameError : ""}</Text>

                        <Text style={{ ...styles.passwordText, color: normalText }}>Email</Text>

                        <TextInput
                            style={{ ...styles.input, color: importantText, borderColor: background === 'black' ? fadeColor : 'rgb(210,210,210)', }}

                            onChangeText={changeEmail}
                            value={email}
                            placeholder="johnholly@gmail.com"
                            placeholderTextColor={normalText}
                        />
                        <Text style={styles.errorText}>{emailError ? emailError : ""}</Text>

                        <Text style={{ ...styles.passwordText, color: normalText }}>Password</Text>

                        <TextInput
                            style={{ ...styles.input, color: importantText, borderColor: background === 'black' ? fadeColor : 'rgb(210,210,210)', }}
                            onChangeText={changePassword}
                            value={password}
                            maxLength={8}
                            placeholder='1234567'
                            keyboardType='numeric'
                            placeholderTextColor={normalText}
                        />
                        <Text style={styles.errorText}>{passwordError ? passwordError : ""}</Text>



                    </KeyboardAvoidingView>

                    <View style={styles.forgetPasswordCon}>
                        <Pressable style={styles.checkboxCon}>
                            <CheckBox
                                value={isSelected}
                                onValueChange={() => setSelection(val => !val)}
                                style={styles.checkbox}
                            />

                        </Pressable>
                        <Text style={{ ...styles.privacyText, color: normalText }}>
                            I certify that i am 18 years of age or older,and i agree to the <Text style={{ ...styles.agreement, color: importantText }}>User agreement</Text> and <Text style={{ ...styles.policy, color: normalText }}>Privacy Policy</Text>
                        </Text>
                    </View>

                    {<Pressable style={{ ...styles.submitBtn, color: background, }} onPress={() => submitHandler()}>
                        {isLoading ? <ActivityIndicator color='#fff' size='small' /> : <Text style={{ ...styles.submitBtnText, color: background }}>
                            Create Account
                        </Text>}
                    </Pressable>}


                    <Text style={{ ...styles.protection, color: normalText }}>
                        This site is protected by reCAPTCHA and the Google Privacy Policy and Terms of Service apply

                    </Text>

                </ScrollView>
            </View>

        </SafeAreaView>
    </>
    )

}

const styles = StyleSheet.create({
    /*end of modal*/

    container: {
        width: '90%',
        marginHorizontal: '5%',
        paddingTop: 15,
        marginBottom: 20,


    },
    navigationHeader: {
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'flex-start',
        zIndex: 10,
        borderColor: '#fff',

    },
    form: {
        marginTop: 30,
        zIndex: 5,
        paddingBottom: 100
    },
    progress: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        height: '100%',
        paddingLeft: 40,
        justifyContent: 'space-around'

    },
    progressbar: {
        paddingLeft: 8

    },
    close: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',


    },
    headerText: {
        fontSize: 18,
        fontFamily: 'Poppins',
        marginBottom: 10,
    },
    emailText: {
        fontSize: 15,
        fontFamily: 'Poppins',
        marginBottom: 5,
    },
    input: {
        borderWidth: .5,
        borderRadius: 2,
        height: 50,
        paddingHorizontal: 10,
        fontFamily: 'ABeeZee',
        marginBottom: 5,


    },
    errorText: {
        color: 'red',
        marginVertical: 5

    },
    passwordText: {
        fontSize: 15,
        fontFamily: 'Poppins',
        marginBottom: 10,


    },
    submitBtn: {
        width: '100%',
        height: 60,
        borderRadius: 50,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#1652f0',
        fontFamily: 'ABeeZee',
        fontFamily: 'Poppins',
        marginBottom: 30,
    },

    forgetPasswordCon: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%'
    },
    checkboxCon: {
        width: '5%',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'flex-start',
        alignSelf: 'flex-start',
        marginRight: 10,
        paddingTop: 5

    },
    privacyText: {
        fontFamily: 'ABeeZee',
        width: '95%',
        fontWeight: '600',
        fontSize: 17,
        marginBottom: 20,
        alignSelf: 'flex-start',

    },
    agreement: {
        fontFamily: 'ABeeZee',
        fontWeight: '300',
        fontSize: 14,
        height: 20,
    },
    policy: {
        fontFamily: 'ABeeZee',
        fontWeight: '300',
        fontSize: 14,
        height: 20,
    },
    protection: {
        fontFamily: 'ABeeZee',
        fontWeight: '600',
        marginBottom: 20,
    }


});




export default Signup