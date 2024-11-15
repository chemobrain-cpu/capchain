import React from 'react'
import {
    StyleSheet,
    ActivityIndicator,
    View
} from "react-native";
import { useSelector } from "react-redux"






const AppLoader = () => {
    let { background } = useSelector(state => state.userAuth)

    


    return (<View style={{...styles.screen,backgroundColor:background}}>

        <ActivityIndicator size="small" color="blue" />

    </View>

    );
};

let styles = StyleSheet.create({
    screen: {
        flex: 1,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        
    }

})

export default AppLoader;