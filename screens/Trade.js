import React, { useState, useCallback, useEffect } from 'react'
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  SafeAreaView,
  ScrollView,
  TextInput,
  Dimensions,
  KeyboardAvoidingView
} from "react-native";

import { Entypo, MaterialIcons, FontAwesome, Feather, AntDesign,Ionicons } from '@expo/vector-icons';
import { useDispatch, useSelector } from "react-redux";
import TopMovers from "../component/HomeTopMovers"
import TopList from "../component/HomeTopList"
import List from '../component/trendingList'
import Error from '../component/errorComponent'
import ShortListLoader from '../loaders/shortListLoader'
import { loadCoins } from "../store/action/appStorage";
import MoversLoader from "../loaders/moversLoader";
import Modal from "../modals/tradingMethodModal"

const Trades = ({ navigation }) => {
  const dispatch = useDispatch()
  let [text, setText] = useState('')
  let [focus, setFocus] = useState(false)
  let { user,background,importantText,normalText,fadeColor,blue,fadeButtonColor } = useSelector(state => state.userAuth)
  const [modalVisible, setModalVisible] = useState(false);
  const [status, seStatus] = useState(false)
  const [isError, setIsError] = useState(false)
  const [isMounted, setIsMounted] = useState(true)
  const [trendingCoins, setTrendingCoins] = useState([]);
  const [topMoversCoinList, setTopMoversCoinList] = useState([]);
  const [coins, setCoins] = useState([]);

  let [isTrendingCoinsLoading, setIsTrendingCoinsLoading] = useState(true)
  let [isMoversLoading, setIsMoversLoading] = useState(true)
  let [isCoinLoading, setIsCoinLoading] = useState(true)
  


  let navigateToList = () => {
    navigation.navigate("TradeList")
  }

  let navigateToTopMoversList = () => {
    navigation.navigate("TopMovers")
  }


  let modalHandler = () => {
    setModalVisible(prev => !prev)
  }
  let changeTradeBasic = () => {
    seStatus(prev => !prev)
    setModalVisible(prev => !prev)
  }

  let fetchData = async () => {
    // You can await here
    try {
      let response = await dispatch(loadCoins())
      if (!response.bool) {
        setIsError(true)
        setIsTrendingCoinsLoading(false)
        return
      }

      setTrendingCoins([response.message[0], response.message[1], response.message[2], response.message[3], response.message[4], response.message[5], response.message[6]]);

      setTopMoversCoinList([response.message[5], response.message[6], response.message[15], response.message[7], response.message[11], response.message[10], response.message[8]])

      setCoins([response.message[0], response.message[1], response.message[2], response.message[3], response.message[4], response.message[5], response.message[6]])
      setIsTrendingCoinsLoading(false)
      setIsMoversLoading(false)
      setIsCoinLoading(false)

    } catch (err) {
      console.log(err)
      setIsError(true)
      setIsTrendingCoinsLoading(false)
      setIsMoversLoading(false)
      setIsCoinLoading(false)
    }


  }


  const changeText = useCallback((e) => {
    navigation.navigate('TradeList')
  }, [coins])


  let navigationHandler = (coin) => {
    navigation.navigate('TradePriceChart',
      {
        price: coin.current_price,
        percentage: parseFloat(coin.price_change_percentage_24h).toFixed(2),
        name: coin.id.toLowerCase(),
        market_cap: coin.market_cap,
        total_volume: coin.total_volume, circulating_supply: coin.circulating_supply,
        market_cap_rank: coin.market_cap_rank
      })
  }

  useEffect(() => {
    fetchData()
  }, [])




  let tryAgain = () => {
    setIsError(false)
    setIsTrendingCoinsLoading(true)
    setIsMoversLoading(true)
    setIsCoinLoading(true)
    fetchData()
  }


  if (isError) {
    //navigate to error
    return <Error
      tryAgain={tryAgain}

    />
  }



  return (<>
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => {
        setModalVisible(!modalVisible);
      }}
      modalVisible = {modalVisible}
      setModalVisible = {setModalVisible}
      status = {status}
      changeTradeBasic = {changeTradeBasic}
    />
      

    <SafeAreaView style={{ flex: 1, backgroundColor: background }}>
      <ScrollView contentContainerStyle={styles.scrollContainer} stickyHeaderIndices={[0]}>
        <View style={{ display: 'flex', width: '100%' }}>
          <View style={{ ...styles.headerContainer, backgroundColor:background, }}>
            <Pressable onPress={() => navigation.openDrawer()}>
              <Entypo name="menu" size={24} color={background==='white'?"black":"white"} />

            </Pressable>

            <Pressable onPress={modalHandler} style={styles.giftContainer}>

              <Text style={{...styles.giftText,color:importantText}}>Trade </Text>

              <MaterialIcons name="keyboard-arrow-down" size={28} color={background==='white'?"black":"white"} />


            </Pressable>


            <Pressable onPress={() => navigation.navigate('Notification')}>
            <Ionicons name="notifications"  size={30} color={background==='white'?"black":"white"} />
              <View style={styles.notification}>
                <View style={styles.notificationTextContainer}>
                  <Text style={styles.notificationText}>{user.notifications.length}</Text>

                </View>

              </View>

            </Pressable>


          </View>
        </View>

        <KeyboardAvoidingView style={focus ? { ...styles.inputContainer, borderColor: blue } : { ...styles.inputContainer, borderColor:importantText , }}>
          <FontAwesome name="search" size={18} color={focus ? blue : normalText} style={{ marginBottom: 10 }} />
          <TextInput
            style={{ ...styles.input }}
            onChangeText={changeText}
            value={text}
            placeholder="Search for an asset"
             placeholderTextColor={normalText}
            onFocus={() => {
              setFocus(true);
            }}
            onBlur={() => {
              setFocus(false);
            }}

          />
        </KeyboardAvoidingView>

        <View style={{...styles.moversection,borderColor: background === 'white' ? 'rgb(180,180,180)' : fadeColor,}}>
          <View style={styles.moversectionheading}>
            <Text
              style={{...styles.moverlefttext,color:importantText}}
            >
              New on capchainp
            </Text>

            <Pressable onPress={() => navigateToList()}>
              <Text
                style={{...styles.moverrighttext}}
              >
                See all
              </Text>

            </Pressable>
          </View>
          <View style={{ paddingLeft: 15 }}>
          {isTrendingCoinsLoading ? <MoversLoader /> : <TopList
            navigationHandler={navigationHandler}
            coins={trendingCoins}
          />}
          </View>


          

        </View>
        <View style={{...styles.moversection,borderColor: background === 'white' ? 'rgb(180,180,180)' : fadeColor,}}>
          <View style={styles.moversectionheading}>
            <Text
              style={{...styles.moverlefttext,color:importantText}}
            >
              Top movers
            </Text>

            <Pressable onPress={() => navigateToTopMoversList()}>
              <Text
                style={styles.moverrighttext}
              >
                See all
              </Text>

            </Pressable>

          </View>
          <View style={{ paddingLeft: 15 }}>
            {isMoversLoading ? <MoversLoader /> : <TopMovers
              navigationHandler={navigationHandler}
              coins={topMoversCoinList}
            />}
          </View>

        </View>

        <View style={styles.assetsection}>
          <View style={styles.assetsectionheading}>
            <Text
              style={{...styles.assetlefttext,color:importantText}}
            >
              Top assets
            </Text>

            <Pressable onPress={() => navigateToList()}>
              <Text
                style={styles.assetrighttext}
              >
                See all
              </Text>

            </Pressable>

          </View>

          {isCoinLoading ? <ShortListLoader /> : <List navigationHandler={navigationHandler}
            coins={coins} />}


        </View>
      </ScrollView>
    </SafeAreaView>
  </>

  );
};

