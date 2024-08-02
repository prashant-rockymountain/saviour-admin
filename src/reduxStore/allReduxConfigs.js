import storage from "redux-persist/lib/storage"

const persistConfig = {
    key: 'root',
    storage,
    whiteList: ["userdata"] // only persist the 'login'and  storeList slice of the state
    // transforms: [encryptor]
    // transforms: [
    //   encryptTransform({
    //     secretKey: 'SaviourApp'
    //   })
    // ]
  }

  export {persistConfig}