import Client from "../config/api";
import { setMessageUserId } from "./message";
import { setLocale } from "react-redux-i18n";

const endpoint = process.env.REACT_APP_ENDPOINT;

export function setLocaleStatus(locale) {
  return dispatch => {
    dispatch(setLocale(locale));
  };
}

function setLoginSuccess(isLoginSuccess, currentUser) {
  return dispatch => {
    if (currentUser) {
      if (currentUser.Company.CountryId === 4) dispatch(setLocale("de"));
    }
    dispatch({
      type: "SET_LOGIN_SUCCESS",
      isLoginSuccess,
      currentUser
    });
  };
}

export function setSignUpSuccess(isSignUpSuccess, userData = null) {
  return {
    type: "SET_SIGNUP_SUCCESS",
    isSignUpSuccess,
    userData
  };
}

function fetchingCurrentUserSession(
  isFetchingCurrentUserSession,
  isAuthenticated
) {
  return {
    type: "SET_CURRENT_USER_SESSION",
    isFetchingCurrentUserSession,
    isAuthenticated
  };
}

export function logOut() {
  localStorage.removeItem("plastplace_token");
  localStorage.removeItem("plastplace_userId");
  return {
    type: "USER_LOGOUT"
  };
}

export function setLoginStatus(isError, loginLoading = false) {
  return {
    type: "SET_LOGIN_STATUS",
    loginError: isError,
    loginLoading: loginLoading
  };
}

export function setForgotPswdSuccess(isSuccess) {
  return {
    type: "FORGOT_PASSWORD_SUCCESS",
    isForgotPswdSuccess: isSuccess
  };
}

export function setResetPswdSuccess(isSuccess) {
  return {
    type: "RESET_PASSWORD_SUCCESS",
    isResetPswdSuccess: isSuccess
  };
}

export function setConfirmAccountSuccess(isSuccess) {
  return {
    type: "CONFIRM_ACCOUNT_SUCCESS",
    isConfirmAccountSuccess: isSuccess
  };
}

export function getNewAvatarSuccess(data) {
  return {
    type: "GET_NEW_AVATAR_SUCCESS",
    getNewAvatarSuccess: data
  };
}

export function getNewUserProfileSuccess(data) {
  return {
    type: "GET_NEW_USER_PROFILE_SUCCESS",
    getNewUserProfileSuccess: data
  };
}

export function getFollowingsSuccess(data) {
  return {
    type: "GET_FOLLOWINGS_SUCCESS",
    getFollowingsSuccess: data
  };
}

// User Log in
// -----------------------------------------------------------------------------
export function userLoginRequest(userInfo) {
  return async dispatch => {
    dispatch(setLoginSuccess(false, null));
    dispatch(setLoginStatus(null, true));
    const client = Client();
    try {
      const res = await client.post(`${endpoint}/login`, userInfo);
      localStorage.setItem("plastplace_token", res.data.data.token);
      localStorage.setItem("plastplace_userId", res.data.data.user.id);
      dispatch(setLoginSuccess(true, res.data.data.user));
      dispatch(setLoginStatus(false));
      dispatch(fetchingCurrentUserSession(false, true));
    } catch (err) {
      dispatch(setLoginStatus(true));
    }
  };
}

// User Sign Up
// -----------------------------------------------------------------------------
export function userSignUpRequest({ userInfo, handleSuccess }) {
  return dispatch => {
    dispatch(setSignUpSuccess(false, null));
    dispatch({
      type: "SET_SIGNUP_STATUS",
      signUpError: null,
      signUpLoading: true
    });

    const client = Client();
    client
      .post(`${endpoint}/signup`, userInfo)
      .then(res => {
        dispatch(setSignUpSuccess(true, res.data.data.user));
        dispatch({
          type: "SET_SIGNUP_STATUS",
          signUpError: null,
          signUpLoading: false
        });
        handleSuccess();
      })
      .catch(err => {
        dispatch({
          type: "SET_SIGNUP_STATUS",
          signUpError: err,
          signUpLoading: false
        });
      });
  };
}

// Get current User sesstion
// -----------------------------------------------------------------------------
export function getCurrentUserSession() {
  return async dispatch => {
    dispatch(fetchingCurrentUserSession(true, true));
    dispatch(setLoginSuccess(false, null));

    const token = localStorage.getItem("plastplace_token");

    if (token === null) {
      dispatch(fetchingCurrentUserSession(false, false));
      return;
    }
    const client = Client(token);
    try {
      const res = await client.get(`${endpoint}/authenticate`);
      dispatch(fetchingCurrentUserSession(false, true));
      dispatch(setLoginSuccess(true, res.data.data));
      dispatch(setLoginStatus(null));

      setMessageUserId({ userId: res.data.data.id })(dispatch);
    } catch (err) {
      // console.log(err.message);
      dispatch(fetchingCurrentUserSession(false, false));
    }
  };
}

