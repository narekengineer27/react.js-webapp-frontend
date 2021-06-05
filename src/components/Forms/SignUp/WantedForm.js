import React from "react";
import { Link } from "react-router-dom";
import { MDBTabPane } from "mdbreact";

import ImageBlock from "../../Wanted/ImageBlock";
import FormBlock from "../../Wanted/FormBlock";
import { getListingProperties } from "../../../actions/user";
import { sampleData } from "./sampledata";

const initialData = {
  name: null,
  category: { value: null, label: "Select" },
  condition: { value: null, label: "All" },
  country: [],
  notification: "NO",
  onChecked: false,
  subItemChecked: 0
};

const notificationStatus = ["INSTANT", "ONCE_A_DAY", "ONCE_A_WEEK", "NO"];

class WantedForm extends React.Component {
  state = {
    data: initialData,
    onChecked: false,
    subItemChecked: 0,
    listingProperties: sampleData
  };

  componentDidMount = async () => {
    const listingProperties = await getListingProperties();

    this.setState({ listingProperties: listingProperties });
  };

  handleChange = (name, value) => {
    this.setState({
      [name]: value
    });
  };
  handleOnChange = (name, values) => {
    if (name === "name")
      this.setState({ data: { ...this.state.data, [name]: values } });
    else if (name === "country") {
      const list = [...this.state.listingProperties.countries.items];
      let selectedCountries = getSelectedCountryList(list, values);

      if (values[values.length - 1] === null) {
        selectedCountries = selectedCountries.map(item => {
          if (item.value === null) return { ...item, isSelected: true };
          return { ...item, isSelected: false };
        });

        this.setState({
          data: { ...this.state.data, [name]: selectedCountries }
        });
      } else {
        let newValues = values.filter(item => item !== null);
        let selectedCountries = getSelectedCountryList(list, newValues);

        this.setState({
          data: { ...this.state.data, [name]: selectedCountries }
        });
      }
    } else
      this.setState({
        data: {
          ...this.state.data,
          [name]: { ...this.state.data[name], ...values }
        }
      });
  };

  handleClickNext = e => {
    const { data } = this.state;
    let countryIds = [];

    data.country.map(item => {
      if (item.isSelected && item.value === null) return (countryIds = []);
      else if (item.isSelected) countryIds.push(item.value);
      return true;
    });

    const currentWanted = {
      name: data.name,
      CategoryId: data.category.value,
      ConditionId: data.condition.value,
      countryIds: countryIds,
      notification: data.notification
    };

    this.props.sendWantedData({
      UserId: this.props.UserId,
      data: currentWanted,
      handleSuccess: () => this.props.onClickNext()
    });
  };

  handleRadio = (name, value) => {
    this.setState({ [name]: value });
    let { data, subItemChecked } = this.state;

    if (name === "onChecked") {
      if (!value) {
        data.notification = notificationStatus[3];
      } else {
        data.notification = notificationStatus[subItemChecked];
      }
    } else {
      data.notification = notificationStatus[value];
    }
    this.setState({ data });
  };

  render = () => (
    <MDBTabPane tabId="2" role="tabpanel">
      <div className="wanted" style={{ boxShadow: "0 0" }}>
        <div
          className="section wanted-create-inner"
          style={{ padding: "10px 10px" }}
        >
          <ImageBlock />
          <FormBlock
            data={this.state.data}
            listingProperties={sampleData}
            onChange={this.handleOnChange}
            onChangeRadio={this.handleRadio}
            onChecked={this.state.onChecked}
            subItemChecked={this.state.subItemChecked}
            renderActionBtnGroup={this.renderActionBtnGroup}
            isForSignUp={true}
          />
        </div>
      </div>
    </MDBTabPane>
  );

  renderActionBtnGroup = () => (
    <div className="form-group d-flex justify-content-end">
      <Link
        className="button button-primary next-btn"
        to="#"
        onClick={e => this.handleClickNext(e)}
      >
        Next
      </Link>
    </div>
  );
}

const getSelectedCountryList = (list, values) => {
  let selectedCountries = [];
  let countries = [{ value: null, label: "All" }, ...list];

  selectedCountries = countries.map(item => {
    return { ...item, isSelected: false };
  });

  for (let value of values) {
    selectedCountries = selectedCountries.map(item => {
      if (value === item.value) {
        return { ...item, isSelected: true };
      }
      return item;
    });
  }
  return selectedCountries;
};

export default WantedForm;
