import React from 'react'
import { View, Text, StyleSheet, Image, Pressable } from 'react-native';
import { truncate } from "../utils/util";
import { useSelector } from "react-redux";
import moment from 'moment';


const TransactionAssetCard = ({navigateToDetail,data}) => {
    let {importantText, normalText, blue,background} = useSelector(state => state.userAuth)

    return (<View style={styles.transactionCard}>
        <View style={styles.transactionTopSection}>
            <View style={styles.imageCon}>
                <Image
                    source={{ uri: `${data.symbol}` }}
                    style={styles.imageLogo}
                />

            </View>
            <View style={styles.textCon}>

                {data.transactionType === 'Credit'?<Text style={{ ...styles.actionText, color: importantText }}>
                    {truncate(`Recieved ${data.amount} of  ${data.nameOfCurrency.toUpperCase()}`, 13)}
                </Text>:<Text style={{ ...styles.actionText, color: importantText }}>
                    {truncate(`sent ${data.amount} of  ${data.nameOfCurrency.toUpperCase()}`, 13)}
                </Text>}

                <Text style={{ ...styles.timeText, color: normalText }}>
                    {moment(data.date).from(moment())}
                </Text>

            </View>
            <View style={styles.buttonCon}>
                <Pressable style={{ ...styles.detailButton, backgroundColor: background }}
                    onPress={navigateToDetail}>
                    <Text style={{ ...styles.detailButtonText, color:blue }}>DETAILS</Text>
                </Pressable>

            </View>

        </View>


    </View>)
}


const styles = StyleSheet.create({
    screen: {
        flex: 1,
    },
    navigationHeader: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'flex-start',
        paddingTop: 15,
        paddingBottom: 10,
        backgroundColor: '#fff',
        zIndex: 10,

    },
    iconCon: {
        width: '15%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        paddingTop: 5


    },
    headerNameCon: {
        width: '85%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'flex-start'


    },
    headerName: {
        fontFamily: 'Poppins',
        fontSize: 20
    },
    scrollviewContainer: {
        width: '100%',
        paddingHorizontal: 15,
    },
    email: {
        color: 'rgb(80, 80, 80)',
        fontFamily: 'Poppins',
        fontSize: 16,
    },
    username: {
        color: "black",
        fontSize: 17,
        fontFamily: 'Poppins',
        marginBottom: 30,
        textAlign: 'center',
    },

    buttonContainer: {
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
    },
    button: {
        width: '50%',
        backgroundColor: 'red',
        height: 50,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10
    },
    buttonText: {
        color: 'rgb(80, 80, 80)',
        fontFamily: 'Poppins',
        fontSize: 16,

    },
    imageLogo: {
        width: 30,
        height: 30,
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


export default TransactionAssetCard