import React from 'react'
import { View, Text, SafeAreaView, StyleSheet, Pressable, Switch } from 'react-native'
import { Feather, FontAwesome, AntDesign } from '@expo/vector-icons';
import { changeToBlackBackground,changeToWhiteBackground } from "../store/action/appStorage";
import * as WebBrowser from 'expo-web-browser';
import { useDispatch, useSelector } from "react-redux";

const Appearance = ({ navigation }) => {
    let { background, importantText, normalText } = useSelector(state => state.userAuth)
    let dispatch = useDispatch()

    const changeTheme = async () => {
        if(background === 'white'){
            await dispatch(changeToBlackBackground())
        }else{
            await dispatch(changeToWhiteBackground())

        }
    }

    return (<SafeAreaView style={{ flex: 1, backgroundColor: background }}>
        <View style={styles.container}>
            <View style={styles.headerContainer}>
                <Pressable onPress={() => navigation.goBack()} style={styles.headerContainerIcon} >
                    <AntDesign name="close" size={23} color={background === 'white' ? "black" : "white"} />
                </Pressable>



                <Pressable style={{ ...styles.headerContainerTitle }} >
                    <Text style={{ ...styles.title, color: importantText }}>Change theme</Text>
                </Pressable>

            </View>

            <Pressable style={styles.settingContainer} onPress={() => changeTheme()}>
                <View>
                    <Text style={{ ...styles.settingText, color: normalText }}>Enable dark</Text>
                </View>
                <Switch
                    trackColor={{ false: "grey", true: "grey" }}
                    thumbColor={"#fff"}
                    onValueChange={changeTheme}
                    ios_backgroundColor="#3e3e3e"
                    value={background==='black'?true:false}
                    style={{ transform: [{ scaleX: 1.7 }, { scaleY: 1.7 }] }} />


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
    container: {
        paddingHorizontal: '5%',
    },
    /* styling header */

    headerContainer: {
        paddingTop: 15,
        display: "flex",
        flexDirection: "row",
        marginBottom: 45,
        alignItems: 'center',
        justifyContent: 'center'
    },
    headerContainerIcon: {
        width: '20%',
        display: "flex",
        flexDirection: "row",
        justifyContent: 'flex-start'

    },
    headerContainerTitle: {
        width: '80%',
        display: "flex",
        flexDirection: "row",
        justifyContent: 'flex-start'

    },
    title: {
        fontSize: 22,
        fontFamily: 'ABeeZee',
        textAlign: 'center'

    },
    balance: {
        fontSize: 17,
        fontFamily: 'ABeeZee',
        paddingLeft: 8,
        color: 'rgb(100,100,100)'
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

export default Appearance