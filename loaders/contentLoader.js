import React from "react"
import ContentLoader, { Rect} from "react-content-loader/native"
import { View,SafeAreaView, ScrollView, Pressable, StyleSheet,Dimensions} from 'react-native'
import { Entypo,Ionicons } from '@expo/vector-icons';
import { useSelector } from "react-redux"


let ContentLoaders = () => {
    let { background,importantText,normalText,fadeColor,blue,fadeButtonColor } = useSelector(state => state.userAuth)
    
    return <SafeAreaView style={{...styles.screen,backgroundColor: background,}}>
    <ScrollView contentContainerStyle={{...styles.scrollContainer,backgroundColor: background,}} showsVerticalScrollIndicator={false}  stickyHeaderIndices={[0]}>
        <View >
            <View style={{ ...styles.headerContainer,backgroundColor: background, }}>
                <Pressable>
                    <Entypo name="menu" size={24} color={background==='white'?"black":"white"} />
                </Pressable>

                

                <Pressable onPress={() => alert('notification')}>
                    <Ionicons name="notifications" size={30} color={background==='white'?"black":"white"} />
                </Pressable>

            </View>

        </View>

        <View style={{...styles.contentLoaderCon,backgroundColor:background}}>

            <ContentLoader backgroundColor={fadeColor}
                foregroundColor={background} height={50} duration={1000}>

                <Rect x="0" y="20" rx="5" ry="5" width="100" height="100%" />



            </ContentLoader>
            <ContentLoader backgroundColor={fadeColor}
                foregroundColor={background} height={100} duration={1000}>

                <Rect x="0" y="20" rx="5" ry="5" width="100%" height="100%" />


            </ContentLoader>
            <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width: '100%' }}>
                <ContentLoader height={50} width='40%' duration={200} backgroundColor={fadeColor}
                foregroundColor={background}>

                    <Rect x="0" y="20" rx="5" ry="5" width="100%" height="100%" />


                </ContentLoader>
                <ContentLoader height={50} width='40%' duration={200} backgroundColor={fadeColor}
                foregroundColor={background}>

                    <Rect x="0" y="20" rx="5" ry="5" width="100%" height="100%" />


                </ContentLoader>

            </View>
            <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width: '100%' }}>
                <ContentLoader height={50} width='40%' duration={1000} backgroundColor={fadeColor}
                foregroundColor={background}>

                    <Rect x="0" y="20" rx="5" ry="5" width="100%" height="100%" />


                </ContentLoader>
                <ContentLoader height={50} width='40%' duration={1000} backgroundColor={fadeColor}
                foregroundColor={background}>

                    <Rect x="0" y="20" rx="5" ry="5" width="100%" height="100%" />


                </ContentLoader>

            </View>
            <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width: '100%' }}>
                <ContentLoader height={50} width='30%' duration={1000} backgroundColor={fadeColor}
                foregroundColor={background}>

                    <Rect x="0" y="20" rx="5" ry="5" width="100%" height="100%" />


                </ContentLoader>
                <ContentLoader height={50} width='40%' duration={1000} backgroundColor={fadeColor}
                foregroundColor={background}>

                    <Rect x="0" y="20" rx="5" ry="5" width="100%" height="100%" />


                </ContentLoader>

            </View>
            <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width: '100%' }}>
                <ContentLoader height={50} width='40%' duration={1000} backgroundColor={fadeColor}
                foregroundColor={background}>

                    <Rect x="0" y="20" rx="5" ry="5" width="100%" height="100%" />


                </ContentLoader>
                <ContentLoader height={50} width='45%' duration={1000} backgroundColor={fadeColor}
                foregroundColor={background}>

                    <Rect x="0" y="20" rx="5" ry="5" width="100%" height="100%" />


                </ContentLoader>

            </View>
            <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width: '100%' }}>
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
        backgroundColor: "#fff",
    },
    scrollContainer: {
        paddingBottom: 100,
    },
    headerContainer: {
        paddingTop: 15,
        display: "flex",
        flexDirection: "row",
        justifyContent: 'space-between',
        position: 'relative',
        paddingHorizontal: 15
    },
    contentLoaderCon:{ 
        flex: 1, 
        width: Dimensions.get('window').width, 
        height: Dimensions.get('window').height,paddingHorizontal:17, 
    },
    giftContainer: {
        display: "flex",
        flexDirection: 'row',
        backgroundColor: 'rgb(240,240,240)',
        borderRadius: 10,
        alignItems: "center",
        height: 40,
        paddingHorizontal: 30,
    },
    giftText: {
        fontSize: 16,
        fontFamily: 'Poppins',
        marginLeft: 10,
        color: '#1652f0',
        alignSelf: 'center'
    }
    ,
    notification: {
        width: 20,
        height: 20,
        position: 'relative',
        padding: 10,
        marginRight: 20
    },
    notificationTextContainer: {
        width: 20,
        height: 20,
        backgroundColor: 'red',
        position: 'absolute',
        bottom: 35,
        left: 15,
        display: 'flex',
        alignItems: "center",
        justifyContent: 'center',
        borderRadius: 20

    },
    notificationText: {
        color: '#fff',
        fontFamily: 'Poppins',
    },
})



export default ContentLoaders;