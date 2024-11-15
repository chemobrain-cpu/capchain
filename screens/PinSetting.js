import React, { useEffect, useState } from 'react'
import { View, Text, SafeAreaView, StyleSheet, Pressable } from 'react-native'
import { Feather } from '@expo/vector-icons';
import Loader from '../loaders/Loader';
import { useDispatch, useSelector } from "react-redux";
import { Ionicons } from '@expo/vector-icons';


const PinSetting = ({ navigation }) => {
    let [isLoading, setIsLoading] = useState(true)
    let { user, background, importantText, normalText, fadeColor, blue, fadeButtonColor } = useSelector(state => state.userAuth)

    useEffect(() => {
        setTimeout(() => {
            setIsLoading(false)
        }, 2000)
    })

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

    const changePinHandler = async () => {
        //navigating to the browser
        navigation.navigate('Password')
    }

    if (isLoading) {
        return <Loader />
    }

    return (<SafeAreaView style={{ ...styles.screen, backgroundColor: background }}>

        <View style={{...styles.navigationHeader}}>
            <Pressable style={styles.headerIconCon}>
                <Ionicons name="arrow-back" size={22} fontWeight={100} color={background === 'white' ? "black" : "white"} />
            </Pressable>

            <Pressable style={styles.headerTextCon}>
                <Text style={{ ...styles.headerText, color: importantText }}>
                    Security pin
                </Text >
            </Pressable>
        </View>

        <View style={styles.phoneContainer}>
            <View style={styles.phoneIcon}>
                <Feather name="unlock" size={24} color={background === 'white' ? "black" : "white"} />
            </View>

            <Text style={{ ...styles.phoneNumber, color: importantText }}>
                ****
            </Text>

        </View>

        <Pressable style={{ ...styles.changePhone, backgroundColor: fadeColor }} onPress={changePinHandler}>
            <Text style={{ ...styles.changePhoneText, color: importantText }}>Change security pin</Text>
        </Pressable>

    </SafeAreaView>
    )




}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        backgroundColor: "#fff",
        paddingHorizontal: '5%',
        paddingTop: 20
    },
    /* styling header */
    navigationHeader: {
        paddingBottom: 10,
        zIndex: 10,
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 30


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

    headerName: {
        fontFamily: 'Poppins',
        fontSize: 19,
        marginLeft: '20%',


    },
    goback: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center'


    },
    phoneContainer: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 15

    },
    phoneNumber: {
        fontSize: 25,
        marginLeft: 12
    },

    changePhone: {
        width: '90%',
        paddingVertical: 18,
        borderRadius: 35,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 30,
        marginRight: '5%',
        marginLeft: '5%',
        borderWidth: 1,

    },
    changePhoneText: {
        fontSize: 15,
        fontFamily: 'Poppins',

    }









});

export default PinSetting