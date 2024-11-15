import React from 'react'
import { View, Text, Pressable, StyleSheet, Modal, Dimensions } from 'react-native'
import { useSelector } from "react-redux";

const SettingModal = ({modalVisible,updateVisibility,topic,info,action}) => {
    let { background, importantText, normalText, fadeColor, blue, fadeButtonColor } = useSelector(state => state.userAuth)

    const handler = ()=>{
        if(action=="closeAccount"){
            updateVisibility("closeAccount")

        }else{
            updateVisibility("changeInfo")

        }
        
    }
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
                    <Text style={{...styles.modalQuest,color:importantText}}> {topic}</Text>

                    <Text style={{...styles.modalState,color:normalText}}>{info}</Text>

                    <Pressable style={{...styles.button,backgroundColor:fadeColor}} onPress={handler}>
                        <Text style={{...styles.buttonText,color:importantText}}>Continue</Text>
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
        position: 'absolute',
        top: '65%',
        alignSelf: 'center',
        borderRadius: 5
    },

    modalView: {
        backgroundColor: "#fff",
        borderRadius: 30,
        alignItems: "center",
        position: 'absolute',
        backgroundColor: '#fff',
        width: Dimensions.get('window').width,
        top: '69%',
        padding:10,
        display: 'flex',
        flexDirection: 'column',
        borderWidth: 1,
        paddingHorizontal:15




    },
    modalQuest: {
        paddingTop: 15,
        fontSize: 22,
        fontFamily: 'Poppins',
        alignSelf: 'flex-start'

    },
    modalState: {
        paddingTop: 10,
        fontSize: 18,
        fontFamily: 'ABeeZee',
        fontWeight: '500',
        marginBottom: 15,
        alignSelf: 'flex-start',
        color: 'grey',

    },
    button:{
        width: '100%',
        borderRadius: 50,
        paddingVertical:17,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: 'ABeeZee',
        borderColor: 'rgb(240,240,240)',
        backgroundColor: 'rgb(240,240,240)',
        marginBottom: 15,

    },
    buttonText:{
        fontSize: 15,
        fontFamily: 'Poppins',

    }

   


})




export default SettingModal