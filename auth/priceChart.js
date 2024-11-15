import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Dimensions,
  StyleSheet,
  Pressable,
  ScrollView
} from "react-native";
import {
  SafeAreaView,
} from 'react-native-safe-area-context';
import { LineChart, CandlestickChart } from "react-native-wagmi-charts";
import { AntDesign, MaterialIcons, Feather, FontAwesome, Entypo, MaterialCommunityIcons } from '@expo/vector-icons'
import {
  getDetailedCoinData,
  getCoinMarketChart,
  getCandleChartData,
} from "../store/action/appStorage";
import { useRoute } from "@react-navigation/native";
import Error from '../component/errorComponent'
import FilterComponent from '../component/filterComponent'
import { truncate } from "../utils/util"
import { ReactReduxContext, useDispatch, useSelector } from "react-redux"
import millify from "millify";
import Loader from '../loaders/Loader'

const filterDaysArray = [
  { filterDay: "1", filterText: "24h" },
  { filterDay: "7", filterText: "7d" },
  { filterDay: "30", filterText: "30d" },
  { filterDay: "365", filterText: "1y" },
  { filterDay: "max", filterText: "All" },
];




const PriceChart = ({ navigation }) => {
  let dispatch = useDispatch()
  const [coin, setCoin] = useState(null);
  const [coinMarketData, setCoinMarketData] = useState(null);
  const [coinCandleChartData, setCoinCandleChartData] = useState(null);
  const [header, setHeader] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isFetchCoinDataLoading, setIsFetchCoinDataLoading] = useState(false);
  const [isFetchMarketCoinDataLoading, setIsFetchMarketCoinDataLoading] = useState(false);
  const [isFetchCandleStickChartDataLoading, setIsFetchCandleStickChartDataLoading] = useState(false);





  const [isError, setIsError] = useState(false);
  const [selectedRange, setSelectedRange] = useState("1");
  const [isCandleChartVisible, setIsCandleChartVisible] = useState(false);

  let { background, importantText, normalText, fadeColor, blue, fadeButtonColor } = useSelector(state => state.userAuth)

  const route = useRoute();


  //preventing memory leak
  useEffect(() => {
    let focus = navigation.addListener('beforeRemove', (e) => {
      if (isLoading) {
        e.preventDefault();
      } else {
        //can go back
      }
    });
    return focus
  }, [isLoading]);



  const {
    name: coinId,
    market_cap,
    market_cap_rank,
    percentage,
    total_volume,
  } = route.params



  const buyCrypto = () => {
    return navigation.navigate('Login')
  }



  const fetchCoinData = async () => {
    if (isFetchCoinDataLoading) {
      return
    }
    setIsLoading(true)
    setIsFetchCoinDataLoading(true)

    const fetchedCoinData = await dispatch(getDetailedCoinData(coinId));
    if (!fetchedCoinData.bool) {
      //throw error screen
      setIsError(true)
      setIsFetchCoinDataLoading(false)
      return
    }
    setIsLoading(false)
    setCoin(fetchedCoinData.message);
    console.log('fetch coin data')
    console.log(fetchedCoinData.message)
    console.log('fetch coin data')
    setIsFetchCoinDataLoading(false)

  };

  const fetchMarketCoinData = async (selectedRangeValue) => {
    if (isFetchMarketCoinDataLoading) {
      return
    }
    setIsLoading(true)
    setIsFetchMarketCoinDataLoading(true)
    const fetchedCoinMarketData = await dispatch(getCoinMarketChart(
      coinId,
      selectedRangeValue
    ));
    if (!fetchedCoinMarketData.bool) {
      //throw error screen
      setIsError(true)
      setIsFetchMarketCoinDataLoading(false)
      return
    }
    setIsLoading(false)
    setCoinMarketData(fetchedCoinMarketData.message);
    console.log('fetch coin market data')
    console.log(fetchedCoinMarketData.message)
    console.log('fetch coin market data')
    setIsFetchMarketCoinDataLoading(false)
  };

  const fetchCandleStickChartData = async (selectedRangeValue) => {
    if (isFetchCandleStickChartDataLoading) {
      return
    }
    setIsLoading(true)
    setIsFetchCandleStickChartDataLoading(true)
    const fetchedSelectedCandleChartData = await dispatch(getCandleChartData(
      coinId,
      selectedRangeValue
    ));
    
    if (!fetchedSelectedCandleChartData.bool) {
      //throw error screen
      setIsError(true)
      setIsFetchCandleStickChartDataLoading(false)
      return
    }

    setCoinCandleChartData(fetchedSelectedCandleChartData.message);
    console.log('fetch selected data')
    console.log(fetchedSelectedCandleChartData.message)
    console.log('fetch selected data')
    setIsLoading(false)
    setIsFetchCandleStickChartDataLoading(false)
  };


  const scrollHandler = (e) => {
    if (e.nativeEvent.contentOffset.y > 70) {
      setHeader(true)
    } else {
      setHeader(false)
    }
  }


  useEffect(() => {
    fetchCoinData();
    fetchMarketCoinData(1);
    fetchCandleStickChartData();
  }, []);


  const onSelectedRangeChange = (selectedRangeValue) => {
    setSelectedRange(selectedRangeValue);
    fetchMarketCoinData(selectedRangeValue);
    fetchCandleStickChartData(selectedRangeValue);
  };


  const memoOnSelectedRangeChange = React.useCallback(
    (range) => onSelectedRangeChange(range), []);

  if (isLoading || !coin || !coinMarketData || !coinCandleChartData || isFetchCandleStickChartDataLoading || isFetchCoinDataLoading || isFetchMarketCoinDataLoading) {
    return <Loader />
  }
  if (isFetchMarketCoinDataLoading) {
    return <Loader />
  }
  if (isFetchCandleStickChartDataLoading) {
    return <Loader />
  }

  if (isFetchCoinDataLoading) {
    return <Loader />
  }
  let reload = () => {
    setIsError(false)
    fetchCoinData()
    fetchMarketCoinData(1)
    fetchCandleStickChartData();

  }
  if (isError) {
    return <Error tryAgain={reload} />;
  }

  const {
    name,
    market_data: {
      current_price,
      price_change_percentage_24h,
    },
  } = coin;

  const { prices } = coinMarketData;

  const percentageColor =
    price_change_percentage_24h < 0 ? "#ea3943" : "green";

  const chartColor = current_price.usd > prices[0][1] ? "green" : "#ea3943";

  const screenWidth = Dimensions.get("window").width;

  const formatCurrency = ({ value }) => {
    "worklet";
    if (value === "") {
      if (current_price.usd < 1) {
        return `$${current_price.usd}`;
      }
      return `$${current_price.usd.toFixed(3)}`;
    }
    if (current_price.usd < 1) {
      return `$${parseFloat(value).toFixed(3)}`;
    }
    return `$${parseFloat(value).toFixed(3)}`;
  };



  return (
    <SafeAreaView style={{ paddingHorizontal: 10, backgroundColor: background, flex: 1 }}>
      <ScrollView style={styles.chartCon} showsVerticalScrollIndicator={false} stickyHeaderIndices={[0]} onScroll={scrollHandler}>
        {header ? <View >
          <View style={{ ...styles.scrollNavigationHeader, backgroundColor: background, borderBottomColor: fadeColor }}>
            <Pressable onPress={() => navigation.goBack()} style={{ ...styles.goback }} >
              <Feather name="arrow-left" size={28} color={background === 'white' ? "black" : "white"} />
            </Pressable>

            <Text style={{ ...styles.headerName, color: importantText }}>{name}</Text>

            <View style={styles.favouriteContainer}>
              <Pressable>
                <MaterialIcons name="star" size={28} fontWeight='Poppins' color={background === 'white' ? "black" : "white"} />
              </Pressable>

              <Pressable>
                <AntDesign name="download" size={28} fontWeight='Poppins' color={background === 'white' ? "black" : "white"} />
              </Pressable>




            </View>

          </View>
        </View> : <></>}


        <LineChart.Provider
          data={prices.map(([timestamp, value]) => ({ timestamp, value }))}
        >

          {header ? <></> : <View style={{ ...styles.priceContainer, opacity: header ? 0 : 1 }}>
            <View style={{ ...styles.navigationHeader, backgroundColor: background, }}>
              <Pressable style={styles.close} onPress={() => navigation.goBack()}>
                <AntDesign name="arrowleft" size={28} fontWeight='Poppins' color={background === 'white' ? "black" : "white"} />
              </Pressable>

            </View>


            <View>
              <Text style={{ ...styles.name, color: importantText, }}>{name}</Text>
              <View style={styles.favoriteContainer}>
                <LineChart.PriceText
                  format={formatCurrency}
                  style={{ ...styles.currentPrice, color: importantText, }}
                />


                <View style={styles.favorite}>
                  <Pressable style={{ ...styles.favoriteIcon, backgroundColor: fadeColor }}>
                    <MaterialIcons name="star" size={28} fontWeight='Poppins' color={background === 'white' ? "black" : "white"} />
                  </Pressable>

                  <Pressable style={{ ...styles.favoriteIcon, backgroundColor: fadeColor }} >
                    <AntDesign name="download" size={28} fontWeight='Poppins' color={background === 'white' ? "black" : "white"} />
                  </Pressable>
                </View>

              </View>

            </View>

            <View
              style={{
                paddingHorizontal: 3,
                paddingVertical: 8,
                borderRadius: 5,
                flexDirection: "row",
                color: percentageColor
              }}
            >
              <Feather
                name={price_change_percentage_24h < 0 ? "arrow-down-right" : "arrow-up-right"}
                size={24}
                color={percentageColor}
                style={{ alignSelf: "center", marginRight: 5 }}
              />
              <Text style={{ ...styles.priceChange, color: percentageColor }}>
                {Math.abs(price_change_percentage_24h)?.toFixed(3)}%
              </Text>
            </View>


          </View>}

          <View style={{ ...styles.chartContainer, marginTop: header ? 70 : 0 }}>
            {isCandleChartVisible ? (
              <CandlestickChart.Provider
                data={coinCandleChartData.map(
                  ([timestamp, open, high, low, close]) => ({
                    timestamp,
                    open,
                    high,
                    low,
                    close,
                  })
                )}
              >
                <CandlestickChart height={screenWidth / 1.3} width={screenWidth / 1.5}>
                  <CandlestickChart.Candles />
                  <CandlestickChart.Crosshair>
                    <CandlestickChart.Tooltip />
                  </CandlestickChart.Crosshair>
                </CandlestickChart>
                <View style={styles.candleStickDataContainer}>
                  <View>
                    <Text style={{ ...styles.candleStickTextLabel, color: fadeColor }}>Open</Text>
                    <CandlestickChart.PriceText
                      style={{ ...styles.candleStickText, color: background, }}
                      type="open"
                    />
                  </View>
                  <View>
                    <Text style={{ ...styles.candleStickTextLabel, color: fadeColor }}>High</Text>
                    <CandlestickChart.PriceText
                      style={{ ...styles.candleStickText, color: background, }}
                      type="high"
                    />
                  </View>
                  <View>
                    <Text style={{ ...styles.candleStickTextLabel, color: fadeColor }}>Low</Text>
                    <CandlestickChart.PriceText
                      style={{ ...styles.candleStickText, color: background, }}
                      type="low"
                    />
                  </View>
                  <View>
                    <Text style={{ ...styles.candleStickTextLabel, color: fadeColor }}>Close</Text>
                    <CandlestickChart.PriceText
                      style={{ ...styles.candleStickText, color: background, }}
                      type="close"
                    />
                  </View>
                </View>
                <CandlestickChart.DatetimeText
                  style={{ color: "#fff", fontWeight: "700", margin: 10 }}
                />
              </CandlestickChart.Provider>
            ) : (
              <LineChart height={screenWidth / 1.4} width={screenWidth / 1.2}>
                <LineChart.Path color={chartColor} />
                <LineChart.CursorCrosshair color={chartColor} />
              </LineChart>
            )}

          </View>
          <View style={styles.filtersContainer}>
            {filterDaysArray.map((day) => (
              <FilterComponent
                filterDay={day.filterDay}
                filterText={day.filterText}
                selectedRange={selectedRange}
                setSelectedRange={memoOnSelectedRangeChange}
                key={day.filterText}
              />
            ))}

          </View>
        </LineChart.Provider>

        <View style={{ ...styles.aboutContainer, borderTopColor: importantText, borderBottomColor: importantText, }}>
          <Text style={{ ...styles.aboutHead, color: importantText }}>About {name}</Text>
          <Text style={{ ...styles.aboutText, color: normalText }}>{truncate(coin.description.en, 400)}</Text>
        </View>
        <View style={{ ...styles.marketContainer, borderTopColor: importantText, borderBottomColor: importantText, }}>
          <Text style={{ ...styles.aboutHead, color: importantText }}>Market stats</Text>

          <View style={styles.listContainer}>
            <View style={styles.leftListCon}>

              <View style={styles.logoCon}>
                <AntDesign name="layout" size={20} color={blue} />

              </View>
              <View style={styles.logoTextCon}>
                <Text style={{ ...styles.logoText, color: normalText }}>Market cap</Text>
              </View>



            </View>
            <View style={styles.rightListConCon}>
              <Text style={{ ...styles.rightListText, color: normalText }}>{millify(market_cap)}</Text>


            </View>
          </View>

          <View style={styles.listContainer}>
            <View style={styles.leftListCon}>

              <View style={styles.logoCon}>
                <Entypo name="bar-graph" size={20} color={blue} />

              </View>
              <View style={styles.logoTextCon}>
                <Text style={{ ...styles.logoText, color: normalText }}>Volume</Text>

              </View>



            </View>
            <View style={styles.volumeListConCon}>
              <View style={styles.volumeListCon}>

                <Text style={{ ...styles.volumeListText, marginBottom: 5 }}>{millify(total_volume)}</Text>

              </View>
              <View style={styles.volumeListCon}>

                <Text style={{ ...styles.volumeListText, fontSize: 18, color: percentage < 0 ? 'red' : 'black' }}>{percentage < 0 ? <Feather name="arrow-down-right" size={20} color="red" /> : <Feather name="arrow-up-right" size={20} color="green" />}{Math.abs(percentage)?.toFixed(3)}%</Text>

              </View>


            </View>
          </View>

          <View style={styles.listContainer}>
            <View style={styles.leftListCon}>

              <View style={styles.logoCon}>
                <FontAwesome name="clock-o" size={20} color={blue} />

              </View>
              <View style={styles.logoTextCon}>
                <Text style={{ ...styles.logoText, color: normalText }}>Circulating supply</Text>

              </View>



            </View>
            <View style={{ ...styles.rightListConCon }}>
              <Text style={{ ...styles.rightListText, color: normalText }}>{millify(market_cap)}</Text>


            </View>
          </View>

          <View style={styles.listContainer}>
            <View style={styles.leftListCon}>

              <View style={styles.logoCon}>
                <MaterialCommunityIcons name="star-four-points" size={20} color={blue} />

              </View>
              <View style={styles.logoTextCon}>
                <Text style={{ ...styles.logoText, color: normalText }}>Popularity</Text>

              </View>



            </View>
            <View style={styles.popularityListCon}>
              <Text style={{ ...styles.rightListText, color: normalText }}>#{market_cap_rank}</Text>


            </View>
          </View>



        </View>
      </ScrollView>



      <View style={{ ...styles.buttonCon, backgroundColor: background, }} >
        <Pressable style={{ ...styles.button, backgroundColor: blue, }} onPress={buyCrypto}>
          <Text style={styles.buttonText}>buy</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  scrollNavigationHeader: {
    paddingBottom: 10,
    zIndex: 10,
    width: '100%',
    borderBottomWidth: .5,
    paddingTop: 10,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerName: {
    fontFamily: 'ABeeZee',
    fontSize: 20,
    fontFamily: 'Poppins',
  },
  goback: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'

  },
  favouriteContainer: {
    display: 'flex',
    flexDirection: 'row',
    width: '30%',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around'
  },

  chartCon: {
    height: Dimensions.get('window').height / 1,
    marginTop: 10,

  },
  navigationHeader: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-start',
    //backgroundColor: background,
    zIndex: 5,
    paddingTop: 10

  },
  currentPrice: {
    // color: importantText,
    fontSize: 25,
    fontWeight: "600",
    letterSpacing: 1,
    flex: 2
  },
  name: {
    //color: importantText,
    fontSize: 20,
    fontFamily: 'Poppins'
  },
  priceContainer: {
    padding: 15,
    flexDirection: "column",
  },
  favoriteContainer: {
    display: 'flex',
    flexDirection: "row",
    justifyContent: 'space-between',
    alignItems: "center"
  },
  favorite: {
    display: 'flex',
    flexDirection: "row",
    justifyContent: 'space-between',
    flex: 1
  },
  priceChange: {
    //color: background,
    fontSize: 17,
    fontWeight: "500",
    fontFamily: 'Poppins'
  },
  favoriteIcon: {
    width: 50,
    height: 50,
    borderRadius: 50,
    //backgroundColor: fadeColor,
    display: 'flex',
    flexDirection: "row",
    justifyContent: 'center',
    alignItems: "center"

  },

  /*
  input: {
    flex: 1,
    height: 40,
    margin: 12,
    borderBottomWidth: 1,
    borderBottomColor: background,
    padding: 10,
    fontSize: 16,
    color: background,
  },
  */
  filtersContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 5,
    borderRadius: 5,
    marginTop: 20,
    marginBottom: 30,
  },
  candleStickText: {
    //color: background,
    fontWeight: "700",
  },
  candleStickDataContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 10,
    marginTop: 30,
  },
  candleStickTextLabel: {
    //color: fadeColor,
    fontSize: 13
  },
  chartContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden'
  },
  aboutContainer: {
    paddingVertical: 20,
    borderTopWidth: .5,
    borderBottomWidth: .5,
    display: 'flex',
    flexDirection: 'column',
    paddingHorizontal: 8
  },
  marketContainer: {
    paddingVertical: 20,
    borderTopWidth: .5,
    borderBottomWidth: .5,
    display: 'flex',
    flexDirection: 'column',
    paddingHorizontal: 15
  },
  aboutHead: {
    fontSize: 23,
    marginBottom: 10,
    fontFamily: 'Poppins',

  },
  aboutText: {
    fontSize: 18,
    fontFamily: 'ABeeZee',
  },
  marketStatContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 15
  },
  marketStatHead: {
    fontSize: 20,
    marginBottom: 10,
    fontFamily: 'Poppins'
  },
  buttonCon: {
    fontSize: 20,
    marginBottom: 10,
    fontFamily: 'Poppins',
    height: 80,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  button: {
    width: '100%',
    paddingVertical: 17,
    marginHorizontal: '5%',
    borderRadius: 30,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  buttonText: {
    color: '#fff',
    fontSize: 15,
    fontFamily: 'Poppins'
  },

  listContainer: {
    display: 'flex',
    flexDirection: 'row',
    paddingBottom: 25,
    paddingTop: 25,
    alignItems: 'center',
    width: Dimensions.get('window').width
  },

  leftListCon: {
    display: 'flex',
    flexDirection: "row",
    alignItems: 'center',
    flex: 1,


  },
  logoCon: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start'
  },

  logoTextCon: {
    paddingLeft: 10

  },
  logoText: {
    fontSize: 19,
    fontFamily: 'ABeeZee'
  },
  rightListConCon: {
    display: 'flex',
    flexDirection: "row",
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center'

  },
  rightListText: {
    fontSize: 19,
    fontFamily: 'ABeeZee',
    paddingRight: 5,


  },
  popularityListCon: {
    display: 'flex',
    flexDirection: "row",
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center'

  },
  volumeListConCon: {
    display: 'flex',
    flexDirection: "column",
    alignItems: 'center',
    flex: 1,
    justifyContent: 'flex-start'

  },
  volumeListCon: {
    display: 'flex',
    flexDirection: "column",
    alignItems: 'flex-end',
    flex: 1,
    justifyContent: 'center',

  },
  volumeListText: {
    fontSize: 19,
    fontFamily: 'ABeeZee',
    paddingRight: 5
  }




});


export default PriceChart;