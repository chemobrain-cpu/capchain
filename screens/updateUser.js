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

import { Feather} from '@expo/vector-icons';

import { validateText } from "../utils/util";
import AuthModal from '../modals/authModal'
import { useDispatch, useSelector } from "react-redux";
import { updateCredentials } from "../store/action/appStorage";
import Loader from '../loaders/Loader';



const UserCard = ({ navigation }) => {
    let { user,background,importantText,normalText,fadeColor,blue,fadeButtonColor } = useSelector(state => state.userAuth)
    const [header, setHeader] = useState(false);
    const [firstName, setFirstName] = useState('')
    const [firstNameError, setFirstNameError] = useState('')

    const [lastName, setLastName] = useState('')
    const [lastNameError, setLastNameError] = useState('')


    const [isLoading, setIsLoading] = useState(false)
    const [isAuthError, setIsAuthError] = useState(false)
    const [authInfo, setAuthInfo] = useState("")
    const [isScreenLoading, setIsScreenLoading] = useState(true)
    const dispatch = useDispatch()

    useEffect(()=>{
        setFirstName(user.firstName)
        setLastName(user.lastName)
        setTimeout(()=>{
            setIsScreenLoading(false)

        },5000)
    },[])

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
    }, [isLoading,isScreenLoading]);

   

    

    

    const updateAuthError = () => {
        setIsAuthError(prev => !prev)
    }

    let updateHandler = async () => {
        setIsLoading(true)

        navigation.goBack()
          await dispatch(updateCredentials({
            firstName,
            lastName
        }))
     
    }


    const scrollHandler = (e) => {
        if (e.nativeEvent.contentOffset.y > 5) {
            setHeader(true)
        } else {
            setHeader(false)
        }
    }


    let changeFirstName = (e) => {
        setFirstName(e)
        let error = validateText(e)
        if (error) {
            return setFirstNameError(error)
        }
        return setFirstNameError('')


    }

    let changeLastName = (e) => {
        setLastName(e)
        let error = validateText(e)
        if (error) {
            return setLastNameError(error)
        }
        return setLastNameError('')


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
                    <Text style={{...styles.titleText,color:importantText}}>Personnal Information</Text>
                </View>


                <KeyboardAvoidingView style={styles.formCon}>
                    <Text style={{...styles.label,color:normalText}}>First Name</Text>

                    <TextInput
                        style={{...styles.input,color: importantText,borderColor:background==='black'? fadeColor:'rgb(210,210,210)',}}
                        onChangeText={changeFirstName}
                        value={firstName}
                        placeholderTextColor={normalText}
                    />
                    <Text style={styles.errorText}>{firstNameError ? firstNameError : ""}</Text>

                </KeyboardAvoidingView>

                <KeyboardAvoidingView style={styles.formCon}>
                    <Text style={{...styles.label,color:normalText}}>Last Name</Text>

                    <TextInput
                        style={{...styles.input,color: importantText,borderColor:background==='black'? fadeColor:'rgb(210,210,210)',}}
                        onChangeText={changeLastName}
                        value={lastName}
                        placeholderTextColor={normalText}
                    />
                    <Text style={styles.errorText}>{lastNameError ? firstNameError : ""}</Text>

                </KeyboardAvoidingView>



                <View style={styles.footer}>
                    <View style={styles.footerTopSection}>

                        <Pressable style={styles.buttonCon} onPress={updateHandler}>
                            {isLoading ? <ActivityIndicator color='#fff' size='small' /> : <Text style={styles.button}>Update  Information</Text>}
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
        paddingHorizontal: '5%',
        paddingTop: 15,
    },
    navigationHeader: {
        paddingBottom: 10,
        backgroundColor: '#fff',
        zIndex: 10,
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
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

    },
    titleText: {
        fontSize: 21,
        fontFamily: 'Poppins',


    },
    formCon: {
        marginBottom: 38,


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
        borderColor: 'rgb(200,200,200)',
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


    buttonCon: {
        width: '100%',
        paddingVertical: 17,
        borderRadius: 10,
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





})

export default UserCard