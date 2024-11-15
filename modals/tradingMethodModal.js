import React from 'react'
import { View, Pressable, StyleSheet, Modal, Dimensions, Text } from 'react-native';
import { Entypo, MaterialIcons, FontAwesome, Feather, AntDesign,Ionicons } from '@expo/vector-icons';
import { useSelector } from "react-redux"

const tradeMethod = ({ modalVisible, updateVisibility, navigateHandler, coinName,setModalVisible,status,changeTradeBasic }) => {
    let { background, importantText, normalText, fadeColor, blue, fadeButtonColor } = useSelector(state => state.userAuth)

    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
                setModalVisible(!modalVisible);
            }}
        >
            <View style={{...styles.modalBackground,backgroundColor: background === 'black' ? 'rgba(0,0,0,0.8)' : 'rgba(0,0,0,0.5)'}}>
                <View style={{...styles.modalTop,backgroundColor:background==='white'? fadeColor:importantText}}>
                </View>

                <View style={{...styles.modalView,backgroundColor: background,borderColor: fadeColor}}>

                    <Text style={{...styles.modalHeader,color:importantText}}>choose trading method</Text>

                    <Pressable style={{ ...styles.modalButtonContainer, backgroundColor: status === false ? fadeColor : background }} onPress={changeTradeBasic}>
                        <View>
                            <Feather name="trending-up" size={18} color="#1652f0" />

                        </View>
                        <View>
                            <Text style={{...styles.modalButtonHead,color:importantText}}> Trade</Text>
                            <Text style={{...styles.modalButtonText,color:normalText}}> Simple buying and selli..</Text>

                        </View>
                        <View>
                            {status ? <></> : <AntDesign name="check" size={24} color="#1652f0" />
                            }

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
        backgroundColor: 'rgba(0,0,0,0.5)'

    },
    modalTop: {
        height: 4,
        width: '20%',
        backgroundColor: 'rgb(225,225,225)',
        position: 'absolute',
        top: '75%',
        alignSelf: 'center',
        borderRadius: 5

    },
    modalView: {
        borderRadius: 20,
        position: 'absolute',
        backgroundColor: '#fff',
        width: Dimensions.get('window').width,
        top: '78%',
        display: 'flex',
        flexDirection: 'column',
        borderColor: 'rgb(240,240,240)',
        borderWidth: .5,
        padding:10,
        height:'32%'

    },
    modalHeader: {
        fontSize: 20,
        fontFamily: 'Poppins',
        alignSelf: 'flex-start',
        marginBottom: 10,
        paddingHorizontal: 15,

    },
    modalButtonContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '95%',
        alignSelf: 'center',
        paddingVertical: 10,
        paddingHorizontal: 15,
        borderRadius: 10,
        alignItems: 'center',
        marginBottom: 25
    },
    modalButtonHead: {
        fontSize: 18,
        fontFamily: 'Poppins',

    },
    modalButtonText: {
        fontSize: 16,
        fontFamily: 'ABeeZee',
        color: 'grey'
    },
    icon: {
        width: '15%'

    },
    content: {
        width: '80%'

    },
    mark: {
        width: '5%'

    },



})




export default tradeMethod