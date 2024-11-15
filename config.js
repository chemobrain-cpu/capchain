import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { View } from 'react-native'
import { useSelector } from "react-redux";
import { AntDesign, MaterialCommunityIcons, Feather, Octicons } from '@expo/vector-icons';


//app screen
import Home from "./screens/Home";
import Pay from "./screens/Pay";
import Assets from "./screens/Asset";
import Trades from "./screens/Trade";
import ProfileSetting from "./screens/ProfileSetting";
import LearnEarn from "./screens/LearnEarn";
import InviteFriend from "./screens/InviteFriend"
import Earn from "./screens/Earnyield"
import EarnAsset from "./screens/EarnOption"
import WalletAsset from "./screens/AddressFromList"
import RecieveCrypto from "./screens/Recieve"
import SendInfo from "./screens/SendGift"
import Calculator from './screens/CryptoCalculator'
import Card from './screens/Card'
import GetWallet from "./screens/Wallet"
import TradeList from "./screens/TradeList";
import WatchList from "./screens/WatchList";
import TopMovers from "./screens/TopMovers";
import TradePriceChart from "./screens/TradePriceChart";
import BuyPriceChart from "./screens/BuyPriceChart";
import BuyCryptoList from "./screens/BuyCryptoList";
import SellList from "./screens/SellList";
import IdVerification from "./screens/imageVerification"
import SendList from "./screens/SendList"
import ConvertList from "./screens/ConvertList"
import Camera_1 from "./screens/Camera_1"
import Camera_2 from "./screens/Camera_2"
import Notification from "./screens/Notification"
import TopUp from "./screens/TopUp"
import CryptoForm from "./screens/CryptoForm";
import PaymentChoice from "./screens/paymentChoice";
import WithdrawFund from "./screens/WithdrawFund";
import Tax from "./screens/Tax";
import Tnt from "./screens/Tnt";
import Ktc from "./screens/Ktc";
import Ust from "./screens/Ust";
import ConvertTo from "./screens/ConvertToList";
import ConvertCalculator from "./screens/ConvertCalculator";
import LinkToCard from "./screens/linktoCard";
import LimitAndFeatures from "./screens/LimitAndFeature";
import Privacy from "./screens/Privacy";
import PhoneSetting from "./screens/PhoneSetting";
import NewPhone from "./screens/NewPhoneForm";
import ConfirmNewPhone from "./screens/ConfirmNewPhone";
import UserCard from "./screens/updateUser";
import Pin from "./screens/Pin";
import ConfirmPin from "./screens/ConfirmPin";
import PinSetting from "./screens/PinSetting";
import Password from "./screens/Password";
import Authorize from "./screens/Authorize";
import Photo from "./screens/Photo";
import SendCryptoCalculator from "./screens/SendCryptoCalculator"
import Appearance from "./screens/Appearance"
import SendToBank from "./screens/SendCryptoToBank"
import SendCashToBank from "./screens/SendCashToBank"
import Transaction from "./screens/Transactions"
import TransactionDetail from "./screens/TransactionDetails"

//auth screen
import Splash_1 from "./auth/splash";
import Splash_2 from "./auth/splash2";
import Login from "./auth/login";
import Signup from "./auth/signup";
import PriceChart from "./auth/priceChart";
import Verification from "./auth/verification";
import Secure from "./auth/secure";
import Number from "./auth/number";
import VerifyNumber from "./auth/verifyNumber";
import Authenticate from "./auth/authenticate";
import VerifySuccess from "./auth/verifySuccess";
import SearchSplash from "./auth/searchSplash";


//importing component
import CustomDrawerContent from "./component/DrawerContent";
import Transactions from './screens/Transactions';
const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

