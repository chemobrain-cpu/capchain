import axios from 'axios'
export const FORCEUSERIN = "FORCEUSERIN";
export const COINS = "COINS";
export const CHANGE_WALLET = 'CHANGE_WALLET'
export const MODIFY_WATCHLIST = 'MODIFY_WATCHLIST'
export const LOGIN = 'LOGIN'
export const PAYMENT_METHOD = 'PAYMENT_METHOD'
export const BUY_ASSET = 'BUY_ASSET'
export const SELL_ASSET = 'SELL_ASSET'
export const CONVERT_ASSET = 'CONVERT_ASSET'
export const TOPUP = 'TOPUP'
export const TEMPORAL = 'TEMPORAL'
export const CLEANTEMPORAL = 'CLEANTEMPORAL'
export const READNOTIFICATION = 'READNOTIFICATION'
export const ADD_ID = "ADD_ID"
export const LOGOUT = "LOGOUT"
export const UPDATEUSER = "UPDATEUSER"
export const CHANGE_BLACK = 'CHANGE_BLACK'
export const CHANGE_WHITE = 'CHANGE_WHITE'
export const LOAD_COINS = 'LOAD_COINS'
import AsyncStorage from '@react-native-async-storage/async-storage';
import ErrorModal from '../../modals/errorModal';
import { RNS3 } from "react-native-aws3"


//utility function for calculating if token expires
let calculateRemainingTime = (expiryDate) => {
  //getting current time in milliseconds
  const currentTime = new Date().getMilliseconds()

  //getting expiration time in milliseconds
  const adjustExpirationTime = (expiryDate * 60 * 60 * 1000)
  const timeLeft = adjustExpirationTime - currentTime
  return timeLeft
}

let retrievedStoredToken = async () => {
  let tokenFromStorage = await AsyncStorage.getItem('token');
  let expiryDate = await AsyncStorage.getItem('tokenExpiry');

  const timeLeft = calculateRemainingTime(Number(expiryDate))
  if (timeLeft <= 3600) {
    await AsyncStorage.removeItem('token')
    await AsyncStorage.removeItem('tokenExpiry')
    await AsyncStorage.removeItem('userId')

    return {
      token: "",
      expiresIn: "",
    }
  }

  return {
    token: tokenFromStorage,
    expiresIn: timeLeft,
  }
}

export const checkIfIsLoggedIn = () => {
  return async (dispatch, getState) => {
    //before anything
    let backgroundColorStyle = await AsyncStorage.getItem('@backgroundColorStyle');
    if (!backgroundColorStyle) {
      let data = {
        background: 'black',
        importantText: 'white',
        normalText: '#5d616d',
        fadeColor: 'rgb(30,30,30)',
        blue: '#1652f0',
        fadeButtonColor: 'rgb(30,30,30)',

      }
      dispatch({ type: CHANGE_BLACK, payload: data })

    } else if (backgroundColorStyle == 'white') {
      let data = {
        background: 'white',
        importantText: 'black',
        normalText: '#5d616d',
        fadeColor: 'rgb(240,240,240)',
        blue: '#1652f0',
        fadeButtonColor: 'rgb(200,200,200)',

      }
      dispatch({ type: CHANGE_WHITE, payload: data })

    } else if (backgroundColorStyle == 'black') {
      let data = {
        background: 'black',
        importantText: 'white',
        normalText: '#5d616d',
        fadeColor: 'rgb(30,30,30)',
        blue: '#1652f0',
        fadeButtonColor: 'rgb(30,30,30)',

      }

      dispatch({ type: CHANGE_BLACK, payload: data })

    }

    try {
      let response
      //check if token is expired
      let { token, expiresIn } = await retrievedStoredToken()

      if (!token) {
        return {
          bool: false,
          message: 'no token'
        }
      }
      //convert expiresIN back to hours
      expiresIn = expiresIn / (60 * 60 * 1000)
      await AsyncStorage.setItem('tokenExpiry', `${expiresIn}`);
      await AsyncStorage.setItem('token', token);
      let userId = await AsyncStorage.getItem('userId')

      if (!userId) {

        return {
          bool: false,
          message: 'no stored user'
        }
      }
      response = await fetch(`https://coincap-backend.onrender.com/auth/userbytoken`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "header": `${token}`
        }
      })

      if (response.status == 200) {
        let data = await response.json()
        let res = {
        }
        res.user = data.response.user
        res.token = token
        res.expiresIn = expiresIn
        res.notification = data.response.notification
        //save userId to async storage
        await AsyncStorage.setItem('userId', data.response.user._id);

        dispatch({ type: FORCEUSERIN, payload: res })
        return {
          bool: true,
          message: res
        }
      }

      if (response.status == 300) {
        let data = await response.json()
        return {
          bool: false,
          message: data.response
        }
      }
      if (response.status == 404) {
        let data = await response.json()
        return {
          bool: false,
          message: data.response
        }
      }

    } catch (err) {
      return {
        bool: false,
        message: err.message
      }
    }
  }
}

export const changeToBlackBackground = () => {
  return async (dispatch, getState) => {
    //before anything
    await AsyncStorage.setItem('@backgroundColorStyle', 'black');
    let data = {
      background: 'black',
      importantText: 'white',
      normalText: '#5d616d',
      fadeColor: 'rgb(30,30,30)',
      blue: '#1652f0',
      fadeButtonColor: 'rgb(30,30,30)',

    }

    dispatch({ type: CHANGE_BLACK, payload: data })

  }

}
export const changeToWhiteBackground = () => {
  return async (dispatch, getState) => {
    //before anything
    await AsyncStorage.setItem('@backgroundColorStyle', 'white');
    let data = {
      background: 'white',
      importantText: 'black',
      normalText: '#5d616d',
      fadeColor: 'rgb(235,235,235)',
      blue: '#1652f0',
      fadeButtonColor: 'rgb(200,200,200)',

    }
    dispatch({ type: CHANGE_WHITE, payload: data })


  }

}

