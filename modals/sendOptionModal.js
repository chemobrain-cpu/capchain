import React from 'react'
import {
    View,
    Text,
    StyleSheet,
    Pressable,
    Dimensions,
    Modal,
} from "react-native";
//import truncate
import {truncate} from "../utils/util";
import { useSelector } from "react-redux"




const SendCryptoModal = ({ modalVisible, changeVisibility, navigationHandler_2,navigationHandler_1,asset,option_1,option_2}) => {

    let { background,importantText,normalText,fadeColor,blue,fadeButtonColor } = useSelector(state => state.userAuth)
    

    return (<Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
            changeVisibility;
        }}
    >
        <View style={{ ...styles.modalBackground, backgroundColor: background === 'black' ? 'rgba(0,0,0,0.8)' : 'rgba(0,0,0,0.5)', }}>
            <View style={{ ...styles.modalTop, backgroundColor: background === 'white' ? fadeColor : importantText }}>
            </View>

            <View style={{ ...styles.modalView, backgroundColor: background, borderColor: fadeColor }}>
                <Text style={{...styles.modalText,color:importantText}}>Send {truncate(asset,7)} to ??</Text>

                <Pressable style={styles.modalTopButtonContainer} onPress={navigationHandler_1}>
                    <Text style={styles.modalTopButtonText}> {option_1}</Text>
                </Pressable>



                <Pressable style={{...styles.modalBottomButtonContainer,backgroundColor:fadeColor}} onPress={navigationHandler_2}>
                    <Text style={{...styles.modalBottomButtonText,color:importantText}}> {option_2}</Text>
                </Pressable>



            </View>

        </View>



    </Modal>);
};

const styles = StyleSheet.create({
    modalBackground: {
        flex: 1,

    },
    modalTop: {
        height: 4,
        width: '20%',
        position: 'absolute',
        top: '62%',
        alignSelf: 'center',
        borderRadius: 5

    },
    modalView: {
        borderRadius: 20,
        position: 'absolute',
        backgroundColor: '#fff',
        width: Dimensions.get('window').width,
        top: '65%',
        padding:10,
        display: 'flex',
        flexDirection: 'column',
        borderWidth: 1,
        paddingTop: 10,
        paddingHorizontal: 20

    },
    modalHeader: {
        fontSize: 20,
        fontFamily: 'Poppins',

    },
    modalText: {
        fontSize: 20,
        fontFamily: 'Poppins',
        alignSelf: 'center',
        marginBottom: 15,
        color: 'rgb(100,100,100)'

    },
    modalTopButtonContainer: {
        width: '100%',
        backgroundColor: '#1652f0',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 17,
        borderRadius: 30,
        marginBottom:20

    },
    modalBottomButtonContainer: {
        width: '100%',
        backgroundColor: 'rgb(240,240,240)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 17,
        borderRadius: 30,
        marginBottom:20

    },
    modalTopButtonText: {
        fontSize: 15,
        fontFamily: 'Poppins',
        color:'#fff'

    },
    modalBottomButtonText: {
        fontSize: 15,
        fontFamily: 'Poppins',
        color:"black"

    },

})

export default SendCryptoModal;