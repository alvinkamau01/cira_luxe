import {BASKETITEMS} from './itemsBoughtTypes';
import {DELETERECORD} from './itemsBoughtTypes'


const initialState = {
    itemsInBasket: [], // Ensure initial state is defined
    itemsPayedFor:[],
    totalItems: 0
};

const basketReducer = (state = initialState, action) => {
    switch (action.type) {
        case BASKETITEMS:
            const totalItemsFromPayload = action.payload ? action.payload.reduce((total, item) => total + (item.quantity || 1), 0) : 0;
            return {
                ...state,
                itemsInBasket: action.payload,
                totalItems: totalItemsFromPayload
            };
        case DELETERECORD:
            const filteredItems = state.itemsInBasket.filter(item => item.id !== action.payload.id);
            const newTotalItems = filteredItems.reduce((total, item) => total + (item.quantity || 1), 0);
            return {
                ...state,
                itemsInBasket: filteredItems,
                totalItems: newTotalItems
            }

        default:
            return state; // Always return the current state if no action matches
    }
};

export default basketReducer;
