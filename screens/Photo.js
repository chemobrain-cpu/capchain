import React, { useState, useEffect } from 'react'
import { View, Text, SafeAreaView, Pressable, StyleSheet, Alert, Image, Dimensions } from 'react-native';
import { useDispatch } from "react-redux";
import { useRoute } from "@react-navigation/native";
import { Camera } from 'expo-camera'
//importing modals
import AuthModal from '../modals/authModal'
import { Feather } from '@expo/vector-icons'
import { uploadPhotoId } from "../store/action/appStorage";
import Loader from '../loaders/Loader';
import { useSelector } from "react-redux";



const Photo = ({ navigation }) => {
    const [isAuthError, setIsAuthError] = useState(false)
    const [startCamera, setStartCamera] = useState("")
    const [authInfo, setAuthInfo] = useState("")
    const [preview, setPreview] = useState('')
    const [imageUrl, setImageUrl] = useState('')
    const [serverImage, setServerImage] = useState('')
    const [isLoading, setIsLoading] = useState('')
    const [permissionStatus, setPermissionStatus] = useState('')

    let { user } = useSelector(state => state.userAuth)
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
    useEffect(()=>{
        askPermission()
    },[askPermission])

    let askPermission = async()=>{
        const { status } = await Camera.requestCameraPermissionsAsync()
        setPermissionStatus(status)
    }


    const updateAuthError = () => {
        setIsAuthError(prev => !prev)
    }

    const takePictureHandler = async () => {
        if (permissionStatus === 'granted') {
            if (!camera) {
                return;
            }
            let options = { quality: 1 }
            const photo = await camera.takePictureAsync(options)
            
            setImageUrl(photo)
            setServerImage(photo.base64)
            setPreview(true)
            setIsLoading(false)

        } else {
            return
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

        let res = await dispatch(uploadPhotoId(imageUrl))
        setIsLoading(false)
        if (!res.bool) {
            setIsLoading(false)
            setIsAuthError(true)
            setAuthInfo(res.message)
            return
        }
        //navigate to home
        navigation.navigate('Home')
    }

    if (isLoading) {
        return <Loader />

    }


    return (<>
        {isAuthError && <AuthModal modalVisible={isAuthError} updateVisibility={updateAuthError} message={authInfo} />}
        <SafeAreaView style={styles.screen}>

            <View style={styles.assetsheader}>
                < Pressable onPress={() => navigation.goBack()} style={styles.assetsheaderTextCon}>
                    <Feather name="arrow-left" size={25} color={"rgb(44, 44, 44)"} />
                    <Text style={styles.assetsText}>Photo Upload </Text>
                </ Pressable>


            </View>

            < Pressable onPress={() => navigation.goBack()} style={styles.infoCon}>

                <Text style={styles.infoText}>Please take a photo of yourself </Text>

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

                < Pressable style={styles.rbtn_2} onPress={uploadPictureHandler}>
                    <Text style={{ ...styles.resend, color: 'black' }}>upload photo</Text>

                </ Pressable>

            </View> : < Pressable style={styles.btn} onPress={takePictureHandler}>
                <Text style={styles.resend}>Take photo</Text>
            </ Pressable>}




        </SafeAreaView>
    </>
    )




}

const styles = StyleSheet.create({
    screen: {
        paddingTop: 15,
        paddingHorizontal: 20,
        width: Dimensions.get('window').width
    },
    assetsheaderCon: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        paddingLeft: '5%',


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
        marginBottom: 10,


    },
    assetsText: {
        fontSize: 22,
        fontFamily: 'Poppins',
        paddingLeft: '10%',
        textAlign: 'center',
        alignSelf: 'flex-end',
        marginTop:3,
    },
    
    infoCon:{
        marginBottom: 30

    },
    infoText:{
        fontSize: 17,
        fontFamily: 'ABeeZee',
        color:'rgb(120,120,120)',
        textAlign:'left'

    },
    camera: {
        height: Dimensions.get('window').height / 2.5,
        width:'100%',
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




export default Photo