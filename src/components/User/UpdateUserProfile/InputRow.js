import React, { Component } from "react";
import SearchBar from "../../Map/SearchBar";

class InputRow extends Component {
  constructor(props) {
    super(props);
    this.inputElement = [];
    this.handleClick = this.handleClick.bind(this);
    this.handleOutsideClick = this.handleOutsideClick.bind(this);

    this.state = {
      displayDropdown: false
    };
  }

  handleClick = () => {
    if (!this.state.displayDropdown) {
      // attach/remove event handler
      document.addEventListener("click", this.handleOutsideClick, false);
    } else {
      document.removeEventListener("click", this.handleOutsideClick, false);
    }

    this.setState(prevState => ({
      displayDropdown: !prevState.displayDropdown
    }));
  };

  handleOutsideClick = e => {
    // ignore clicks on the component itself
    if (this.node.contains(e.target)) {
      return;
    }

    this.handleClick();
  };

  render = () => {
    return <div className="row">{this.renderSwitchInput()}</div>;
  };

  renderSwitchInput() {
    const { inputData, location } = this.props;
    switch (inputData.name) {
      case "location":
        return this.renderLocation(inputData, location);
      case "businessType":
        return this.renderBusinessType(inputData);
      case "businessDescription":
        return this.renderBusinessDesc(inputData);
      default:
        return this.renderDefault(inputData);
    }
  }

  renderDefault = inputData => {
    return (
      <div className="input-field-block">
        <div className="form-group">
          <div className="title-block">
            <label className="control-label">{inputData.title}</label>
            {inputData.value ? null : (
              <div className="help-block">{inputData.alert}</div>
            )}
          </div>
          {inputData.name !== "email" ? (
            <input
              className="form-control"
              type="text"
              placeholder="Enter..."
              defaultValue={inputData.value}
              required={true}
              onChange={e =>
                this.props.onChange(inputData.name, e.target.value)
              }
            />
          ) : (
            <input
              className="form-control"
              type="text"
              placeholder="Enter..."
              defaultValue={inputData.value}
              readOnly={true}
            />
          )}
        </div>
      </div>
    );
  };

  renderLocation = (inputData, location) => (
    <div className="input-field-block">
      <div className="form-group">
        <div className="title-block">
          <label className="control-label">{inputData.title}</label>
          {inputData.value && location.address ? null : (
            <div className="help-block">{inputData.alert}</div>
          )}
        </div>
        <SearchBar
          className="form-control location"
          placeHolder="Enter..."
          value={inputData.value}
          onChange={this.props.onChange}
        />
      </div>
    </div>
  );

  renderBusinessType = inputData => {
    let values = [];
    let selectedItemIds = [];
    inputData.value.map(item => {
      if (item.isSelected === true) {
        values.push(item.name);
        selectedItemIds.push(item.id);
      }
      return true;
    });

    return (
      <div className="input-field-block">
        <div className="form-group">
          <div className="title-block">
            <label className="control-label">{inputData.title}</label>
            {values.length !== 0 ? null : (
              <div className="help-block">{inputData.alert}</div>
            )}
          </div>
          <div className="select-wrapper">
            <input
              className="select-dropdown"
              type="text"
              readOnly={true}
              required={true}
              onClick={this.handleClick}
              value={values.join(", ")}
            />
            {this.renderDropdown(inputData.value, selectedItemIds)}
          </div>
        </div>
      </div>
    );
  };

  renderDropdown = (businessTypes, selectedItemIds) => {
    const style = this.state.displayDropdown
      ? {
          display: "block",
          width: "100%",
          left: "0px",
          height: "370px",
          transformOrigin: "0px 0px",
          opacity: "1",
          tansform: "scaleX(1) scaleY(1)"
        }
      : { display: "none" };

    return (
      <ul
        className="dropdown-content select-dropdown multiple-select-dropdown"
        tabIndex="0"
        style={style}
        ref={node => {
          if (node) this.node = node;
        }}
      >
        {businessTypes.map((item, index) => (
          <li key={index} onClick={e => this.handleListClick(index)}>
            <span>
              <input
                type="checkbox"
                defaultChecked={item.isSelected}
                onChange={e =>
                  this.handleChange(item.id, e.target.checked, selectedItemIds)
                }
                ref={inputRef => {
                  if (inputRef) this.inputElement[index] = inputRef;
                }}
              />
              <span>{item.name}</span>
            </span>
          </li>
        ))}
      </ul>
    );
  };

  renderBusinessDesc = inputData => (
    <div className="input-field-block">
      <div className="form-group">
        <div className="title-block">
          <label className="control-label">{inputData.title}</label>
        </div>
        <textarea
          className="form-control"
          type="text"
          defaultValue={inputData.value}
          required={true}
          rows="6"
          maxLength="500"
          onChange={e => this.props.onChange(inputData.name, e.target.value)}
        />
      </div>
    </div>
  );

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
    this.props.onChange("businessTypes", selectedItems);
  };

  handleListClick = index => {
    this.inputElement[index].click();
  };
}

export default InputRow;
