import React from 'react'
import { View, Text, SafeAreaView, Pressable, StyleSheet, ScrollView, Dimensions, Image } from 'react-native';
import { useRoute } from "@react-navigation/native";
import { AntDesign } from '@expo/vector-icons';
import * as Progress from 'react-native-progress';
import {  useSelector } from "react-redux";


const Secure = ({ navigation }) => {
    const route = useRoute();
    const {
        email
    } = route.params

    let { background, importantText, normalText, fadeColor, blue, fadeButtonColor } = useSelector(state => state.userAuth)


    const continueHandler = () => {
        navigation.navigate('Number', {
            email: email
        })


    }

    return (<SafeAreaView style={{ ...styles.screen, backgroundColor: background }}>
        <View style={styles.container}>
            <View style={{ ...styles.navigationHeader, backgroundColor: background, borderColor: background }}>
                <Pressable style={styles.close} onPress={() => navigation.goBack()}>
                    <AntDesign name="close" size={22} fontWeight={100} color={normalText} style={{ fontWeight: '200' }} />
                </Pressable>

                <View style={styles.progress}>
                    <View style={styles.progressbar}>
                        <Progress.Bar progress={1} width={50} height={4} unfilledColor='rgb(240,240,240)' borderColor='#fff' />

                    </View>
                    <View style={styles.progressbar}>
                        <Progress.Bar progress={0} width={50} height={4} unfilledColor='rgb(240,240,240)' borderColor='#fff' />

                    </View>
                    <View style={styles.progressbar}>
                        <Progress.Bar progress={0} width={50} height={4} unfilledColor='rgb(240,240,240)' borderColor='#fff' />

                    </View>


                </View>

            </View>

            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.body}>
                <View style={styles.imageContainer}>
                    <Image
                        source={require('../assets/icons/padlock.png')}
                        style={{ width: 300, height: 300, }} />
                </View>

                <Text style={{ ...styles.headerText, color: importantText }}>Let's secure your account</Text>

                <View style={styles.listContainer}>
                    <View style={styles.actionCon}>
                        <View style={{ ...styles.numberCon }}>
                            <Text style={{ ...styles.number }}>1</Text>
                        </View>
                        <View style={styles.actionTextCon}>
                            <Text style={{ ...styles.actionText, color: normalText }}>Let's secure your account</Text>

                        </View>

                    </View>
                    <View style={styles.durationCon}>
                        <Text style={{ ...styles.durationText, color: normalText }}>Completed</Text>

                    </View>


                </View>

                <View style={styles.listContainer}>
                    <View style={styles.actionCon}>
                        <View style={{ ...styles.numberCon }}>
                            <Text style={{ ...styles.number }}>2</Text>
                        </View>
                        <View style={styles.actionTextCon}>
                            <Text style={{ ...styles.actionText, color: normalText }}>Secure your account</Text>
                            <Text style={{ color: 'rgb(100,100,100)', fontFamily: 'ABeeZee' }}>2-step verification</Text>
                        </View>

                    </View>
                    <View style={styles.durationCon}>
                        <Text style={{ ...styles.durationText, color: normalText }}>1 min</Text>

                    </View>


                </View>


                <View style={styles.listContainer}>
                    <View style={styles.actionCon}>
                        <View style={{ ...styles.numberCon, backgroundColor: "rgb(240,240,240)" }}>
                            <Text style={{ ...styles.number, color: 'rgb(100,100,100)', fontFamily: 'ABeeZee' }}>3</Text>
                        </View>
                        <View style={styles.actionTextCon}>
                            <Text style={{ ...styles.actionText, color: normalText }}>Verify your Identity</Text>
                            <Text style={{ color: 'rgb(100,100,100)', fontFamily: 'ABeeZee' }}>Required by financial regulations</Text>
                        </View>

                    </View>
                    <View style={styles.durationCon}>
                        <Text style={{ ...styles.durationText, color: normalText }}>5 min</Text>

                    </View>


                </View>




                <View>
                    <Pressable style={styles.button} onPress={continueHandler}>
                        <Text style={styles.buttonText}>
                            Continue
                        </Text>

                    </Pressable>
                </View>







            </ScrollView>




        </View>

    </SafeAreaView>
    )




}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        paddingHorizontal: '5%',
        paddingTop: 20
    },

    navigationHeader: {
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'flex-start',
        zIndex: 10,
        borderColor: '#fff',

    },
    close: {
        width: '20%',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'flex-start',

    },
    progress: {
        width: '80%',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        height: '100%',
        paddingLeft: 40,
        justifyContent: 'space-around'

    },
    progressbar: {

    },
    close: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',


    },
    body: {
        display: 'flex',
        flexDirection: 'column',
        paddingBottom: 50
    },
    imageContainer: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: Dimensions.get('window').height / 4,
        marginVertical: 10,
        marginBottom: 40,
    },


    headerText: {
        fontSize: 18,
        fontFamily: 'Poppins',
    },



    numberCon: {
        width: 30,
        height: 30,
        borderRadius: 30,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#1652f0'
    },
    number: {
        color: '#fff',
        fontFamily: 'Poppins',
    },
    listContainer: {
        display: 'flex',
        flexDirection: 'row',
        paddingVertical: 20,
        alignItems: 'center',
        width: Dimensions.get('window').width
    },

    actionCon: {
        display: 'flex',
        flexDirection: "row",
        alignItems: 'center',
        flex: 1


    },
    durationCon: {
        display: 'flex',
        flexDirection: "row",
        alignItems: 'center',
        flex: 1,
        justifyContent: 'center'

    },

    durationText: {
        fontSize: 18,
        fontFamily: 'Poppins',
        color: 'rgb(44, 44, 44)',
    },
    actionTextCon: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        paddingLeft: 15,
        justifyContent: 'flex-start'

    },
    actionText: {
        fontSize: 18,
        fontFamily: 'Poppins',
        color: 'rgb(44, 44, 44)',
    },
    durationText: {
        fontSize: 16,
        fontFamily: 'Poppins',
        color: 'rgb(44, 44, 44)',
    },






    button: {
        width: '100%',
        paddingVertical: 17,
        borderRadius: 30,
        backgroundColor: '#1652f0',
        marginBottom: 50,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'

    },
    buttonText: {
        color: '#fff',
        fontFamily: 'Poppins',
        fontSize: 15,
    }

});

export default Secure