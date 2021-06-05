import React from "react";
import PropTypes from "prop-types";
import {
  MDBDropdown,
  MDBDropdownToggle,
  MDBDropdownMenu,
  MDBDropdownItem
} from "mdbreact";

class Dropdown extends React.Component {
  render = () => {
    const { list, itemSelected, onSelect } = this.props;

    return (
      <div className="pt-2" ref={this.setToggleButtonStyle}>
        <MDBDropdown className="w-100">
          {this.renderToggleBtn(itemSelected.code)}
          {this.renderList(list, itemSelected, onSelect)}
        </MDBDropdown>
      </div>
    );
  };

  setToggleButtonStyle = dropdown => {
    if (dropdown)
      dropdown.children[0].children[0].className =
        "form-control text-dark dropdown-new-button";
  };

  renderToggleBtn = label => (
    <MDBDropdownToggle
      caret
      className="w-100 border border-dark"
      color="light-grey"
    >
      {label === "mt" ? "t" : label}
    </MDBDropdownToggle>
  );

  renderList(dataList, itemSelected, onSelect) {
    let list = [];

    dataList.forEach(item => {
      list.push({
        value: item.id,
        label: item.code === "mt" ? "t" : item.code,
      });
    });

    return this.renderDropdownMenu(list, itemSelected, onSelect);
  }

  renderDropdownMenu = (list, itemSelected, onSelect) => (
    <MDBDropdownMenu basic className="w-100 overflow-auto messages-dropdown-list">
      {list.map((item, index) => (
        <MDBDropdownItem
          key={index}
          active={item.value === itemSelected.value}
          onClick={e => onSelect(index)}
        >
          {item.label}
        </MDBDropdownItem>
      ))}
    </MDBDropdownMenu>
  );
}

Dropdown.propTypes = {
  itemSelected: PropTypes.object.isRequired,
  list: PropTypes.array,
  onSelect: PropTypes.func.isRequired
};

export default Dropdown;
