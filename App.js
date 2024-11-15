import "react-native-gesture-handler"
import 'react-native-reanimated'
import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import * as SplashScreen from 'expo-splash-screen';
import { useFonts } from 'expo-font';
import { Provider } from "react-redux";
import { createStore, applyMiddleware, combineReducers } from 'redux';
import { thunk } from 'redux-thunk';
import { userAuthReducer } from "./store/reducer/appStorage";

import {
  SafeAreaView,
} from 'react-native-safe-area-context';

// Importing component
import Screen from "./config";


// Prevent splash screen from hiding automatically
SplashScreen.preventAutoHideAsync();

let App = () => {
  // Redux store setup
  const rootReducer = combineReducers({
    userAuth: userAuthReducer,
  });
  // Creating store
  const store = createStore(rootReducer, applyMiddleware(thunk));

  let [fontsLoaded] = useFonts({
    'ABeeZee': require('./assets/fonts/ABeeZee-Regular.ttf'),
    'Poppins': require('./assets/fonts/Poppins-Medium.ttf'),
  });

  useEffect(() => {
    async function hideSplashScreen() {
      if (fontsLoaded) {
        await SplashScreen.hideAsync(); // Hide splash screen when fonts are loaded
      }
    }
    hideSplashScreen();
  }, [fontsLoaded]);



  if (!fontsLoaded) {

    return (<SafeAreaView style={styles.screen}>
      <View style={styles.container}>
        <Text style={styles.logo}>Capchain</Text>
      </View>
    </SafeAreaView>)
  }

  return (
    <Provider store={store}>
     
        <Screen />

    </Provider >


  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#1652f0",
    zIndex: 10,
  },
  container: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    color: '#fff',
    fontSize: 35,
  }
});

export default App