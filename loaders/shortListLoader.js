import React from 'react'
import { View, StyleSheet } from 'react-native'

import ContentLoader, { Rect } from 'react-content-loader/native'
import { useSelector } from "react-redux"

const ShortListLoader = () => {
    let { background,importantText,normalText,fadeColor,blue,fadeButtonColor } = useSelector(state => state.userAuth)

    return <View style={{...styles.outerContainer,backgroundColor:background}}>
        <View style={styles.container}>
            <ContentLoader height={70} width={'40%'} duration={1000} borderRadius={40} backgroundColor={fadeColor}
                    foregroundColor={background}>

                <Rect x="0" y="30" rx="5" ry="5" width="100%" height="100%" />


            </ContentLoader>
            <ContentLoader height={70} width={'50%'} duration={1000} borderRadius={40} backgroundColor={fadeColor}
                    foregroundColor={background}>

                <Rect x="0" y="30" rx="5" ry="5" width="100%" height="100%" />


            </ContentLoader>


        </View>
        <View style={styles.container}>
            <ContentLoader height={70} width={'30%'} duration={1000} borderRadius={40} backgroundColor={fadeColor}
                    foregroundColor={background}>

                <Rect x="0" y="30" rx="5" ry="5" width="100%" height="100%" />


            </ContentLoader>
            <ContentLoader height={70} width={'60%'} duration={1000} borderRadius={40} backgroundColor={fadeColor}
                    foregroundColor={background}>

                <Rect x="0" y="30" rx="5" ry="5" width="100%" height="100%" />


            </ContentLoader>


        </View>
        <View style={styles.container}>
            <ContentLoader height={70} width={'60%'} duration={1000} borderRadius={40} backgroundColor={fadeColor}
                    foregroundColor={background}>

                <Rect x="0" y="30" rx="5" ry="5" width="100%" height="100%" />


            </ContentLoader>
            <ContentLoader height={70} width={'30%'} duration={1000} borderRadius={40} backgroundColor={fadeColor}
                    foregroundColor={background}>

                <Rect x="0" y="30" rx="5" ry="5" width="100%" height="100%" />


            </ContentLoader>


        </View>
        <View style={styles.container}>
            <ContentLoader height={70} width={'40%'} duration={1000} borderRadius={40} backgroundColor={fadeColor}
                    foregroundColor={background}>

                <Rect x="0" y="30" rx="5" ry="5" width="100%" height="100%" />


            </ContentLoader>
            <ContentLoader height={70} width={'50%'} duration={1000} borderRadius={40} backgroundColor={fadeColor}
                    foregroundColor={background}>

                <Rect x="0" y="30" rx="5" ry="5" width="100%" height="100%" />


            </ContentLoader>


        </View>
        <View style={styles.container}>
            <ContentLoader height={70} width={'40%'} duration={1000} borderRadius={40} backgroundColor={fadeColor}
                    foregroundColor={background}>

                <Rect x="0" y="30" rx="5" ry="5" width="100%" height="100%" />


            </ContentLoader>
            <ContentLoader height={70} width={'50%'} duration={1000} borderRadius={40} backgroundColor={fadeColor}
                    foregroundColor={background}>

                <Rect x="0" y="30" rx="5" ry="5" width="100%" height="100%" />


            </ContentLoader>


        </View>
        <View style={styles.container}>
            <ContentLoader height={70} width={'20%'} duration={1000} borderRadius={40} backgroundColor={fadeColor}
                    foregroundColor={background}>

                <Rect x="0" y="30" rx="5" ry="5" width="100%" height="100%" />


            </ContentLoader>
            <ContentLoader height={70} width={'70%'} duration={1000} borderRadius={40} backgroundColor={fadeColor}
                    foregroundColor={background}>

                <Rect x="0" y="30" rx="5" ry="5" width="100%" height="100%" />


            </ContentLoader>


        </View>
        <View style={styles.container}>
            <ContentLoader height={70} width={'30%'} duration={1000} borderRadius={40} backgroundColor={fadeColor}
                    foregroundColor={background}>

                <Rect x="0" y="30" rx="5" ry="5" width="100%" height="100%" />


            </ContentLoader>
            <ContentLoader height={70} width={'30%'} duration={1000} borderRadius={40} backgroundColor={fadeColor}
                    foregroundColor={background}>

                <Rect x="0" y="30" rx="5" ry="5" width="100%" height="100%" />


            </ContentLoader>


        </View>
        <View style={styles.container}>
            <ContentLoader height={70} width={'60%'} duration={1000} borderRadius={40} backgroundColor={fadeColor}
                    foregroundColor={background}>

                <Rect x="0" y="30" rx="5" ry="5" width="100%" height="100%" />


            </ContentLoader>
            <ContentLoader height={70} width={'30%'} duration={1000} borderRadius={40} backgroundColor={fadeColor}
                    foregroundColor={background}>

                <Rect x="0" y="30" rx="5" ry="5" width="100%" height="100%" />


            </ContentLoader>


        </View>
        <View style={styles.container}>
            <ContentLoader height={70} width={'40%'} duration={1000} borderRadius={40} backgroundColor={fadeColor}
                    foregroundColor={background}>

                <Rect x="0" y="30" rx="5" ry="5" width="100%" height="100%" />


            </ContentLoader>
            <ContentLoader height={70} width={'50%'} duration={1000} borderRadius={40} backgroundColor={fadeColor}
                    foregroundColor={background}>

                <Rect x="0" y="30" rx="5" ry="5" width="100%" height="100%" />


            </ContentLoader>


        </View>
        <View style={styles.container}>
            <ContentLoader height={70} width={'20%'} duration={1000} borderRadius={40} backgroundColor={fadeColor}
                    foregroundColor={background}>

                <Rect x="0" y="30" rx="5" ry="5" width="100%" height="100%" />


            </ContentLoader>
            <ContentLoader height={70} width={'70%'} duration={1000} borderRadius={40} backgroundColor={fadeColor}
                    foregroundColor={background}>

                <Rect x="0" y="30" rx="5" ry="5" width="100%" height="100%" />


            </ContentLoader>


        </View>
        <View style={styles.container}>
            <ContentLoader height={70} width={'30%'} duration={1000} borderRadius={40} backgroundColor={fadeColor}
                    foregroundColor={background}>

                <Rect x="0" y="30" rx="5" ry="5" width="100%" height="100%" />


            </ContentLoader>
            <ContentLoader height={70} width={'60%'} duration={1000} borderRadius={40} backgroundColor={fadeColor}
                    foregroundColor={background}>

                <Rect x="0" y="30" rx="5" ry="5" width="100%" height="100%" />


            </ContentLoader>


        </View>
        <View style={styles.container}>
            <ContentLoader height={70} width={'60%'} duration={1000} borderRadius={40} backgroundColor={fadeColor}
                    foregroundColor={background}>

                <Rect x="0" y="30" rx="5" ry="5" width="100%" height="100%" />


            </ContentLoader>
            <ContentLoader height={70} width={'30%'} duration={1000} borderRadius={40} backgroundColor={fadeColor}
                    foregroundColor={background}>

                <Rect x="0" y="30" rx="5" ry="5" width="100%" height="100%" />


            </ContentLoader>


        </View>
        <View style={styles.container}>
            <ContentLoader height={70} width={'40%'} duration={1000} borderRadius={40} backgroundColor={fadeColor}
                    foregroundColor={background}>

                <Rect x="0" y="30" rx="5" ry="5" width="100%" height="100%" />


            </ContentLoader>
            <ContentLoader height={70} width={'50%'} duration={1000} borderRadius={40} backgroundColor={fadeColor}
                    foregroundColor={background}>

                <Rect x="0" y="30" rx="5" ry="5" width="100%" height="100%" />


            </ContentLoader>


        </View>
    </View>
}

let styles = StyleSheet.create({
    outerContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal:15
    },
    container: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width:'100%'
    }


})

export default ShortListLoader