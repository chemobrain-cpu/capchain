import React from "react";
import { View, Text, StyleSheet, Image, Dimensions,Pressable} from 'react-native';
import { Entypo, MaterialIcons, MaterialCommunityIcons, Feather,FontAwesome } from '@expo/vector-icons';
import * as WebBrowser from 'expo-web-browser';
import { useSelector } from "react-redux";

const HomeTimeline = ({data}) => {
    const {logo,title,action,topic,about,likeNo,url,browserUrl} = data
    let { background,importantText,normalText,fadeColor,blue,fadeButtonColor } = useSelector(state => state.userAuth)

//icon component
    let Icon = ()=>{
        if(logo == "question"){
            return  <FontAwesome name="question" size={20} color="#fff" />      

        }else if(logo == 'star'){
            return <MaterialCommunityIcons name="star-four-points" size={15} color="#fff" />

        }else if(logo == "brick"){
            return <Feather name="layout" size={20} color="#fff" />

        }
    }

    let browserHandler = async()=>{
        if(!browserUrl){
            return
        }
        await WebBrowser.openBrowserAsync(browserUrl)
    }

    return (<Pressable style={{...styles.container,borderColor: fadeColor}} onPress={browserHandler}>
        <View style={styles.headerSection}>
            <View style={styles.logoContainer}>
                <View style={styles.logo}>
                    {Icon()}
                    

                </View>


                <View style={styles.titleActionContainer}>

                    <Text style={{...styles.titleText,color:importantText}}>
                        {title}
                    </Text>

                    <Text style={{ ...styles.actionText, color:background==="white"? 'rgb(100,100,100)':normalText }}>
                        {action}

                    </Text>



                </View>

            </View>

            <View style={styles.epsillomContainer}>
                <MaterialCommunityIcons name="dots-vertical" size={24} color={normalText} />

            </View>

        </View>
        <View style={styles.bodySection}>
            <Image
                source={url}
                style={styles.image} />

        </View>
        <View style={styles.footerSection}>
            <View style={styles.topicContainer}>
                <Text style={{...styles.topicText,color:importantText}}>{topic}</Text>

            </View>
            <View style={styles.aboutContainer}>
                <Text style={{...styles.aboutText,color:normalText}}>
                    {about}
                </Text>

            </View>
            <View style={styles.likesContainer}>
                <MaterialIcons name="favorite-outline" size={24} color={importantText} style={styles.likeIcon} />
                <Text style={styles.likeText}>{likeNo}</Text>
                <Feather name="upload" size={24} color={importantText} style={styles.likeIcon} />

            </View>

        </View>
    </Pressable>
    );
};

const styles = StyleSheet.create({
    container:{ 
        borderTopWidth: 1, 
        borderBottomWidth: 1, 
        paddingTop: 15 
    },
     headerSection: {
        display: 'flex',
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 15

    },
    logoContainer: {
        flex: 2,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',


    },
    logo:{
        width:30,
        height:30,
        borderRadius:30,
        backgroundColor:'#1652f0',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent:"center",
        marginRight:10
    },
    epsillomContainer: {
        flex: 1
    },
    titleActionContainer: {
        display: 'flex',
        flexDirection: 'column',

    },
    titleText: {
        fontSize: 19,
        fontFamily: 'Poppins',


    },
    actionText: {
        fontSize: 16,
        fontFamily: 'ABeeZee',

    },
    epsillomContainer: {
        flex: 1,
        display: 'flex',
        flexDirection: "row",
        justifyContent: 'flex-end'

    },
    image: {
        width: Dimensions.get('window').width,
        height: 200
    },
    bodySection: {
        paddingVertical: 20
    },
    footerSection: {
        paddingBottom: 20,
        paddingHorizontal:10

    },
    topicContainer: {
        paddingBottom: 5,
        

    },
    topicText:{
        fontSize:18,
        fontFamily: 'Poppins',
    },
    aboutText:{
        fontSize: 16,
        fontFamily: 'ABeeZee',
        paddingBottom:10

    },
    likesContainer: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: "center",
        justifyContent: "flex-start"

    },
    likeText:{
        fontSize:18,
        color:'black',
        fontFamily: 'Poppins',
        marginHorizontal:10

    },
    likeIcon:{
        marginBottom:10
    },

})

export default HomeTimeline;


