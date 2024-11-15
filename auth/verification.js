import React, { useState } from 'react'
import { View, Text, SafeAreaView, Pressable, StyleSheet, Linking, ScrollView, Dimensions, Image } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import * as Progress from 'react-native-progress'
import { useDispatch,useSelector } from "react-redux";
import { verifiedEmail } from "../store/action/appStorage";
import { useRoute } from "@react-navigation/native";
//importing modals
import AuthModal from '../modals/authModal'

const Verification = ({ navigation }) => {
    const [isAuthError, setIsAuthError] = useState(false)
    const [authInfo, setAuthInfo] = useState("")
    let { background, importantText, normalText, fadeColor, blue, fadeButtonColor } = useSelector(state => state.userAuth)

    const route = useRoute()
    let dispatch = useDispatch()

    //getting email from previous page
     
    const {
        email
    } = route.params
    


    //this handler check if user email has been verified
    const continueHandler = async () => {

        let res = await dispatch(verifiedEmail({ email: email }))
        if (!res.bool) {
            setAuthInfo(res.message)
            setIsAuthError(true)
            return
        }
   //navigation on sucessful api call
        navigation.navigate('Secure', {
            email: email
        })

    }

    const updateAuthError = () => {
        setIsAuthError(prev => !prev)
    }


    const openMail = () => {
        Linking.openURL('mailto:')
    }


    return (<>
        {isAuthError && <AuthModal modalVisible={isAuthError} updateVisibility={updateAuthError} message={authInfo} />}<SafeAreaView style={{ ...styles.screen, backgroundColor: background }}>
            <View style={styles.container}>
                <View style={styles.navigationHeader}>
                    <Pressable style={styles.close} onPress={() => navigation.goBack()}>
                        <AntDesign name="close" size={22} fontWeight={100} color="rgb(44, 44, 44)" style={{ fontWeight: '200' }} />
                    </Pressable>
                    <View style={styles.progress}>
                        <View style={styles.progressbar}>
                            <Progress.Bar progress={0.3} width={50} height={4} unfilledColor='rgb(240,240,240)' borderColor='#fff' />

                        </View>
                        <View style={styles.progressbar}>
                            <Progress.Bar progress={0} width={50} height={4} unfilledColor='rgb(240,240,240)' borderColor='#fff' />

                        </View>
                        <View style={styles.progressbar}>
                            <Progress.Bar progress={0} width={50} height={4} unfilledColor='rgb(240,240,240)' borderColor='#fff' />

                        </View>


                    </View>

                </View>

                <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.body}>
                    <View style={styles.imageContainer}>
                        <Image
                            source={require('../assets/icons/photo1(7).png')}
                            style={{ width: 250, height: 250, }} />

                    </View>

                    <View style={styles.verificationContainer}>
                        <Text style={{ ...styles.headerText, color: importantText }}>
                            Verify your email
                        </Text>
                        <Text style={{...styles.verificationText,color:normalText}}>
                            We sent a verification email to
                            <Text style={{...styles.email,color:importantText}}> {email} </Text> Please tap the link inside that email to

                            continue
                        </Text>

                    </View>

                    <View style={styles.buttonContainer}>
                        <Pressable style={styles.checkBtnContainer} onPress={openMail}>
                            <Text style={styles.check}>
                                Check mail box
                            </Text>

                        </Pressable>
                        <Pressable style={{...styles.resendBtnContainer,backgroundColor:fadeColor}} onPress={continueHandler}>
                            <Text style={{...styles.resend,color:importantText}}>continue</Text>

                        </Pressable>


                    </View>

                </ScrollView>




            </View>

        </SafeAreaView>
    </>
    )




}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        backgroundColor: "#fff",
        paddingHorizontal: '5%',
        paddingTop: 20
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
        alignItems: 'center'
    },
    imageContainer: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: Dimensions.get('window').height / 4,
        marginVertical: 20,
        marginBottom: 40,
    },
    verificationContainer: {
        display: 'flex',
        alignItems: 'center',
        marginBottom: 70
    },

    headerText: {
        fontSize: 20,
        marginBottom: 10,
        textAlign: 'center',
        fontFamily: 'Poppins',
        color: 'rgb(44, 44, 44)',
    },
    verificationText: {
        display: 'flex',
        justifyContent: 'center',
        textAlign: 'center',
        fontWeight: '200',
        color: 'rgb(100,100,100)',
        fontSize: 16,
        fontFamily: 'ABeeZee'
    },
    email: {
        color: 'rgb(44, 44, 44)',
        fontWeight: '600'
    },
    buttonContainer: {
        display: 'flex',
        flexDirection: 'column',
        width: Dimensions.get('window').width

    },
    checkBtnContainer: {
        width: '85%',
        alignSelf: 'center',
        paddingVertical: 17,
        borderRadius: 30,
        backgroundColor: '#1652f0',
        marginBottom: 25,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    },
    resendBtnContainer: {
        width: '85%',
        alignSelf: 'center',
        paddingVertical: 17,
        borderRadius: 30,
        backgroundColor: 'rgb(240,240,240)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    },
    check: {
        color: '#fff',
        fontSize: 15,
        fontFamily: 'Poppins',
    },
    resend: {
        fontSize: 15,
        fontFamily: 'Poppins',

    }

});




export default Verification