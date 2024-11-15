import React, { useState, useEffect } from 'react'
import { View, Text, SafeAreaView, Pressable, StyleSheet, TextInput, ScrollView, Dimensions, ActivityIndicator, KeyboardAvoidingView } from 'react-native'
import { Ionicons } from '@expo/vector-icons';
import { useDispatch, useSelector } from "react-redux";
import { changePhone } from "../store/action/appStorage";
import AuthModal from '../modals/authModal';
import Loader from '../loaders/Loader'

const NewPhone = ({ navigation }) => {
    let [isChangeNumber, setIsChangeNumber] = useState('')
    const [isAuthError, setIsAuthError] = useState(false)
    const [authInfo, setAuthInfo] = useState("")
    const [isLoading, setIsLoading] = useState(true)
    const [isUrl, setIsUrl] = useState("")
    let dispatch = useDispatch()
    let { user, background, importantText, normalText, fadeColor, blue, fadeButtonColor } = useSelector(state => state.userAuth)

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


    let changeNumber = (e) => {
        console.log(e)
        setIsChangeNumber(e)
    }

    let gobackHandler = () => {
        navigation.goBack()
    }

    let submitHandler = async () => {
        //after verificationn was suceesfull
        if (!isChangeNumber) {
            return
        }

        setIsLoading(true)

        let res = await dispatch(changePhone({
            phone: isChangeNumber
        }))

        if (!res.bool) {
            setIsLoading(false)
            setAuthInfo(res.message)
            setIsAuthError(true)
            return
        }
        setIsLoading(false)
        setAuthInfo(res.message)
        setIsAuthError(true)
        setIsUrl('ConfirmNewPhone')
    }
    const updateAuthError = () => {

        setIsAuthError(prev => !prev)
        if (isUrl) {
            navigation.navigate(isUrl)
        }
    }

    useEffect(() => {
        setTimeout(() => {
            setIsLoading(false)
        }, 5000)
    }, [])

    if (isLoading) {
        return <Loader />
    }

    return (<>
        {isAuthError && <AuthModal modalVisible={isAuthError} updateVisibility={updateAuthError} message={authInfo} />}

        <SafeAreaView style={{ ...styles.screen, backgroundColor: background }}>

            <View style={styles.navigationHeader}>
                <Pressable style={styles.headerIconCon}>
                    <Ionicons name="arrow-back" size={22} fontWeight={100} color={background === 'white' ? "black" : "white"} />
                </Pressable>

                <Pressable style={styles.headerTextCon}>
                    <Text style={{ ...styles.headerText, color: importantText }}>
                        Enter new phone
                    </Text >
                </Pressable>
            </View>

            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.body}>



                <KeyboardAvoidingView style={styles.formContainer}>

                    <View style={styles.CodeCon}>

                        <TextInput
                            style={{ ...styles.input, color: importantText, borderColor: fadeColor, }}
                            onChangeText={changeNumber}
                            value={isChangeNumber}
                            placeholder='+1 212 555 0123'
                            keyboardType='phone-pad'
                            maxLength={15}
                            placeholderTextColor={normalText}
                        />

                    </View>

                </KeyboardAvoidingView>


                <View style={styles.buttonContainer}>
                    <Pressable style={styles.buttonContinue} onPress={submitHandler}>

                        {isLoading ? <ActivityIndicator color='#fff' size='large' /> : <Text style={styles.buttonContinueText}>
                            Send code
                        </Text>}

                    </Pressable>

                </View>


            </ScrollView>


        </SafeAreaView>
    </>)
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        paddingHorizontal: '5%',
    },

    navigationHeader: {
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        zIndex: 10,
        borderColor: '#fff',
        paddingTop: 15,
    },
    headerIconCon: {
        width: '20%',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'flex-start',
    },
    headerTextCon: {
        width: '80%',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'flex-start',

    },

    headerText: {
        fontSize: 20,
        color: 'rgb(44, 44, 44)',
        fontFamily: 'Poppins'

    },

    CodeCon: {
        width: '90%'

    },
    input: {
        borderWidth: .5,
        borderColor: 'rgb(200,200,200)',
        height: 55,
        borderRadius: 5,
        paddingLeft: 10,

    },


    formContainer: {
        display: 'flex',
        flexDirection: 'row',
        width: Dimensions.get('window').width,
        alignItems: 'center',
        marginBottom: Dimensions.get('window').height / 1.6

    },
    buttonContainer: {

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



export default NewPhone