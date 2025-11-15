import { supabase } from '../supabaseClient';

// Fetch products
const fetchData = () => {
  return async function (dispatch) {
    dispatch({ type: 'FETCH_DATA_REQUEST' });
    try {
      const { data: items, error } = await supabase
        .from('products')
        .select('*');

      if (error) throw error;

      dispatch({ type: 'FETCH_DATA_SUCCESS', payload: items });
    } catch (error) {
      dispatch({ type: 'FETCH_DATA_FAILURE', error: error.message });
    }
  };
};

// Add item to cart
const addToCart = (item, userId = 'guest') => {
  return async function (dispatch, getState) {
    dispatch({ type: 'BASKETITEMS_REQUEST' });
    try {
      if (!item) {
        throw new Error('No item provided for cart');
      }

      // Check if item already exists in cart
      const { data: existingItem } = await supabase
        .from('cart_items')
        .select('*')
        .eq('user_id', userId)
        .eq('product_id', item.id)
        .single();

      if (existingItem) {
        // Update quantity
        const { data, error } = await supabase
          .from('cart_items')
          .update({ quantity: existingItem.quantity + 1 })
          .eq('id', existingItem.id)
          .select()
          .single();

        if (error) throw error;

        dispatch({
          type: 'UPDATE_CART_ITEM',
          payload: data
        });
      } else {
        // Add new item
        const cartItem = {
          user_id: userId,
          product_id: item.id,
          name: item.name || item.text || '',
          price: item.price || 0,
          image: item.image || item.img || '',
          quantity: 1,
          created_at: new Date().toISOString(),
        };

        const { data, error } = await supabase
          .from('cart_items')
          .insert([cartItem])
          .select()
          .single();

        if (error) throw error;

        dispatch({
          type: 'BASKETITEMS_SUCCESS',
          payload: data
        });
      }

    } catch (error) {
      console.error("Add to cart error:", error);
      dispatch({ type: 'BASKETITEMS_FAILURE', error: error.message });
    }
  };
};

// Get cart items
const getCartItems = (userId = 'guest') => {
  return async function (dispatch) {
    dispatch({ type: 'FETCH_CHECKOUT_REQUEST' });
    try {
      const { data: items, error } = await supabase
        .from('cart_items')
        .select('*')
        .eq('user_id', userId);

      if (error) throw error;

      dispatch({ type: 'BASKETITEMS', payload: items });
    } catch (error) {
      dispatch({ type: 'FETCH_CHECKOUT_FAILURE', error: error.message });
    }
  };
};

// Update cart item quantity
const updateCartItemQuantity = (itemId, quantity) => {
  return async function (dispatch) {
    try {
      if (quantity <= 0) {
        // Remove item if quantity is 0
        const { error } = await supabase
          .from('cart_items')
          .delete()
          .eq('id', itemId);

        if (error) throw error;

        dispatch({
          type: 'REMOVE_CART_ITEM',
          payload: { id: itemId }
        });
      } else {
        // Update quantity
        const { data, error } = await supabase
          .from('cart_items')
          .update({ quantity })
          .eq('id', itemId)
          .select()
          .single();

        if (error) throw error;

        dispatch({
          type: 'UPDATE_CART_ITEM',
          payload: data
        });
      }
    } catch (error) {
      console.error("Update cart item error:", error);
      dispatch({ type: 'BASKETITEMS_FAILURE', error: error.message });
    }
  };
};

// Remove cart item
const removeCartItem = (itemId) => {
  return async function (dispatch) {
    dispatch({ type: 'DELETE_CHECKOUT_REQUEST' });

    try {
      const { error } = await supabase
        .from('cart_items')
        .delete()
        .eq('id', itemId);

      if (error) throw error;

      dispatch({
        type: 'DELETERECORD',
        payload: { id: itemId }
      });

    } catch (error) {
      dispatch({
        type: 'DELETE_CHECKOUT_FAILURE',
        error: error.message
      });
    }
  };
};

// Clear cart
const clearCart = (userId = 'guest') => {
  return async function (dispatch) {
    try {
      const { error } = await supabase
        .from('cart_items')
        .delete()
        .eq('user_id', userId);

      if (error) throw error;

      dispatch({ type: 'CLEAR_CART' });
    } catch (error) {
      console.error("Clear cart error:", error);
      dispatch({ type: 'BASKETITEMS_FAILURE', error: error.message });
    }
  };
};

export { fetchData, addToCart, getCartItems, updateCartItemQuantity, removeCartItem, clearCart };