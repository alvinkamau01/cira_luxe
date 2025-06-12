import { BUY_ITEM } from './cartItemsTypes';
import {DELETE_ITEM} from './cartItemsTypes'

const initialState = {
  itemsBought: 0 // Initialize with 0 instead of null
};

const itemReducer = (state = initialState, action) => {
  switch (action.type) {
    case BUY_ITEM:
      return {
        ...state,
        itemsBought: state.itemsBought + 1
        
      };
      case DELETE_ITEM:
        return {
          ...state,
          itemsBought: state.itemsBought - 1
        };
    default:
      return state;
  }
};

export default itemReducer;
