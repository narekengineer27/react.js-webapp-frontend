import React from "react";
import Card from "./Card";

const CardsShow = props => (
  <div className="container">
    <div className="row" style={{ cursor: "pointer" }}>
      {props.data.map((dt, index) => (
        <Card
          key={index}
          data={dt}
          filterCurrency={props.filterCurrency}
          filterUnit={props.filterUnit}
          history={props.history}
          exchangeRates={props.exchangeRates}
          currencies={props.currencies}
        />
      ))}
    </div>
  </div>
);

export default CardsShow;
