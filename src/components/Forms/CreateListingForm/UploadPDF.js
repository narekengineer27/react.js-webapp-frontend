import React from "react";

import { Button } from "../../UIComponents";
var I18n = require("react-redux-i18n").I18n;

class UploadPDF extends React.Component {
  render = () => {
    const { data, pdfUrl, onRemove } = this.props;

    return (
      <div>
        <div className="row">
          <div className="col-6">{this.renderUploadBtn()}</div>
          <div className="col-6">
            {this.renderPDFInput()}
            <div className="video-hint">Lorem Ipsum...</div>
            {data || pdfUrl ? this.renderPDFShow(data, pdfUrl, onRemove) : null}
          </div>
        </div>
      </div>
    );
  };

  triggerClickFileInput = e => {
    this.fileInput.click();
  };

  renderPDFInput = () => (
    <input
      type="file"
      accept="pdf/*"
      className="upload-file"
      onChange={e => this.handleChangePDF(e.target.files)}
      ref={fileInput => {
        if (fileInput) this.fileInput = fileInput;
      }}
      multiple
    />
  );

  renderUploadBtn = () => (
    <div className="upload-pdf-button-container">
      <div className="upload-pdf-button" onClick={this.triggerClickFileInput}>
        <div>
          <div className="icon">
            <i className="fas fa-file-pdf" />
          </div>
          <div className="title">{I18n.t("create_listing.add_pdf")}</div>
        </div>
      </div>
    </div>
  );

  renderPDFShow = (data, pdfUrl, onRemove) => {
    const isUpload = pdfUrl ? false : true;
    const pdfName = pdfUrl
      ? pdfUrl.url
          .substring(pdfUrl.url.lastIndexOf("/") + 1)
          .split("+")
          .join(" ")
      : null;

    let items = isUpload ? data : pdfUrl;

    return items.map((item, index) => {
      return (
        <div className="container mt-2" key={index}>
          <Button
            outline={true}
            size="sm"
            onClick={
              isUpload ? e => this.handleRemove(item) : e => onRemove(item.url)
            }
            title={I18n.t("common.remove")}
            color="#ff0000"
            borderColor="danger"
          />
          <span className="pdf-name">{isUpload ? item.name : pdfName}</span>
        </div>
      );
    });
  };

  handleChangePDF = files => {
    let currentFiles = [];
    for (let i = 0; i < files.length; i++) {
      currentFiles.push(files[i]);
    }
    this.props.onChangePDF(currentFiles);
  };

  handleRemove = item => {
    let newPDF = [];
    let pdfs = this.props.data;
    newPDF = pdfs.filter(itm => itm.name !== item.name);

    this.props.onChangePDF(newPDF);
  };
}

export default UploadPDF;
