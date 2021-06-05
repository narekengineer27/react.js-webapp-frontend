import React, { Component } from "react";
import SearchForm from "./SearchForm";

class SearchMobile extends Component {
  render = () => {
    const styleMobile = this.props.displayMobile ? "block" : "none";
    return (
      <div className="main-search-form-mobile" style={{ display: styleMobile }}>
        <SearchForm mobile={this.props.displayMobile} {...this.props} />
      </div>
    );
  };
}

export default SearchMobile;
