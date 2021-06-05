import React from "react";
import PropTypes from "prop-types";

import { Button } from "../../UIComponents";
var Translate = require("react-redux-i18n").Translate;
var I18n = require("react-redux-i18n").I18n;

class UploadVideoForm extends React.Component {
  render = () => {
    const { data, videoUrl, onChange, onRemove } = this.props;

    return (
      <div>
        <div className="row">
          <div className="col-6">{this.renderUploadBtn()}</div>
          <div className="col-6">
            {this.renderNote()}
            {data || videoUrl
              ? this.renderVideoShow(data, videoUrl, onChange, onRemove)
              : null}
          </div>
        </div>
        {this.renderVideoInput(onChange)}
      </div>
    );
  };

  triggerClickFileInput = e => {
    this.fileInput.click();
  };

  renderNote = () => (
    <div className="mt-2 mb-2 main-color video-hint">
      <strong>
        <Translate value="create_listing.video_text" />
      </strong>
      .
    </div>
  );

  renderVideoInput = onChange => (
    <input
      type="file"
      accept="video/*"
      className="upload-file"
      onChange={e => onChange(e.target.files[0])}
      ref={fileInput => (this.fileInput = fileInput)}
    />
  );

  renderUploadBtn = () => (
    <div className="upload-video-button-container">
      <div className="upload-video-button" onClick={this.triggerClickFileInput}>
        <div>
          <div className="icon">
            <i className="fas fa-play" />
          </div>
          <div className="title">{I18n.t("create_listing.add_video")}</div>
        </div>
      </div>
    </div>
  );

  renderVideoShow = (data, videoUrl, onChange, onRemove) => {
    const isUpload = videoUrl ? false : true;
    const videoName = videoUrl
      ? videoUrl.url
          .substring(videoUrl.url.lastIndexOf("/") + 1)
          .split("+")
          .join(" ")
      : null;
    return (
      <div className="container mt-2">
        <Button
          outline={true}
          size="sm"
          onClick={isUpload ? e => onChange(null) : e => onRemove(videoUrl)}
          title={I18n.t("common.remove")}
          color="#ff0000"
          borderColor="danger"
        />
        <span className="video-name">{isUpload ? data.name : videoName}</span>
      </div>
    );
  };
}

UploadVideoForm.propTypes = {
  data: PropTypes.object,
  onChange: PropTypes.func.isRequired
};

export default UploadVideoForm;
