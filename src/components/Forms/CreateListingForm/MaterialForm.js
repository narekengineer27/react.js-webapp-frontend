import React from "react";
import PropTypes from "prop-types";

import InputGroupTitle from "./InputGroupTitle";
import InputLabel from "./InputLabel";
import Dropdown from "./Dropdown";
import { Input, Editor } from "../../UIComponents";

var I18n = require('react-redux-i18n').I18n;

class MaterialForm extends React.Component {
  render = () => {
    const { data, onChange, categoryList, conditionList, onRef } = this.props;

    return (
      <div className="container mt-4">
        <InputGroupTitle title={I18n.t("create_listing.material")} />
        {this.renderTitle(data.title, onRef, onChange)}
        {this.renderDescription(data.description, onRef, onChange)}
        <div className="row">
          {this.renderCategory(data.category, categoryList)}
          {this.renderCondition(data.condition, conditionList)}
        </div>
      </div>
    );
  };

  renderTitle = (title, onRef, onChange) => (
    <Input
      label={I18n.t("common.title")}
      value={title}
      onRef={onRef("title")}
      onChange={e => onChange("title", e.target.value)}
    />
  );

  renderDescription = (description, onRef, onChange) => (
    <Editor
      label={I18n.t("common.description")}
      value={description}
      placeholder={I18n.t("create_listing.desc_placeholder")}
      onChange={value => onChange("description", value)}
      onRef={onRef("description")}
    />
  );

  renderCategory = (category, categoryList) => {
    return this.renderDropdown(I18n.t("common.category"), "category", category, categoryList);
  };

  renderCondition = (condition, conditionList) => {
    return this.renderDropdown(
      I18n.t("common.condition"),
      "condition",
      condition,
      conditionList
    );
  };

  renderDropdown = (title, name, itemSelected, list) => (
    <div className="col-xs-6 col-sm-6" ref={this.props.onRef(name)}>
      <InputLabel label={title} />
      <Dropdown
        name={name}
        itemSelected={itemSelected}
        list={list}
        onSelect={value => this.props.onChange(name, value)}
      />
    </div>
  );
}

MaterialForm.propTypes = {
  data: PropTypes.object.isRequired,
  categoryList: PropTypes.object,
  conditionList: PropTypes.object,
  onChange: PropTypes.func.isRequired,
  onRef: PropTypes.func
};

export default MaterialForm;