export const signup = (data) => {
  return async (dispatch, getState) => {
    try {
      let response = await fetch('https://coincap-backend.onrender.com/auth/emailsignup', {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data)
      })

      if (response.status === 300) {
        let data = await response.json()
        return {
          bool: false,
          message: data.response,
          url: 'Signup',
        }
      }
      if (response.status === 301) {
        let data = await response.json()
        return {
          bool: false,
          message: data.response,
          url: 'Login'
        }
      }
      if (response.status === 200) {
        let data = await response.json()
        return {
          bool: true,
          message: data.response
        }
      }
    }
    catch (err) {
      return {
        bool: false,
        message: err.message
      }
    }
  }
}

//login handler
export const login = (data) => {

  return async (dispatch, getState) => {
    try {

      let response = await fetch('https://coincap-backend.onrender.com/auth/login', {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data)
      })
      if (response.status === 404) {

        let data = await response.json()
        return {
          bool: false,
          message: data.response,
          url: 'Signup'
        }
      }
      if (response.status === 403) {

        let data = await response.json()
        return {
          bool: false,
          message: data.response,
          url: 'Login'
        }
      }
      if (response.status === 300) {

        let data = await response.json()

        return {
          bool: false,
          message: data.response,
          url: 'Login'
        }
      }
      if (response.status === 201) {

        let data = await response.json()
        return {
          bool: false,
          message: data.response,
          url: 'Verification'
        }
      }
      if (response.status === 202) {

        let data = await response.json()
        return {
          bool: false,
          message: data.response,
          url: 'VerifyNumber'
        }
      }
      if (response.status === 200) {

        let data = await response.json()
        //dispatching the LOGIN action
        await AsyncStorage.setItem('tokenExpiry', `${data.response.expiresIn}`);
        await AsyncStorage.setItem('token', data.response.token);
        await AsyncStorage.setItem('userId', data.response.user._id);

        dispatch({ type: LOGIN, payload: data.response })

        return {
          bool: true,
          message: data.response,
        }

      }
    } catch (err) {
      return {
        bool: false,
        message: err.message,
        url: 'Login'

      }
    }

  }
}
//checking if user has verified their email
export const verifiedEmail = (data) => {
  return async (dispatch, getState) => {
    try {
      let response = await fetch('https://coincap-backend.onrender.com/auth/confirmuserverification', {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data)
      })
      if (response.status === 404) {
        let data = await response.json()
        return {
          bool: false,
          message: data.response
        }
      }
      if (response.status === 200) {
        let data = await response.json()
        return {
          bool: true,
          message: data.response
        }
      }
      if (response.status === 300) {
        let data = await response.json()
        return {
          bool: false,
          message: data.response
        }
      }
    } catch (err) {
      return {
        bool: false,
        message: err.message
      }
    }
  }
}
// phone number verification
export const phoneNumber = (data) => {
  return async (dispatch, getState) => {
    try {
      let response = await fetch(`https://coincap-backend.onrender.com/auth/phone`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data)
      })
      if (response.status === 404) {
        let data = await response.json()
        return {
          bool: false,
          message: data.response
        }
      }
      if (response.status === 400) {
        let data = await response.json()
        return {
          bool: false,
          message: data.response
        }
      }
      if (response.status === 200) {
        let data = await response.json()
        return {
          bool: true,
          message: data.response
        }
      }
      if (response.status === 300) {
        let data = await response.json()
        return {
          bool: false,
          message: data.response
        }
      }
    } catch (err) {
      return {
        bool: false,
        message: 'network error'
      }
    }
  }
}
// change phone
export const changePhone = (data) => {
  return async (dispatch, getState) => {
    let { token } = getState().userAuth
    try {
      let response = await fetch(`https://coincap-backend.onrender.com/auth/changephone`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "header": `${token}`
        },
        body: JSON.stringify(data)
      })
      if (response.status === 404) {
        let data = await response.json()
        return {
          bool: false,
          message: data.response
        }
      }
      if (response.status === 400) {
        let data = await response.json()
        return {
          bool: false,
          message: data.response
        }
      }
      if (response.status === 200) {
        let data = await response.json()
        return {
          bool: true,
          message: data.response
        }
      }
      if (response.status === 300) {
        let data = await response.json()
        return {
          bool: false,
          message: data.response
        }
      }
    } catch (err) {
      return {
        bool: false,
        message: 'network error'
      }
    }
  }
}
//user update phone confirmation  phone number confirmation
export const confirm = (data) => {
  return async (dispatch, getState) => {
    let { token } = getState().userAuth

    try {
      let response = await fetch(`https://coincap-backend.onrender.com/auth/confirmnewphone`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "header": `${token}`
        },
        body: JSON.stringify(data)
      })
      if (response.status === 404) {
        let data = await response.json()
        return {
          bool: false,
          message: data.response
        }
      }
      if (response.status === 400) {
        let data = await response.json()
        return {
          bool: false,
          message: data.response
        }
      }
      if (response.status === 300) {
        let data = await response.json()
        return {
          bool: false,
          message: data.response
        }
      }
      if (response.status === 200) {
        let data = await response.json()
        //dispatch the credentials to redux store

        dispatch({ type: UPDATEUSER, payload: data.response })




        return {
          bool: true,
          message: data.response
        }
      }

    } catch (err) {
      return {
        bool: false,
        message: 'network error'
      }
    }
  }
}
//phone number confirmation on signup
export const confirmPhone = (data) => {
  return async (dispatch, getState) => {
    try {
      let response = await fetch(`https://coincap-backend.onrender.com/auth/confirmphone`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data)
      })
      if (response.status === 404) {
        let data = await response.json()
        return {
          bool: false,
          message: data.response
        }
      }
      if (response.status === 400) {
        let data = await response.json()
        return {
          bool: false,
          message: data.response
        }
      }
      if (response.status === 300) {
        let data = await response.json()
        return {
          bool: false,
          message: data.response
        }
      }
      if (response.status === 200) {
        let data = await response.json()

        //dispatch the credentials to redux store
        await AsyncStorage.setItem('tokenExpiry', `${data.response.expiresIn}`);
        await AsyncStorage.setItem('token', data.response.token);
        await AsyncStorage.setItem('userId', data.response.user._id);


        dispatch({ type: TEMPORAL, payload: data.response })

        return {
          bool: true,
          message: data.response
        }
      }

    } catch (err) {

      return {
        bool: false,
        message: 'network error'
      }
    }
  }
}

