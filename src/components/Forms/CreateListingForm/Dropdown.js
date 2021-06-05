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
    const { itemSelected } = this.props;

    return (
      <div className="pt-2" ref={this.setToggleButtonStyle}>
        <MDBDropdown className="w-100">
          {this.renderToggleBtn(itemSelected.label)}
          {this.renderDropdown()}
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
      // outline
      caret
      className="w-100 border border-dark"
      color="light-grey"
    >
      {label === "mt" ? "t" : label}
    </MDBDropdownToggle>
  );

  renderDropdown = () => {
    const { itemSelected, onSelect, list, name } = this.props;

    if (!list)
      return <MDBDropdownMenu basic className="w-100"></MDBDropdownMenu>;

    if (list.type === "tree") {
      return this.renderTree(list, itemSelected, onSelect, name);
    }
    if (list.type === "list") {
      return this.renderList(list, itemSelected, onSelect, name);
    }

    return <MDBDropdownMenu basic className="w-100"></MDBDropdownMenu>;
  };

  renderTree(dataList, itemSelected, onSelect, name) {
    let list = [];
    dataList.items.forEach(item => {
      list.push({ label: item.label, isHeader: true, isSubItem: false });
      item.items.forEach(itm => {
        list.push({
          value: itm.value,
          label: itm.label,
          isHeader: false,
          isSubItem: true
        });
      });
    });

    return this.renderDropdownMenu(list, itemSelected, onSelect, name);
  }

  renderList(dataList, itemSelected, onSelect, name) {
    let list = [];
    dataList.items.forEach(item => {
      list.push({
        value: item.value,
        label: item.label === "mt" ? "t" : item.label,
        isHeader: false,
        isSubItem: false
      });
    });

    return this.renderDropdownMenu(list, itemSelected, onSelect, name);
  }

  renderDropdownMenu = (menu, itemSelected, onSelect) => (
    <MDBDropdownMenu basic className="w-100 overflow-auto dropdown-list">
      {menu.map((item, index) => (
        <MDBDropdownItem
          key={index}
          header={item.isHeader}
          active={item.value === itemSelected.value}
          onClick={e => onSelect({ value: item.value, label: item.label })}
        >
          {item.isSubItem ? <span>&emsp;</span> : null}
          {item.label}
        </MDBDropdownItem>
      ))}
    </MDBDropdownMenu>
  );
}

Dropdown.propTypes = {
  name: PropTypes.string,
  itemSelected: PropTypes.object.isRequired,
  list: PropTypes.object,
  onSelect: PropTypes.func.isRequired
};

export default Dropdown;
