import React from 'react'
import { View, Text, SafeAreaView, StyleSheet, Pressable } from 'react-native'
import { AntDesign, Feather } from '@expo/vector-icons';
import * as WebBrowser from 'expo-web-browser';
import { useDispatch, useSelector } from "react-redux";

const Privacy = ({ navigation }) => {
    let { background, importantText, normalText, fadeColor, blue, fadeButtonColor } = useSelector(state => state.userAuth)

    const continueHandler = async () => {
        //navigating to the browser
        //navigate to password reset page
        await WebBrowser.openBrowserAsync('https://www.capchains.cloud/policy')
    }

    return (<SafeAreaView style={{ flex: 1, backgroundColor: background }}>
        <View style={styles.container}>
            <View style={{ ...styles.navigationHeader, backgroundColor: background, borderBottomColor: fadeColor }}>
                <Pressable onPress={() => navigation.goBack()} style={{ ...styles.goback }} >
                    <Feather name="arrow-left" size={23} color={background === 'white' ? "black" : "white"} />
                    <Text style={{ ...styles.headerName, color: importantText }}>Privacy</Text>
                </Pressable>
            </View>

            <Pressable style={styles.settingContainer} onPress={() => continueHandler('privacy')}>
                <View>
                    <Text style={{...styles.settingText,color:normalText}}>Privacy policy</Text>
                </View>
                <AntDesign name="right" size={18} color={background === 'white' ? "black" : "white"} />

            </Pressable>

            <Pressable style={styles.settingContainer} onPress={() => continueHandler('cookie')}>
                <View>
                    <Text style={{...styles.settingText,color:normalText}}>Cookie policy</Text>
                </View>
                <AntDesign name="right" size={18} color={background === 'white' ? "black" : "white"} />

            </Pressable>
        </View>
    </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        paddingHorizontal: '5%',
       
    },
    container:{
        paddingHorizontal: '5%',
    },
    /* styling header */
    navigationHeader: {
        paddingBottom: 10,
        zIndex: 10,
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 30,
        paddingTop: 20,
    },
    headerName: {
        fontFamily: 'Poppins',
        fontSize: 19,
        marginLeft: '40%',


    },
    goback: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center'


    },

    settingContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 30

    },
    settingText: {
        fontSize: 18,
        fontFamily: 'ABeeZee'
    },








});

export default Privacy