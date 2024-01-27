import axios from "axios";

const DOMAIN = "http://192.168.1.88:8000";

export const registerUserApi = async (user) => {
  try {
    const res = await axios.post(`${DOMAIN}/register`, user);
    return res.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};

export const loginUserApi = async (user) => {
  try {
    const res = await axios.post(`${DOMAIN}/login`, user);
    return res.data;
  } catch (error) {
    console.log("e", error);
    throw new Error(error.response.data.message);
  }
};

export const addAddressApi = async (token, address) => {
  try {
    const res = await axios.post(`${DOMAIN}/add/address`, {
      token,
      address,
    });
    return res.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};

export const fetchAddressesApi = async (token) => {
  try {
    const res = await axios.get(`${DOMAIN}/addresses/${token}`);
    return res.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};

export const placeOrderApi = async (token, order) => {
  try {
    const { cartItems, totalPrice, shippingAddress, paymentMethod } = order;

    const res = await axios.post(`${DOMAIN}/order/${token}`, {
      cartItems,
      totalPrice,
      shippingAddress,
      paymentMethod,
    });
    return res.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};

export const getUserApi = async (token) => {
  try {
    const res = await axios.get(`${DOMAIN}/profile/${token}`);
    return res.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};

export const fetchOrdersApi = async (token) => {
  try {
    const res = await axios.get(`${DOMAIN}/orders/${token}`);
    return res.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};

export const removeAddressApi = async (token, id) => {
  try {
    const res = await axios.post(`${DOMAIN}/remove/${token}`, {
      id,
    });
    return res.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};

export const editAddressApi = async (token, address) => {
  try {
    const res = await axios.post(`${DOMAIN}/edit/address`, {
      token,
      address,
    });
    return res.data;
  } catch (error) {
    console.log("wdjn", error);
    throw new Error(error.response.data.message);
  }
};
