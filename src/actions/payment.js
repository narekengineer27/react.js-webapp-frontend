import Client from "../config/api";

const endpoint = process.env.REACT_APP_ENDPOINT;

export const addCardInfo = data => {
  return async () => {
    const token = localStorage.getItem("plastplace_token");
    const client = Client(token);

    try {
      const res = await client.post(`${endpoint}/addCard`, data);

      return res.data.data;
    } catch (e) {
      console.log(e);
    }
  };
};

export const addACHTransfer = data => {
  return async () => {
    const token = localStorage.getItem("plastplace_token");
    const client = Client(token);

    try {
      const res = await client.post(`${endpoint}/addACHTransfer`, data);

      return res.data.data;
    } catch (e) {
      console.log(e);
    }
  };
};

export const getCountries = () => {
  return async () => {
    const token = localStorage.getItem("plastplace_token");
    const client = Client(token);

    try {
      const res = await client.get(`${endpoint}/countries`);

      return res.data.data;
    } catch (e) {
      console.log(e);
    }
  };
};

export const getPaymentSettings = () => {
  return async () => {
    const token = localStorage.getItem("plastplace_token");
    const client = Client(token);

    try {
      const res = await client.get(`${endpoint}/getPaymentSettings`);

      return res.data.data;
    } catch (e) {
      console.log(e);
    }
  };
};

export const createSetupIntent = (data = null) => {
  return async () => {
    const token = localStorage.getItem("plastplace_token");
    const client = Client(token);

    try {
      const res = await client.post(`${endpoint}/create-setup-intent`, data);

      return res.data.data;
    } catch (e) {
      console.log(e);
    }
  };
};

export const createSepaSetupIntent = (data = null) => {
  return async () => {
    const token = localStorage.getItem("plastplace_token");
    const client = Client(token);

    try {
      const res = await client.post(
        `${endpoint}/create-sepa-setup-intent`,
        data
      );

      return res.data.data;
    } catch (e) {
      console.log(e);
    }
  };
};

export const getPaymentMethods = () => {
  return async () => {
    const token = localStorage.getItem("plastplace_token");
    const client = Client(token);

    try {
      const res = await client.get(`${endpoint}/getPaymentMethods`);

      return res.data.data;
    } catch (e) {
      console.log(e);
    }
  };
};

export const sendOrder = data => {
  return async () => {
    const token = localStorage.getItem("plastplace_token");
    const client = Client(token);

    try {
      const res = await client.post(`${endpoint}/order`, data);

      return res;
    } catch (e) {
      console.log(e);
    }
  };
};

export const sendConfirmCardOrder = data => {
  return async () => {
    const token = localStorage.getItem("plastplace_token");
    const client = Client(token);

    try {
      const res = await client.post(`${endpoint}/confirm-card-order`, data);

      return res.data.data;
    } catch (e) {
      console.log(e);
    }
  };
};
