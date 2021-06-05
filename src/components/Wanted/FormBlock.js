import React, { Component } from "react";

import Notifications from "./Notifications";
import MaterialWanted from "./MaterialWanted";
import Category from "./Category";
import Condition from "./Condition";
import Country from "./Country";

class FormBlock extends Component {
  render = () => {
    const {
      onChecked,
      subItemChecked,
      onChangeRadio,
      onChange,
      data,
      listingProperties
    } = this.props;

    return (
      <div className="wanted-form">
        <form>
          <div className="form-inner-blc">
            <MaterialWanted data={data} onChange={onChange} />
            <Category
              data={data}
              listingProperties={listingProperties}
              onChange={onChange}
            />
            <Condition
              data={data}
              listingProperties={listingProperties}
              onChange={onChange}
            />
            <Country
              data={data}
              listingProperties={listingProperties}
              handleChange={this.handleChange}
            />
            <Notifications
              handleChange={onChangeRadio}
              onChecked={onChecked}
              subItemChecked={subItemChecked}
            />
          </div>
          <div className="action-btn">{this.props.renderActionBtnGroup()}</div>
        </form>
      </div>
    );
  };

  handleChange = (id, checked, selectedItems) => {
    if (checked && selectedItems.length === 0) selectedItems.push(id);
    else if (selectedItems.length > 0) {
      for (let i = 0; i < selectedItems.length; i++) {
        if (checked && selectedItems[i] !== id) {
          selectedItems.push(id);
        } else if (!checked && selectedItems[i] === id)
          selectedItems.splice(selectedItems.indexOf(id), 1);
      }
    }
    this.props.onChange("country", selectedItems);
  };
}

export default FormBlock;
