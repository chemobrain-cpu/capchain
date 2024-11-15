import React, { useState } from 'react'
import { View, Text, SafeAreaView, ScrollView, Pressable, StyleSheet, Image, Dimensions} from 'react-native'
import { Feather} from '@expo/vector-icons';

const Earn = ({ navigation }) => {
    const [header, setHeader] = useState(false);
   
    //the user link will be gotten from redux
    const scrollHandler = (e) => {
        if (e.nativeEvent.contentOffset.y > 5) {
            setHeader(true)
        } else {
            setHeader(false)
        }
    }


    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
            <ScrollView showsVerticalScrollIndicator={false} style={styles.scrollViewContainer} onScroll={scrollHandler} stickyHeaderIndices={[0]}>

                <View style={{ ...styles.navigationHeader }}>

                    <Pressable onPress={() => navigation.goBack()} style={{ ...styles.goback }} >
                        <Feather name="arrow-left" size={24} color="rgb(44, 44, 44)" />

                    </Pressable>
                </View>


                <View style={styles.imageContainer}>
                    <Image
                        source={require('../assets/icons/photo1.png')}
                        style={{ width: 350,height:'100%'}} />
                </View>

                <View style={styles.infoContainer}>

                    <Text style={styles.infoHeading}>Earn up to 5.00% yield on your crypto</Text>

                    <Text style={styles.infoText}>Did you know that your crypto can earn yield? All you have to do is hold certain assets,like DAI and USDC,in your Coinapp account and you'll start earning right away</Text>


                </View>

              
                    <Pressable style={styles.button} onPress={()=>navigation.navigate('EarnAssets')}>
                        <Text style={styles.buttonText}>See what you can earn</Text>
                    </Pressable>

            
            </ScrollView>

        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    scrollViewContainer: {
        paddingBottom: 100,
        width: Dimensions.get('window').width,
        paddingHorizontal: 17

    },
    navigationHeader: {
        paddingBottom: 10,
        backgroundColor: '#fff',
        zIndex: 10,
        width: '100%',
        borderBottomColor: 'rgb(197, 197, 197)',
        paddingTop: 15,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
    },
    goback: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center'

    },
    imageContainer:{
        height:200
    },
    infoContainer:{
        paddingVertical:10,
        display:'flex',
        alignItems:'center',
        marginBottom:110
    },
    infoHeading:{
        fontSize:20,
        fontFamily:'Poppins',
        textAlign:'center',
        marginBottom:20
    },
    infoText:{
        fontSize:18,
        fontFamily:'ABeeZee',
        textAlign:'center',
        color:'rgb(100,100,100)'
        
    },
    button:{
        backgroundColor:'#1652f0',
        paddingVertical:17,
        display:'flex',
        alignItems:'center',
        justifyContent:'center',
        borderRadius:40
    },
    buttonText:{
        color:'#fff',
        fontSize:15,
        fontFamily:'Poppins'
    }




})

export default Earn