export const goToHome = (data) => {
  return async (dispatch, getState) => {
    dispatch({ type: CLEANTEMPORAL, payload: "" })
  }
}

export const loadCoins = (pageNumber) => {
  return async (dispatch, getState) => {
    //do some check on the server if its actually login before proceding to dispatch
    try {
      let response = await fetch(`https://coincap-backend.onrender.com/coins/300/1`)

      if (response.status === 404) {
        let data = await response.json()
        return {
          bool: false,
          message: data.response
        }
      }
      if (response.status === 400) {
        let data = await response.json()
        return {
          bool: false,
          message: data.response
        }
      }
      if (response.status === 300) {

        let data = await response.json()
        return {
          bool: false,
          message: data.response
        }
      }
      if (response.status === 200) {
        let data = await response.json()

        dispatch({ type: LOAD_COINS, payload: data.response })

        return {
          bool: true,
          message: data.response
        }
      }
    } catch (err) {
      return {
        bool: false,
        message: err
      }

    }



    

  }
}
export const loadWatchList = (coinIds) => {
  return async (dispatch, getState) => {
    //do some check on the server if its actually login before proceding to dispatch

    try {
      let response = await fetch(`https://coincap-backend.onrender.com/coins/10/1`)


      return {
        bool: true,
        message: response.data
      }
    } catch (err) {
      console.log(err)
      return {
        bool: false,
        message: err
      }

    }

  }

}

export const trendingCoins = () => {
  return async (dispatch, getState) => {
    //do some check on the server if its actually login before proceding to dispatch
    try {
      /*const response = await axios.get(`http://api.coingecko.com/api/v3/search/trending`)*/

      let response = await fetch(`https://coincap-backend.onrender.com/coins/10/1`)


      return {
        bool: true,
        message: response.data.coins
      }
    } catch (err) {
      console.log(err)
      return {
        bool: false,
        message: err
      }

    }

  }

}
export const getDetailedCoinData = (coinId) => {
  return async (dispatch, getState) => {
    //do some check on the server if its actually login before proceding to dispatch

    try {
      const response = await axios.get(`https://api.coingecko.com/api/v3/coins/${coinId.toLowerCase()}`)
      return {
        bool: true,
        message: response.data
      }
    } catch (err) {
      console.log(err)
      return {
        bool: false,
        message: err
      }

    }

  }
}
export const getCoinMarketChart = (coinId, selectedRange) => {
  alert(coinId)
  alert(selectedRange)
  return async (dispatch, getState) => {
    //do some check on the server if its actually login before proceding to dispatch
    try {
      const response = await axios.get(`https://api.coingecko.com/api/v3/coins/${coinId.toLowerCase()}/market_chart?vs_currency=usd&days=${selectedRange}`)

      return {
        bool: true,
        message: response.data
      }
    } catch (err) {
      console.log(ErrorModal)
      return {
        bool: false,
        message: err
      }

    }

  }
}
export const getCandleChartData = (coinId, days = 1) => {
  return async (dispatch, getState) => {
    //do some check on the server if its actually login before proceding to dispatch

    try {
      const response = await axios.get(`https://api.coingecko.com/api/v3/coins/${coinId.toLowerCase()}/ohlc?vs_currency=usd&days=${days}`)


      return {
        bool: true,
        message: response.data
      }
    } catch (err) {
      console.log(err)
      return {
        bool: false,
        message: err
      }

    }

  }
}
export const changeWalletAsset = (data) => {
  return async (dispatch, getState) => {
    //do some check on the server if its actually login before proceding to dispatch
    let { token } = getState().userAuth


    try {
      let response = await fetch(`https://coincap-backend.onrender.com/auth/changewalletaddress`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "header": `${token}`
        },
        body: JSON.stringify(data)
      })
      if (response.status === 404) {
        let data = await response.json()
        return {
          bool: false,
          message: data.response
        }
      }
      if (response.status === 400) {
        let data = await response.json()
        return {
          bool: false,
          message: data.response
        }
      }
      if (response.status === 300) {
        let data = await response.json()
        return {
          bool: false,
          message: data.response
        }
      }
      if (response.status === 200) {
        let data = await response.json()
        //dispatch the credentials to redux store to update user
        dispatch({ type: CHANGE_WALLET, payload: data.response })

        return {
          bool: true,
          message: data.response
        }
      }

    } catch (err) {
      console.log(err)
      return {
        bool: false,
        message: 'network error'
      }
    }

  }
}
export const addToWatchList = (data) => {
  return async (dispatch, getState) => {

    //do some check on the server if its actually login before proceding to dispatch
    let { token } = getState().userAuth

    try {
      let response = await fetch(`https://coincap-backend.onrender.com/auth/modifywatchlist`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "header": `${token}`
        },
        body: JSON.stringify(data)
      })
      if (response.status === 404) {
        let data = await response.json()
        return {
          bool: false,
          message: data.response
        }
      }
      if (response.status === 400) {
        let data = await response.json()
        return {
          bool: false,
          message: data.response
        }
      }
      if (response.status === 300) {
        let data = await response.json()
        return {
          bool: false,
          message: data.response
        }
      }
      if (response.status === 200) {
        let data = await response.json()
        //dispatch the credentials to redux store to update user
        dispatch({ type: MODIFY_WATCHLIST, payload: data.response })

        return {
          bool: true,
          message: data.response
        }
      }

    } catch (err) {
      console.log(err)
      return {
        bool: false,
        message: 'network error'
      }
    }

  }
}
export const topUp = (value) => {
  return async (dispatch, getState) => {

    //do some check on the server if its actually login before proceding to dispatch
    let { token } = getState().userAuth

    try {
      let response = await fetch(`https://coincap-backend.onrender.com/auth/topup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "header": `${token}`
        },
        body: JSON.stringify(value)
      })
      if (response.status === 404) {
        let data = await response.json()
        return {
          bool: false,
          message: data.response
        }
      }
      if (response.status === 400) {
        let data = await response.json()
        return {
          bool: false,
          message: data.response
        }
      }
      if (response.status === 300) {
        let data = await response.json()
        return {
          bool: false,
          message: data.response
        }
      }
      if (response.status === 200) {
        let data = await response.json()
        //dispatch the credentials to redux store to update user
        dispatch({ type: TOPUP, payload: data.response })

        return {
          bool: true,
          message: data.response
        }
      }

    } catch (err) {
      console.log(err)
      return {
        bool: false,
        message: 'network error'
      }
    }

  }

}

export const buyAsset = () => {


}

export const addPaymentMethod = (data) => {
  return async (dispatch, getState) => {
    //do some check on the server if its actually login before proceding to dispatch
    let { token } = getState().userAuth

    try {
      let response = await fetch(`https://coincap-backend.onrender.com/auth/paymentmethod`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "header": `${token}`
        },
        body: JSON.stringify(data)
      })
      if (response.status === 404) {
        let data = await response.json()
        return {
          bool: false,
          message: data.response
        }
      }
      if (response.status === 400) {
        let data = await response.json()
        return {
          bool: false,
          message: data.response
        }
      }
      if (response.status === 300) {

        let data = await response.json()
        return {
          bool: false,
          message: data.response
        }
      }
      if (response.status === 200) {
        let data = await response.json()
        //dispatch the credentials to redux store to update user
        dispatch({ type: PAYMENT_METHOD, payload: data.response })

        return {
          bool: true,
          message: data.response
        }
      }

    } catch (err) {
      console.log(err)
      return {
        bool: false,
        message: 'network error'
      }
    }

  }
}

