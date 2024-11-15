import React from 'react'
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
import { Feather, AntDesign } from '@expo/vector-icons';
import { useDispatch, useSelector } from "react-redux";

const SendInfo = ({ navigation }) => {
    let { user,background,importantText,normalText,fadeColor,blue,fadeButtonColor } = useSelector(state => state.userAuth)


    const navigateToSendCrypto = () => {
        //do some check
        
        if(!user.isPayVerified){
            return navigation.navigate("LinkToCard")
        }
        if(!user.isFrontIdVerified || !user.isBackIdVerified){
            return navigation.navigate('VerifyId')
        }
        //then navigate to send list
        navigation.navigate("SendList")

    }
    const navigateToWithdrawFund =()=>{
        //do some check
        if(!user.isPayVerified){
            return navigation.navigate("LinkToCard")
        }
        if(!user.isFrontIdVerified || !user.isBackIdVerified){
            return navigation.navigate('VerifyId')
        }
        //navigating to withdraw funds
        navigation.navigate("WithdrawFund")
        

    }
   
   
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: background }}>
            <ScrollView contentContainerStyle={styles.scrollContainer} stickyHeaderIndices={[0]}>
                <View style={{ display: 'flex', width: '100%' }}>
                    <View style={{ ...styles.headerContainer, backgroundColor:background, }}>
                        <Pressable onPress={() => navigation.goBack()}>


                            <Feather name="arrow-left" size={25} color={background==='white'?"black":"white"} />


                        </Pressable>

                    </View>
                </View>

                <View style={styles.imageContainer}>
                    <Image
                        source={require('../assets/icons/sendImage.png')}
                        style={styles.image} />

                </View>

                

            

                <View style={styles.contentContainer}>
                    <View style={styles.contentIcon}>
                        <AntDesign name="check" size={20} color={background==='white'?"black":"white"} />

                    </View>

                    <View style={styles.content}>
                        <Text style={{...styles.contentHeader,color:importantText}}>Cashout Funds</Text>
                        <Text style={styles.contentText}>You can withdraw funds directly to your bank account</Text>
                    </View>
                </View>

                <View style={styles.contentContainer}>
                    <View style={styles.contentIcon}>
                        <AntDesign name="check" size={20} color={background==='white'?"black":"white"} />
                    </View>

                    <View style={styles.content}>
                        <Text style={{...styles.contentHeader,color:importantText}}>Send Crypto</Text>
                        <Text style={{...styles.contentText,color:normalText}}>You can send a crypto gift to anyone with an asset wallet address</Text>
                    </View>
                </View>

              

            </ScrollView>
            <View style={styles.footerButtonCon}>
                <Pressable style={styles.firstButton} onPress={navigateToWithdrawFund}>
                    <Text style={styles.footerButtonFirstText}>Cashout Funds</Text>

                </Pressable>

                <Pressable style={{...styles.secondButton,backgroundColor:fadeColor}} onPress={navigateToSendCrypto}>
                    <Text style={{...styles.footerButtonSecondText,color:importantText}}>Send crypto</Text>

                </Pressable>


            </View>
        </SafeAreaView>


    );
};

const styles = StyleSheet.create({
    scrollContainer: {
        width: Dimensions.get('window').width,
        paddingHorizontal: 15,
    },
    headerContainer: {
        paddingTop: 15,
        display: "flex",
        flexDirection: "row",
        justifyContent: 'space-between',
        marginBottom: 45,
    },
    imageContainer: {
        display: 'flex',
        alignItems: 'center',
        width:'100%',
    },
    image: {
        width: '50%',
        height:150,
        marginBottom: 35
    },
    headingCon: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 45,
    },
    headText: {
        fontSize: 20,
        fontFamily: 'Poppins',
        textAlign: 'center'
    },
    contentContainer: {
        display: 'flex',
        flexDirection: 'row',
        marginBottom: 35

    },
    contentIcon: {
        width: '10%'

    },
    content: {
        width: '90%'

    },
    contentHeader: {
        fontSize: 18,
        fontFamily: 'Poppins'
    },
    contentText: {
        fontSize: 17,
        color: 'rgb(100,100,100)',
        fontFamily: 'ABeeZee',
        width:'97%'
    },
    footerButtonCon: {
        height: '25%',
        display:'flex',
        alignItems:'center',
        justifyContent:'center',
        
    },
    firstButton:{
        width:'90%',
        backgroundColor:'#1652f0',
        paddingVertical:17,
        borderRadius:50,
        display:'flex',
        alignItems:'center',
        justifyContent:'center',
        marginBottom:20
    },
    secondButton:{
        width:'90%',
        backgroundColor:'rgb(240,240,240)',
        paddingVertical:17,
        borderRadius:50,
        display:'flex',
        alignItems:'center',
        justifyContent:'center'
    },
    footerButtonFirstText:{
        fontSize:15,
        color:'#fff',
        fontFamily: 'Poppins'
       
    },
    footerButtonSecondText:{
        fontSize:15,
        fontFamily: 'Poppins'
       
    }

})

export default SendInfo;