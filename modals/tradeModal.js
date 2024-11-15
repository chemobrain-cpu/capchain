import React from 'react'
import { View, Pressable, StyleSheet, Modal, Dimensions,Text } from 'react-native';
import { Octicons, Entypo } from '@expo/vector-icons';
import { useSelector } from "react-redux"

const tradeModal = ({ modalVisible, updateVisibility, navigateHandler ,coinName}) => {
    let { background,importantText,normalText,fadeColor,blue,fadeButtonColor } = useSelector(state => state.userAuth)

    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={updateVisibility}
        >
            <View style={{...styles.modalBackground,backgroundColor: background === 'black' ? 'rgba(0,0,0,0.8)' : 'rgba(0,0,0,0.5)'}}>
                <View style={{...styles.modalTop,backgroundColor:background==='white'? fadeColor:importantText}}>
                </View>

                <View style={{...styles.modalView,backgroundColor: background,borderColor: fadeColor}}>
                    <Pressable style={styles.modalButtonCon} onPress={()=>navigateHandler('sell')}>
                        <View style={styles.modalButtonIcon}>
                            <Entypo name="plus" size={24} color={background === 'white' ? "black" : "white"} />

                        </View>
                        <View style={styles.modalButtonTextCon}>
                            <Text style={{...styles.topText,color:importantText}}>Sell {coinName}</Text>
                            <Text style={{...styles.bottomText,color:normalText}}>Sell {coinName.toUpperCase()} for cash</Text>

                        </View>

                    </Pressable>


                    <Pressable style={styles.modalButtonCon} onPress={()=>navigateHandler('convert')}>

                        <View style={styles.modalButtonIcon}>
                            <Octicons name="sync" size={24} color={background === 'white' ? "black" : "white"} />

                        </View>
                        <View style={styles.modalButtonTextCon}>
                            <Text style={{...styles.topText,color:importantText}}>Convert {coinName}</Text>
                            <Text style={{...styles.bottomText,color:normalText}}>Convert {coinName.toUpperCase()} to another...</Text>

                        </View>

                    </Pressable>


                </View>

            </View>
        </Modal>
    )
}

const styles = StyleSheet.create({
    modalBackground: {
        flex: 1,
    },
    modalTop: {
        height: 4,
        width: '20%',
        backgroundColor: 'rgb(225,225,225)',
        position: 'absolute',
        top: '65%',
        alignSelf: 'center',
        borderRadius: 5
    },

    modalView: {
        backgroundColor: "#fff",
        borderRadius: 20,
        alignItems: "center",
        position: 'absolute',
        backgroundColor: '#fff',
        width: Dimensions.get('window').width,
        top: '68%',
        display: 'flex',
        flexDirection: 'column',
        borderWidth:.5,
        padding:10




    },
    modalButtonCon:{
        width:'100%',
        display:'flex',
        flexDirection:'row',
        justifyContent:'flex-start',
        paddingVertical:20


    },
    modalButtonIcon:{
        width:'20%',
        display:'flex',
        justifyContent:'center',
        alignItems:'center'

    },
    modalButtonTextCon:{
        width:'80%',
        display:'flex',
        flexDirection:'column',
        justifyContent:'center',
        alignItems:'flex-start',

    },
    topText:{
        fontSize:20,
        fontFamily:'Poppins'

    },
    bottomText:{
        fontSize:18,
        fontFamily:'ABeeZee',
        color:'rgb(100,100,100)'

    }



})




export default tradeModal