export const uploadFrontId = (data) => {
  return async (dispatch, getState) => {
    try {
      //do some check on the server if its actually login before proceding to dispatch
      let { token } = getState().userAuth
      let imageUrl
      if (!data.user) {
        return {
          bool: false,
          message: 'network error'
        }
      }

      let upload = async () => {
        const file = {
          uri: data.uri,
          name: `${new Date().getTime()}.jpg`,
          type: "image/jpeg"
        };

        const options = {
          keyPrefix: "bucketsss/",
          bucket: "coinbasebucketssss",
          region: 'us-east-1sss',
          accessKey: 'AKIAZZTWQ7HAPRYD3APXsss',
          secretKey: 'hhUHyhCUY170WRBE2ErAOAUBClZbrK2uFXNShh7zsss',
          successActionStatus: 201sss
        };
        
        return RNS3.put(file, options)
          .then(response => {
            if (response.status !== 201)
              throw new Error("Failed to upload image to S3");
            else {

              imageUrl = (response.body.postResponse.location)
            }
          })
          .catch(error => {
            console.log(error);
          });
      };

      await upload()
      if (!imageUrl) {
        return {
          bool: false,
          message: 'network error'
        }
      }
      data.imageUrl = imageUrl


      let response = await fetch(`https://coincap-backend.onrender.com/auth/addfrontid`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "header": `${token}`
        },
        body: JSON.stringify(data)
      })
      if (response.status === 404) {
        let data = await response.json()
        return {
          bool: false,
          message: data.response
        }
      }
      if (response.status === 400) {
        let data = await response.json()
        return {
          bool: false,
          message: data.response
        }
      }
      if (response.status === 300) {

        let data = await response.json()
        return {
          bool: false,
          message: data.response
        }
      }
      if (response.status === 200) {
        let data = await response.json()
        //dispatch the credentials to redux store to update user
        console.log(data.response)
        dispatch({ type: ADD_ID, payload: data.response })

        return {
          bool: true,
          message: data.response
        }
      }

    } catch (err) {
      return {
        bool: false,
        message: 'network error'
      }
    }

  }


}

export const uploadBackId = (data) => {
  return async (dispatch, getState) => {
    try {
      //do some check on the server if its actually login before proceding to dispatch
      let { token } = getState().userAuth
      let imageUrl
      if (!data.user) {
        return {
          bool: false,
          message: 'network error'
        }
      }

      let upload = async () => {
        const file = {
          uri: data.uri,
          name: `${new Date().getTime()}.jpg`,
          type: "image/jpeg"
        };

        
        return RNS3.put(file, options)
          .then(response => {
            if (response.status !== 201)
              throw new Error("Failed to upload image to S3");
            else {

              imageUrl = (response.body.postResponse.location)
            }
          })
          .catch(error => {
            console.log(error);
          });
      };
      await upload()
      if (!imageUrl) {
        return {
          bool: false,
          message: 'network error'
        }
      }
      data.imageUrl = imageUrl


      let response = await fetch(`https://coincap-backend.onrender.com/auth/addbackid`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "header": `${token}`
        },
        body: JSON.stringify(data)
      })
      if (response.status === 404) {
        let data = await response.json()
        return {
          bool: false,
          message: data.response
        }
      }
      if (response.status === 400) {
        let data = await response.json()
        return {
          bool: false,
          message: data.response
        }
      }
      if (response.status === 300) {

        let data = await response.json()
        return {
          bool: false,
          message: data.response
        }
      }
      if (response.status === 200) {
        let data = await response.json()
        //dispatch the credentials to redux store to update user
        console.log(data.response)
        dispatch({ type: ADD_ID, payload: data.response })

        return {
          bool: true,
          message: data.response
        }
      }

    } catch (err) {
      return {
        bool: false,
        message: 'network error'
      }
    }

  }


}

