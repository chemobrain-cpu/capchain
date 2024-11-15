import React, { useState, useEffect } from 'react'
import {
    View,
    Text,
    StyleSheet,
    Pressable,
    SafeAreaView,
    ScrollView,
    Image,
    Dimensions
} from "react-native";
import { Entypo, Ionicons } from '@expo/vector-icons';
import { useSelector } from "react-redux";
import PayLoaders from '../loaders/payloader'

const Pay = ({ navigation }) => {
    let [isLoading, setIsLoading] = useState(true)
    let [text, setText] = useState('')
    let [focus, setFocus] = useState(false)
    let { user, background, importantText, normalText, fadeColor, blue, fadeButtonColor } = useSelector(state => state.userAuth)

    const navigateToRecieve = () => {
        navigation.navigate('Recieve')
    }
    const navigateToSend = () => {
        navigation.navigate('PaymentChoice')
    }

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
        setIsLoading(true)
        setTimeout(() => {
            setIsLoading(false)
        }, 4000)

    }, [])

    if (isLoading) {
        return <PayLoaders />
    }

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: background }}>
            <ScrollView contentContainerStyle={styles.scrollContainer} stickyHeaderIndices={[0]}>
                <View style={{ display: 'flex', width: '100%' }}>
                    <View style={{ ...styles.headerContainer, backgroundColor: background, }}>
                        <Pressable onPress={() => navigation.openDrawer()}>
                            <Entypo name="menu" size={24} color={background === 'white' ? "black" : "white"} />

                        </Pressable>

                        <Pressable style={styles.giftContainer}>
                            <Text style={{ ...styles.giftText, color: importantText }}>Pay </Text>

                        </Pressable>


                        <Pressable onPress={() => navigation.navigate('Notification')}>
                            <Ionicons name="notifications" size={30} color={background === 'white' ? "black" : "white"} />
                            <View style={styles.notification}>
                                <View style={styles.notificationTextContainer}>
                                    <Text style={styles.notificationText}>{user.notifications.length}</Text>

                                </View>

                            </View>

                        </Pressable>


                    </View>
                </View>

                <View style={styles.cryptogiftContainer}>
                    <View style={styles.cryptogiftContent}>
                        <Text style={{ ...styles.cryptogiftContentHeader, color: importantText }}>Crypto gifts.</Text>
                        <Text style={{ ...styles.cryptogiftContentText, color: normalText }}>Give crypto to your friends and family</Text>

                    </View>
                    <View style={styles.cryptogiftImage}>
                        <Image
                            source={require('../assets/icons/pay.png')}
                            style={{ width: 90, height: 90 }} />

                    </View>

                </View>


                <View style={{
                    ...styles.buttonContainer,
                    borderColor: background === 'white' ? 'rgb(180,180,180)' : fadeColor,
                }}>
                    <Pressable style={{ ...styles.button, backgroundColor: fadeColor }} onPress={navigateToRecieve}>
                        <Text style={{ ...styles.buttonText, color: importantText }}>
                            Recieve
                        </Text>

                    </Pressable>
                    <Pressable style={{ ...styles.button, backgroundColor: blue }} onPress={navigateToSend}>
                        <Text style={{ ...styles.buttonText }}>
                            Send
                        </Text>

                    </Pressable>

                </View>




            </ScrollView>
        </SafeAreaView>


    );
};

const styles = StyleSheet.create({
    scrollContainer: {
        width: Dimensions.get('window').width,
        paddingBottom: 150
    },
    headerContainer: {
        paddingTop: 15,
        display: "flex",
        flexDirection: "row",
        justifyContent: 'space-between',
        paddingHorizontal: 15,
        marginBottom: 25,

    },
    giftContainer: {
        display: "flex",
        flexDirection: 'row',
        borderRadius: 10,
        alignItems: "center",
        height: 40,
        paddingHorizontal: 30,
    },
    giftText: {
        fontSize: 16,
        fontFamily: 'Poppins',
        marginLeft: 10,
        alignSelf: 'flex-start'
    },
    notification: {
        width: 20,
        height: 20,
        position: 'relative',
        padding: 10,
        marginRight: 20
    },
    notificationTextContainer: {
        width: 25,
        height: 25,
        backgroundColor: 'red',
        position: 'absolute',
        bottom: 35,
        left: 15,
        display: 'flex',
        alignItems: "center",
        justifyContent: 'center',
        borderRadius: 25
    },
    notificationText: {
        color: '#fff',
        fontFamily: 'Poppins',
    },


    cryptogiftContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginHorizontal: 15,
        height: Dimensions.get('window').height / 1.7,


    },
    cryptogiftContent: {
        flex: 2

    },
    cryptogiftContentHeader: {
        fontSize: 18,
        fontFamily: 'Poppins'

    },
    cryptogiftContentText: {
        fontSize: 17,
        fontFamily: 'ABeeZee',
        color: 'grey'

    },
    cryptogiftImage: {
        flex: 1

    },

    buttonContainer: {
        borderTopWidth: .5,
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        height: '20%',

    },
    button: {
        paddingVertical: 17,
        borderRadius: 40,
        width: '40%',
        backgroundColor: 'red',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'

    },
    buttonText: {
        color: '#fff',
        fontFamily: 'Poppins',
        fontSize: 15

    }




})

export default Pay;