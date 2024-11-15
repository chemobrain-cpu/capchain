import React from 'react'
import { View, Text, Pressable, StyleSheet, Modal, Dimensions} from 'react-native'




const ErrorModal = ({ modalVisible,updateVisibility }) => {
    return <Modal

            animationType="slide"
            transparent={true}
            visible={modalVisible}
        >
            <View style={styles.modalView}>

                <View style={styles.exclamationContainer}>
                    <View style={styles.exclamation}>
                        <Text style={styles.exclamationText}>!</Text>
                    </View>
                    <Text style={styles.modalQuest}>Check your internet connection</Text>

                </View>

                <Text style={styles.modalState}>you can use the app while your connection is down but prices may be outdated and some features will be disabled?</Text>


                <Pressable onPress={() => updateVisibility(false)} style={styles.cancelBtn}>
                    <Text>cancel</Text>

                </Pressable>


            </View>


        </Modal>
    
}

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22,
        backgroundColor:'red'
    },
    modalView: {
        borderRadius: 20,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        position: 'absolute',
        backgroundColor: '#fff',
        width: Dimensions.get('window').width,
        top: '55%',
        height: '48%',
        display: 'flex',
        flexDirection: 'column',
        borderTopColor: 'rgb(240,240,240)',
        borderTopWidth: 1,
        paddingHorizontal: 25,
        paddingRight: 20




    },
    exclamationContainer:{
         display: 'flex',
         flexDirection:'row',
        alignItems: 'center',
        justifyContent:'flex-start',
        alignSelf: 'flex-start',

    },
    exclamation: {
        width: 25,
        height: 25,
        borderRadius: 25,
        backgroundColor: 'red',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginRight:5
    },
    exclamationText:{
        color:'#fff',
        fontWeight:'bold'

    },
    modalQuest: {
        paddingTop: 15,
        fontSize: 20,
        fontFamily: 'Poppins',
        alignSelf: 'flex-start',

    },
    modalState: {
        paddingTop: 5,
        fontSize: 18,
        fontFamily: 'ABeeZee',
        fontWeight: '400',
        alignSelf: 'flex-start',
        lineHeight: 22,
        marginBottom: 22

    },


    cancelBtn: {
        width: '100%',
        paddingTop: 15,
        paddingBottom: 20,
        borderRadius: 50,
        backgroundColor: 'rgb(240,240,240)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#fff',
        fontSize: 16,
        fontFamily: 'ABeeZee',
        marginBottom: 11

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




export default ErrorModal