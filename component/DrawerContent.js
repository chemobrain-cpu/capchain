import React from 'react';
import {
    DrawerContentScrollView,
} from '@react-navigation/drawer';
import * as WebBrowser from 'expo-web-browser';
import { View, Text, Pressable, StyleSheet, Image} from "react-native";
import { MaterialIcons, Ionicons, Octicons, FontAwesome, Entypo,MaterialCommunityIcons } from '@expo/vector-icons';
import { truncate } from "../utils/util"


function CustomDrawerContent({ navigation, user, background, importantText, normalText, fadeColor }) {


    let navigateToBrowser = async (data) => {


        if (data == 'capchain') {
            //navigate to password reset page
            await WebBrowser.openBrowserAsync('https://www.capchains.cloud')
        } else if (data == 'support') {
            //navigate to chat support page
            await WebBrowser.openBrowserAsync('https://www.capchains.cloud/support')

        } else if (data === 'Transactions') {
            navigation.navigate('Transactions')

        } else {
            //navigate to policy page
            await WebBrowser.openBrowserAsync('https://www.capchains.cloud/policy')

        }

    }

    let pictureHandler = () => {
        return
        //navigation.navigate('PhotoIdentity')
    }




    return (
        <DrawerContentScrollView style={{ flex: 1, backgroundColor: background }}>
            <View style={styles.drawerContainer}>

                {user.photo ? <Pressable style={{ ...styles.profileContainer, backgroundColor: fadeColor }} onPress={pictureHandler}>
                    <Image source={{ uri: user.identity }} style={{ width: 100, height: 100, borderRadius: 100 }} />
                </Pressable> : <Pressable style={{ ...styles.profileContainer, backgroundColor: fadeColor }} onPress={pictureHandler}>
                    <Ionicons name="person" size={80} color={background === 'white' ? "black" : "white"} style={{ paddingTop: 10 }} />
                    <Pressable style={styles.photo}>
                        <FontAwesome name="camera" size={30} color={background === 'white' ? "black" : "white"} />
                    </Pressable>


                </Pressable>}





                <Pressable style={styles.usernameCon}>
                    <Text style={{ ...styles.username, color: importantText }}>{truncate(user.firstName, 8)} {truncate(user.lastName, 8)}</Text>
                </Pressable>

                <Pressable style={{ ...styles.button, backgroundColor: fadeColor }} onPress={() => navigation.navigate('ProfileSetting')}>
                    <Text style={{ ...styles.buttonText, color: importantText }}>Profile & Settings</Text>
                </Pressable>


                <Pressable style={styles.content} onPress={() => navigation.navigate('LearnEarn')}>

                    <MaterialIcons name="add-task" size={21} style={{ paddingTop: 10 }} color={background === 'white' ? "black" : "white"} />

                    <Text style={{ ...styles.text, color: normalText }}>Learn and Earn
                    </Text>
                </Pressable>



                <Pressable style={styles.content} onPress={() => navigation.navigate('InviteFriend')}>

                    <MaterialIcons name="person-add-alt" size={21} style={{ paddingTop: 10 }} color={background === 'white' ? "black" : "white"} />

                    <Text style={{ ...styles.text, color: normalText }}>invite friends</Text>
                </Pressable>



                <Pressable style={styles.content} onPress={() => navigation.navigate('Send')}>
                    <Octicons name="gift" size={21} style={{ paddingTop: 10 }} color={background === 'white' ? "black" : "white"} />

                    <Text style={{ ...styles.text, color: normalText }}>send a gift</Text>
                </Pressable>

                <Pressable style={styles.content} onPress={() => navigateToBrowser('support')}>

                    <Entypo name="chat" size={21} style={{ paddingTop: 10 }} color={background === 'white' ? "black" : "white"} />

                    <Text style={{ ...styles.text, color: normalText }}>contact support</Text>
                </Pressable>

                <Pressable style={styles.content} onPress={() => navigateToBrowser('Transactions')}>

                    
                    <MaterialCommunityIcons name="transfer" size={21} style={{ paddingTop: 10 }} color={background === 'white' ? "black" : "white"}  />

                    <Text style={{ ...styles.text, color: normalText }}>Transaction history</Text>
                </Pressable>



                <View style={styles.footer}>
                    <Pressable onPress={() => navigateToBrowser('capchain')}>
                        <Text style={{ fontSize: 16, color: 'black', paddingLeft: 12, paddingTop: 10 }}>capchain .</Text>

                    </Pressable>


                    <Pressable onPress={() => navigateToBrowser('privacy')}>
                        <Text style={{ fontSize: 16, color: importantText, paddingLeft: 12, paddingTop: 10, textDecorationLine: 'underline' }}>Legal & Privacy</Text>

                    </Pressable>


                </View>








            </View>

        </DrawerContentScrollView>
    );
}

const styles = StyleSheet.create({
    drawerContainer: {
        display: 'flex',
        paddingTop: 10,
        marginHorizontal: 20,
    },
    profileContainer: {
        width: 120,
        height: 120,
        borderRadius: 120,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        backgroundColor: 'rgb(225, 225, 225)',
        alignSelf: 'center',
        marginBottom: 20,
        overflow: 'hidden',
        position: 'relative',
        zIndex: 1
    },
    photo: {
        position: 'absolute',
        top: '60%',
        left: '60%',
        zIndex: 3

    },
    camera: {
        width: 100,
        height: 100,
        borderRadius: 100,
    },
    usernameCon: {
        alignSelf: 'center',
        marginBottom: 15,
        fontFamily: 'Poppins'
    },
    username: {
        fontSize: 22,
        fontFamily: 'Poppins'
    },
    button: {
        alignSelf: 'center',
        marginBottom: 10,
        width: '100%',
        borderRadius: 50,
        paddingVertical: 19,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgb(240,240,240)'
    },
    buttonText: {
        fontSize: 17,
        color: 'black',
        fontFamily: 'Poppins'
    },
    content: {
        alignSelf: 'center',
        width: '100%',
        borderRadius: 50,
        paddingVertical: 13,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start'
    },
    text: {
        fontSize: 16,
        fontFamily: 'Poppins',
        color: 'black',
        paddingLeft: 12,
        paddingTop: 10
    },
    footer: {
        alignSelf: 'center',
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end'
    }



})






export default CustomDrawerContent;