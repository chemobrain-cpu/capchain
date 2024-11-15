import React from 'react'
import { View, Text, StyleSheet, Image, Pressable } from 'react-native';
import { truncate } from "../utils/util"
import { useSelector } from "react-redux";
import moment from 'moment';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const TransactionCashCard = ({ navigateToDetail, data }) => {
    let { user, background, importantText, normalText, fadeColor, blue, fadeButtonColor } = useSelector(state => state.userAuth)


    if(data.transactionType === 'Credit'){
        return (<View style={styles.transactionCard}>
            <View style={styles.transactionTopSection}>
                <View style={styles.imageCon}>
                    <MaterialCommunityIcons name="transfer-left" size={24} color={background === 'white' ? "black" : "white"} />
                </View>
    
    
                <View style={styles.textCon}>
                    <Text style={{ ...styles.actionText, color: importantText }}>
                        {truncate(`Recieved ${data.amount} of  ${data.nameOfCurrency.toUpperCase()}`, 13)}
                    </Text>
                    <Text style={{ ...styles.timeText, color: normalText }}>
                        {moment(data.date).from(moment())}
                    </Text>
    
    
                </View>
                <View style={styles.buttonCon}>
                    <Pressable style={{ ...styles.detailButton, backgroundColor: background}}
                        onPress={navigateToDetail}>
                        <Text style={{ ...styles.detailButtonText, color:blue }}>DETAILS</Text>
                    </Pressable>
    
                </View>
    
            </View>
    
    
        </View>)

    }
    return (<View style={styles.transactionCard}>
        <View style={styles.transactionTopSection}>
            <View style={styles.imageCon}>
                <MaterialCommunityIcons name="transfer-right" size={24} color={background === 'white' ? "black" : "white"} />
            </View>


            <View style={styles.textCon}>
                <Text style={{ ...styles.actionText, color: importantText }}>
                    {truncate(`sent ${data.amount} of  ${data.nameOfCurrency.toUpperCase()}`, 13)}
                </Text>
                <Text style={{ ...styles.timeText, color: normalText }}>
                    {moment(data.date).from(moment())}
                </Text>


            </View>
            <View style={styles.buttonCon}>
                <Pressable style={{ ...styles.detailButton, backgroundColor: background}}
                    onPress={navigateToDetail}>
                    <Text style={{ ...styles.detailButtonText, color:blue }}>DETAILS</Text>
                </Pressable>

            </View>

        </View>


    </View>)
}


const styles = StyleSheet.create({
    imageLogo: {
        width: 35,
        height: 35,
        borderRadius: 18,
        borderWidth: 0.5,
        borderColor: "#ddd",
    },

    bottomSection: {
        paddingTop: 20,
        width: '100%'
    },
    detailButton: {

    },
    transactionCard: {
        paddingTop: 15,
        paddingBottom: 15

    },
    transactionTopSection: {
        display: 'flex',
        flexDirection: 'row'

    },
    imageCon: {
        flex: .5

    },
    textCon: {
        flex: 2,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'flex-start',

    },
    actionText: {
        fontFamily: 'Poppins',
        fontSize: 20,
        fontFamily: 'ABeeZee',


    },
    timeText: {
        fontFamily: 'ABeeZee',
        fontSize: 15,
        fontWeight: '500'


    },
    buttonCon: {
        flex: .8

    },
    detailButton: {
        width: '100%',
        height: 50,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5

    },







})


export default TransactionCashCard