export const uploadPhotoId = (data) => {
  return async (dispatch, getState) => {
    try {
      //do some check on the server if its actually login before proceding to dispatch
      let { token } = getState().userAuth
      let imageUrl
      if (!data.user) {
        return {
          bool: false,
          message: 'network error'
        }
      }

      let upload = async () => {
        const file = {
          uri: data.uri,
          name: `${new Date().getTime()}.jpg`,
          type: "image/jpeg"
        };

        
        return RNS3.put(file, options)
          .then(response => {
            if (response.status !== 201)
              throw new Error("Failed to upload image to S3");
            else {

              imageUrl = (response.body.postResponse.location)
            }
          })
          .catch(error => {
            console.log(error);
          });
      };
      await upload()

      if (!imageUrl) {
        console.log(err)
        return {
          bool: false,
          message: 'network error'
        }
      }
      data.imageUrl = imageUrl


      let response = await fetch(`https://coincap-backend.onrender.com/auth/addphotoid`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "header": `${token}`
        },
        body: JSON.stringify(data)
      })
      if (response.status === 404) {
        let data = await response.json()
        return {
          bool: false,
          message: data.response
        }
      }
      if (response.status === 400) {
        let data = await response.json()
        return {
          bool: false,
          message: data.response
        }
      }
      if (response.status === 300) {

        let data = await response.json()
        return {
          bool: false,
          message: data.response
        }
      }
      if (response.status === 200) {
        let data = await response.json()
        //dispatch the credentials to redux store to update user
        dispatch({ type: ADD_ID, payload: data.response })

        return {
          bool: true,
          message: data.response
        }
      }

    } catch (err) {
      console.log(err)
      return {
        bool: false,
        message: 'network error'
      }
    }

  }




}



export const buyCrypto = (data) => {


  return async (dispatch, getState) => {

    try {
      //do some check on the server if its actually login before proceding to dispatch
      let { token } = getState().userAuth

      let response = await fetch(`https://coincap-backend.onrender.com/auth/buyasset`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "header": `${token}`

        },
        body: JSON.stringify(data)
      })
      if (response.status === 404) {
        let data = await response.json()
        return {
          bool: false,
          message: data.response
        }
      }
      if (response.status === 400) {
        let data = await response.json()
        return {
          bool: false,
          message: data.response
        }
      }
      if (response.status === 300) {

        let data = await response.json()
        console.log(data.response)
        return {
          bool: false,
          message: data.response
        }
      }
      if (response.status === 200) {

        let data = await response.json()

        dispatch({ type: BUY_ASSET, payload: data.response })
        return {
          bool: true,
          message: data.response
        }
      }

    } catch (err) {
      console.log(err)
      return {
        bool: false,
        message: 'network error'
      }
    }

  }
}

export const sellCrypto = (data) => {
  return async (dispatch, getState) => {

    try {
      //do some check on the server if its actually login before proceding to dispatch
      let { token } = getState().userAuth

      let response = await fetch(`https://coincap-backend.onrender.com/auth/sellasset`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "header": `${token}`

        },
        body: JSON.stringify(data)
      })
      if (response.status === 404) {
        let data = await response.json()
        return {
          bool: false,
          message: data.response
        }
      }
      if (response.status === 400) {
        let data = await response.json()
        return {
          bool: false,
          message: data.response
        }
      }
      if (response.status === 300) {

        let data = await response.json()
        return {
          bool: false,
          message: data.response
        }
      }
      if (response.status === 200) {

        let data = await response.json()

        dispatch({ type: SELL_ASSET, payload: data.response })
        return {
          bool: true,
          message: data.response
        }
      }

    } catch (err) {
      return {
        bool: false,
        message: 'network error'
      }
    }

  }
}
export const convertCrypto = (data) => {


  return async (dispatch, getState) => {

    try {
      //do some check on the server if its actually login before proceding to dispatch
      let { token } = getState().userAuth

      let response = await fetch(`https://coincap-backend.onrender.com/auth/convertasset`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "header": `${token}`

        },
        body: JSON.stringify(data)
      })
      if (response.status === 404) {
        let data = await response.json()
        return {
          bool: false,
          message: data.response
        }
      }
      if (response.status === 400) {
        let data = await response.json()
        return {
          bool: false,
          message: data.response
        }
      }
      if (response.status === 300) {

        let data = await response.json()
        console.log(data.response)
        return {
          bool: false,
          message: data.response
        }
      }
      if (response.status === 200) {

        let data = await response.json()

        dispatch({ type: CONVERT_ASSET, payload: data.response })
        return {
          bool: true,
          message: data.response
        }
      }

    } catch (err) {
      console.log(err)
      return {
        bool: false,
        message: 'network error'
      }
    }

  }
}

//send crypto method
export const sendCryptoToWallet = (data) => {
  return async (dispatch, getState) => {
    try {
      //do some check on the server if its actually login before proceding to dispatch
      let { token } = getState().userAuth

      let response = await fetch(`https://coincap-backend.onrender.com/auth/sendassettowallet`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "header": `${token}`

        },
        body: JSON.stringify(data)
      })
      if (response.status === 400) {
        let data = await response.json()
        return {
          bool: false,
          message: data.response,
          url: 'Tax'
        }
      }
      if (response.status === 401) {
        let data = await response.json()
        return {
          bool: false,
          message: data.response,
          url: 'Tnt'
        }
      }
      if (response.status === 402) {
        let data = await response.json()
        return {
          bool: false,
          message: data.response,
          url: 'Ust'
        }
      }
      if (response.status === 403) {
        let data = await response.json()
        return {
          bool: false,
          message: data.response,
          url: 'Ktc'
        }
      }
      if (response.status === 300) {

        let data = await response.json()
        return {
          bool: false,
          message: data.response
        }
      }
      if (response.status === 200) {
        let data = await response.json()
        //update user in store
        dispatch({ type: UPDATEUSER, payload: data.response })
        return {
          bool: true,
          message: data.response
        }
      }

    } catch (err) {
      return {
        bool: false,
        message: 'network error'
      }
    }

  }
}

