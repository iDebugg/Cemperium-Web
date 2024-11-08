import {configureStore} from '@reduxjs/toolkit'
import assetscontroller from '../Controller/assetscontroller'

export const store = configureStore({
reducer:{
    cryptoAssetsController :assetscontroller
}
})