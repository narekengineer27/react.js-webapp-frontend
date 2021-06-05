import React from "react";
import { Link } from "react-router-dom";
var Translate = require("react-redux-i18n").Translate;

const HeaderBlock = props => (
  <div className="wanted-header">
    <div className="wanted-header-title">Wanted list</div>
    <div className="wanted-header-action-blc">
      <Link
        className="matching-offers-link"
        to="#"
        onClick={e => props.onClick("MATCHES")}
      >
        {props.selectedList
          ? props.selectedList.match > 0
            ? `${props.selectedList.match} matches found`
            : "No matches found"
          : "No matches found"}
      </Link>
      <div className="link-group">
        <Link
          className="button button-outline-primary no-border"
          to="#"
          onClick={e => props.onClick("EDIT")}
        >
          <i className="icon far fa-edit" /> <Translate value="common.edit" />
        </Link>
        <Link
          className="button button-outline-primary no-border"
          to="#"
          onClick={e => props.onClick("DEL")}
        >
          <i className="icon far fa-trash-alt" /> <Translate value="common.delete" />
        </Link>
        <Link
          className="button button-outline-primary added sub-button"
          to="#"
          onClick={e => props.onClick("ADD")}
        >
          <i className="icon fas fa-plus" /> 
            <Translate value="create_listing.add_new" />
        </Link>
      </div>
    </div>
  </div>
);

export default HeaderBlock;
