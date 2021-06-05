import React, { Component } from "react";
var Translate = require("react-redux-i18n").Translate;
var I18n = require("react-redux-i18n").I18n;

class Notifiactions extends Component {
  render = () => {
    const classes = this.props.onChecked
      ? "input-field-block radio-blc"
      : "input-field-block radio-blc hide";
    return (
      <React.Fragment>
        <div className="row">
          <div className="input-field-block radio-blc">
            <div className="form-group field-material-wanted">
              <div className="title-block">
                <label className="control-label">
                  <Translate value="common.notification" />
                </label>
              </div>
              {this.renderRadioButtonGroup()}
            </div>
          </div>
        </div>
        <div className="row">
          <div className={classes}>
            <div className="form-group field-material-wanted">
              <div className="wanted-notification-method">
                {this.renderRadioButtonGroupForOn()}
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  };

  renderRadioButtonGroup = () => (
    <div>
      {this.renderRadioButton({
        label: "ON",
        checked: this.props.onChecked,
        onClick: e => {
          this.props.handleChange("onChecked", true);
        }
      })}
      {this.renderRadioButton({
        label: "OFF",
        checked: !this.props.onChecked,
        onClick: e => {
          this.props.handleChange("onChecked", false);
        }
      })}
    </div>
  );

  renderRadioButton = data => (
    <label className="radio-blc-label">
      <input
        type="radio"
        checked={data.checked}
        onChange={e => {}}
        onClick={data.onClick}
      />
      <i></i>
      <span>{data.label}</span>
    </label>
  );

  renderRadioButtonGroupForOn = () => (
    <React.Fragment>
      {this.renderRadioButton({
        label: I18n.t("wanted.instant_notification"),
        checked: this.props.subItemChecked === 0,
        onClick: e => {
          this.props.handleChange("subItemChecked", 0);
        },
        labelStyle: "label"
      })}
      {this.renderRadioButton({
        label: I18n.t("wanted.once_day"),
        checked: this.props.subItemChecked === 1,
        onClick: e => {
          this.props.handleChange("subItemChecked", 1);
        },
        labelStyle: "label"
      })}
      {this.renderRadioButton({
        label: I18n.t("wanted.once_week"),
        checked: this.props.subItemChecked === 2,
        onClick: e => {
          this.props.handleChange("subItemChecked", 2);
        },
        labelStyle: "label"
      })}
    </React.Fragment>
  );
}

export default Notifiactions;
