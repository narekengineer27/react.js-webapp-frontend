import React, { Component } from "react";

const defaultStyles = [
  { top: "0em" },
  { top: "calc(50% - 1.5px)", zIndex: "1", left: "0px" },
  { bottom: "0em", left: "0px" }
];

const openStyles = [
  { top: "0em" },
  { top: "calc(50% - 1.5px)", zIndex: "1", width: "75%", left: "5px" },
  { bottom: "0em", width: "45%", left: "11px" }
];

class BurgerButton extends Component {
  render = () => {
    const styles = this.props.display ? openStyles : defaultStyles;
    return (
      <div className="burger-button" onClick={this.props.onClickBurger}>
        {styles.map((unit, i) => {
          return <span key={i} style={unit}></span>;
        })}
      </div>
    );
  };
}

export default BurgerButton;
