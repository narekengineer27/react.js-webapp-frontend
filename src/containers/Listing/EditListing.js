import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { createNotification } from "../../utils/notification";
import {
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
import LoadingCard from "../../components/LoadingCard";
import {
  getListingProperties,
  getListing,
  editCurrentListing
} from "../../actions/listing";
var I18n = require("react-redux-i18n").I18n;
var Translate = require("react-redux-i18n").Translate;

class EditListing extends Component {
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
    pdf: null,
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
        value: -1,
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
    inputRefs: {},
    loadingData: false,
    imageUrls: [],
    videoUrl: null,
    pdfUrl: null,
    deletedUrls: []
  };

  componentDidMount = () => {
    const id = this.props.match.params.id;
    this.loadListingData(id);
  };

  loadListingData = async id => {
    try {
      this.setState({ loadingData: true });

      const listingData = await this.props.getListing(id);
      await this.props.getListingProperties().then(res => {
        if (res) {
          const listingProperties = res.data;

          const country = {
            value: listingData.Country.id,
            label: listingData.Country.name
          };

          const location = {
            address: listingData.address,
            city: listingData.city,
            country: country,
            zipcode: listingData.zipcode
          };

          const files = listingData.ListingFiles;
          let videoUrl = null;
          let pdfUrl = null;
          let imageUrls = [];
          for (let i = 0; i < files.length; i++) {
            if (files[i].type === "VIDEO") videoUrl = files[i];
            else if (files[i].type === "PDF") pdfUrl = files[i];
            else imageUrls.push(files[i]);
          }
          for (let i = imageUrls.length; i < 5; i++) {
            imageUrls.push(null);
          }

          const material = { ...this.state.material };
          material.title = listingData.title;
          material.description = listingData.description;
          material.category = {
            value: listingData.Category.id,
            label: listingData.Category.name
          };
          material.condition = {
            value: listingData.Condition.id,
            label: listingData.Condition.name
          };

          const availability = { ...this.state.availability };
          availability.quantity = listingData.quantity;
          availability.unit = {
            value: listingData.unit,
            label: listingData.unit
          };
          availability.supply = {
            value: listingData.supply,
            label: listingData.supply
          };

          const price = { ...this.state.price };

          if (listingData.isAuction) {
            price.auctionChecked = true;
            price.fixedPriceChecked = false;
            price.auctionInterval = listingData.auctionInterval;
            price.auctionDateTime = new Date(listingData.auctionDateTime);
          }

          price.pricePerUnit = listingData.pricePerUnit;
          price.pricingTerm = {
            value: listingData.PricingTerm.id,
            label: listingData.PricingTerm.name
          };
          price.currency = res.data.currency;

          const target = { ...this.state.target };
          const geos = listingProperties.geographies.items.filter(item => {
            return item.value === listingData.geography;
          });
          target.geography = geos.length > 0 ? geos[0] : {};
          const us = listingProperties.users.items.filter(item => {
            return item.value === listingData.users;
          });
          target.users = us.length > 0 ? us[0] : {};

          this.setState({
            videoUrl,
            images: imageUrls,
            pdfUrl,
            material,
            availability,
            price,
            location,
            target,
            loadingData: false
          });
        }
      });
    } catch (err) {
      console.log(err);
      this.setState({ loadingData: false });
    }
  };

  handleChangeInput = groupName => (name, value) => {
    let group = this.state[groupName];
    group[name] = value;
    this.setState({
      [groupName]: group
    });
  };

  handleChangePDF = newPDF => {
    this.setState({
      pdf: newPDF
    });
  };

  handleChangeVideo = newVideo => {
    this.setState({
      video: newVideo
    });
  };

  handleRemoveVideoUrl = url => {
    let deletedItems = this.state.deletedUrls;
    deletedItems.push(url.id);

    this.setState({
      videoUrl: null,
      deletedUrls: deletedItems
    });
  };

  handleRemovePDFUrl = url => {
    let deletedItems = this.state.deletedUrls;
    deletedItems.push(url.id);

    this.setState({
      pdfUrl: null,
      deletedUrls: deletedItems
    });
  };

  handleAddImage = (newImage, id) => {
    let newImages;

    newImages = [...this.state.images];
    newImages[id] = newImage;

    this.setState({
      images: newImages
    });
  };

  handleRemoveImage = imageToDelete => {
    let newImages;

    newImages = [...this.state.images];
    newImages[imageToDelete] = null;

    this.setState({
      images: [...newImages]
    });
  };

  handleRemoveUrl = urlToDelete => {
    let deletedItems = this.state.deletedUrls;
    deletedItems.push(urlToDelete);

    this.setState({
      deletedUrls: deletedItems
    });
  };

  handleClickDone = async () => {
    const {
      images,
      material,
      availability,
      price,
      location
    } = this.state;
    const currentFormData = {
      images,
      material,
      availability,
      price,
      location
    };

    if (this.isValidatedForms(currentFormData, this.state.formErrors)) {
      const newImages = [];
      this.state.images.forEach(image => {if(image && !image.url) newImages.push(image)})
      const formData = {
        images: newImages,
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
        users: this.state.target.users.value,
        deletedFiles: this.state.deletedUrls
      };

      let newListing = new FormData();

      for (let key in formData) {
        if (formData.hasOwnProperty(key)) {
          const data = formData[key];

          if (Array.isArray(data)) {
            data.forEach((item, index) => {
              if (item) newListing.append(key, item);
            });
          } else {
            newListing.append(key, data);
          }
        }
      }

      const productId = this.props.match.params.id;
      try {
        const editListing = await this.props.editCurrentListing(
          newListing,
          productId
        );
        this.props.history.push(`/profile/${editListing.UserId}`);
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

  render = () => (
    <div className="container text-dark">
      <div className="create-listing-container">
        {this.state.loadingData && <LoadingCard />}
        {!this.state.loadingData && (
          <React.Fragment>
            {this.renderTitle()}
            {this.renderUploadForm()}
            {this.renderMaterialForm()}
            {this.renderAvailabilityForm()}
            {this.renderPriceForm()}
            {this.renderLocationForm()}
            {this.renderTargetForm()}
            {this.renderDoneButton()}
          </React.Fragment>
        )}
      </div>
    </div>
  );

  renderTitle = () => (
    <div className="container text-center">
      <div className="create-listing-title mb-5">
        <h3>
          <Translate value="create_listing.edit_listing" />
        </h3>
      </div>
    </div>
  );

  renderDoneButton = () => (
    <DoneButton
      isCreatingListing={this.props.isEditListing}
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
          onRemoveUrl={this.handleRemoveUrl}
          imageUrls={this.state.imageUrls}
        />
      </div>
      <div className="col-sm-6 upload-right-container">
        <UploadVideoForm
          data={this.state.video}
          onChange={this.handleChangeVideo}
          onRemove={this.handleRemoveVideoUrl}
          videoUrl={this.state.videoUrl}
        />
        <UploadPDF
          data={this.state.pdf}
          pdfUrl={this.state.pdfUrl}
          onChange={this.handleChangePDF}
          onRemove={this.handleRemovePDFUrl}
        />
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
      listingData={this.state.listingData}
      unitList={this.props.listingProperties.units}
      supplyList={this.props.listingProperties.supplies}
      onChange={this.handleChangeInput("availability")}
    />
  );

  renderPriceForm = () => (
    <PriceForm
      onRef={this.handleRef}
      data={this.state.price}
      listingData={this.state.listingData}
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
  isEditListing: state.listing.isEditListing
});

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      getListingProperties,
      getListing,
      editCurrentListing
    },
    dispatch
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(EditListing);