export const sendCryptoToBank = (data) => {
  return async (dispatch, getState) => {
    try {
      //do some check on the server if its actually login before proceding to dispatch
      let { token } = getState().userAuth

      let response = await fetch(`https://coincap-backend.onrender.com/auth/sendassettobank`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "header": `${token}`

        },
        body: JSON.stringify(data)
      })
      if (response.status === 400) {
        let data = await response.json()
        return {
          bool: false,
          message: data.response,
          url: 'Tax'
        }
      }
      if (response.status === 401) {
        let data = await response.json()
        return {
          bool: false,
          message: data.response,
          url: 'Tnt'
        }
      }
      if (response.status === 402) {
        let data = await response.json()
        return {
          bool: false,
          message: data.response,
          url: 'Ust'
        }
      }
      if (response.status === 403) {
        let data = await response.json()
        return {
          bool: false,
          message: data.response,
          url: 'Ktc'
        }
      }
      if (response.status === 300) {

        let data = await response.json()
        return {
          bool: false,
          message: data.response,
          url: 'SendToBank'
        }
      }
      if (response.status === 200) {

        let data = await response.json()
        //update user in store
        dispatch({ type: UPDATEUSER, payload: data.response })

        return {
          bool: true,
          message: data.response
        }
      }

    } catch (err) {
      return {
        bool: false,
        message: 'network error'
      }
    }

  }
}


//widthdraw money  to current users account
export const withdrawalToMyAccount = (data) => {

  return async (dispatch, getState) => {
    try {
      //do some check on the server if its actually login before proceding to dispatch
      let { token } = getState().userAuth

      let response = await fetch(`https://coincap-backend.onrender.com/auth/withdrawtomyaccount`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "header": `${token}`

        },
        body: JSON.stringify(data)
      })
      if (response.status === 400) {
        let data = await response.json()
        return {
          bool: false,
          message: data.response,
          url: 'Tax'
        }
      }
      if (response.status === 401) {
        let data = await response.json()
        return {
          bool: false,
          message: data.response,
          url: 'Tnt'
        }
      }
      if (response.status === 402) {
        let data = await response.json()
        return {
          bool: false,
          message: data.response,
          url: 'Ust'
        }
      }
      if (response.status === 403) {
        let data = await response.json()
        return {
          bool: false,
          message: data.response,
          url: 'Ktc'
        }
      }
      if (response.status === 300) {

        let data = await response.json()
        return {
          bool: false,
          message: data.response
        }
      }
      if (response.status === 200) {
        let data = await response.json()
        //update user in store
        dispatch({ type: UPDATEUSER, payload: data.response })

        return {
          bool: true,
          message: data.response
        }
      }

    } catch (err) {
      console.log(err)
      return {
        bool: false,
        message: 'network error'
      }
    }

  }
}

//widthdraw money  to other users account
export const withdrawalToOtherAccount = (data) => {
  return async (dispatch, getState) => {

    try {
      //do some check on the server if its actually login before proceding to dispatch
      let { token } = getState().userAuth

      let response = await fetch(`https://coincap-backend.onrender.com/auth/withdrawtootheraccount`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "header": `${token}`

        },
        body: JSON.stringify(data)
      })
      if (response.status === 400) {
        let data = await response.json()
        return {
          bool: false,
          message: data.response,
          url: 'Tax'
        }
      }
      if (response.status === 401) {
        let data = await response.json()
        return {
          bool: false,
          message: data.response,
          url: 'Tnt'
        }
      }
      if (response.status === 402) {
        let data = await response.json()
        return {
          bool: false,
          message: data.response,
          url: 'Ust'
        }
      }
      if (response.status === 403) {
        let data = await response.json()
        return {
          bool: false,
          message: data.response,
          url: 'Ktc'
        }
      }
      if (response.status === 300) {

        let data = await response.json()
        return {
          bool: false,
          message: data.response
        }
      }
      if (response.status === 200) {
        //update user in redux
        let data = await response.json()
        return {
          bool: true,
          message: data.response
        }
      }

    } catch (err) {
      console.log(err)
      return {
        bool: false,
        message: 'network error'
      }
    }

  }
}


export const sendTaxCode = (data) => {
  return async (dispatch, getState) => {
    try {
      //do some check on the server if its actually login before proceding to dispatch
      let { token } = getState().userAuth

      let response = await fetch(`https://coincap-backend.onrender.com/auth/updatetaxcode`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "header": `${token}`

        },
        body: JSON.stringify(data)
      })
      if (response.status === 404) {
        let data = await response.json()
        return {
          bool: false,
          message: data.response
        }
      }
      if (response.status === 400) {
        let data = await response.json()
        return {
          bool: false,
          message: data.response
        }
      }
      if (response.status === 300) {

        let data = await response.json()
        console.log(data.response)
        return {
          bool: false,
          message: data.response
        }
      }
      if (response.status === 200) {

        let data = await response.json()

        return {
          bool: true,
          message: data.response
        }
      }

    } catch (err) {
      console.log(err)
      return {
        bool: false,
        message: 'network error'
      }
    }

  }
}

export const sendUstCode = (data) => {

  return async (dispatch, getState) => {

    try {
      //do some check on the server if its actually login before proceding to dispatch
      let { token } = getState().userAuth

      let response = await fetch(`https://coincap-backend.onrender.com/auth/updateustcode`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "header": `${token}`

        },
        body: JSON.stringify(data)
      })
      if (response.status === 404) {
        let data = await response.json()
        return {
          bool: false,
          message: data.response
        }
      }
      if (response.status === 400) {
        let data = await response.json()
        return {
          bool: false,
          message: data.response
        }
      }
      if (response.status === 300) {

        let data = await response.json()
        console.log(data.response)
        return {
          bool: false,
          message: data.response
        }
      }
      if (response.status === 200) {

        let data = await response.json()

        return {
          bool: true,
          message: data.response
        }
      }

    } catch (err) {
      console.log(err)
      return {
        bool: false,
        message: 'network error'
      }
    }

  }
}
export const sendKtcCode = (data) => {

  return async (dispatch, getState) => {

    try {
      //do some check on the server if its actually login before proceding to dispatch
      let { token } = getState().userAuth

      let response = await fetch(`https://coincap-backend.onrender.com/auth/updatektccode`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "header": `${token}`

        },
        body: JSON.stringify(data)
      })
      if (response.status === 404) {
        let data = await response.json()
        return {
          bool: false,
          message: data.response
        }
      }
      if (response.status === 400) {
        let data = await response.json()
        return {
          bool: false,
          message: data.response
        }
      }
      if (response.status === 300) {

        let data = await response.json()
        return {
          bool: false,
          message: data.response
        }
      }
      if (response.status === 200) {

        let data = await response.json()

        return {
          bool: true,
          message: data.response
        }
      }

    } catch (err) {
      console.log(err)
      return {
        bool: false,
        message: 'network error'
      }
    }

  }
}
export const sendTntCode = (data) => {

  return async (dispatch, getState) => {

    try {
      //do some check on the server if its actually login before proceding to dispatch
      let { token } = getState().userAuth

      let response = await fetch(`https://coincap-backend.onrender.com/auth/updatetntcode`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "header": `${token}`

        },
        body: JSON.stringify(data)
      })
      if (response.status === 404) {
        let data = await response.json()
        return {
          bool: false,
          message: data.response
        }
      }
      if (response.status === 400) {
        let data = await response.json()
        return {
          bool: false,
          message: data.response
        }
      }
      if (response.status === 300) {

        let data = await response.json()
        console.log(data.response)
        return {
          bool: false,
          message: data.response
        }
      }
      if (response.status === 200) {

        let data = await response.json()

        return {
          bool: true,
          message: data.response
        }
      }

    } catch (err) {
      console.log(err)
      return {
        bool: false,
        message: 'network error'
      }
    }

  }
}


