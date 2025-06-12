import {BASKETITEMS} from './itemsBoughtTypes';
import {DELETERECORD} from './itemsBoughtTypes'


const initialState = {
    itemsInBasket: [], // Ensure initial state is defined
    itemsPayedFor:[]
};

const basketReducer = (state = initialState, action) => {
    switch (action.type) {
        case BASKETITEMS: 
            return {
                ...state,
                itemsInBasket: action.payload
            };
        case DELETERECORD:
            return {
                ...state,
                itemsInBasket: state.itemsInBasket.filter(item => item.id !== action.payload.id)
            }
        
        default:
            return state; // Always return the current state if no action matches
    }
};

export default basketReducer;
