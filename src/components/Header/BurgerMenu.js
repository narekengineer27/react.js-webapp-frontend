import React, { Component } from 'react';

const defaultStyles = [
  { top: "0em" },
  { top: "calc(50% - 1.5px)", zIndex: "1" },
  { top: "calc(50% - 1.5px)", zIndex: "1", opacity: "0" },
  { bottom: "0em" }
];

const openStyles = [
  { opacity: "0", left: "50%", width: "0%", transform: "translateY(100%)" },
  { top: "calc(50% - 1.5px)", zIndex: "1", transform: 'rotate(45deg)' },
  { top: "calc(50% - 1.5px)", zIndex: "1", transform: 'rotate(-45deg)', opacity: "1" },
  { opacity: "0", left: "50%", width: "0%", transform: "translateY(-100%)" }
];

class BurgerMenu extends Component {
  render = () => {
    const styles = this.props.display ? openStyles : defaultStyles
    return (
      <div className={this.props.toBurgerMenuClassName} onClick={this.props.onClickBurger}>
        {styles.map((unit, i) => {
          return (
            <span key={i} style={unit}></span>
          );
        })}
      </div>  
    );
  };
} 


export default BurgerMenu