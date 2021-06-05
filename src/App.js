import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { getCurrentUserSession, setUserLocale } from "./actions/user";

import Dashboard from "./containers/Dashboard";
import LandingPage from "./containers/LandingPage";
import Header from "./containers/Header";
import Login from "./containers/Auth/Login";
import SignUp from "./containers/Auth/SignUp";
import ConfirmAccount from "./containers/Auth/ConfirmAccount";
import ResendVerificationCode from "./containers/Auth/ResendVerificationCode";
import ForgotPassword from "./containers/Auth/ForgotPassword";
import SetNewPassword from "./containers/Auth/SetNewPassword";
import ProductDetail from "./containers/ProductDetail";
import Messages from "./containers/Messages";
import UserProfile from "./containers/User/UserProfile";
import UpdateUserProfile from "./containers/User/UpdateUserProfile";
import CreateListing from "./containers/Listing/CreateListing";
import EditListing from "./containers/Listing/EditListing";
import WishList from "./containers/WishList";
import Wanted from "./containers/Wanted";
import Notifications from "./containers/Notifications";
import ChatBox from "./containers/ChatBox";
import Imprint from "./containers/Imprint";
import Terms from "./containers/Terms";
import PaymentMethods from "./containers/PaymentMethods";
import OrderPage from "./containers/Order";
import MyOrders from "./containers/MyOrders";

import "./styles/index.scss";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "bootstrap-css-only/css/bootstrap.min.css";
import "mdbreact/dist/css/mdb.css";
import "./assets/scss/mdb.scss";
import "react-id-swiper/lib/styles/scss/swiper.scss";
import "./assets/font/Poppins/Poppins-Regular.ttf";
import "./assets/font/Poppins/Poppins-Bold.ttf";

const PrivateRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={props =>
        rest.user.isAuthenticated ? (
          <Component {...props} />
        ) : (
          <LandingPage {...props} />
        )
      }
    />
  );
};

class App extends Component {
  async componentDidMount() {
    // Get userData
    try {
      await this.props.getCurrentUserSession();
      await this.props.setUserLocale()
    } catch (err) {
      console.log(err);
    }
  }
  
  render() {
    const { user } = this.props;

    return (
      <Router>
        {this.props.user.isAuthenticated ? (
          <header>
            <Header />
          </header>
        ) : null}
        <div className="App">
          <Switch>
            <Route path="/login" component={Login} />
            <Route path="/signup" component={SignUp} />
            <Route path="/confirm-account/:id" component={ConfirmAccount} />
            <Route
              path="/resend-verification-code"
              component={ResendVerificationCode}
            />
            <Route path="/forgot-password" component={ForgotPassword} />
            <Route path="/reset-password/:id" component={SetNewPassword} />
            <Route path="/imprint" component={Imprint} />
            <Route path="/terms" component={Terms} />
            <PrivateRoute path="/product/create" component={CreateListing} user={user} />
            <PrivateRoute path="/product/edit/:id" component={EditListing} user={user} />
            <PrivateRoute path="/product/:id" component={ProductDetail} user={user} />
            <PrivateRoute path="/profile/edit" component={UpdateUserProfile} user={user} />
            <PrivateRoute path="/myaccount" component={UserProfile} user={user} />
            <PrivateRoute path="/profile/:id" component={UserProfile} user={user} />
            <PrivateRoute path="/messages" component={Messages} user={user} />
            <PrivateRoute path="/wishlist" component={WishList} user={user} />
            <PrivateRoute path="/wanted" component={Wanted} user={user}/>
            <PrivateRoute path="/notifications" component={Notifications} user={user}/>
            <PrivateRoute path="/payments" component={PaymentMethods} user={user}/>
            <PrivateRoute path="/order" component={OrderPage} user={user} />
            <PrivateRoute path="/orders" component={MyOrders} user={user} />
            <PrivateRoute exact path="/*" component={Dashboard} user={user} />
          </Switch>
        </div>
        {this.props.user.isAuthenticated ? <ChatBox /> : null}
      </Router>
    );
  }
}

function mapStateToProps(state) {
  return state;
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      getCurrentUserSession,
      setUserLocale
    },
    dispatch
  );
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
