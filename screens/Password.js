import React, { useState, useEffect } from 'react'
import {
    View,
    Text,
    StyleSheet,
    Pressable,
    SafeAreaView,
    ScrollView,
    Dimensions,
} from "react-native";

import { Feather, FontAwesome,AntDesign } from '@expo/vector-icons';
import Loader from '../loaders/Loader';
import AuthModal from '../modals/authModal';
import { useSelector } from "react-redux";

const Password = ({ navigation }) => {
    let [value, setValue] = useState("")
    let [isLoading, setIsLoading] = useState(true)
    const [modalVisible, setModalVisible] = useState("")
    const [isAuthError, setIsAuthError] = useState(false)
    const [authInfo, setAuthInfo] = useState("")

    let { user, background, importantText, normalText, fadeColor, blue, fadeButtonColor } = useSelector(state => state.userAuth)

    //preventing memory leak
    useEffect(() => {
        let focus = navigation.addListener('beforeRemove', (e) => {
            if (isLoading) {
                e.preventDefault();
            } else {
                //can go back
            }
        });
        return focus
    }, [isLoading]);

    useEffect(() => {
        setTimeout(() => {
            setIsLoading(false)
        }, 2000)
    })


    let dollarPriceUi = (data) => {
        data = data.toString()

        //convert string to an array
        let arr = []
        for (let m of data) {
            arr.push(m)
        }
        return <View style={styles.dollarPriceInnerCon}>
            <Text style={{ ...styles.dollarPrice, fontSize: 25 }}>{arr[0] ? <FontAwesome name="asterisk" size={27} color={background === 'white' ? "black" : "white"} /> : <Feather name="circle" size={27} color={background === 'white' ? "black" : "white"} />}</Text>

            <Text style={{ ...styles.dollarPrice, fontSize: 25 }}>{arr[1] ? <FontAwesome name="asterisk" size={27} color={background === 'white' ? "black" : "white"} /> : <Feather name="circle" size={27} color={background === 'white' ? "black" : "white"} />}</Text>

            <Text style={{ ...styles.dollarPrice, fontSize: 25 }}>{arr[2] ? <FontAwesome name="asterisk" size={27} color={background === 'white' ? "black" : "white"} /> : <Feather name="circle" size={27} color={background === 'white' ? "black" : "white"} />}</Text>

            <Text style={{ ...styles.dollarPrice, fontSize: 25 }}>{arr[3] ? <FontAwesome name="asterisk" size={27} color={background === 'white' ? "black" : "white"} /> : <Feather name="circle" size={27} color={background === 'white' ? "black" : "white"} />}</Text>

            <Text style={{ ...styles.dollarPrice, fontSize: 25 }}>{arr[4] ? <FontAwesome name="asterisk" size={27} color={background === 'white' ? "black" : "white"} /> : <Feather name="circle" size={27} color={background === 'white' ? "black" : "white"} />}</Text>

            <Text style={{ ...styles.dollarPrice, fontSize: 25 }}>{arr[5] ? <FontAwesome name="asterisk" size={27} color={background === 'white' ? "black" : "white"} /> : <Feather name="circle" size={27} color={background === 'white' ? "black" : "white"} />}</Text>

            <Text style={{ ...styles.dollarPrice, fontSize: 25 }}>{arr[6] ? <FontAwesome name="asterisk" size={27} color={background === 'white' ? "black" : "white"} /> : <Feather name="circle" size={27} color={background === 'white' ? "black" : "white"} />}</Text>

        </View>






    }

    //button function
    let button = (num) => {
        setValue(prev => {
            if (prev.length > 6) {
                return prev
            }
            return prev + num
        })
    }

    //dot fun
    let point = () => {
        setValue(prev => {
            //check if it already contains decimal point 
            let pointExist = prev.includes(".")
            if (!pointExist) {
                let num = Number(prev)
                let decimalNum = num.toFixed(1)
                let numChar = decimalNum.toString()
                return numChar.slice(0, -1)

            }
            return prev


        })
    }

    //deleting algorithm
    let deleteHandler = () => {
        //get the value string and remove the last element
        setValue(prev => prev.slice(0, -1))

    }

    let proceedHandler = async () => {
        if (!value) {
            return
        }
        setIsLoading(true)
        if (value !== user.password) {
            setIsAuthError(true)
            setAuthInfo('password is incorrect !')
            setIsLoading(false)
            return
        }

        navigation.navigate("Pin", {
            pin: value
        })

    }

    let changeVisibility = () => {
        setIsAuthError(prev => !prev)
    }



    if (isLoading) {
        return <Loader />
    }




    return (<>
        {/* modal for proceeding*/}
        {isAuthError && <AuthModal modalVisible={isAuthError} updateVisibility={changeVisibility} message={authInfo} />}


        <SafeAreaView style={{ flex: 1, backgroundColor: background }}>
            <ScrollView contentContainerStyle={styles.scrollContainer} stickyHeaderIndices={[0]}>
                <View style={{ display: 'flex', width: '100%' }}>
                    <View style={styles.headerContainer}>
                        <Pressable onPress={() => navigation.goBack()} style={styles.headerContainerIcon} >
                            <AntDesign name="close" size={23} color={background === 'white' ? "black" : "white"} />
                        </Pressable>

                        <Pressable style={{ ...styles.headerContainerTitle }} >
                            <Text style={{ ...styles.title, color: importantText }}>Enter password to continue</Text>
                        </Pressable>





                    </View>
                </View>

                <View style={styles.priceContainer}>


                    <View style={styles.dollarPriceCon}>

                        {dollarPriceUi((value))}

                    </View>

                </View>

                <View style={styles.calculatorCon}>
                    <View style={styles.numberContainer}>
                        <Pressable style={styles.numberButton} onPress={() => button('1')}>
                            <Text style={{...styles.number,color:importantText}}>1</Text>
                        </Pressable>

                        <Pressable style={styles.numberButton} onPress={() => button('2')}>
                            <Text style={{...styles.number,color:importantText}}>2</Text>
                        </Pressable>

                        <Pressable style={styles.numberButton} onPress={() => button('3')}>
                            <Text style={{...styles.number,color:importantText}}>3</Text>
                        </Pressable>

                    </View>
                    <View style={styles.numberContainer}>
                        <Pressable style={styles.numberButton} onPress={() => button('4')}>
                            <Text style={{...styles.number,color:importantText}}>4</Text>
                        </Pressable>

                        <Pressable style={styles.numberButton} onPress={() => button('5')}>
                            <Text style={{...styles.number,color:importantText}}>5</Text>
                        </Pressable>

                        <Pressable style={styles.numberButton} onPress={() => button('6')}>
                            <Text style={{...styles.number,color:importantText}}>6</Text>
                        </Pressable>

                    </View>
                    <View style={styles.numberContainer}>
                        <Pressable style={styles.numberButton} onPress={() => button('7')}>
                            <Text style={{...styles.number,color:importantText}}>7</Text>
                        </Pressable>

                        <Pressable style={styles.numberButton} onPress={() => button('8')}>
                            <Text style={{...styles.number,color:importantText}}>8</Text>
                        </Pressable>

                        <Pressable style={styles.numberButton} onPress={() => button('9')}>
                            <Text style={{...styles.number,color:importantText}}>9</Text>
                        </Pressable>

                    </View>

                    <View style={styles.numberContainer}>
                        <Pressable style={styles.numberButton} onPress={() => point(".")}>
                            <Text style={{...styles.number,color:importantText}}>.</Text>
                        </Pressable>

                        <Pressable style={styles.numberButton} onPress={() => button('0')}>
                            <Text style={{...styles.number,color:importantText}}>0</Text>
                        </Pressable>

                        <Pressable style={styles.numberButton} onPress={() => deleteHandler()}>
                            <Feather name="arrow-left" size={22} color={background === 'white' ? "black" : "white"} />
                        </Pressable>

                    </View>

                </View>

                <View style={styles.buttonCon}>
                    <Pressable style={{ ...styles.button }} onPress={proceedHandler}>
                        <Text style={styles.buttonText}>Continue</Text>

                    </Pressable>

                </View>



            </ScrollView>

        </SafeAreaView>
    </>);
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
    },

    scrollContainer: {
        width: Dimensions.get('window').width,
        paddingHorizontal: 15,
    },
    headerContainer: {
        paddingTop: 15,
        display: "flex",
        flexDirection: "row",
        marginBottom: 45,
        alignItems: 'center',
        justifyContent: 'center'
    },
    headerContainerIcon: {
        width:'10%',
        display: "flex",
        flexDirection: "row",
        justifyContent: 'flex-start'

    },
    headerContainerTitle: {
        width:'90%',
        display: "flex",
        flexDirection: "row",
        justifyContent: 'center'

    },

    title: {
        fontSize: 22,
        fontFamily: 'ABeeZee',
        textAlign: 'center'

    },
    balance: {
        fontSize: 17,
        fontFamily: 'ABeeZee',
        paddingLeft: 8,
        color: 'rgb(100,100,100)'
    },
    priceContainer: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 45,
        marginBottom: 90,
        width: '100%',
        justifyContent: 'center'
    },


    dollarPriceCon: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '75%',
        alignSelf: 'center'
    },
    dollarPriceInnerCon: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%'

    },
    dollarPrice: {
        fontFamily: 'ABeeZee',
        color: '#1652f0',


    },
    cryptoPrice: {
        fontFamily: 'ABeeZee'

    },



    calculatorCon: {
        width: '100%',
    },
    numberContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around'
    },
    numberButton: {
        width: 60,
        height: 60,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'

    },
    number: {
        fontSize: 35,
        fontFamily: 'ABeeZee'
    },


    buttonCon: {
        width: '100%',
        height: 100,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',

    },
    button: {
        width: '95%',
        backgroundColor: '#1652f0',
        paddingVertical: 18,
        borderRadius: 30,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    },
    buttonText: {
        fontSize: 20,
        fontFamily: "ABeeZee",
        color: '#fff',

    }
})

export default Password;