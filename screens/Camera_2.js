import React, { useState, useEffect } from 'react'
import { View, Text, SafeAreaView, Pressable, StyleSheet, Image, Dimensions } from 'react-native';
import { useDispatch } from "react-redux";
import { useRoute } from "@react-navigation/native";
import { Camera } from 'expo-camera'
//importing modals
import AuthModal from '../modals/authModal'
import { Feather } from '@expo/vector-icons'
import { uploadBackId } from "../store/action/appStorage";
import Loader from '../loaders/Loader';
import { useSelector } from "react-redux";



const CameraFun = ({ navigation }) => {
    const [isAuthError, setIsAuthError] = useState(false)
    const [startCamera, setStartCamera] = useState("")
    const [authInfo, setAuthInfo] = useState("")
    const [preview, setPreview] = useState('')
    const [imageUrl, setImageUrl] = useState('')
    const [serverImage, setServerImage] = useState('')
    const [isLoading, setIsLoading] = useState('')
    const [permissionStatus, setPermissionStatus] = useState('')
    const [url, setUrl] = useState('')
    let { user, background, importantText, normalText, fadeColor, blue, fadeButtonColor } = useSelector(state => state.userAuth)
    let camera

    const route = useRoute()
    let dispatch = useDispatch()

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

    //initialling asking for permission
    useEffect(() => {
        askPermission()
    }, [askPermission])

    let askPermission = async () => {
        const { status } = await Camera.requestCameraPermissionsAsync()
        setPermissionStatus(status)

    }

    const updateAuthError = () => {
        setIsAuthError(prev => !prev)
        if (url) {
            navigation.navigate(url)
        }
    }

    const takePictureHandler = async () => {
        if (permissionStatus === 'granted') {
            if (!camera) {
                return;
            }
            let options = { quality: 1 }
            const photo = await camera.takePictureAsync(options)

            console.log(photo.uri)
            setImageUrl(photo)
            setServerImage(photo.base64)
            setPreview(true)

        } else {

        }
    }

    const retakePictureHandler = async () => {
        setPreview('')
        setImageUrl('')
    }
    //this function uploads the url
    const uploadPictureHandler = async () => {
        setIsLoading(true)
        imageUrl.user = user

        let res = await dispatch(uploadBackId(imageUrl))
        setIsLoading(false)
        if (!res.bool) {
            setIsLoading(false)
            setIsAuthError(true)
            setAuthInfo(res.message)
            return
        }
        //display sucess info and when clicked,navigate to home
        setIsLoading(false)
        setIsAuthError(true)
        setAuthInfo('Verification successful .It will take a maximum of 24 hours before you can be verified and set for trading. Contact support if it takes much longer')
        setUrl('Home')

    }

    if (isLoading) {
        return <Loader />

    }


    return (<>
        {isAuthError && <AuthModal modalVisible={isAuthError} updateVisibility={updateAuthError} message={authInfo} />}


        <SafeAreaView style={{ ...styles.screen, backgroundColor: background }}>
            <View style={styles.assetsheader}>
                < Pressable onPress={() => navigation.goBack()} style={styles.assetsheaderTextCon}>

                    <Pressable style={styles.assetsIcon}>
                        <Feather name="arrow-left" size={25} color={background === 'white' ? "black" : "white"} />

                    </Pressable>
                    <Pressable style={styles.assetsTextCon}>
                         <Text style={{...styles.assetsText,color:importantText}}>ID Verification </Text>

                    </Pressable>
                   

                </ Pressable>


            </View>

            < Pressable onPress={() => navigation.goBack()} style={styles.infoCon}>

                <Text style={{...styles.infoText,color:normalText}}>Please upload photo of the back section of your driver's license or state ID </Text>

            </ Pressable>



            {preview ? <Image source={{ uri: imageUrl.uri }} style={styles.camera} /> : <Camera
                style={styles.camera}
                ref={(r) => {
                    camera = r
                }}
            >
            </Camera>}







            {preview ? <View style={styles.btnContainer}>
                < Pressable style={styles.rbtn} onPress={retakePictureHandler}>
                    <Text style={styles.resend}>Retake photo</Text>

                </ Pressable>

                < Pressable style={{...styles.rbtn_2,backgroundColor:fadeColor}} onPress={uploadPictureHandler}>
                    <Text style={{ ...styles.resend, color:importantText }}>upload photo</Text>

                </ Pressable>

            </View> : < Pressable style={styles.btn} onPress={takePictureHandler}>
                <Text style={{...styles.resend,color:importantText}}>Take photo</Text>

            </ Pressable>}


        </SafeAreaView>
    </>
    )




}

const styles = StyleSheet.create({
    screen: {
        flex:1,
        paddingTop: 15,
        paddingHorizontal: '5%',
        width: Dimensions.get('window').width
    },
    assetsheaderCon: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',


    },
    assetsheader: {
        marginBottom: 10,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',


    },
    assetsheaderTextCon: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        width: '100%',
        marginBottom: 10


    },
    assetsIcon: {
        width:'20%',
        display:'flex',
        flexDirection:'row',
        justifyContent: 'flex-start',

    },

    assetsTextCon: {
        width:'80%',
        display:'flex',
        flexDirection:'row',
        justifyContent: 'flex-start',
        
    },

    assetsText: {
        fontSize: 22,
        fontFamily: 'Poppins',
        textAlign: 'center',
        alignSelf: 'flex-end',
        marginTop: 3,
    },

    infoCon: {
        marginBottom: 30

    },
    infoText: {
        fontSize: 17,
        fontFamily: 'ABeeZee',
        color: 'rgb(120,120,120)',
        textAlign: 'left'

    },
    camera: {
        height: Dimensions.get('window').height / 2.5,
        width: '100%',
        marginBottom: 50,
        borderRadius: Dimensions.get('window').height / 2.5,
        backgroundColor: 'rgb(0,0,0)',
    },
    btnContainer: {
        height: 100

    },
    btn: {
        width: '100%',
        alignSelf: 'center',
        paddingVertical: 17,
        borderRadius: 30,
        backgroundColor: '#1652f0',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    },
    rbtn: {
        width: '100%',
        alignSelf: 'center',
        paddingVertical: 17,
        borderRadius: 30,
        backgroundColor: '#1652f0',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 10
    },
    rbtn_2: {
        width: '100%',
        alignSelf: 'center',
        paddingVertical: 17,
        borderRadius: 30,
        backgroundColor: '#fff',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 10

    },
    resend: {
        fontSize: 15,
        fontFamily: 'Poppins',
        color: '#fff'

    }




});




export default CameraFun