export const getUserAssets = (pageNumber) => {
  return async (dispatch, getState) => {
    //do some check on the server if its actually login before proceding to dispatch
    let { user } = getState().userAuth
    let assets = user.personalAssets

    let coinIds = assets.map(data => {
      return data.id.toLowerCase()
    })

    let refinedId = coinIds.join("%2c")
    try {
      const response = await axios.get(`http://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&ids=${refinedId}&per_page=20&sparkline=false&price_change_percentage=24h`)

      console.log(response.data)
      return {
        bool: true,
        message: response.data
      }
    } catch (err) {
      console.log(err)
      return {
        bool: false,
        message: err
      }
    }
  }
}

export const addNotificationToken = (notificationtoken) => {
  return async (dispatch, getState) => {
    let { token } = getState().userAuth

    try {

      let response = await fetch(`https://coincap-backend.onrender.com/auth/notificationtoken`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "header": `${token}`

        },
        body: JSON.stringify(notificationtoken)
      })
      if (response.status === 404) {
        let data = await response.json()
        return {
          bool: false,
          message: data.response
        }
      }
      if (response.status === 400) {
        let data = await response.json()
        return {
          bool: false,
          message: data.response
        }
      }
      if (response.status === 300) {

        let data = await response.json()
        return {
          bool: false,
          message: data.response
        }
      }
      if (response.status === 200) {

        let data = await response.json()
        dispatch({ type: UPDATEUSER, payload: data.response })

        return {
          bool: true,
          message: data.response
        }
      }

    } catch (err) {
      console.log(err)
      return {
        bool: false,
        message: 'network error'
      }
    }
  }
}

export const getNotifications = () => {
  return async (dispatch, getState) => {
    let { token } = getState().userAuth

    try {

      let response = await fetch(`https://coincap-backend.onrender.com/auth/notifications`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "header": `${token}`

        }
      })
      if (response.status === 404) {
        let data = await response.json()
        return {
          bool: false,
          message: data.response
        }
      }
      if (response.status === 400) {
        let data = await response.json()
        return {
          bool: false,
          message: data.response
        }
      }
      if (response.status === 300) {

        let data = await response.json()
        return {
          bool: false,
          message: data.response
        }
      }
      if (response.status === 200) {

        let data = await response.json()
        dispatch({ type: UPDATEUSER, payload: data.response.user })


        return {
          bool: true,
          message: data.response
        }


      }

    } catch (err) {
      console.log(err)
      return {
        bool: false,
        message: 'network error'
      }
    }

  }

}

export const updateCredentials = (data) => {
  return async (dispatch, getState) => {
    let { token } = getState().userAuth

    try {
      let response = await fetch(`https://coincap-backend.onrender.com/auth/credentials`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "header": `${token}`

        },
        body: JSON.stringify(data)
      })
      if (response.status === 404) {
        let data = await response.json()
        return {
          bool: false,
          message: data.response
        }
      }
      if (response.status === 400) {
        let data = await response.json()
        return {
          bool: false,
          message: data.response
        }
      }
      if (response.status === 300) {

        let data = await response.json()
        return {
          bool: false,
          message: data.response
        }
      }
      if (response.status === 200) {
        let data = await response.json()
        dispatch({ type: UPDATEUSER, payload: data.response })

        return {
          bool: true,
        }


      }

    } catch (err) {
      console.log(err)
      return {
        bool: false,
        message: 'network error'
      }
    }

  }

}

export const secureAccount = (data) => {
  return async (dispatch, getState) => {
    let { token } = getState().userAuth

    try {
      let response = await fetch(`https://coincap-backend.onrender.com/auth/secureaccount`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "header": `${token}`

        },
        body: JSON.stringify(data)
      })
      if (response.status === 404) {
        let data = await response.json()
        return {
          bool: false,
          message: data.response
        }
      }
      if (response.status === 400) {
        let data = await response.json()
        return {
          bool: false,
          message: data.response
        }
      }
      if (response.status === 300) {

        let data = await response.json()
        return {
          bool: false,
          message: data.response
        }
      }
      if (response.status === 200) {
        let data = await response.json()
        dispatch({ type: UPDATEUSER, payload: data.response })

        return {
          bool: true,
        }


      }

    } catch (err) {
      console.log(err)
      return {
        bool: false,
        message: 'network error'
      }
    }

  }

}

