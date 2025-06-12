import { collection, addDoc, getDoc, doc, getDocs,deleteDoc } from 'firebase/firestore';
import { firestore } from '../components/tailwind/firebase';

const fetchData = () => {
  return async function (dispatch) {
    dispatch({ type: 'FETCH_DATA_REQUEST' });
    try {
      const querySnapshot = await getDocs(collection(firestore, '0'));
      const items = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      dispatch({ type: 'FETCH_DATA_SUCCESS', payload: items });
    } catch (error) {
      dispatch({ type: 'FETCH_DATA_FAILURE', error: error.message });
    }
  };
};

const checkoutDoc = (item) => {
  return async function (dispatch, getState) {
    dispatch({ type: 'BASKETITEMS_REQUEST' });
    try {
      // Validate item exists
      if (!item) {
        throw new Error('No item provided for checkout');
      }
      const basketItem = {
        name: item.name || '',
        price: item.price || 0,
        image: item.image || '',
        quantity: 1,
        timestamp: new Date(),
        status: 'pending'
      };

      const docRef = await addDoc(collection(firestore, 'checkout'), basketItem);
      
      dispatch({
        type: 'BASKETITEMS_SUCCESS',
        payload: { id: docRef.id, ...basketItem }
      });

    } catch (error) {
      console.error("Checkout error:", error);
      dispatch({ type: 'BASKETITEMS_FAILURE', error: error.message });
    }
  };
};

const readCheckoutDoc = () => {
  return async function (dispatch) {
    dispatch({ type: 'FETCH_CHECKOUT_REQUEST' });
    try {
      const querySnapshot = await getDocs(collection(firestore, 'checkout'));
      const items = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      dispatch({ type: 'BASKETITEMS', payload: items });
    } catch (error) {
      dispatch({ type: 'FETCH_CHECKOUT_FAILURE', error: error.message });
    }
  };
};

const deleteCheckoutDoc = (docId) => {
  return async function (dispatch) {
    dispatch({ type: 'DELETE_CHECKOUT_REQUEST' });
    
    try {
      await deleteDoc(doc(firestore, 'checkout', docId));
      
      dispatch({ 
        type: 'DELETERECORD', 
        payload: { id: docId }
      });
      
    } catch (error) {
      dispatch({ 
        type: 'DELETE_CHECKOUT_FAILURE', 
        error: error.message 
      });
    }
  };
};

export { fetchData, checkoutDoc, readCheckoutDoc,deleteCheckoutDoc };