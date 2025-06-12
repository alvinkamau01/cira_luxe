import {createStore,applyMiddleware,combineReducers} from  'redux'
import itemReducer from './redux/cartItemsReducer'
import productsReducer from './redux/itemsFetch'
import basketReducer from './redux/itemsBoughtReducer'
import {thunk} from 'redux-thunk'
import {createLogger} from "redux-logger"



const logger=createLogger()

const rootReducer=combineReducers({
    cart:itemReducer,
    products:productsReducer,
    basket:basketReducer
})


const store=createStore(rootReducer,applyMiddleware(thunk,logger))

export default store