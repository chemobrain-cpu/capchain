import React  from 'react'
import ContentLoader, { Rect } from "react-content-loader/native"
import { View, SafeAreaView, ScrollView, StyleSheet, Dimensions } from 'react-native'
import { useSelector } from "react-redux"





let SplashLoader = () => {
    let { background,importantText,normalText,fadeColor,blue,fadeButtonColor } = useSelector(state => state.userAuth)

    


    return <SafeAreaView style={{...styles.screen,backgroundColor: background,}}>
        <ScrollView contentContainerStyle={{...styles.scrollContainer,backgroundColor: background,}} showsVerticalScrollIndicator={false} stickyHeaderIndices={[0]}>

            <View style={{...styles.contentContainer,backgroundColor: background}}>

                <ContentLoader backgroundColor={fadeColor}
                    foregroundColor={background} height={50} duration={1000}>

                    <Rect x="0" y="20" rx="5" ry="5" width="100" height="100%" />


                </ContentLoader>
                <ContentLoader backgroundColor={fadeColor}
                    foregroundColor={background} height={100} duration={1000}>

                    <Rect x="0" y="20" rx="5" ry="5" width="100%" height="100%" />


                </ContentLoader>

                <View style={styles.subContentContainer}>
                    <ContentLoader height={50} width='40%' duration={200} backgroundColor={fadeColor}
                        foregroundColor={background}>

                        <Rect x="0" y="20" rx="5" ry="5" width="100%" height="100%" />


                    </ContentLoader>
                    <ContentLoader height={50} width='40%' duration={1000} backgroundColor={fadeColor}
                        foregroundColor={background}>

                        <Rect x="0" y="20" rx="5" ry="5" width="100%" height="100%" />


                    </ContentLoader>

                </View>
                <View style={styles.subContentContainer}>
                    <ContentLoader height={50} width='40%' duration={1000} backgroundColor={fadeColor}
                        foregroundColor={background}>

                        <Rect x="0" y="20" rx="5" ry="5" width="100%" height="100%" />


                    </ContentLoader>
                    <ContentLoader height={50} width='40%' duration={1000} backgroundColor={fadeColor}
                        foregroundColor={background}>

                        <Rect x="0" y="20" rx="5" ry="5" width="100%" height="100%" />


                    </ContentLoader>

                </View>
                <View style={styles.subContentContainer}>
                    <ContentLoader height={50} width='30%' duration={1000} backgroundColor={fadeColor}
                        foregroundColor={background}>

                        <Rect x="0" y="20" rx="5" ry="5" width="100%" height="100%" />


                    </ContentLoader>
                    <ContentLoader height={50} width='40%' duration={1000} backgroundColor={fadeColor}
                        foregroundColor={background}>

                        <Rect x="0" y="20" rx="5" ry="5" width="100%" height="100%" />


                    </ContentLoader>

                </View>
                <View style={styles.subContentContainer}>
                    <ContentLoader height={50} width='40%' duration={1000} backgroundColor={fadeColor}
                        foregroundColor={background}>

                        <Rect x="0" y="20" rx="5" ry="5" width="100%" height="100%" />


                    </ContentLoader>
                    <ContentLoader height={50} width='45%' duration={1000} backgroundColor={fadeColor}
                        foregroundColor={background}>

                        <Rect x="0" y="20" rx="5" ry="5" width="100%" height="100%" />


                    </ContentLoader>

                </View>
                <View style={styles.subContentContainer}>
                    <ContentLoader height={50} width='40%' duration={1000} backgroundColor={fadeColor}
                        foregroundColor={background}>

                        <Rect x="0" y="20" rx="5" ry="5" width="100%" height="100%" />


                    </ContentLoader>
                    <ContentLoader height={50} width='40%' duration={1000} backgroundColor={fadeColor}
                        foregroundColor={background}>

                        <Rect x="0" y="20" rx="5" ry="5" width="100%" height="100%" />


                    </ContentLoader>

                </View>
                <ContentLoader height={80} duration={1000} backgroundColor={fadeColor}
                        foregroundColor={background}>

                    <Rect x="0" y="20" rx="5" ry="5" width="100%" height="100%" />


                </ContentLoader>
                <ContentLoader height={50} duration={1000} backgroundColor={fadeColor}
                        foregroundColor={background}>

                    <Rect x="0" y="20" rx="5" ry="5" width="100%" height="100%" />


                </ContentLoader>
                <ContentLoader height={60} duration={1000} backgroundColor={fadeColor}
                        foregroundColor={background}>

                    <Rect x="0" y="20" rx="5" ry="5" width="100%" height="100%" />


                </ContentLoader>
                <ContentLoader height={50} duration={1000} backgroundColor={fadeColor}
                        foregroundColor={background}>

                    <Rect x="0" y="20" rx="5" ry="5" width="100%" height="100%" />


                </ContentLoader>
                <ContentLoader height={80} duration={1000} backgroundColor={fadeColor}
                        foregroundColor={background}>

                    <Rect x="0" y="20" rx="5" ry="5" width="100%" height="100%" />


                </ContentLoader>
                <ContentLoader height={50} duration={1000} backgroundColor={fadeColor}
                        foregroundColor={background}>

                    <Rect x="0" y="20" rx="5" ry="5" width="100%" height="100%" />


                </ContentLoader>




            </View>
        </ScrollView>
    </SafeAreaView>

}

const styles = StyleSheet.create({
    header: {
        display: 'flex',
        flexDirection: "row",

    },
    screen: {
        flex: 1,
    },
    scrollContainer: {
        paddingBottom: 100,
    },
    
    contentContainer: {
        flex: 1,
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height, paddingHorizontal: 17,
        paddingTop: 40
    },
    subContentContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%'
    }
})



export default SplashLoader;