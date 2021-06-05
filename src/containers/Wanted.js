import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Link } from "react-router-dom";

import { MDBIcon } from "mdbreact";

import {
  ImageBlock,
  FormBlock,
  HeaderBlock,
  BodyBlock
} from "../components/Wanted";
import LoadingCard from "../components/LoadingCard";

import { getListings, getListingProperties } from "../actions/listing";
import {
  getWantedLists,
  creatingWantedLists,
  updateWantedList,
  deleteWantedList
} from "../actions/wanted";
import { setCurrentPage } from "../actions/user";
var Translate = require("react-redux-i18n").Translate;
var I18n = require('react-redux-i18n').I18n;

const initialData = {
  name: null,
  category: { value: null, label: "Select" },
  condition: { value: null, label: "All" },
  country: [],
  notification: "NO"
};
const notificationStatus = ["INSTANT", "ONCE_A_DAY", "ONCE_A_WEEK", "NO"];

class Wanted extends Component {
  constructor() {
    super();
    this.state = {
      data: initialData,
      listingProperties: null,
      wantedLists: [],
      loadingData: false,
      loadingSave: false,
      isWantedListShow: false,
      selectedListId: null,
      isEdit: false,
      onChecked: false,
      subItemChecked: 0
    };
  }

  componentDidMount = async () => {
    try {
      this.setState({ loadingData: true });
      this.props.setCurrentPage("/wanted")
      const lists = await this.props.getWantedLists();
      await this.props.getListingProperties().then(res => {
        if (res) {
          const wantedLists = lists && lists.length > 0 ? lists : [];
          const selectedListId =
            wantedLists.length > 0 ? wantedLists[0].id : null;
          const data =
            wantedLists.length > 0
              ? this.setData(wantedLists, selectedListId, res.data)
              : initialData;
          const onChecked = data.notification !== "NO" ? true : false;
          const subItemChecked = this.getRadioStatus(
            onChecked,
            data.notification
          );

          this.setState({
            data,
            listingProperties: res.data,
            wantedLists,
            selectedListId,
            isWantedListShow: wantedLists.length > 0 ? true : false,
            loadingData: false,
            onChecked,
            subItemChecked
          });
        }
      });
    } catch (err) {
      console.log(err);
      this.setState({ loadingData: false });
    }
  };

  getRadioStatus = (isChecked, notification) => {
    if (isChecked) {
      switch (notification) {
        case "INSTANT":
          return 0;
        case "ONCE_A_DAY":
          return 1;
        case "ONCE_A_WEEK":
          return 2;
        default:
          return 3;
      }
    } else return 0;
  };

  setData = (wantedLists, selectedListId, listingProperties) => {
    const selectedList = getSelectedListById(wantedLists, selectedListId);
    let data = { ...this.state.data };

    data.name = selectedList.name;
    data.category = getSelectedListById(
      getArrayData(listingProperties.categories),
      selectedList.CategoryId,
      true
    );
    if (selectedList.ConditionId !== null)
      data.condition = getSelectedListById(
        getArrayData(listingProperties.conditions),
        selectedList.ConditionId,
        true
      );
    else data.condition = { value: null, label: "All" };
    data.country = getSelectedCountryList(
      listingProperties.countries.items,
      selectedList.countryIds
    );
    data.notification = selectedList.notification;
    return data;
  };

  render = () => {
    const { loadingData, listingProperties, isWantedListShow } = this.state;
    if (!listingProperties && !loadingData) return null;

    return (
      <div className="wrapper-margin">
        {loadingData && <LoadingCard />}
        {!loadingData && (
          <div className="wanted">
            {!isWantedListShow
              ? this.renderCreateForm()
              : this.renderWantedListForm()}
          </div>
        )}
      </div>
    );
  };

  renderCreateForm = () => {
    const { data, listingProperties } = this.state;

    return (
      <div className="section wanted-create-inner">
        <ImageBlock />
        <FormBlock
          data={data}
          listingProperties={listingProperties}
          onChange={this.handleOnChange}
          onChangeRadio={this.handleRadio}
          onChecked={this.state.onChecked}
          subItemChecked={this.state.subItemChecked}
          renderActionBtnGroup={this.renderActionBtnGroup}
        />
      </div>
    );
  };

  renderWantedListForm = () => {
    const { data, selectedListId, wantedLists } = this.state;
    const selectedList = selectedListId
      ? getSelectedListById(wantedLists, selectedListId)
      : wantedLists[0];

    return (
      <div className="section wanted-inner">
        <HeaderBlock
          selectedList={selectedList}
          onClick={this.handleButtonClick}
        />
        <BodyBlock
          data={data}
          selectedListId={selectedListId}
          wantedLists={wantedLists}
          onClickActive={this.handleActive}
          onClick={this.handleButtonClick}
        />
      </div>
    );
  };

  renderActionBtnGroup = () => (
    <div className="form-group">
      <Link
        to="#"
        className="button button-grey with-icon default-btn"
        onClick={this.handleClickCancel}
      >
        <Translate value="common.cancel" />
      </Link>
      <Link
        to="#"
        className="button button-primary with-icon custom-btn"
        onClick={this.handleClickSave}
      >
        {this.state.loadingSave && (
          <MDBIcon icon="circle-notch" spin size="2x" fixed />
        )}
        {!this.state.loadingSave && I18n.t("common.save")}
      </Link>
    </div>
  );

