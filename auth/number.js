import React from 'react'
import { View, Text, Pressable, StyleSheet,  ScrollView,  Dimensions,  Image } from 'react-native'
import { useRoute} from "@react-navigation/native";
import { Ionicons } from '@expo/vector-icons';
import * as Progress from 'react-native-progress'
import { useDispatch,useSelector } from "react-redux";
import {
    SafeAreaView,
  } from 'react-native-safe-area-context';




const Number = ({navigation}) => {
    let { background,importantText,normalText,fadeColor,blue,fadeButtonColor } = useSelector(state => state.userAuth)

    const route = useRoute();
    const {
        email
    } = route.params
    

    


    const continueHandler = ()=>{
        navigation.navigate('VerifyNumber', {
            email: email
        })
    }


    return (<SafeAreaView style={{ ...styles.screen, backgroundColor: background }}>
        <View style={styles.container}>
            <View style={{ ...styles.navigationHeader, backgroundColor: background, borderColor: background }}>
                <Pressable style={styles.close} onPress={() => navigation.goBack()}>
                    <Ionicons name="arrow-back" size={22} fontWeight={100} color={normalText} style={{ fontWeight: '200' }} />
                </Pressable>

                <View style={styles.progress}>
                    <View style={styles.progressbar}>
                        <Progress.Bar progress={1} width={50} height={4} unfilledColor='rgb(240,240,240)' borderColor='#fff' />

                    </View>
                    <View style={styles.progressbar}>
                        <Progress.Bar progress={0.3} width={50} height={4} unfilledColor='rgb(240,240,240)' borderColor='#fff' />

                    </View>
                    <View style={styles.progressbar}>
                        <Progress.Bar progress={0} width={50} height={4} unfilledColor='rgb(240,240,240)' borderColor='#fff' />

                    </View>


                </View>

            </View>

            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.body}>
                <View style={styles.imageContainer}>
                    <Image
                        source={require('../assets/icons/photo1(7).png')}
                        style={{ width: 300, height: 300 }} />
                </View>

                <Text style={{ ...styles.headerText, color: importantText }}> secure your account</Text>
                <Text style={{...styles.statement, color: normalText }}>
                    One way we keep your account secure is with 2-step verification,which requires your phone number .We will never call you or use your number without your permission
                </Text>

                <View>
                <Pressable style={styles.button} onPress={continueHandler} >
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
    screen:{ 
        flex: 1, 
        backgroundColor: "black" ,
        paddingTop: 20
    },
    container: {
        width: '90%',
        marginHorizontal: '5%',
       

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
        paddingTop: 15,
        display: 'flex',
        flexDirection:'column'
    },
    imageContainer: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: Dimensions.get('window').height / 4,
        marginVertical: 20,
        marginBottom: 40,
    },
    

    headerText: {
        fontSize: 18,
        fontFamily: 'Poppins',
        color:'rgb(44, 44, 44)',
        paddingLeft:0
    },
    statement:{
        paddingTop:5,
        paddingBottom:120,
        fontSize:14,
        fontFamily:'ABeeZee',
        paddingLeft:4,
        lineHeight:22
        
    },
    







    button:{
        width:'100%',
        paddingVertical:17,
        borderRadius:30,
        backgroundColor:'#1652f0',
        marginBottom:50,
        display:'flex',
        justifyContent:'center',
        alignItems:'center'

    },
    buttonText:{
        color:'#fff',
        fontFamily: 'Poppins',
        fontSize:15,
        fontWeight:'700'
    }

});

export default Number