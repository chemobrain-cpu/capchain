import React from 'react'
import { View, Text, StyleSheet, Image } from 'react-native';
import { truncate } from "../utils/util";
import { useSelector } from "react-redux";


const TransactionDetailCard = ({ property, value }) => {
    let { normalText } = useSelector(state => state.userAuth)
    if (property === 'Currency Symbol') {
        return (<View style={styles.detailCard}>
            <View style={styles.leftSection}>
                <Text style={{ ...styles.text, color: normalText }}>{truncate(`${property}`, 15)}
                </Text>

            </View>
            <View style={styles.rightSection}>
                <Image
                    source={{ uri: `${value}` }}
                    style={styles.imageLogo}
                />
            </View>

        </View>)

    } else {
        return (<View style={styles.detailCard}>
            <View style={styles.leftSection}>
                <Text style={{ ...styles.text, color: normalText }}>{truncate(`${property}`, 20)}
                </Text>

            </View>
            <View style={styles.rightSection}>
                <Text style={{ ...styles.text, color: normalText }}>
                    {truncate(`${value}`, 20)}
                </Text>

            </View>

        </View>)

    }


}


const styles = StyleSheet.create({
    detailCard: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        paddingTop: 15,
        paddingBottom: 15,
        marginTop: 5,
        marginBottom: 5

    },
    leftSection: {
        flex: 1,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'flex-start'
    },
    rightSection: {
        flex: 1,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'flex-start'

    },
    imageLogo: {
        width: 40,
        height: 40,
        borderRadius: 18,
        borderWidth: 0.5,
        borderColor: "#ddd",
    },
    text: {
        fontSize: 18,
        fontFamily: 'ABeeZee'

    },
})


export default TransactionDetailCard