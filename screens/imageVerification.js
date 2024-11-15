import React, { useState, useEffect } from 'react'
import { View, Text, SafeAreaView, Pressable, StyleSheet, ScrollView, Dimensions} from 'react-native';
import { useDispatch,useSelector } from "react-redux";
import { useRoute } from "@react-navigation/native";
import Loader from '../loaders/Loader';
//importing modals
import AuthModal from '../modals/authModal'
import { AntDesign } from '@expo/vector-icons';


const Verification = ({ navigation }) => {
    const [isAuthError, setIsAuthError] = useState(false)
    let [isLoading, setIsLoading] = useState(true)
    const [authInfo, setAuthInfo] = useState("")
    const route = useRoute()
    let dispatch = useDispatch()
    let { user,background, importantText, normalText, fadeColor, blue, fadeButtonColor } = useSelector(state => state.userAuth)

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

    useEffect(() => {
        setTimeout(() => {
            setIsLoading(false)

        }, 4000)

    }, [])

    const gobackHandler = async () => {
        navigation.goBack()
    }

    const updateAuthError = () => {
        setIsAuthError(prev => !prev)
    }

    const takePictureHandler = () => {
        //depending on user status,navigate to fron or back camera
        if(!user.isFrontIdVerified){
            return navigation.navigate('Camera_1')
        }
        return navigation.navigate('Camera_1')
    }

    if (isLoading) {
        return <Loader />
    }



    return (<>
        {isAuthError && <AuthModal modalVisible={isAuthError} updateVisibility={updateAuthError} message={authInfo} />}
        
        <SafeAreaView style={{ ...styles.screen, backgroundColor: background }}>


            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.body}>
                <View style={styles.imageContainer}>
                    
                        
                        <AntDesign name="idcard" size={120} color={background === 'white' ? "black" : "white"}  />

                </View>

                <View style={styles.verificationContainer}>
                    <Text style={{...styles.headerText,color:importantText}}>
                        ID Verification Required
                    </Text>
                    <Text style={{...styles.verificationText,color:normalText}}>
                        Before making your first purchase,please verify your identity.Identity verification helps us ensure the safety and security of your crypto asset!
                    </Text>

                </View>

            </ScrollView>


            <View style={{...styles.buttonContainer,backgroundColor:background}}>
                <Pressable style={styles.checkBtnContainer} onPress={takePictureHandler}>
                    <Text style={styles.check}>
                        Let's do it
                    </Text>

                </Pressable>
                <Pressable style={{...styles.resendBtnContainer,backgroundColor:fadeColor}} onPress={gobackHandler}>
                    <Text style={{...styles.resend,color:importantText}}>Take me back</Text>

                </Pressable>


            </View>

        </SafeAreaView>
    </>
    )




}

const styles = StyleSheet.create({
    screen:{
        flex:1

    },
    container: {
        width: Dimensions.get('window').width,

    },

    body: {
        paddingTop: 100,
        display: 'flex',
        alignItems: 'center',
        zIndex: 1,
        marginHorizontal: 10,
    },
    imageContainer: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 20,
        marginBottom: 30,
    },
    verificationContainer: {
        display: 'flex',
        alignItems: 'center',
        marginHorizontal: 10,
       
    },

    headerText: {
        fontSize: 24,
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
        color: 'rgb(120,120,120)',
        fontSize: 18,
        fontFamily: 'ABeeZee',
    },
    email: {
        color: 'rgb(44, 44, 44)',
        fontWeight: '600'
    },
    buttonContainer: {
        display: 'flex',
        flexDirection: 'column',
        width: Dimensions.get('window').width,
        bottom: '0%',
        height: 180,
        paddingTop: 15,
        zIndex: 5,
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