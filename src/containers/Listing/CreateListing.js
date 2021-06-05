import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { createNotification } from "../../utils/notification";
import {
  Title,
  MaterialForm,
  AvailabilityForm,
  PriceForm,
  LocationForm,
  TargetForm,
  UploadVideoForm,
  UploadImageForm,
  DoneButton,
  UploadPDF,
  formErrors
} from "../../components/Forms/CreateListingForm";
import { setCurrentPage } from "../../actions/user";
import { getListingProperties, createNewListing } from "../../actions/listing";
var I18n = require("react-redux-i18n").I18n;

class CreateListing extends React.Component {
  formErrorMessages = {
    images: I18n.t("form_errors.images"),
    title: I18n.t("form_errors.title"),
    description: I18n.t("form_errors.description"),
    category: I18n.t("form_errors.category"),
    condition: I18n.t("form_errors.condition"),
    quantity: I18n.t("form_errors.quantity"),
    unit: I18n.t("form_errors.unit"),
    pricePerUnit: I18n.t("form_errors.pricePerUnit"),
    pricingTerm: I18n.t("form_errors.pricingTerm"),
    auctionInterval: I18n.t("form_errors.auctionInterval"),
    address: I18n.t("form_errors.address"),
    city: I18n.t("form_errors.city"),
    zipcode: I18n.t("form_errors.zipcode")
  };

  initialFormData = {
    images: [null, null, null, null, null],
    video: null,
    pdf: [],
    material: {
      title: "",
      description: "",
      category: {
        value: -1,
        label: I18n.t("create_listing.choose", {
          name: I18n.t("common.category")
        })
      },
      condition: {
        value: -1,
        label: I18n.t("create_listing.choose", {
          name: I18n.t("common.condition")
        })
      }
    },
    availability: {
      quantity: "",
      unit: {
        value: -1,
        label: I18n.t("create_listing.choose", { name: I18n.t("common.unit") })
      },
      supply: {
        value: "Ongoing",
        label: "Ongoing"
      }
    },
    price: {
      fixedPriceChecked: true,
      auctionChecked: false,
      pricePerUnit: "",
      currency: "US$",
      pricingTerm: {
        value: -1,
        label: I18n.t("create_listing.choose", {
          name: I18n.t("common.pricing_terms")
        })
      },
      isCheckedFree: false,
      auctionInterval: 0,
      auctionDateTime: new Date()
    },
    location: {
      address: "",
      city: "",
      country: {
        value: -1,
        label: I18n.t("create_listing.choose", {
          name: I18n.t("create_listing.country")
        })
      },
      zipcode: 0
    },
    target: {
      geography: {
        value: "1",
        label: "All countries"
      },
      users: {
        value: "1",
        label: "All users"
      }
    }
  };

  state = {
    images: this.initialFormData.images,
    video: this.initialFormData.video,
    pdf: this.initialFormData.pdf,
    material: this.initialFormData.material,
    availability: this.initialFormData.availability,
    price: this.initialFormData.price,
    target: this.initialFormData.target,
    location: this.initialFormData.location,
    formErrors: formErrors,
    formErrorMessages: this.formErrorMessages,
    inputRefs: {}
  };

  componentDidMount = () => {
    this.props.setCurrentPage("/product/create");
    this.props.getListingProperties().then(res => {
      if (res) {
        const country = {
          value: res.data.companyLocation.countryId,
          label: res.data.companyLocation.country
        };

        const location = {
          address: res.data.companyLocation.address,
          city: res.data.companyLocation.city,
          country: country,
          zipcode: res.data.companyLocation.zipcode
        };
        let state = this.state;
        state.location = location;
        state.price.currency = res.data.currency;
        this.setState(state);
      }
    });
  };

  handleChangeInput = groupName => (name, value) => {
    let group = this.state[groupName];

    group[name] = value;

    this.setState({ [groupName]: group });
  };

  handleChangeVideo = newVideo => {
    this.setState({ video: newVideo });
  };

  handleChangePDF = newPDF => {
    this.setState({ pdf: newPDF });
  };

  handleAddImage = (newImage, id) => {
    let newImages;
    newImages = [...this.state.images];
    newImages[id] = newImage;

    this.setState({ images: newImages });
  };

  handleRemoveImage = imageToDelete => {
    let newImages;
    newImages = [...this.state.images];
    newImages[imageToDelete] = null;

    this.setState({ images: [...newImages] });
  };

  handleClickDone = async () => {
    const { images, material, availability, price, location } = this.state;
    const currentFormData = {
      images,
      material,
      availability,
      price,
      location
    };

    if (this.isValidatedForms(currentFormData, this.state.formErrors)) {
      const formData = {
        images: this.state.images,
        video: this.state.video,
        pdf: this.state.pdf,
        title: this.state.material.title,
        description: this.state.material.description,
        categoryId: this.state.material.category.value,
        conditionId: this.state.material.condition.value,
        quantity: this.state.availability.quantity,
        unit: this.state.availability.unit.value,
        supply: this.state.availability.supply.value,
        pricePerUnit: this.state.price.pricePerUnit,
        pricingTermId: this.state.price.pricingTerm.value,
        isAuction: this.state.price.auctionChecked,
        auctionInterval: this.state.price.auctionInterval,
        auctionDateTime: this.state.price.auctionDateTime,
        address: this.state.location.address,
        city: this.state.location.city,
        countryId: this.state.location.country.value,
        zipcode: this.state.location.zipcode,
        geography: this.state.target.geography.value,
        users: this.state.target.users.value
      };

      let newListing = new FormData();

      for (let key in formData) {
        if (formData.hasOwnProperty(key)) {
          const data = formData[key];

          if (Array.isArray(data)) {
            data.forEach((item, index) => {
              if (item) newListing.append(key, item);
            });
          } else newListing.append(key, data);
        }
      }

      try {
        const listingData = await this.props.createNewListing(newListing);
        this.props.history.push(`/product/${listingData.id}`);
      } catch (e) {
        console.log(e);
      }
    }
  };

