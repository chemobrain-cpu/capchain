import React from 'react';
import {View,Text,Pressable,StyleSheet,Dimensions} from "react-native";
import { useSelector } from "react-redux"

const Button = ({text,pressHandler,children})=>{
    let { background,importantText,normalText,fadeColor,blue,fadeButtonColor } = useSelector(state => state.userAuth)

    return <Pressable 
    style={styles.actionInnerContainer}
    onPress={()=>pressHandler(`${text}`)}>
    <View style={styles.action} >
        {children}

    </View>
    <Text style={{...styles.actionText,color:importantText}}>{text}</Text>

</Pressable>
}
const deviceWidth = Dimensions.get('window').width

const styles = StyleSheet.create({
    actionInnerContainer: {
        display: 'flex',
        alignItems: 'center',
        paddingVertical: 10,
    },
    action: {
        width:deviceWidth < 450?50:65,
        height:deviceWidth < 450?50:65,
        borderRadius: deviceWidth < 450?50:65,
        backgroundColor: '#1652f0',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 10
    },
    actionText: {
        fontSize: 14,
        fontFamily: 'ABeeZee',
    },

})

export default Button