import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { MDBBtn } from "mdbreact";
import ReactPageScroller from "react-page-scroller";

import Login from "./Auth/Login";
import ForgotPassword from "./Auth/ForgotPassword";
import PasswordResetNote from "./Auth/PasswordResetNote";
import SignUp from "./Auth/SignUp";
import {
  setSignUpSuccess,
  resendRequest,
  userSignUpRequest,
  sendWantedData
} from "../actions/user";
import KindPage from "../components/LandingPage/KindPage";
import MainPage from "../components/LandingPage/MainPage";
import SlidePage from "../components/LandingPage/SlidePage";
import LastPage from "../components/LandingPage/LastPage";
var Translate = require("react-redux-i18n").Translate;

class LandingPage extends Component {
  state = {
    logInModal: false,
    signUpModal: false,
    forgotPasswordModal: false,
    passwordResetNoteModal: false,
    signUpSuccessModal: false,
    currentPage: null,
    blockDown: false,
    blockUp: false,
    isMobile: false,
    headerScrolled: false
  };

  componentDidMount() {
    const pathname = this.props.location.pathname;
    if (pathname !== "/" && pathname !== "/cabka") this.props.history.push("/");
    else
      this.setState({
        isMobile: window.innerWidth < 768,
        logInModal: pathname === "/cabka"
      });
  }

  toggle = name => () => {
    const modals = [
      "logIn",
      "signUp",
      "forgotPassword",
      "passwordResetNote",
      "signUpSuccess"
    ];

    modals.forEach(modal => {
      let modalName = modal + "Modal";
      this.setState({
        [modalName]: false
      });
    });

    let modalName = name + "Modal";
    this.setState({
      [modalName]: !this.state[modalName]
    });

    if (name === "signUpSuccess") {
      this.setState({
        signUpModal: false
      });
      this.props.setSignUpSuccess(false);
    }
  };

  handleClickResend = e => {
    this.props.resendRequest(this.props.user.signUpUser.id);
  };

  handlePageChange = number => {
    const { currentPage } = this.state;
    this.setState({ currentPage: number });

    if (number === 3) {
      this.setState({
        blockDown: number > currentPage,
        blockUp: number < currentPage
      });
    } else {
      this.setState({
        blockDown: false,
        blockUp: false
      });
    }
  };

  goToPage = pageNumber => {
    this.reactPageScroller.goToPage(pageNumber);
  };

  onScrollMobile = e => {
    let element = e.target;
    this.setState({ headerScrolled: element.scrollTop > 100 });
  };

  render() {
    const {
      blockDown,
      blockUp,
      currentPage,
      isMobile,
      headerScrolled
    } = this.state;
    return (
      <React.Fragment>
        <div className={`landing-header ${headerScrolled && "scrolled"}`}>
          {this.renderLandingHeaderTop()}
          {this.renderModals()}
        </div>
        {isMobile && (
          <div className="landing-body" onScroll={this.onScrollMobile}>
            <MainPage />
            <KindPage />
            <SlidePage isMobile={true} />
            <LastPage signup={e => this.toggle("signUp")(e)} />
          </div>
        )}
        {!isMobile && (
          <ReactPageScroller
            pageOnChange={this.handlePageChange}
            ref={c => (this.reactPageScroller = c)}
            blockScrollUp={blockUp}
            blockScrollDown={blockDown}
          >
            <MainPage goToPage={this.goToPage} />
            <KindPage />
            <SlidePage
              blockDown={b => this.setState({ blockDown: b })}
              blockUp={b => this.setState({ blockUp: b })}
              currentPage={currentPage}
            />
            <LastPage signup={e => this.toggle("signUp")(e)} />
          </ReactPageScroller>
        )}
        <div className="landing-footer">
          <Link to="/imprint" target="_blank">
            <Translate value="landing.imprint" />
          </Link>{" "}
          |{" "}
          <Link to="/terms" target="_blank">
            <Translate value="landing.terms" />
          </Link>
        </div>
      </React.Fragment>
    );
  }

  renderModals = () => (
    <div className="modal-wrapper">
      <Login
        isOpen={this.state.logInModal}
        toggle={this.toggle("logIn")}
        onClickSignUp={this.toggle("signUp")}
        onClickForgotPassword={this.toggle("forgotPassword")}
        history={this.props.history}
      />
      <ForgotPassword
        isOpen={this.state.forgotPasswordModal}
        toggle={this.toggle("forgotPassword")}
      />
      <PasswordResetNote
        isOpen={this.state.passwordResetNoteModal}
        toggle={this.toggle("passwordResetNote")}
      />
      <SignUp
        isOpen={this.state.signUpModal}
        toggle={this.toggle("signUp")}
        onClickLogIn={this.toggle("logIn")}
        user={this.props.user}
        sendWantedData={this.props.sendWantedData}
        signUp={this.props.signUp}
        resendRequest={this.props.resendRequest}
      />
    </div>
  );

  renderLandingHeaderTop = () => (
    <div className="landing-header-content">
      <Link to="/">
        <img
          className="logo"
          src={require("../assets/img/PlastPlace_Logo4.png")}
          alt=""
        />
      </Link>
      <MDBBtn
        className="landing-btn"
        onClick={e => {
          this.toggle("logIn")(e);
        }}
      >
        <Translate value="auth.login" />
      </MDBBtn>
    </div>
  );
}

function mapStateToProps(state) {
  return state;
}

// import action here and send to props
const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      signUp: params => userSignUpRequest(params),
      setSignUpSuccess,
      resendRequest,
      sendWantedData
    },
    dispatch
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(LandingPage);