const styles = StyleSheet.create({

  modalBackground: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)'

  },
  modalTop: {
    height: 4,
    width: '20%',
    backgroundColor: 'rgb(225,225,225)',
    position: 'absolute',
    top: '70%',
    alignSelf: 'center',
    borderRadius: 5

  },
  modalView: {
    borderRadius: 20,
    position: 'absolute',
    backgroundColor: '#fff',
    width: Dimensions.get('window').width,
    top: '75%',
    height: '25%',
    display: 'flex',
    flexDirection: 'column',
    borderTopColor: 'rgb(240,240,240)',
    borderTopWidth: 1,
    paddingTop: 20

  },
  modalHeader: {
    fontSize: 20,
    fontFamily: 'Poppins',
    alignSelf: 'flex-start',
    marginBottom: 10,
    paddingHorizontal: 15,

  },
  modalButtonContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '95%',
    alignSelf: 'center',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 25
  },
  modalButtonHead: {
    fontSize: 18,
    fontFamily: 'Poppins',

  },
  modalButtonText: {
    fontSize: 16,
    fontFamily: 'ABeeZee',
    color: 'grey'
  },
  icon: {
    width: '15%'

  },
  content: {
    width: '80%'

  },
  mark: {
    width: '5%'

  },

  /*end of modal styles */
  scrollContainer: {
    paddingBottom: 300,

  },
  headerContainer: {
    paddingTop: 15,
    display: "flex",
    flexDirection: "row",
    justifyContent: 'space-between',
    position: 'relative',
    paddingHorizontal: 15

  },
  giftContainer: {
    display: "flex",
    flexDirection: 'row',
    borderRadius: 10,
    alignItems: "center",
    height: 40,
    paddingHorizontal: 30,
  },
  giftText: {
    fontSize: 16,
    fontFamily: 'Poppins',
    marginLeft: 10,
    alignSelf: 'center'
  },
  notification: {
    width: 20,
    height: 20,
    position: 'relative',
    padding: 10,
    marginRight: 20
  },
  notificationTextContainer: {
    width: 25,
    height: 25,
    backgroundColor: 'red',
    position: 'absolute',
    bottom: 35,
    left: 15,
    display: 'flex',
    alignItems: "center",
    justifyContent: 'center',
    borderRadius: 25
  },
  notificationText: {
    color: '#fff',
    fontFamily: 'Poppins',
  },


  inputContainer: {
    width: '95%',
    borderRadius: 25,
    borderWidth: .5,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 18,
    borderColor: 'black',
    paddingVertical: 5,
    alignSelf: 'center'


  },
  input: {
    height: 45,
    paddingHorizontal: 10,
    fontFamily: 'Poppins',
    alignSelf: 'stretch',
    width: '90%',
    fontSize: 19,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  moversection: {
    paddingLeft: 0,
    paddingTop: 15,
    borderBottomWidth: 1,
    paddingBottom: 30,
    paddingHorizontal: 15,
  },
  moversectionheading: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
  },
  moverlefttext: {
    fontSize: 20,
    fontFamily: 'Poppins',
    color: "rgb(44, 44, 44)",
    paddingTop: 10,
    paddingBottom: 10
  },
  moverrighttext: {
    fontSize: 20,
    fontFamily: 'ABeeZee',
    color: "#1652f0",
    paddingTop: 10,
    paddingBottom: 10
  },


  assetsection: {
    paddingLeft: 0,
    paddingTop: 15,
    paddingBottom: 10,
    marginBottom: 10
  },
  assetsectionheading: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
  },
  assetlefttext: {
    fontSize: 20,
    fontFamily: 'Poppins',
    color: "rgb(44, 44, 44)",
    paddingTop: 10,
    paddingBottom: 10
  },
  assetrighttext: {
    fontSize: 20,
    fontFamily: 'ABeeZee',
    color: "#1652f0",
    paddingTop: 10,
    paddingBottom: 10
  },


})

export default Trades;