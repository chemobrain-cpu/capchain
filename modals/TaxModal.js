import React from 'react'
import { View, Pressable, StyleSheet, Modal, Dimensions, Text } from 'react-native';
import { Entypo, MaterialIcons, FontAwesome, Feather, AntDesign, Ionicons } from '@expo/vector-icons';
import { useSelector } from "react-redux"

const TaxModal = ({ modalVisible, updateVisibility, navigateHandler, coinName, setModalVisible, status, changeTradeBasic, modalText, modalHandler }) => {
    let { background, importantText, normalText, fadeColor, blue, fadeButtonColor } = useSelector(state => state.userAuth)

    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
                setModalVisible(!modalVisible);
            }}
            key={1}
        >
            <View style={{ ...styles.modalBackground, backgroundColor: background === 'black' ? 'rgba(0,0,0,0.8)' : 'rgba(0,0,0,0.5)' }}>
                <View style={{ ...styles.modalTop, backgroundColor: background === 'white' ? fadeColor : importantText }}>
                </View>

                <View style={{ ...styles.modalView, backgroundColor: background, borderColor: fadeColor }}>



                    <Text style={{ ...styles.modalText, color: background==='white'?normalText:importantText}}>{modalText.toUpperCase()}
                    </Text>

                    <Pressable style={{ ...styles.modalButtonContainer, backgroundColor: fadeColor }} onPress={modalHandler}>
                        <Text style={{ ...styles.modalButtonText, color: importantText }}
                        >Got It!</Text>
                    </Pressable>



                </View>

            </View>



        </Modal>
    )
}

const styles = StyleSheet.create({
    modalBackground: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'

    },
    modalTop: {
        height: 4,
        width: '20%',
        backgroundColor: 'rgb(225,225,225)',
        position: 'absolute',
        top: '15%',
        alignSelf: 'center',
        borderRadius: 5

    },
    modalView: {
        borderRadius: 10,
        position: 'absolute',
        backgroundColor: '#fff',
        width: Dimensions.get('window').width / 1.1,
        top: '20%',
        padding:10,
        display: 'flex',
        flexDirection: 'column',
        borderColor: 'rgb(240,240,240)',
        borderWidth: .5,
        paddingHorizontal: 20

    },
    modalHeader: {
        fontSize: 20,
        fontFamily: 'Poppins',
        alignSelf: 'flex-start',
        marginBottom: 10

    },
    modalText: {
        fontSize: 14,
        fontFamily: 'ABeeZee',
        alignSelf: 'flex-start',
        marginBottom: 10,
        color: 'rgb(100,100,100)'

    },
    modalButtonContainer: {
        width: '100%',
        backgroundColor: 'rgb(240,240,240)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 17,
        borderRadius: 30

    },
    modalButtonText: {
        fontSize: 15,
        fontFamily: 'Poppins',

    },



})




export default TaxModal