const TabNavigator = () => {
    let { background, importantText, normalText, fadeColor, blue, fadeButtonColor } = useSelector(state => state.userAuth);

    return (
        <Tab.Navigator
            initialRouteName='HomeApp'
            screenOptions={({ route }) => ({
                tabBarStyle: {
                    backgroundColor: 'black', // Set the tab bar background color to black
                },
                tabBarShowLabel: true, // Disable the tab labels
                tabBarIcon: ({ focused }) => {
                    let iconColor = focused ? "#1652f0" : importantText; // Define icon color based on focus
                    let iconSize = 24; // Define icon size

                    // Return icons based on route name
                    switch (route.name) {
                        case 'Home':
                            return (
                                <View style={{ alignItems: "center", justifyContent: "center" }}>
                                    <Octicons name="home" size={iconSize} color={iconColor} />
                                </View>
                            );
                        case 'Assets':
                            return (
                                <View style={{ alignItems: "center", justifyContent: "center" }}>
                                    <MaterialCommunityIcons name="clock-time-three-outline" size={iconSize} color={iconColor} />
                                </View>
                            );
                        case 'Trade':
                            return (
                                <View style={{ alignItems: "center", justifyContent: "center" }}>
                                    <Feather name="trending-up" size={iconSize} color={iconColor} />
                                </View>
                            );
                        case 'Pay':
                            return (
                                <View style={{ alignItems: "center", justifyContent: "center" }}>
                                    <AntDesign name="man" size={iconSize} color={iconColor} />
                                </View>
                            );
                        default:
                            return null;
                    }
                },
                headerShown: false
            })}
        >
            <Tab.Screen name="Home" component={Home} />
            <Tab.Screen name="Assets" component={Assets} />
            <Tab.Screen name="Trade" component={Trades} />
            <Tab.Screen name="Pay" component={Pay} />
        </Tab.Navigator>
    );
};



const DrawerNavigator = () => {
    let { user, token, background, importantText, normalText, fadeColor, blue, fadeButtonColor } = useSelector(state => state.userAuth)

    return <Drawer.Navigator
        drawerContent={(props) => CustomDrawerContent({ ...props, user, background, importantText, normalText, fadeColor, blue, fadeButtonColor })}
    >
        <Drawer.Screen name='Hom' component={TabNavigator} options={{ headerShown: false }} />
    </Drawer.Navigator>
}




