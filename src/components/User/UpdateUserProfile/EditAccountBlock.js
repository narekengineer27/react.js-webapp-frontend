import React, { Component } from "react";

import ActionButton from "./ActionButton";
import InputRow from "./InputRow";
var Translate = require("react-redux-i18n").Translate;

class EditAccountBlock extends Component {
  render = () => {
    return (
      <div className="col-sm-12 col-md-8 p-0 mb-3 edit-account">
        <div className="edit-form">
          <div className="edit-form-inner">
            <div className="edit-form-title">
              <Translate value="profile.edit_account" />
            </div>
            {this.renderFormBody()}
          </div>
        </div>
      </div>
    );
  };

  renderFormBody = () => {
    const {
      userData,
      loadingSave,
      onChange,
      onClickCancel,
      onClickSave,
      location
    } = this.props;
    return (
      <form className="edit-form-body">
        <InputRow inputData={userData.first_name} onChange={onChange} />
        <InputRow inputData={userData.last_name} onChange={onChange} />
        <InputRow inputData={userData.company} onChange={onChange} />
        <InputRow inputData={userData.email} />
        <InputRow
          inputData={userData.location}
          onChange={onChange}
          location={location}
        />
        <InputRow inputData={userData.business_type} onChange={onChange} />
        <InputRow inputData={userData.description} onChange={onChange} />
        <ActionButton
          onClickSave={onClickSave}
          onClickCancel={onClickCancel}
          loadingSave={loadingSave}
        />
      </form>
    );
  };
}

export default EditAccountBlock;
