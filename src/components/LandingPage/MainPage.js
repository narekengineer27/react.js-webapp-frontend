import React from "react";
import DownArrow from "../../assets/img/svg/downwards-arrow-key.svg";
var Translate = require("react-redux-i18n").Translate;

class MainPage extends React.Component {

  render() {
    return (
      <div className="landing-main">
        <div className="main-content">
          <div className="main-title">
            <Translate value="landing.main_title" />
          </div>
          <div className="main-text">
            <Translate value="landing.main_desc" />
          </div>
        </div>
        <div className="green-circle" />
        {this.props.goToPage && (
          <img
            className="down-arrow"
            onClick={() => this.props.goToPage(1)}
            src={DownArrow}
            alt=""
          />
        )}
      </div>
    );
  }
}

export default MainPage;
