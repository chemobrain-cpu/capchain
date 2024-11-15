import React, { useState, useEffect } from 'react'
import { View, Text, SafeAreaView, ScrollView, Pressable, StyleSheet, Image, Switch } from 'react-native'
import { Feather, AntDesign } from '@expo/vector-icons';
import { Card } from "react-native-shadow-cards"
import { useDispatch, useSelector } from "react-redux";
import { logout, offPinSwitch, onPinSwitch, toggleBalance, closeMyAccount } from "../store/action/appStorage";
import SettingModal from '../modals/profileSettingModal';
import * as WebBrowser from 'expo-web-browser';
import { truncate } from "../utils/util"
import AuthModal from '../modals/authModal'
import Loader from '../loaders/Loader';

const ProfileSetting = ({ navigation }) => {

    const [header, setHeader] = useState(false);
    let { user, background, importantText, normalText, fadeColor, blue, fadeButtonColor } = useSelector(state => state.userAuth)
    let dispatch = useDispatch()
    const [modalVisible, setModalVisible] = useState(false)
    const [isAuthError, setIsAuthError] = useState(false)
    const [authInfo, setAuthInfo] = useState("")
    const [url, setUrl] = useState("");
    const [isLoading, setIsLoading] = useState(false)
    const [isHideLoading, setIsHideLoading] = useState(false)

    const [isTopic, setIsTopic] = useState("")
    const [isInfo, setIsInfo] = useState("")
    const [action, setAction] = useState("")

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


    const scrollHandler = (e) => {
        if (e.nativeEvent.contentOffset.y > 70) {
            setHeader(true)
        } else {
            setHeader(false)

        }
    }

    const signoutHandler = async () => {
        dispatch(logout())
    }

    const navigateToPayment = () => {
        navigation.navigate('LinkToCard')
    }

    let updateVisibility = async (data) => {
        if (data == "changeInfo") {
            navigation.navigate('UserCard')
            return setModalVisible(false)
        }
        //go further to close account
        if (isLoading) {
            return
        }
        setModalVisible(false)
    }



    const changeInfo = () => {
        setIsTopic("Change Information")
        setIsInfo("To change your info,tap the button below to proceed.")
        setAction('changeInfo')
        setModalVisible(true)
    }

    const limits = () => {
        navigation.navigate('LimitAndFeatures')

    }

    const goToPrivacy = () => {
        navigation.navigate('Privacy')
    }

    const changePhone = () => {
        navigation.navigate('PhoneSetting')

    }

    const supportHandler = async () => {
        //navigating to the browser
        //navigate to password reset page
        await WebBrowser.openBrowserAsync('https://www.capchains.cloud/support')
    }

    const requirePinHandler = async () => {
        if (isLoading) {
            return
        }
        //check if user pin is enabled to true
        if (user.isRequiredPin) {
            setIsLoading(true)
            let res = await dispatch(offPinSwitch())
            if (!res.bool) {

                setAuthInfo(res.message)
                setUrl('ProfileSetting')
                setIsAuthError(true)
                setIsLoading(false)
                return

            }
            //it has been turn off
            setAuthInfo('security pin has been disabled')
            setUrl('ProfileSetting')
            setIsAuthError(true)
            setIsLoading(false)
            return


        }
        //does user have the pin?
        if (!user.pin) {
            setAuthInfo('Secure your assets with a unique 4 digit pin. Tap to continue')
            setUrl('Pin')
            setIsAuthError(true)
            return

        }

        //finally , send request to server to turn user.isRequiredPin to on
        setIsLoading(true)
        let res = await dispatch(onPinSwitch())
        if (!res.bool) {
            setAuthInfo(res.message)
            setUrl('ProfileSetting')
            setIsAuthError(true)
            setIsLoading(false)
            return

        }
        //it has been turn off
        setAuthInfo("Security pin has been enabled for this account")
        setUrl('ProfileSetting')
        setIsAuthError(true)
        setIsLoading(false)

    }

    const pinSettingHandler = () => {
        navigation.navigate('PinSetting')
    }

    const appearanceHandler = ()=>{
        navigation.navigate('Appearance')

    }

    const hideHandler = async () => {

        if (isHideLoading) {
            return;
        }
        if (user.isHideBalance) {
            //turn it to off
            setIsHideLoading(true)
            let res = await dispatch(toggleBalance({ bool: false }))
            if (!res.bool) {
                setIsHideLoading(true)
                setAuthInfo(res.message)

                setUrl('ProfileSetting')

                setIsAuthError(true)
                setIsHideLoading(false)
                return

            }
            setAuthInfo('Account balance for this device is visible')

            setUrl('ProfileSetting')

            setIsAuthError(true)
            setIsHideLoading(false)

            return
        }
        setIsHideLoading(true)
        let res = await dispatch(toggleBalance({ bool: true }))
        //turn it to on
        if (!res.bool) {
            setIsHideLoading(true)
            setAuthInfo(res.message)

            setUrl('ProfileSetting')

            setIsAuthError(true)
            setIsHideLoading(false)
            return

        }

        setAuthInfo('Account balance for this device is not visible')
        setUrl('ProfileSetting')
        setIsAuthError(true)
        setIsHideLoading(false)

        return



    }

    const updateAuthError = () => {
        setIsAuthError(prev => !prev)
        return navigation.navigate(url)
    }

    const closeAccount = async () => {
        setIsTopic("Close account?")
        setIsInfo("Closing your account can't be undone.contact admin!")
        setAction('closeAccount')
        setModalVisible(true)

    }

    if (isLoading || isHideLoading) {
        return <Loader />
    }


    return (<>
        {isAuthError && <AuthModal modalVisible={isAuthError} updateVisibility={updateAuthError} message={authInfo} />}

        <SettingModal modalVisible={modalVisible}
            updateVisibility={updateVisibility} topic={isTopic} info={isInfo} action={action} />

        <SafeAreaView style={{ ...styles.screen, backgroundColor: background }}>

            <View style={{ ...styles.navigationHeader, backgroundColor: background, position: header ? "absolute" : 'static', top: header ? 0 : 0, borderBottomWidth: header ? .5 : 0, borderBottomColor:fadeColor }}>
                <Pressable onPress={() => navigation.goBack()} >

                    <Feather name="arrow-left" size={24} color={background === 'white' ? "black" : "white"} />
                </Pressable>

                <Text style={{ ...styles.headerName, color: importantText, display: header ? 'flex' : 'none' }}>{truncate(user.firstName, 8)} {truncate(user.lastName, 8)}</Text>
            </View>

            <ScrollView showsVerticalScrollIndicator={false} style={styles.scrollviewContainer}
                onScroll={scrollHandler}>

                <Text style={{ ...styles.email, color: importantText, marginTop: header ? 50 : 0 }}>{user.email}</Text>

                <Text style={{ ...styles.username, color: normalText }}>{truncate(user.firstName, 8)} {truncate(user.lastName, 8)}</Text>


                <Card style={{ ...styles.card, borderColor: fadeColor, backgroundColor: background }}>
                    <Text style={{ ...styles.cardText, color: normalText }}>
                        share your love of crypto and get $100.000 of free bitcoin

                    </Text>
                    <Image
                        source={require('../assets/icons/box.png')}
                        style={{ width: 70, height: 70 }} />
                </Card>

                <Text style={{ ...styles.paymentText, color: importantText }}>Payments methods</Text>

                <Pressable style={{ ...styles.button,backgroundColor:fadeColor }} onPress={navigateToPayment}>
                    <Text style={{ ...styles.buttonText, color: importantText }}>Add a payment method</Text>
                </Pressable>

                <Text style={{ ...styles.paymentText, color: importantText }}>Account</Text>

                <Pressable style={styles.settingContainer} onPress={limits}>
                    <View>
                        <Text style={{ ...styles.settingText, color: normalText }}>Limits and features</Text>
                    </View>
                    <AntDesign name="right" size={18} color={background === 'white' ? "black" : "white"} />

                </Pressable>




                <Pressable style={styles.settingContainer} onPress={changeInfo}>
                    <View>
                        <Text style={{ ...styles.settingText, color: normalText }}>Change Info</Text>
                    </View>
                    <AntDesign name="right" size={18} color={background === 'white' ? "black" : "white"} />

                </Pressable>



                <Pressable style={styles.settingContainer} onPress={goToPrivacy}>
                    <View>
                        <Text style={{ ...styles.settingText, color: normalText }}>Privacy</Text>
                    </View>
                    <AntDesign name="right" size={18} color={background === 'white' ? "black" : "white"} />

                </Pressable>

                <Pressable style={styles.settingContainer} onPress={changePhone}>
                    <View>
                        <Text style={{ ...styles.settingText, color: normalText }}>Phone Numbers</Text>
                    </View>
                    <AntDesign name="right" size={18} color={background === 'white' ? "black" : "white"} />

                </Pressable>



                <Pressable style={styles.switchContainer} onPress={hideHandler}>
                    <View>
                        <Text style={{ ...styles.settingText, color: normalText }}>Close Account</Text>
                    </View>

                    <Switch
                        trackColor={{ false: "grey", true: "grey" }}
                        thumbColor={"#fff"}

                        ios_backgroundColor="#3e3e3e"
                        onValueChange={closeAccount}
                        value={user.isHideBalance}
                        style={{ transform: [{ scaleX: 1.7 }, { scaleY: 1.7 }] }}

                    />


                </Pressable>



                <Text style={{ ...styles.paymentText, color: importantText }}>Display</Text>

                <Pressable style={styles.settingContainer}  onPress={appearanceHandler}>
                    <View>
                        <Text style={{ ...styles.settingText, color: normalText }}>Appearance</Text>
                    </View>
                    <AntDesign name="right" size={18} color={background === 'white' ? "black" : "white"} />

                </Pressable>

                <Pressable style={styles.switchContainer} onPress={hideHandler}>
                    <View>
                        <Text style={{ ...styles.settingText, color: normalText }}>Hide balance</Text>
                    </View>

                    <Switch
                        trackColor={{ false: "grey", true: "grey" }}
                        thumbColor={"#fff"}

                        ios_backgroundColor="#3e3e3e"
                        onValueChange={hideHandler}
                        value={user.isHideBalance}
                        style={{ transform: [{ scaleX: 1.7 }, { scaleY: 1.7 }] }}

                    />
                </Pressable>
                <Text style={{ ...styles.paymentText, color: importantText }}>Security</Text>

                <Pressable style={styles.switchContainer} onPress={requirePinHandler}>
                    <View>
                        <Text style={{ ...styles.settingText, color: normalText }}>Require pin</Text>
                    </View>

                    <Switch
                        trackColor={{ false: "grey", true: "grey" }}
                        thumbColor={"#fff"}
                        onValueChange={requirePinHandler}
                        value={user.isRequiredPin}
                        style={{ transform: [{ scaleX: 1.7 }, { scaleY: 1.7 }] }}

                    />

                </Pressable>

                <Pressable style={styles.settingContainer} onPress={pinSettingHandler}>
                    <View>
                        <Text style={{ ...styles.settingText, color: normalText }}>Pin settings</Text>
                    </View>
                    <AntDesign name="right" size={18} color={background === 'white' ? "black" : "white"} />

                </Pressable>



                <Pressable style={styles.settingContainer} onPress={supportHandler}>
                    <View>
                        <Text style={{ ...styles.settingText, color: normalText }}>Support</Text>
                    </View>
                    <AntDesign name="right" size={18} color={background === 'white' ? "black" : "white"} />

                </Pressable>

                <Pressable style={{...styles.signoutbutton,backgroundColor:fadeColor}} onPress={signoutHandler}>
                    <Text style={styles.signoutbuttonText}>Sign out</Text>
                </Pressable>

                <Text style={{...styles.footerText,color:normalText}}>App Version:10.26.4(10260004),</Text>
                <Text style={{...styles.footerText,color:normalText}}>production</Text>




            </ScrollView>
        </SafeAreaView>
    </>

    )
}


