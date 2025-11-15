import axios from 'axios';

// M-Pesa sandbox credentials - replace with your actual credentials
const CONSUMER_KEY = process.env.REACT_APP_MPESA_CONSUMER_KEY || 'your-consumer-key';
const CONSUMER_SECRET = process.env.REACT_APP_MPESA_CONSUMER_SECRET || 'your-consumer-secret';
const SHORTCODE = '174379'; // Sandbox shortcode
const PASSKEY = 'bfb279f9aa9bdbcf158e97dd71a467cd2e0c893059b10f78e6b72ada1ed2c919'; // Sandbox passkey

// Base URLs
const BASE_URL = 'https://sandbox.safaricom.co.ke';
const OAUTH_URL = `${BASE_URL}/oauth/v1/generate?grant_type=client_credentials`;
const STK_PUSH_URL = `${BASE_URL}/mpesa/stkpush/v1/processrequest`;
const QUERY_URL = `${BASE_URL}/mpesa/stkpushquery/v1/query`;

// Get access token
export const getAccessToken = async () => {
  try {
    const auth = btoa(`${CONSUMER_KEY}:${CONSUMER_SECRET}`);
    const response = await axios.get(OAUTH_URL, {
      headers: {
        'Authorization': `Basic ${auth}`,
        'Content-Type': 'application/json',
      },
    });
    return response.data.access_token;
  } catch (error) {
    console.error('Error getting access token:', error);
    throw new Error('Failed to authenticate with M-Pesa');
  }
};

// Generate timestamp
const generateTimestamp = () => {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  const hour = String(now.getHours()).padStart(2, '0');
  const minute = String(now.getMinutes()).padStart(2, '0');
  const second = String(now.getSeconds()).padStart(2, '0');
  return `${year}${month}${day}${hour}${minute}${second}`;
};

// Generate password
const generatePassword = (timestamp) => {
  return btoa(`${SHORTCODE}${PASSKEY}${timestamp}`);
};

// Initiate STK Push
export const initiateSTKPush = async (phoneNumber, amount, accountReference, transactionDesc) => {
  try {
    const accessToken = await getAccessToken();
    const timestamp = generateTimestamp();
    const password = generatePassword(timestamp);

    const requestBody = {
      BusinessShortCode: SHORTCODE,
      Password: password,
      Timestamp: timestamp,
      TransactionType: 'CustomerPayBillOnline',
      Amount: amount,
      PartyA: phoneNumber,
      PartyB: SHORTCODE,
      PhoneNumber: phoneNumber,
      CallBackURL: `${window.location.origin}/api/mpesa/callback`, // You'll need to set up this endpoint
      AccountReference: accountReference,
      TransactionDesc: transactionDesc,
    };

    const response = await axios.post(STK_PUSH_URL, requestBody, {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
    });

    return {
      success: true,
      data: response.data,
      checkoutRequestId: response.data.CheckoutRequestID,
      responseCode: response.data.ResponseCode,
      responseDescription: response.data.ResponseDescription,
    };
  } catch (error) {
    console.error('STK Push error:', error);
    return {
      success: false,
      error: error.response?.data || error.message,
    };
  }
};

// Query STK Push status
export const querySTKPushStatus = async (checkoutRequestId) => {
  try {
    const accessToken = await getAccessToken();
    const timestamp = generateTimestamp();
    const password = generatePassword(timestamp);

    const requestBody = {
      BusinessShortCode: SHORTCODE,
      Password: password,
      Timestamp: timestamp,
      CheckoutRequestID: checkoutRequestId,
    };

    const response = await axios.post(QUERY_URL, requestBody, {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
    });

    return {
      success: true,
      data: response.data,
      resultCode: response.data.ResultCode,
      resultDesc: response.data.ResultDesc,
    };
  } catch (error) {
    console.error('Query STK Push status error:', error);
    return {
      success: false,
      error: error.response?.data || error.message,
    };
  }
};

// Format phone number to 254XXXXXXXXX
export const formatPhoneNumber = (phone) => {
  // Remove all non-numeric characters
  const cleaned = phone.replace(/\D/g, '');

  // If starts with 0, replace with 254
  if (cleaned.startsWith('0')) {
    return `254${cleaned.slice(1)}`;
  }

  // If starts with +, remove it
  if (cleaned.startsWith('254')) {
    return cleaned;
  }

  // If starts with 7, 1, etc., assume Kenyan number
  if (cleaned.length === 9 && cleaned.startsWith('7')) {
    return `254${cleaned}`;
  }

  return cleaned;
};