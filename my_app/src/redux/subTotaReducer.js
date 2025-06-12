const initialState = {
    subtotal: 0,
};

const total = (state = initialState, action) => {
    switch (action.type) {
        case "UPDATE_SUBTOTAL":
            return {
                ...state,
                subtotal: action.payload, // Updating subtotal in Redux store
            };
            case "ADD":
            return {
                ...state,
                subtotal: state.subtotal + action.payload, // Adding to subtotal in Redux store
            }

        default:
            return state; 
    }
};

export default total;
