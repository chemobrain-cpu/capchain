import React from 'react'
import { View, Text, SafeAreaView, StyleSheet, Pressable } from 'react-native'
import { Ionicons, Feather } from '@expo/vector-icons';
import { Card } from "react-native-shadow-cards";
import { useSelector } from "react-redux";



const LimitFeature = ({ navigation }) => {
    let { background, importantText, normalText, fadeColor, blue, fadeButtonColor } = useSelector(state => state.userAuth)
    

    const continueHandler = () => {
        navigation.navigate('VerifyId')
    }

    return (<SafeAreaView style={{ ...styles.screen, backgroundColor: background }}>
        <View style={styles.container}>


            <View  style={{ ...styles.navigationHeader, backgroundColor: background}}>

                <Pressable onPress={() => navigation.goBack()} style={{ ...styles.goback }} >
                    <Feather name="arrow-left" size={23} color={background === 'white' ? "black" : "white"}  />
                    <Text style={{...styles.headerName,color:importantText}}>Limits and Features</Text>
                </Pressable>


            </View>

           


            <View style={styles.listContainer}>
                <View style={styles.actionCon}>
                    <View style={{ ...styles.numberCon }}>
                        <Feather name="credit-card" size={20} color={background === 'white' ? "black" : "white"}  />
                    </View>
                    <View style={styles.actionTextCon}>
                        <Text style={{...styles.actionText,color:normalText}}>3D Secure purchases</Text>
                    </View>

                </View>
                <View style={styles.durationCon}>
                    <Text style={{...styles.durationText,color:normalText}}>$40/week</Text>

                </View>


            </View>

            <View style={styles.listContainer}>
                <View style={styles.actionCon}>
                    <View style={{ ...styles.numberCon }}>
                        <Ionicons name="send-sharp" size={24} color={background === 'white' ? "black" : "white"} />
                    </View>
                    <View style={styles.actionTextCon}>
                        <Text style={{...styles.actionText,color:normalText}}>Send cryptocurrency</Text>

                    </View>

                </View>
                <View style={styles.durationCon}>
                    <Text style={{...styles.durationText,color:normalText}}>Enabled</Text>

                </View>


            </View>

            <View style={styles.listContainer}>
                <View style={styles.actionCon}>
                    <View style={{ ...styles.numberCon }}>
                        <Ionicons name="qr-code-sharp" size={24} color={background === 'white' ? "black" : "white"}  />
                    </View>
                    <View style={styles.actionTextCon}>
                        <Text style={{...styles.actionText,color:normalText}}>Receive cryptocurrency</Text>

                    </View>

                </View>
                <View style={styles.durationCon}>
                    <Text style={{...styles.durationText,color:normalText}}>Enabled</Text>

                </View>


            </View>





            <Card style={{ ...styles.photoCard, backgroundColor: background,borderColor:background==='black'?fadeColor:'' }}>
                <Text style={{...styles.headingText,color:importantText}}>
                        Feature upgrade available
                    </Text>
                    <Text style={{...styles.text,color:importantText}}>
                        Buy digital currency
                    </Text>
                <Pressable style={{...styles.button}} onPress={continueHandler}>
                    <Text style={styles.buttonText}>
                        Verify photo ID
                    </Text>

                </Pressable>
            </Card>









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
    /* styling header */
    navigationHeader: {
        paddingBottom: 10,
        backgroundColor: '#fff',
        zIndex: 10,
        width: '100%',
        borderBottomColor: 'rgb(197, 197, 197)',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',


    },
    headerName: {
        fontFamily: 'Poppins',
        fontSize: 20,
        marginLeft: '10%'

    },
    goback: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center'


    },




    listContainer: {
        display: 'flex',
        flexDirection: 'row',
        paddingVertical: 20,
        alignItems: 'center',
        width: '100%',
    },
    numberCon: {
        height: 30,
        borderRadius: 30,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },

    actionCon: {
        width: '80%',
        flexDirection: "row",
        paddingRight: '5%'


    },
    durationCon: {
        flexDirection: "row",
        alignItems: 'center',
        width: '15%',
        justifyContent: 'flex-end'

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
        paddingLeft: 10,
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

    /* styling the photo card */
    photoCard: {
        marginTop:20,
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent:"flex-start",
        padding:10,
        borderWidth:.5

    },
    headingText:{
        fontSize: 17,
        fontFamily: 'Poppins',
        marginBottom:10

    },
    text:{
        fontSize: 16,
        fontFamily: 'ABeeZee',
        color: 'rgb(44, 44, 44)',
        marginBottom:15

    },

    button: {
        width: '90%',
        paddingVertical: 17,
        borderRadius: 30,
        backgroundColor: '#1652f0',
        marginBottom: 50,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',

    },
    buttonText: {
        color: '#fff',
        fontFamily: 'Poppins',
        fontSize: 15,
    }

});

export default LimitFeature