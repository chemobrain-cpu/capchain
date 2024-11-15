import React from "react";
import { View, Text, Pressable, StyleSheet, Modal, Dimensions } from 'react-native';
import { useSelector } from "react-redux";


const LoginModal = ({ modalVisible, updateVisibility, navigateHandler }) => {
    let { background, importantText, normalText, fadeColor, blue, fadeButtonColor } = useSelector(state => state.userAuth)



    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={updateVisibility}
        >
            <View style={{ ...styles.modalBackground, backgroundColor: background === 'black' ? 'rgba(0,0,0,0.8)' : 'rgba(0,0,0,0.5)' }}>
                <View style={{ ...styles.modalTop, backgroundColor: background === 'white' ? fadeColor : importantText }}>
                </View>

                <View style={{ ...styles.modalView, backgroundColor: background, borderColor: fadeColor }}>
                    <Text style={{ ...styles.modalQuest, color: importantText }}>You're not signed in yet?</Text>

                    <Text style={styles.modalState}>Are you sure you want to quit?</Text>

                    <View style={styles.modalButtonContainer}>
                        <Pressable style={{ ...styles.acceptBtn, borderColor: fadeColor }} onPress={() => navigateHandler()} >
                            <Text style={{ color: importantText }}>yes, i'm sure</Text>

                        </Pressable>

                        <Pressable onPress={() => updateVisibility()} style={styles.cancelBtn}>
                            <Text style={{ color: '#fff' }}>cancel</Text>

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
        padding:10,
        display: 'flex',
        flexDirection: 'column',
        borderWidth: .5,




    },
    modalQuest: {
        paddingTop: 15,
        fontSize: 22,
        fontFamily: 'Poppins',
        paddingLeft: 15,
        alignSelf: 'flex-start',

    },
    modalState: {
        paddingTop: 10,
        fontSize: 18,
        fontFamily: 'ABeeZee',
        fontWeight: '500',
        marginBottom: 15,
        paddingLeft: 15,
        alignSelf: 'flex-start',
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
        color: 'red'
    },
    cancelBtn: {
        width: '35%',
        paddingTop: 25,
        paddingBottom: 25,
        borderRadius: 50,
        backgroundColor: '#1652f0',
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
    textStyle: {
        color: "#fff",
        fontFamily: 'Poppins',
        textAlign: "center"
    },
    modalText: {
        marginBottom: 15,
        textAlign: "center"
    },
    container: {
        width: '90%',
        marginHorizontal: '5%'

    },


})




export default LoginModal