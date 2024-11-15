import React from 'react'
import { View, Text, StyleSheet,Pressable } from 'react-native'
import * as Progress from 'react-native-progress'
import { Card } from "react-native-shadow-cards"
import { useSelector } from "react-redux";

let Setup = ({ setupHandler}) => {
    let { user } = useSelector(state => state.userAuth)

    //render different card depending on the identity of the user
    if (!user.isPayVerified) {
        return <Pressable onPress={()=>setupHandler('CardForm')}><Card style={styles.setupContainer} >
            <Text style={styles.welcomeText}>
                Welcome to coinbase

            </Text>
            <Text style={styles.setupText}>
                Finish

            </Text>
            <Text style={styles.setupText}>
                account

            </Text>
            <Text style={styles.setupText}>
                setup

            </Text>
            <View style={styles.progressContainer}>
                <Progress.Bar progress={0.5} width={120} height={12} unfilledColor='rgb(240,240,240)' color="#1652f0" style={styles.progress} />
                <Text style={styles.progressText}>2/4</Text>

            </View>





        </Card></Pressable>

    } else if (!user.isFrontIdVerified || !user.isBackIdVerified) {
        return <Pressable onPress={()=>setupHandler('VerifyId')}><Card style={styles.setupContainer} >
            <Text style={styles.welcomeText}>
                Welcome to coinbase

            </Text>
            <Text style={styles.setupText}>
                Finish

            </Text>
            <Text style={styles.setupText}>
                account

            </Text>
            <Text style={styles.setupText}>
                setup

            </Text>
            <View style={styles.progressContainer}>
                <Progress.Bar progress={0.75} width={120} height={12} unfilledColor='rgb(240,240,240)' color="#1652f0" style={styles.progress} />
                <Text style={styles.progressText}>3/4</Text>

            </View>





        </Card></Pressable>
    }
    return <></>




}

const styles = StyleSheet.create({
    setupContainer: {
        borderRadius: 10,
        padding: 15,
        marginBottom: 25,
        marginHorizontal: '5%',
    },
    welcomeText: {
        fontSize: 18,
        fontFamily: 'Poppins',
        color: '#1652f0',
        marginBottom: 10

    },
    setupText: {
        fontSize: 30,
        color: 'rgb(15,15,15)'

    },
    progressContainer: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',

    },
    progress: {
        backgroundColor: 'rgb(240,240,240)',
        borderColor: '#fff',
        marginTop: 10,
        borderRadius: 10,
        marginRight: 15

    },
    progressText: {
        fontSize: 14,
        fontFamily: 'Poppins',
        marginTop: 10
    },

})

export default React.memo(Setup)