  handleButtonClick = status => {
    const { selectedListId, wantedLists, listingProperties } = this.state;
    if (status === "EDIT")
      this.setState({ isEdit: true, isWantedListShow: false });
    else if (status === "ADD")
      this.setState({
        isWantedListShow: false,
        data: initialData,
        onChecked: false,
        subItemChecked: 0
      });
    else if (status === "MATCHES") {
      const selectedList = selectedListId
        ? getSelectedListById(wantedLists, selectedListId)
        : wantedLists[0];
      let currentConditions = [];
      let currentCountryIds = [];

      if (selectedList.ConditionId === null) {
        listingProperties.conditions.items.forEach(item => {
          item.items.forEach(itm => {
            currentConditions.push(itm.value);
          });
        });
      } else currentConditions = [selectedList.ConditionId];

      if (selectedList.countryIds.length === 0) {
        listingProperties.countries.items.forEach(item => {
          currentCountryIds.push(item.value);
        });
      } else currentCountryIds = selectedList.countryIds;
      const filters = {
        country: currentCountryIds,
        category: [selectedList.CategoryId],
        condition: currentConditions
      };

      this.props.getListings(filters).then(res => {
        this.props.history.push("/?filtering=true");
      });
    } else {
      if (window.confirm("Are you sure to delete this wanted offer?")) {
        this.props
          .deleteWantedList(selectedListId)
          .then(res => {
            const newWantedLists = wantedLists.filter(
              item => item.id !== selectedListId
            );
            if (newWantedLists.length > 0)
              this.setState({
                wantedLists: newWantedLists,
                selectedListId: newWantedLists[0].id
              });
            else
              this.setState({
                wantedLists: [],
                isWantedListShow: false,
                data: initialData,
                onChecked: false,
                subItemChecked: 0
              });
          })
          .catch(err => {
            console.log(err);
          });
      }
    }
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

  handleActive = id => {
    const { wantedLists, listingProperties } = this.state;
    const data = this.setData(wantedLists, id, listingProperties);
    this.setState({ selectedListId: id, data });
  };

  handleClickCancel = e => {
    const { wantedLists, selectedListId, listingProperties } = this.state;
    if (wantedLists && wantedLists.length > 0) {
      const data = this.setData(wantedLists, selectedListId, listingProperties);
      this.setState({ isWantedListShow: true, data });
    } else this.props.history.push("/");
  };

  handleClickSave = e => {
    const { data, wantedLists, selectedListId, isEdit } = this.state;
    let countryIds = [];

    data.country.map(item => {
      if (item.isSelected && item.value === null) return (countryIds = []);
      else if (item.isSelected) countryIds.push(item.value);
      return true;
    });

    if (!data.name || !data.category.value) return;

    const currentWanted = {
      name: data.name,
      CategoryId: data.category.value,
      ConditionId: data.condition.value,
      countryIds: countryIds,
      notification: data.notification
    };

    this.setState({ loadingSave: true });

    if (isEdit) {
      this.props
        .updateWantedList(selectedListId, currentWanted)
        .then(res => {
          if (res) {
            let wantedLists = [...this.state.wantedLists].filter(
              item => item.id !== res.id
            );
            wantedLists.push(res);
            const data = this.setData(
              wantedLists,
              selectedListId,
              this.state.listingProperties
            );

            this.setState({
              loadingSave: false,
              isWantedListShow: true,
              wantedLists,
              selectedListId,
              data
            });
          }
        })
        .catch(err => {
          console.log(err);
          this.setState({ loadingSave: false, isWantedListShow: false });
        });
    } else {
      this.props
        .creatingWantedLists(currentWanted)
        .then(res => {
          wantedLists.push(res);
          const selectedListId = wantedLists[0].id;
          const data = this.setData(
            wantedLists,
            selectedListId,
            this.state.listingProperties
          );

          this.setState({
            loadingSave: false,
            isWantedListShow: true,
            wantedLists,
            selectedListId,
            data
          });
        })
        .catch(err => {
          console.log(err);
          this.setState({ loadingSave: false, isWantedListShow: false });
        });
    }
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

const getSelectedListById = (list, id, type = false) => {
  if (type) return list.filter(item => item.value === id)[0];
  return list.filter(item => item.id === id)[0];
};

const getArrayData = data => {
  let list = [];
  if (data.type === "tree") {
    data.items.forEach(item => {
      list.push({ value: item.value, label: item.label });
      item.items.forEach(itm => {
        list.push({ value: itm.value, label: itm.label });
      });
    });
    return list;
  }
  return data.items;
};

const mapStateToProps = state => ({
  listingProperties: state.listing.listingProperties
    ? state.listing.listingProperties
    : {},
  wantedLists: state.wanted.lists ? state.wanted.lists : {}
});

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      getListings,
      getListingProperties,
      getWantedLists,
      creatingWantedLists,
      updateWantedList,
      deleteWantedList,
      setCurrentPage
    },
    dispatch
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(Wanted);
