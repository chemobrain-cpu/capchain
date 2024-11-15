import React, { useState, useEffect, } from 'react'
import { View, Text, SafeAreaView, Pressable, StyleSheet, TextInput, FlatList,KeyboardAvoidingView } from 'react-native'
import { Feather, FontAwesome } from '@expo/vector-icons'
import CryptoCard from '../component/currencyContainer'
import WalletAssetLoader from "../loaders/walletAssetsLoader";
import { loadCoins } from "../store/action/appStorage";
import Error from '../component/errorComponent'
import { useDispatch, useSelector } from "react-redux";


let TopMoversList = ({ navigation }) => {
  //getting crypto data from coinmarcap
  let [text, setText] = useState('')
  let [focus, setFocus] = useState(false)
  let [coins, setCoins] = useState([])
  let [filteredCoins, setFilteredCoins] = useState([])
  let [isLoading, setIsLoading] = useState(true)
  let [error, setError] = useState(false)
  let dispatch = useDispatch()

  let { background,importantText,normalText,fadeColor,blue,fadeButtonColor } = useSelector(state => state.userAuth)

  //destructuring from param

  let navigationHandler = (coin) => {
    navigation.navigate('PriceChart', { price: coin.current_price, percentage: parseFloat(coin.price_change_percentage_24h).toFixed(2), name: coin.id.toLowerCase(), market_cap: coin.market_cap, total_volume: coin.total_volume, circulating_supply: coin.circulating_supply, market_cap_rank: coin.market_cap_rank })
  }

  const changeText = (e) => {
    if (e) {
      const newData = coins.filter((item) => {
        const itemData = item.id ? item.id.toUpperCase() : ''.toUpperCase();
        const textData = e.toUpperCase();
        return itemData.indexOf(textData) > -1;
      })

      setFilteredCoins(newData)
      setText(e)
    } else {
      setFilteredCoins(coins)
      setText(e)
    }

  }

  let fetchData = async (pageNumber = 2) => {
    // You can await here
    try {
      setError(false)
      let response = await dispatch(loadCoins(pageNumber))
      if (!response.bool) {
        setError(true)
        setIsLoading(false)
        return
      }
      setIsLoading(false)

      setCoins([response.message[0], response.message[1], response.message[2], response.message[3], response.message[4]]);

      setFilteredCoins([response.message[0], response.message[1], response.message[2], response.message[3], response.message[4]]);

    } catch (err) {
      setError(true)
      setIsLoading(false);

    }


  }


  useEffect(() => {
    fetchData()
  }, [])

  const renderItem = ({ item, index }) => <CryptoCard navigationHandler={() => navigationHandler(item)}
    key={item}
    coin={item}
  />

  if (isLoading) {
    return <WalletAssetLoader title='Top Movers' />
  }
  if (error) {
    return <Error tryAgain={fetchData} navigation={navigation} />
  }

  return <SafeAreaView style={{ flex: 1, backgroundColor:background }}>
    <View style={styles.headerContainer}>
      <View style={styles.assetsheaderText}>
        <Pressable onPress={() => navigation.goBack()} style={styles.assetsheaderTextCon}>
          <Feather name="arrow-left" size={25} color={background==='white'?"black":"white"} />
          <Text style={{...styles.assetsText,color:importantText}}>Top movers</Text>

        </Pressable>


      </View>

      <View style={styles.assetsheaderCon}>

        <KeyboardAvoidingView style={focus ? { ...styles.inputContainer, borderColor: blue } : { ...styles.inputContainer, borderColor:importantText , }}>
          <FontAwesome name="search" size={18} color={focus ? "#1652f0" : "rgb(44, 44, 44)"} />
          <TextInput
            style={{ ...styles.input, borderColor: 'orange' }}
            onChangeText={changeText}
            value={text}
            placeholder="Search"
            placeholderTextColor={normalText}
            onFocus={() => {
              setFocus(true);
            }}
            onBlur={() => {
              setFocus(false);
            }}

          />
        </KeyboardAvoidingView>

      </View>


    </View>


    <View style={{...styles.middlesection,backgroundColor:background}}>
      <FlatList
        showsVerticalScrollIndicator={false}
        data={filteredCoins}
        keyExtractor={(item, index) => item.id}
        initialNumToRender={20}
        renderItem={renderItem}
      />
    </View>
  </SafeAreaView>

}

const styles = StyleSheet.create({
  headerContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%',
    zIndex: 10,
    paddingTop: 15,
    paddingHorizontal: 15
  },
  assetsheaderCon: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    paddingLeft: 10

  },
  assetsheaderText: {
    marginBottom: 10,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',


  },
  assetsheaderTextCon: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    width: '100%'


  },
  assetsText: {
    fontSize: 20,
    fontFamily: 'Poppins',
    marginLeft: 60

  },

  inputContainer: {
    width: '80%',
    marginRight: 15,
    borderRadius: 25,
    borderWidth: 1,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 15

  },
  input: {
    height: 45,
    paddingHorizontal: 10,
    fontFamily: 'ABeeZee',
    marginBottom: 5,
    alignSelf: 'stretch',
    width: '80%'
  },
  /*end of header section style*/
  middlesection: {
    backgroundColor: '#fff',
    marginBottom: 30,
  },
  trending: {
    fontSize: 25,
    fontFamily: 'Poppins'
  },
  searchIconContainer: {
    width: 50,
    height: 50,
    borderRadius: 50,
    backgroundColor: 'rgb(240,240,240)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15
  },

  assetText: {
    fontSize: 16,
    fontFamily: 'Poppins',
    paddingLeft: 15
  },

  cryptoInfoCon: {
    paddingTop: 25,
    flexDirection: "row",
    alignItems: "center",
  },

})


export default TopMoversList