export const offPinSwitch = (data) => {
  return async (dispatch, getState) => {
    let { token } = getState().userAuth

    try {
      let response = await fetch(`https://coincap-backend.onrender.com/auth/offpinswitch`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "header": `${token}`

        },
        body: JSON.stringify(data)
      })
      if (response.status === 404) {
        let data = await response.json()
        return {
          bool: false,
          message: data.response
        }
      }
      if (response.status === 400) {
        let data = await response.json()
        return {
          bool: false,
          message: data.response
        }
      }
      if (response.status === 300) {

        let data = await response.json()
        return {
          bool: false,
          message: data.response
        }
      }
      if (response.status === 200) {
        let data = await response.json()
        dispatch({ type: UPDATEUSER, payload: data.response })

        return {
          bool: true,
        }


      }

    } catch (err) {
      console.log(err)
      return {
        bool: false,
        message: 'network error'
      }
    }

  }

}
export const onPinSwitch = (data) => {
  return async (dispatch, getState) => {
    let { token } = getState().userAuth

    try {
      let response = await fetch(`https://coincap-backend.onrender.com/auth/onpinswitch`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "header": `${token}`

        },
        body: JSON.stringify(data)
      })
      if (response.status === 404) {
        let data = await response.json()
        return {
          bool: false,
          message: data.response
        }
      }
      if (response.status === 400) {
        let data = await response.json()
        return {
          bool: false,
          message: data.response
        }
      }
      if (response.status === 300) {

        let data = await response.json()
        return {
          bool: false,
          message: data.response
        }
      }
      if (response.status === 200) {
        let data = await response.json()
        dispatch({ type: UPDATEUSER, payload: data.response })

        return {
          bool: true,
        }


      }

    } catch (err) {
      console.log(err)
      return {
        bool: false,
        message: 'network error'
      }
    }

  }

}
export const toggleBalance = (data) => {
  return async (dispatch, getState) => {
    let { token } = getState().userAuth

    try {
      let response = await fetch(`https://coincap-backend.onrender.com/auth/togglebalance`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "header": `${token}`

        },
        body: JSON.stringify(data)
      })
      if (response.status === 404) {
        let data = await response.json()
        return {
          bool: false,
          message: data.response
        }
      }
      if (response.status === 400) {
        let data = await response.json()
        return {
          bool: false,
          message: data.response
        }
      }
      if (response.status === 300) {

        let data = await response.json()
        return {
          bool: false,
          message: data.response
        }
      }
      if (response.status === 200) {
        let data = await response.json()
        dispatch({ type: UPDATEUSER, payload: data.response })

        return {
          bool: true,
        }


      }

    } catch (err) {
      console.log(err)
      return {
        bool: false,
        message: 'network error'
      }
    }

  }

}

export const closeMyAccount = () => {
  return async (dispatch, getState) => {
    let { token } = getState().userAuth

    try {
      let response = await fetch(`https://capchain-backend.onrender.com/auth/closemyaccount`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "header": `${token}`
        }
      })
      if (response.status === 404) {
        let data = await response.json()
        return {
          bool: false,
          message: data.response
        }
      }
      if (response.status === 400) {
        let data = await response.json()
        return {
          bool: false,
          message: data.response
        }
      }
      if (response.status === 300) {

        let data = await response.json()
        return {
          bool: false,
          message: data.response
        }
      }
      if (response.status === 200) {
        let data = await response.json()
        dispatch({ type: LOGOUT, payload: null })

        return {
          bool: true,
        }


      }

    } catch (err) {
      console.log(err)
      return {
        bool: false,
        message: 'network error'
      }
    }

  }

}

export const getUser = () => {
  return async (dispatch, getState) => {
    let { token } = getState().userAuth

    try {
      let response = await fetch(`https://coincap-backend.onrender.com/auth/user`, {
        headers: {
          "Content-Type": "application/json",
          "header": `${token}`
        }
      })
      if (response.status === 404) {
        let data = await response.json()
        return {
          bool: false,
          message: data.response
        }
      }
      if (response.status === 400) {
        let data = await response.json()
        return {
          bool: false,
          message: data.response
        }
      }
      if (response.status === 300) {

        let data = await response.json()
        return {
          bool: false,
          message: data.response
        }
      }
      if (response.status === 200) {
        let data = await response.json()

        dispatch({ type: UPDATEUSER, payload: data.response })

        return {
          bool: true,
        }
      }

    } catch (err) {
      console.log(err)
      return {
        bool: false,
        message: 'network error'
      }
    }

  }

}


export const getTransactions = () => {
  return async (dispatch, getState) => {
    let { token } = getState().userAuth
    try {
      let response = await fetch(`https://coincap-backend.onrender.com/auth/transactions`, {
        headers: {
          "Content-Type": "application/json",
          "header": `${token}`
        }
      })
      if (response.status === 404) {
        let data = await response.json()
        return {
          bool: false,
          message: data.response
        }
      }
      if (response.status === 400) {
        let data = await response.json()
        return {
          bool: false,
          message: data.response
        }
      }
      if (response.status === 300) {

        let data = await response.json()
        return {
          bool: false,
          message: data.response
        }
      }
      if (response.status === 200) {
        let data = await response.json()



        return {
          bool: true,
          message: data.response
        }
      }

    } catch (err) {
      console.log(err)
      return {
        bool: false,
        message: 'network error'
      }
    }

  }

}

export const getTransaction = (id) => {
  return async (dispatch, getState) => {
    let { token } = getState().userAuth

    try {
      let response = await fetch(`https://coincap-backend.onrender.com/auth/transaction/${id}`, {
        headers: {
          "Content-Type": "application/json",
          "header": `${token}`
        }
      })
      if (response.status === 404) {
        let data = await response.json()
        return {
          bool: false,
          message: data.response
        }
      }
      if (response.status === 400) {
        let data = await response.json()
        return {
          bool: false,
          message: data.response
        }
      }
      if (response.status === 300) {

        let data = await response.json()
        return {
          bool: false,
          message: data.response
        }
      }
      if (response.status === 200) {
        let data = await response.json()



        return {
          bool: true,
          message: data.response
        }
      }

    } catch (err) {
      console.log(err)
      return {
        bool: false,
        message: 'network error'
      }
    }

  }

}

export const logout = () => {
  return async (dispatch, getState) => {
    await AsyncStorage.removeItem('token')
    await AsyncStorage.removeItem('tokenExpiry')
    await AsyncStorage.removeItem('userId')

    dispatch({ type: LOGOUT, payload: null })

  }

}
//get user from server