const styles = StyleSheet.create({
    screen: {
        flex: 1,
    },
    navigationHeader: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'flex-start',
        paddingTop: 15,
        paddingBottom: 10,
        backgroundColor: '#fff',
        zIndex: 10,
        width: '100%',
        paddingHorizontal: 10,

    },
    headerName: {
        marginLeft: '25%',
        fontFamily: 'Poppins',
        fontSize: 17

    },
    scrollviewContainer: {
        width: '100%',
        paddingHorizontal: 15,
    },
    email: {
        color: 'rgb(80, 80, 80)',
        fontFamily: 'Poppins',
        fontSize: 16,
    },
    username: {
        color: "black",
        fontSize: 23,
        fontFamily: 'Poppins',
        marginBottom: 30
    },
    card: {
        width: '90%',
        borderRadius: 8,
        padding: 12,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderWidth: 1,
        borderBottomWidth: 2,

        marginBottom: 40,
        marginRight: '5%',
        marginLeft: '5%'
    },
    cardText: {
        fontSize: 17,
        width: '60%',
        fontFamily: 'ABeeZee',
        fontWeight: '100',
    },
    paymentText: {
        fontSize: 21,
        fontFamily: 'Poppins',
        marginBottom: 30
    },

    button: {
        width: '90%',
        paddingVertical: 18,
        borderRadius: 35,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 30,
        marginRight: '5%',
        marginLeft: '5%',
    },
    buttonText: {
        color: 'black',
        fontSize: 18,
        fontFamily: 'ABeeZee'

    },
    settingContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 50

    },
    switchContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 50,
        paddingRight: 10

    },
    settingText: {
        fontSize: 17,
        fontFamily: 'ABeeZee'
    },


    signoutbutton: {
        width: '100%',
        paddingVertical: 18,
        borderRadius: 35,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 30,
    },
    signoutbuttonText: {
        color: 'red',
        fontSize: 15,
        fontFamily: 'Poppins'

    },
    footerText: {
        fontSize: 15,
        fontFamily: 'ABeeZee',
        width: '100%',
        color: 'rgb(100,100,100)'

    }

})


export default ProfileSetting