export function sendForgotPswdEmail(data) {
  return dispatch => {
    dispatch(setForgotPswdSuccess(false));
    dispatch({
      type: "SET_FORGOTPSWD_STATUS",
      forgotPswdError: null,
      forgotPswdLoading: true
    });

    const client = Client();
    client
      .post(`${endpoint}/forgot-password`, data)
      .then(res => {
        dispatch(setForgotPswdSuccess(true));
        dispatch({
          type: "SET_FORGOTPSWD_STATUS",
          forgotPswdError: null,
          forgotPswdLoading: false
        });
      })
      .catch(err => {
        dispatch({
          type: "SET_FORGOTPSWD_STATUS",
          forgotPswdError: err,
          forgotPswdLoading: false
        });
      });
  };
}

export function sendResetPswdRequest(data) {
  return dispatch => {
    dispatch(setResetPswdSuccess(false));
    dispatch({
      type: "SET_RESETPSWD_STATUS",
      resetPswdError: null,
      resetPswdLoading: true
    });

    const client = Client();
    client
      .post(`${endpoint}/reset-password`, data)
      .then(res => {
        dispatch(setResetPswdSuccess(true));
        dispatch({
          type: "SET_RESETPSWD_STATUS",
          resetPswdError: null,
          resetPswdLoading: false
        });
      })
      .catch(err => {
        dispatch({
          type: "SET_RESETPSWD_STATUS",
          resetPswdError: err,
          resetPswdLoading: false
        });
      });
  };
}

export function confirmAccountRequest(id) {
  return dispatch => {
    dispatch(setConfirmAccountSuccess(false));
    dispatch({
      type: "SET_CONFIRM_ACCOUNT_STATUS",
      confirmAccountError: null,
      confirmAccountLoading: true
    });

    const client = Client();

    client
      .get(`${endpoint}/confirm-account/${id}`)
      .then(res => {
        dispatch(setConfirmAccountSuccess(true));
        dispatch({
          type: "SET_CONFIRM_ACCOUNT_STATUS",
          confirmAccountError: null,
          confirmAccountLoading: false
        });
      })
      .catch(err => {
        dispatch({
          type: "SET_CONFIRM_ACCOUNT_STATUS",
          confirmAccountError: err,
          confirmAccountLoading: false
        });
      });
  };
}

export function resendRequest(userId) {
  return dispatch => {
    const client = Client();

    client
      .get(`${endpoint}/send-verification-mail/${userId}`)
      .then(res => {
        console.log(res);
      })
      .catch(err => {
        console.log(err);
      });
  };
}

export function getUserProfile(id) {
  return async () => {
    const token = localStorage.getItem("plastplace_token");
    const client = Client(token);

    try {
      const res = await client.get(`${endpoint}/users/${id}`);
      return res.data.data;
    } catch (e) {
      console.log(e);
    }
  };
}

export function getBusinesstypes() {
  return async () => {
    const token = localStorage.getItem("plastplace_token");
    const client = Client(token);

    try {
      const res = await client.get(`${endpoint}/businesstypes`);
      return res.data.data;
    } catch (e) {
      console.log(e);
    }
  };
}

export const patchUserProfile = (userId, data) => {
  return async dispatch => {
    const token = localStorage.getItem("plastplace_token");
    const client = Client(token);

    try {
      const res = await client.post(
        `${endpoint}/users/${userId}/profile`,
        data
      );
      dispatch(getNewUserProfileSuccess(res.data.data));
      return res.data.data;
    } catch (e) {
      console.log(e);
    }
  };
};

export const upLoadAvatar = (userId, data) => {
  return async dispatch => {
    const token = localStorage.getItem("plastplace_token");
    const client = Client(token);

    try {
      const res = await client.post(
        `${endpoint}/users/${userId}/profile/avatar`,
        data
      );
      dispatch(getNewAvatarSuccess(res.data.data));
      return res.data.data;
    } catch (e) {
      console.log(e);
    }
  };
};

export const sendWantedData = ({ UserId, data, handleSuccess }) => {
  return async dispatch => {
    const client = Client();

    client
      .post(`${endpoint}/preregister/users/${UserId}/wanted`, data)
      .then(res => {
        handleSuccess();
      })
      .catch(err => {
        console.log(err);
      });
  };
};

export const getListingProperties = async () => {
  const client = Client();

  try {
    const res = await client.get(`${endpoint}/wanted-properties`);
    return res.data.data;
  } catch (e) {
    console.log(e);
  }
};

export const setUserLocale = () => {
  return async dispatch => {
    const client = Client();

    try {
      const res = await client.get("http://ip-api.com/json");
      if (res.data.countryCode === "DE") dispatch(setLocale("de"));
    } catch (e) {
      console.log(e);
    }
  };
};

export const changeFollowStatus = userId => {
  return async () => {
    const token = localStorage.getItem("plastplace_token");
    const client = Client(token);

    try {
      const res = await client.get(
        `${endpoint}/users/${userId}/change-follow-status`
      );
      return res.data.data;
    } catch (e) {
      console.log(e);
    }
  };
};

export const getFollowings = (userId, condition) => {
  return async dispatch => {
    const token = localStorage.getItem("plastplace_token");
    const client = Client(token);

    try {
      const res = await client.get(
        `${endpoint}/users/${userId}/followings/${condition}`
      );
      dispatch(getFollowingsSuccess(res.data.data));
      return res.data.data;
    } catch (e) {
      console.log(e);
    }
  };
};

export const setCurrentPage = (page) => {
  return dispatch => {
    dispatch({ type: "SET_CURRENT_PAGE", currentPage: page })
  }
}