function Configuration() {
    let { token } = useSelector(state => state.userAuth)
    if (!token) {
        return <NavigationContainer>
            <Stack.Navigator initialRouteName="Splash_1">
                <Stack.Screen
                    name="Splash_2"
                    component={Splash_2}
                    options={{ headerShown: false }}
                />

                <Stack.Screen
                    name="Splash_1"
                    component={Splash_1}
                    options={{ headerShown: false }}
                />

                <Stack.Screen
                    name="Login"
                    component={Login}
                    options={{ headerShown: false }}
                />

                <Stack.Screen
                    name="Signup"
                    component={Signup}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="PriceChart"
                    component={PriceChart}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="Verification"
                    component={Verification}
                    options={{ headerShown: false }}
                />

                <Stack.Screen
                    name="Secure"
                    component={Secure}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="VerifyNumber"
                    component={VerifyNumber}
                    options={{ headerShown: false }}
                />

                <Stack.Screen
                    name="Authenticate"
                    component={Authenticate}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="VerifySuccess"
                    component={VerifySuccess}
                    options={{ headerShown: false }}
                />

                <Stack.Screen
                    name="Number"
                    component={Number}
                    options={{ headerShown: false }}
                />

                <Stack.Screen
                    name="SearchSplash"
                    component={SearchSplash}
                    options={{ headerShown: false }}
                />
            </Stack.Navigator>
        </NavigationContainer>


    } else {
        return <NavigationContainer>
            <Stack.Navigator initialRouteName="Home">


                <Stack.Screen
                    name="Home"
                    component={DrawerNavigator}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="Transactions"
                    component={Transaction}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="TransactionDetails"
                    component={TransactionDetail}
                    options={{ headerShown: false }}
                />

                <Stack.Screen
                    name="SendToBank"
                    component={SendToBank}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="SendCashToBank"
                    component={SendCashToBank}
                    options={{ headerShown: false }}
                />

                <Stack.Screen
                    name="Appearance"
                    component={Appearance}
                    options={{ headerShown: false }}
                />

                <Stack.Screen
                    name="NewPhone"
                    component={NewPhone}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="UserCard"
                    component={UserCard}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="ConfirmNewPhone"
                    component={ConfirmNewPhone}
                    options={{ headerShown: false }}
                />

                <Stack.Screen
                    name="PhoneSetting"
                    component={PhoneSetting}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="Privacy"
                    component={Privacy}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="LimitAndFeatures"
                    component={LimitAndFeatures}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="LinkToCard"
                    component={LinkToCard}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="ConvertCalculator"
                    component={ConvertCalculator}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="Tax"
                    component={Tax}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="ConvertToList"
                    component={ConvertTo}
                    options={{ headerShown: false }}
                />

                <Stack.Screen
                    name="Tnt"
                    component={Tnt}
                    options={{ headerShown: false }}
                />

                <Stack.Screen
                    name="Ktc"
                    component={Ktc}
                    options={{ headerShown: false }}
                />

                <Stack.Screen
                    name="Ust"
                    component={Ust}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="PaymentChoice"
                    component={PaymentChoice}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="CryptoForm"
                    component={CryptoForm}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="WithdrawFund"
                    component={WithdrawFund}
                    options={{ headerShown: false }}
                />

                <Stack.Screen
                    name="ProfileSetting"
                    component={ProfileSetting}
                    options={{ headerShown: false }}
                />

                <Stack.Screen
                    name="TopUp"
                    component={TopUp}
                    options={{ headerShown: false }}
                />

                <Stack.Screen
                    name="PinSetting"
                    component={PinSetting}
                    options={{ headerShown: false }}
                />

                <Stack.Screen
                    name="LearnEarn"
                    component={LearnEarn}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="InviteFriend"
                    component={InviteFriend}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="Trade"
                    component={Trades}
                    options={{ headerShown: false }}
                />

                <Stack.Screen
                    name="WalletAsset"
                    component={WalletAsset}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name='Recieve'
                    component={RecieveCrypto}
                    options={{ headerShown: false }}
                />

                <Stack.Screen
                    name='Send'
                    component={SendInfo}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name='CryptoCalculator'
                    component={Calculator}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="CardForm"
                    component={Card}
                    options={{ headerShown: false }}
                />



                <Stack.Screen
                    name="UstScreen"
                    component={Ust}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="EarnYield"
                    component={Earn}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="EarnAssets"
                    component={EarnAsset}
                    options={{ headerShown: false }}
                />

                <Stack.Screen
                    name="Wallet"
                    component={GetWallet}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="PriceChart"
                    component={PriceChart}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="TradeList"
                    component={TradeList}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="WatchList"
                    component={WatchList}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="BuyCryptoList"
                    component={BuyCryptoList}
                    options={{ headerShown: false }}
                />

                <Stack.Screen
                    name="TopMovers"
                    component={TopMovers}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="TradePriceChart"
                    component={TradePriceChart}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="BuyPriceChart"
                    component={BuyPriceChart}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="Camera_1"
                    component={Camera_1}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="Camera_2"
                    component={Camera_2}
                    options={{ headerShown: false }}
                />

                <Stack.Screen
                    name="VerifyId"
                    component={IdVerification}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="SellList"
                    component={SellList}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="SendList"
                    component={SendList}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="ConvertList"
                    component={ConvertList}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="Notification"
                    component={Notification}
                    options={{ headerShown: false }}
                />

                <Stack.Screen
                    name="Pin"
                    component={Pin}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="Password"
                    component={Password}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="ConfirmPin"
                    component={ConfirmPin}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="Authorize"
                    component={Authorize}
                    options={{ headerShown: false }}
                />


                <Stack.Screen
                    name="PhotoIdentity"
                    component={Photo}
                    options={{ headerShown: false }}
                />

                <Stack.Screen
                    name='SendCryptoCalculator'
                    component={SendCryptoCalculator}
                    options={{ headerShown: false }}
                />

            </Stack.Navigator>
        </NavigationContainer>


    }
}



export default Configuration



