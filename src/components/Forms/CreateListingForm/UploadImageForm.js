import React from "react";
import PropTypes from "prop-types";

import { Button } from "../../UIComponents";
var I18n = require("react-redux-i18n").I18n;

class UploadImageForm extends React.Component {
  render = () => {
    const { data, onRemove, onRef, onRemoveUrl } = this.props;

    return (
      <div className="container" ref={onRef("images")}>
        <input
          type="file"
          accept="image/*"
          className="upload-file"
          onChange={e => {
            this.onAddImageFile(e, 0);
            if (data[0] && data[0].url) onRemoveUrl(0);
          }}
          ref={fileInput => (this.mainImageInput = fileInput)}
        />
        <div className="row">
          <div className="col-10">
            {data[0]
              ? this.renderMainImage(data[0], onRemove, onRemoveUrl)
              : this.renderAddMainImage()}
          </div>
          <div className="col-2">
            {this.renderImageList(data, onRemove, onRemoveUrl)}
          </div>
        </div>
      </div>
    );
  };

  triggerImageInput = (e, index) => {
    this[`imageInput${index}`].click();
  };

  triggerMainImageInput = e => {
    this.mainImageInput.click();
  };

  onAddImageFile = (e, id) => {
    const { onAdd } = this.props;
    if (e.target.files[0]) onAdd(e.target.files[0], id);
  };

  renderAddMainImage = () => (
    <div className="container main-image-container">
      <div
        className="upload-image-button-container"
        onClick={this.triggerMainImageInput}
      >
        <div className="upload-image-button">
          <div>
            <div className="icon">
              <i className="fas fa-image" />
            </div>
            <div className="title">{I18n.t("create_listing.add_image")}</div>
          </div>
        </div>
      </div>
    </div>
  );

  renderMainImage = (image, onRemove, onRemoveUrl) => {
    return (
      <div className="container view hover zoom main-image-container">
        <img
          src={!image.url ? window.URL.createObjectURL(image) : image.url}
          className="main-image"
          alt=""
        />
        <div className="main-image-overlay">
          <Button
            outline={true}
            size="sm"
            onClick={this.triggerMainImageInput}
            title={I18n.t("common.change")}
            color="#ff0000"
            borderColor="danger"
          />
          <Button
            outline={true}
            size="sm"
            onClick={e => {
              onRemove(0);
              if (image.url) onRemoveUrl(image.id);
            }}
            title={I18n.t("common.remove")}
            color="#ff0000"
            borderColor="danger"
          />
        </div>
      </div>
    );
  };

  renderImageList = (data, onRemove, onRemoveUrl) => (
    <div className="row">
      {data.map((image, index) =>
        index > 0 ? (
          image ? (
            <div key={index} className="additional-image-container">
              <img
                src={!image.url ? window.URL.createObjectURL(image) : image.url}
                className="w-100 h-100 addition-image"
                alt=""
              />
              <div
                className="image-overlay"
                onClick={e => {
                  onRemove(index);
                  if (image.url) onRemoveUrl(image.id);
                }}
              >
                <div className="additional-remove-button">-</div>
              </div>
            </div>
          ) : (
            <div key={index} className="w-100">
              {this.renderAddNewBtn(data, index, index === 4)}
              <input
                type="file"
                accept="image/*"
                className="upload-file"
                onChange={e => this.onAddImageFile(e, index)}
                ref={fileInput => (this[`imageInput${index}`] = fileInput)}
              />
            </div>
          )
        ) : null
      )}
    </div>
  );

  renderAddNewBtn = (data, index, isLast) => {
    return (
      <div
        className={
          !isLast
            ? "additional-image-container"
            : "additional-image-container last-additional-image-container"
        }
      >
        <div
          className="add-image-button-container"
          onClick={e => this.triggerImageInput(e, index)}
        >
          <div className="add-image-button">+</div>
        </div>
      </div>
    );
  };
}

UploadImageForm.propTypes = {
  data: PropTypes.array.isRequired,
  onAdd: PropTypes.func.isRequired,
  onRemove: PropTypes.func.isRequired,
  onRef: PropTypes.func
};

export default UploadImageForm;
