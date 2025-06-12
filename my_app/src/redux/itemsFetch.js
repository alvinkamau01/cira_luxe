const initialState = {
    items: [],
    loading: false,
    error: null
  };
  
  const productsReducer= (state = initialState, action) => {
    switch (action.type) {
      case 'FETCH_DATA_REQUEST':
        return {
          ...state,
          loading: true,
          error: null
        };
      case 'FETCH_DATA_SUCCESS':
        return {
          ...state,
          items: action.payload,
          loading: false
        };
      case 'FETCH_DATA_FAILURE':
        return {
          ...state,
          loading: false,
          error: action.error
        };
      default:
        return state;
    }
  };
  
  export default productsReducer;
  