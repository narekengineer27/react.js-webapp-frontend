import React, { Component } from "react";
var Translate = require("react-redux-i18n").Translate;
var I18n = require("react-redux-i18n").I18n;

export default class MaterialWanted extends Component {
  render = () => (
    <div className="row">
      <div className="input-field-block">
        <div className="form-group field-material-wanted">
          <div className="title-block">
            <label className="control-label">
              <Translate value="wanted.material_wanted" />
            </label>
            {this.props.data.name || this.props.data.name === null ? null : (
              <div className="help-block">Wanted Material cannot be blank</div>
            )}
          </div>
          <input
            type="text"
            className="form-control"
            placeholder={I18n.t("common.enter") + "..."}
            aria-required="true"
            value={this.props.data.name === null ? "" : this.props.data.name}
            onChange={e => this.props.onChange("name", e.target.value)}
          />
        </div>
      </div>
    </div>
  );
}
