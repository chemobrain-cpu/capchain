import React,{useState}  from 'react'
import { View, Text, SafeAreaView, Pressable, StyleSheet, ScrollView, Dimensions, } from 'react-native'
import { AntDesign } from '@expo/vector-icons';
import { goToHome } from "../store/action/appStorage";
import { useDispatch,useSelector } from "react-redux";



const VerifySuccess = ({ navigation }) => {
    let { background, importantText, normalText, fadeColor, blue, fadeButtonColor } = useSelector(state => state.userAuth)

    let [isLoading,setIsLoading] = useState(false)
    let dispatch = useDispatch()
   
    const continueHandler = async () => {
        if(isLoading){
            return
        }
        setIsLoading(true)
        await dispatch(goToHome())
        
    }

    return (<SafeAreaView style={{ ...styles.screen, backgroundColor: background }}>
        <View style={styles.container}>

            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.body}>
                <View style={styles.imageContainer}>
                    <View style={styles.fontContainer}>
                        <AntDesign name="check" size={30} color="#fff" style={{ fontWeight: 'bold' }} />

                    </View>

                </View>

                <Text style={{ ...styles.headerText, color: importantText }}>You're verified!</Text>

                <Text style={{ ...styles.contentText, color: normalText }}>Thanks for your help verifying your identity .Now you're all set to start trading crypto.</Text>



                <View>
                    <Pressable style={styles.button} onPress={continueHandler}>
                        <Text style={styles.buttonText}>
                            Done
                        </Text>

                    </Pressable>
                </View>

            </ScrollView>




        </View>

    </SafeAreaView>
    )

}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        backgroundColor: "#fff",
        paddingHorizontal: '5%',
        paddingTop: 20
    },
    container: {
        width: '100%',

    },

    body: {
        paddingTop: 15,
        display: 'flex',
        flexDirection: 'column'
    },
    imageContainer: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: Dimensions.get('window').height / 4,
        marginVertical: 20,
        marginBottom: 40,
    },
    fontContainer: {
        width: 150,
        height: 150,
        borderRadius: 150,
        backgroundColor: '#1652f0',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',

    },

    headerText: {
        fontSize: 20,
        fontFamily: 'Poppins',
        color: 'rgb(44, 44, 44)',
        alignSelf: 'center',
        marginBottom: 15
    },
    contentText: {
        fontSize: 16,
        alignSelf: 'center',
        textAlign: 'center',
        fontWeight: '600',
        fontFamily: 'ABeeZee',
        marginBottom: Dimensions.get('window').height / 4,
        lineHeight: 22

    },






    button: {
        width: '100%',
        paddingVertical: 17,
        borderRadius: 30,
        backgroundColor: '#1652f0',
        marginBottom: 50,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'

    },
    buttonText: {
        color: '#fff',
        fontSize: 15,
        fontFamily: 'Poppins',
    }

});

export default VerifySuccess