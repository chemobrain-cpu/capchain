import React from 'react'
import { View, Text, Modal, Dimensions, StyleSheet, Pressable } from 'react-native'
import {  useSelector } from "react-redux"



const AuthModal = ({ modalVisible, updateVisibility, message }) => {

    let { background,importantText,normalText,fadeColor,blue,fadeButtonColor } = useSelector(state => state.userAuth)


    return (<>
        <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}

        >
            <View style={{ ...styles.modalBackground, backgroundColor: background === 'black' ? 'rgba(0,0,0,0.96)' : 'rgba(0,0,0,0.5)', }}>

                <View style={{
                    ...styles.modalView, borderColor: fadeColor,
                    backgroundColor: background == 'black' ? 'rgb(30,30,30)' : '#fff',
                }}>

                    <Text style={{...styles.modalState,color:importantText}}>{message}</Text>

                    <View style={styles.modalButtonContainer}>
                        <Pressable style={{
                            ...styles.acceptBtn, borderColor: fadeColor,
                            backgroundColor:background==='black'?blue:fadeColor
                        }} onPress={() => updateVisibility()} >
                            <Text style={{...styles.acceptBtnText,color: importantText}}>got it!</Text>

                        </Pressable>


                    </View>

                </View>


            </View>

        </Modal>
    </>
    )
}

const styles = StyleSheet.create({
    modalBackground: {
        flex: 1,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    },


    modalView: {
        borderRadius: 10,
        alignItems: "center",
        width: Dimensions.get('window').width * 0.9,
        display: 'flex',
        flexDirection: 'column',
        borderWidth: 1,
        paddingVertical: 30
    },

    modalState: {
        paddingTop: 10,
        fontSize: 17,
        fontFamily: 'ABeeZee',
        fontWeight: '400',
        marginBottom: 15,
        alignSelf: 'center',
        paddingHorizontal: 15,
        color: 'grey',

    },
    modalButtonContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        paddingHorizontal: 2,

    },
    acceptBtn: {
        width: '90%',
        borderRadius: 50,
        paddingTop: 15,
        paddingBottom: 15,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: 'ABeeZee',
        borderWidth: 1,

    },
    acceptBtnText: {
        fontSize: 15,
        fontFamily: 'ABeeZee',
        
    },

    buttonClose: {
        backgroundColor: "#2196F3",
    },
    textStyle: {
        color: "#fff",
        fontFamily: 'Poppins',
        textAlign: "center"
    },
    modalText: {
        marginBottom: 15,
        textAlign: "center"
    },
});

export default AuthModal