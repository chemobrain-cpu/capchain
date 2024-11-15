import React  from 'react'
import { View,Pressable, StyleSheet} from 'react-native';
import { Card } from "react-native-shadow-cards";
import ContentLoader, { Rect } from 'react-content-loader/native';
import { useSelector } from "react-redux"


let CryptoCard = () => {
    let { background,importantText,normalText,fadeColor,blue,fadeButtonColor } = useSelector(state => state.userAuth)
    

    return <Pressable>
        <Card 
            style={{...styles.cardContainer,backgroundColor:background}}>
                <View style={styles.container}>
                    <ContentLoader height={40} width={'20%'} duration={1000} borderRadius={40} backgroundColor={fadeColor}
                    foregroundColor={background} >

                        <Rect x="0" y="20" rx="5" ry="5" width="100%" height="100%" />


                    </ContentLoader>
                    <ContentLoader height={50} width={'60%'} duration={1000} borderRadius={40} backgroundColor={fadeColor}
                    foregroundColor={background} >

                        <Rect x="0" y="20" rx="5" ry="5" width="100%" height="100%" />


                    </ContentLoader>


                </View>
                <View style={styles.container}>
                    <ContentLoader height={40} width={'45%'} duration={1000} borderRadius={40} backgroundColor={fadeColor}
                    foregroundColor={background} >

                        <Rect x="0" y="20" rx="5" ry="5" width="100%" height="100%" />


                    </ContentLoader>
                    <ContentLoader height={50} width={'30%'} duration={1000} borderRadius={40} backgroundColor={fadeColor}
                    foregroundColor={background} >

                        <Rect x="0" y="20" rx="5" ry="5" width="100%" height="100%" />


                    </ContentLoader>


                </View>
                <View style={styles.container}>
                    <ContentLoader height={40} width={'30%'} duration={1000} borderRadius={40} backgroundColor={fadeColor}
                    foregroundColor={background} >

                        <Rect x="0" y="20" rx="5" ry="5" width="100%" height="100%" />


                    </ContentLoader>
                    <ContentLoader height={50} width={'50%'} duration={1000} borderRadius={40} backgroundColor={fadeColor}
                    foregroundColor={background} >

                        <Rect x="0" y="20" rx="5" ry="5" width="100%" height="100%" />


                    </ContentLoader>


                </View>

        </Card>

    </Pressable>
}

const styles = StyleSheet.create({

    cardContainer: {
        width: 180,
        height: 160,
        borderWidth: 0.5,
        borderColor: "#ddd",
        borderRadius: 10,
        marginRight: 15,
        paddingHorizontal: 15,

    },
    container: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    }


})



export default CryptoCard