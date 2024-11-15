import React, { memo, useEffect } from "react";
import { View, Text, Pressable, StyleSheet, Modal, Dimensions } from 'react-native';
import { useDispatch, useSelector } from "react-redux"


let background = 'black'
let importantText
let normalText
let fadeColor
let blue
let fadeButtonColor




const SignupModal = ({ modalVisible, updateVisibility, navigateHandler }) => {
    let { background, importantText, normalText, fadeColor, blue, fadeButtonColor } = useSelector(state => state.userAuth)



    return (<Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => updateVisibility()}
    >
        <View style={{ ...styles.modalBackground, backgroundColor: background === 'black' ? 'rgba(0,0,0,0.8)' : 'rgba(0,0,0,0.5)' }}>
            <View style={{ ...styles.modalTop, backgroundColor: background === 'white' ? fadeColor : importantText }}>
            </View>

            <View style={{ ...styles.modalView, backgroundColor: background, borderColor: fadeColor, }}>
                <Text style={{ ...styles.modalQuest, color: importantText }}>Are you sure you don't want to create a new account?</Text>

                <Text style={styles.modalState}>you can always try again?</Text>

                <View style={styles.modalButtonContainer}>
                    <Pressable style={{ ...styles.acceptBtn, borderColor: fadeColor }} onPress={() => navigateHandler()} >
                        <Text style={{ color: importantText }}>yes, i'm sure</Text>

                    </Pressable>

                    <Pressable onPress={() => updateVisibility()} style={{ ...styles.cancelBtn, backgroundColor: blue }}>
                        <Text style={{ color: background == 'white' ? 'black' : 'white' }}>cancel</Text>

                    </Pressable>
                </View>

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
        position: 'absolute',
        top: '62%',
        alignSelf: 'center',
        borderRadius: 5
    },

    modalView: {
        borderRadius: 20,
        alignItems: "center",
        position: 'absolute',
        width: Dimensions.get('window').width,
        top: '65%',
        height: '35%',
        display: 'flex',
        flexDirection: 'column',
        borderWidth: .5




    },
    modalQuest: {
        paddingTop: 15,
        fontSize: 18,
        alignSelf: 'center',
        paddingHorizontal: 15,
        fontFamily: 'Poppins',


    },
    modalState: {
        paddingTop: 10,
        fontSize: 15,
        fontFamily: 'ABeeZee',
        fontWeight: '400',
        marginBottom: 15,
        alignSelf: 'flex-start',
        paddingHorizontal: 15,
        color: 'grey',

    },
    modalButtonContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        width: '100%',
        paddingHorizontal: 2,

    },

    acceptBtn: {
        width: '50%',
        borderRadius: 50,
        paddingTop: 25,
        paddingBottom: 25,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: 16,
        fontFamily: 'ABeeZee',
        borderWidth: 1,
        borderColor: fadeColor,
    },
    cancelBtn: {
        width: '35%',
        paddingTop: 25,
        paddingBottom: 25,
        borderRadius: 50,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#fff',
        fontSize: 16,
        fontFamily: 'ABeeZee'

    },
    buttonClose: {
        backgroundColor: "#2196F3",
    },
    acceptBtnText: {
        color: importantText
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




export default SignupModal