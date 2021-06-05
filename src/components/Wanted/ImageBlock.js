import React from "react";
import WantedImage from "../../assets/img/svg/wanted-img.svg";
var Translate = require("react-redux-i18n").Translate;

const ImageBlock = () => (
  <div className="img-blc">
    <p className="img-blc-title">
      <Translate value="wanted.looking_material" />
    </p>
    <img src={WantedImage} alt="" />
    <p className="img-blc-header">
      <Translate value="wanted.be_first" />
    </p>
    <p className="img-blc-description">
      <Translate value="wanted.add_material_text" />
    </p>
  </div>
);

export default ImageBlock;
