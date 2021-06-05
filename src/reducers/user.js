const initialUserData = {
  isFetchingCurrentUserSession: null,
  isAuthenticated:
    !!localStorage.getItem("plastplace_token") &&
    !!localStorage.getItem("plastplace_userId"),
  isLoginSuccess: false,
  loginError: null,
  loginLoading: false,
  currentUser: null,
  isSignUpSuccess: false,
  signUpError: null,
  signUpLoading: false,
  forgotPswdError: null,
  forgotPswdLoading: false,
  isForgotPswdSuccess: false,
  confirmAccountError: null,
  confirmAccountLoading: false,
  isConfirmAccountSuccess: false,
  resetPswdError: null,
  resetPswdLoading: false,
  isResetPswdSuccess: false,
  signUpUser: null,
  followings: null,
  isAdmin: false,
  currentPage: "/"
};

const user = (state = initialUserData, action) => {
  switch (action.type) {
    case "SET_CURRENT_USER_SESSION":
      return {
        ...state,
        isFetchingCurrentUserSession: action.isFetchingCurrentUserSession,
        isAuthenticated: action.isAuthenticated
      };
    case "SET_LOGIN_SUCCESS":
      return {
        ...state,
        isLoginSuccess: action.isLoginSuccess,
        currentUser: action.currentUser,
        isAdmin: action.currentUser && action.currentUser.type === "ADMIN"
      };
    case "SET_LOGIN_STATUS":
      return {
        ...state,
        loginError: action.loginError,
        loginLoading: action.loginLoading
      };
    case "GET_CURRENT_USER":
      return {
        ...state,
        currentUser: action.currentUser,
        isAdmin: action.currentUser && action.currentUser.type === "ADMIN"
      };
    case "USER_LOGOUT":
      return {
        ...state,
        currentUser: {},
        isAuthenticated: false
      };
    case "SET_SIGNUP_SUCCESS":
      return {
        ...state,
        isSignUpSuccess: action.isSignUpSuccess,
        signUpUser: action.userData
      };
    case "SET_SIGNUP_STATUS":
      return {
        ...state,
        signUpError: action.signUpError,
        signUpLoading: action.signUpLoading
      };
    case "FORGOT_PASSWORD_SUCCESS":
      return {
        ...state,
        isForgotPswdSuccess: action.isForgotPswdSuccess
      };
    case "SET_FORGOTPSWD_STATUS":
      return {
        ...state,
        forgotPswdError: action.forgotPswdError,
        forgotPswdLoading: action.forgotPswdLoading
      };
    case "RESET_PASSWORD_SUCCESS":
      return {
        ...state,
        isResetPswdSuccess: action.isResetPswdSuccess
      };
    case "SET_RESETPSWD_STATUS":
      return {
        ...state,
        resetPswdError: action.resetPswdError,
        resetPswdLoading: action.resetPswdLoading
      };
    case "CONFIRM_ACCOUNT_SUCCESS":
      return {
        ...state,
        isConfirmAccountSuccess: action.isConfirmAccountSuccess
      };
    case "SET_CONFIRM_ACCOUNT_STATUS":
      return {
        ...state,
        confirmAccountError: action.confirmAccountError,
        confirmAccountLoading: action.confirmAccountLoading
      };
    case "GET_NEW_AVATAR_SUCCESS":
      let currentUser = { ...state.currentUser };
      currentUser.avatar = action.getNewAvatarSuccess.avatar;

      return {
        ...state,
        currentUser: currentUser
      };
    case "GET_NEW_USER_PROFILE_SUCCESS":
      return {
        ...state,
        currentUser: action.getNewUserProfileSuccess
      };
    case "GET_FOLLOWINGS_SUCCESS":
      return {
        ...state,
        followings: action.getFollowingsSuccess
      };
    case "SET_CURRENT_PAGE": 
      return {
        ...state,
        currentPage: action.currentPage
      }
    default:
      return state;
  }
};

export default user;
