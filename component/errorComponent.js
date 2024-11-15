import React from 'react'
import { View, Text, SafeAreaView, StyleSheet, Dimensions, ScrollView,Image } from 'react-native'
import { Pressable } from 'react-native-gesture-handler';
import { useDispatch, useSelector } from "react-redux";

let Error = ({tryAgain}) => {

    let { background,importantText,normalText,fadeColor,blue,fadeButtonColor } = useSelector(state => state.userAuth)

    const handleTry = ()=>{
        tryAgain()
    }

    return (
        <SafeAreaView style={{...styles.screen,backgroundColor:background}}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={styles.imageContainer}>
                    <Image
                        source={require('../assets/icons/setting.png')}
                        style={{ width: 300, height: 300 }} />

                </View>
                <View style={styles.textContainer}>
                    <Text style={{...styles.title,color:importantText}}>We're having connection issues</Text>
                    <Text style={{...styles.text,color:normalText}}>We're looking into it right now. </Text>
                    <Text style={{...styles.text,color:normalText}}>
                        please quit the app and try
                    </Text>
                    <Text style={{...styles.text,color:normalText}}>
                        again.funds are safe
                    </Text>

                </View>
                <View style={{...styles.buttonContainer}}>
                    <Pressable style={{...styles.tryContainer,backgroundColor:fadeColor}} onPress={handleTry}>
                        <Text style={{...styles.statusText,color:importantText}}>
                            Try again
                        </Text>

                    </Pressable>
                    <Pressable style={{...styles.statusContainer,backgroundColor:fadeColor}}>
                        <Text style={{...styles.statusText,color:importantText}}>check status</Text>

                    </Pressable>

                </View>

            </ScrollView>
        </SafeAreaView>
    )
}


const styles = StyleSheet.create({
    screen: {
        flex: 1,
        paddingHorizontal: 15
    },
    imageContainer: {
        height: Dimensions.get('window').height / 2.2,
        display:'flex',
        alignItems:'center',
        justifyContent:'center'



    },
    textContainer: {
        height: Dimensions.get('window').height /4,

    },
    title: {
        fontSize: 22,
        textAlign: 'center',
        fontFamily: 'Poppins',

    },
    text: {
        fontSize: 18,
        textAlign: 'center',
        fontFamily: 'ABeeZee',
        color: 'rgb(100,100,100)'
    },
    buttonContainer: {
        height: Dimensions.get('window').height / 4,
        display: 'flex',
        flexDirection: 'column'

    },
    tryContainer: {
        width: '100%',
        paddingVertical: 17,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 30,
        backgroundColor: 'rgb(240,240,240)',
        marginBottom: 20

    },
    statusContainer: {
        width: '100%',
        paddingVertical: 17,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 30,
        backgroundColor: 'rgb(240,240,240)',


    },
    statusText: {
        fontSize: 15,
        fontFamily: 'Poppins'
    }




})

export default React.memo(Error)