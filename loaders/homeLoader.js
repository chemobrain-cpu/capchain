import React from "react"
import ContentLoader, { Rect, Circle} from "react-content-loader/native"
import { View, Text, SafeAreaView, ScrollView, Pressable, StyleSheet} from 'react-native'
import { Entypo, MaterialIcons,Ionicons} from '@expo/vector-icons';

const MyLoader = (props) => (
    <SafeAreaView style={styles.screen}>
        <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false} onScroll={scrollHandler} stickyHeaderIndices={[0]}>
            <View >
                <View style={{ ...styles.headerContainer }}>
                    <Pressable >
                        <Entypo name="menu" size={24} color="black" />
                    </Pressable>

                    <Pressable  style={styles.amountContainer}>

                        <Text style={{ ...styles.giftText, color: 'black', fontFamily: "Poppins", fontSize: 17 }}>$0.00</Text>


                    </Pressable>


                    <Pressable >
                        <Ionicons name="notifications" size={30} color="black" />
                    </Pressable>

                </View>

            </View>
            <ContentLoader
                speed={2}
                width={400}
                height={600}
                viewBox="0 0 400 600"
                backgroundColor="#f3f3f3"
                foregroundColor="#fff"
                {...props}
            >
                <Rect x="57" y="28" rx="0" ry="0" width="6" height="7" />
                <Circle cx="154" cy="126" r="3" />
                <Circle cx="160" cy="338" r="3" />
                <Circle cx="166" cy="345" r="4" />
                <Rect x="215" y="281" rx="0" ry="0" width="0" height="2" />
                <Rect x="303" y="226" rx="0" ry="0" width="2" height="0" />
                <Rect x="139" y="229" rx="0" ry="0" width="0" height="1" />
                <Rect x="25" y="442" rx="0" ry="0" width="1" height="0" />
                <Rect x="1" y="1" rx="0" ry="0" width="79" height="18" />
                <Rect x="3" y="35" rx="0" ry="0" width="79" height="32" />
                <Rect x="5" y="89" rx="0" ry="0" width="408" height="78" />
                <Rect x="7" y="210" rx="0" ry="0" width="118" height="26" />
                <Rect x="9" y="257" rx="0" ry="0" width="117" height="30" />
                <Rect x="9" y="315" rx="0" ry="0" width="119" height="31" />
                <Rect x="9" y="365" rx="0" ry="0" width="104" height="25" />
                <Rect x="10" y="418" rx="0" ry="0" width="124" height="28" />
                <Rect x="14" y="462" rx="0" ry="0" width="130" height="21" />
                <Rect x="10" y="521" rx="0" ry="0" width="559" height="18" />
                <Rect x="286" y="211" rx="0" ry="0" width="132" height="23" />
                <Rect x="250" y="255" rx="0" ry="0" width="160" height="28" />
                <Rect x="296" y="319" rx="0" ry="0" width="130" height="28" />
                <Rect x="285" y="370" rx="0" ry="0" width="142" height="25" />
                <Rect x="267" y="419" rx="0" ry="0" width="147" height="25" />
            </ContentLoader>
        </ScrollView>

    </SafeAreaView>

)

const styles = StyleSheet.create({
    header: {
        display: 'flex',
        flexDirection: "row",

    },
    screen: {
        flex: 1,
        backgroundColor: "#fff",
        paddingHorizontal: 0,

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
        backgroundColor: '#fff',
        paddingHorizontal: 15

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

export default MyLoader