  isValidatedForms = (currentFormData, formErrors, upperKey = null) => {
    let isValidated = true;

    for (let key in formErrors) {
      if (formErrors.hasOwnProperty(key)) {
        const errorValue = formErrors[key];
        const currentValue = currentFormData[key];

        if (
          Array.isArray(errorValue) ||
          typeof errorValue === "string" ||
          typeof errorValue === "number"
        ) {
          if (JSON.stringify(currentValue) === JSON.stringify(errorValue)) {
            //dropdown value
            if (key === "value") {
              createNotification(
                this.state.formErrorMessages[upperKey],
                "info"
              );
              this.scrollToDestination(upperKey);
            } else {
              createNotification(this.state.formErrorMessages[key], "info");
              this.scrollToDestination(key);
            }

            return false;
          }
        } else {
          isValidated =
            isValidated && this.isValidatedForms(currentValue, errorValue, key);
        }
      }
    }

    return isValidated;
  };

  scrollToDestination = key => {
    if (this.hasOwnProperty(`${key}Ref`)) {
      let ref = this[`${key}Ref`];

      if (ref.hasOwnProperty("focus")) {
        ref.focus();

        window.scrollTo({
          top: document.documentElement.scrollTop - 150,
          behavior: "smooth"
        });
      } else if (ref.offsetTop !== undefined && ref.offesetTop !== null) {
        let offsetTop = ref.offsetTop;

        window.scrollTo({
          top: offsetTop - 150,
          behavior: "smooth"
        });
      }
    }
  };

  handleRef = name => ref => {
    if (ref) {
      this[`${name}Ref`] = ref;
    }
  };

  render = () => {
    if (!this.props.user.isAdmin) {
      return (
        <div className="container text-light">
          <div className="create-listing-container">
            <div className="centered">
              <br />
              <br />
              <img
                src="https://plast-asset.s3.amazonaws.com/members-only.svg"
                width="80%"
                height="auto"
                alt=""
              />
              <br />
              <br />
              <h4>{I18n.t("create_listing.no_permission")}</h4>
            </div>
          </div>
        </div>
      );
    }
    return (
      <div className="container text-dark">
        <div className="create-listing-container">
          {this.renderTitle()}
          {this.renderUploadForm()}
          {this.renderMaterialForm()}
          {this.renderAvailabilityForm()}
          {this.renderPriceForm()}
          {this.renderLocationForm()}
          {this.renderTargetForm()}
          {this.renderDoneButton()}
        </div>
      </div>
    );
  };

  renderTitle = () => <Title />;

  renderDoneButton = () => (
    <DoneButton
      isCreatingListing={this.props.isCreatingListing}
      onClick={this.handleClickDone}
    />
  );

  renderUploadForm = () => (
    <div className="row">
      <div className="col-sm-6">
        <UploadImageForm
          onRef={this.handleRef}
          data={this.state.images}
          onAdd={this.handleAddImage}
          onRemove={this.handleRemoveImage}
        />
      </div>
      <div className="col-sm-6 upload-right-container">
        <UploadVideoForm
          data={this.state.video}
          onChange={this.handleChangeVideo}
        />
        <UploadPDF data={this.state.pdf} onChangePDF={this.handleChangePDF} />
      </div>
    </div>
  );

  renderMaterialForm = () => (
    <MaterialForm
      data={this.state.material}
      onRef={this.handleRef}
      categoryList={this.props.listingProperties.categories}
      conditionList={this.props.listingProperties.conditions}
      onChange={this.handleChangeInput("material")}
    />
  );

  renderAvailabilityForm = () => (
    <AvailabilityForm
      onRef={this.handleRef}
      data={this.state.availability}
      unitList={this.props.listingProperties.units}
      supplyList={this.props.listingProperties.supplies}
      onChange={this.handleChangeInput("availability")}
    />
  );

  renderPriceForm = () => (
    <PriceForm
      onRef={this.handleRef}
      data={this.state.price}
      pricingTermsList={this.props.listingProperties.pricingTerms}
      onChange={this.handleChangeInput("price")}
      unit={this.state.availability.unit}
    />
  );

  renderLocationForm = () => (
    <LocationForm
      onRef={this.handleRef}
      data={this.state.location}
      countryList={this.props.listingProperties.countries}
      onChange={this.handleChangeInput("location")}
    />
  );

  renderTargetForm = () => (
    <TargetForm
      onRef={this.handleRef}
      data={this.state.target}
      geographyList={this.props.listingProperties.geographies}
      usersList={this.props.listingProperties.users}
      onChange={this.handleChangeInput("target")}
    />
  );
}

const mapStateToProps = state => ({
  listingProperties: state.listing.listingProperties
    ? state.listing.listingProperties
    : {},
  isCreatingListing: state.listing.isCreatingListing,
  listing: state.listing,
  user: state.user
});

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      getListingProperties,
      createNewListing,
      setCurrentPage
    },
    dispatch
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateListing);
