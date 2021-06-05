import React, { useState } from "react";
import FsLightbox from "fslightbox-react";
import ProductImage from "./ProductImage";
import Poster from "../../assets/img/poster.jpeg";

const MainImage = props => {
  const [toggler, setToggler] = useState(false);
  const { imgLink, imgAlt, type } = props;
  const fileType = type === "VIDEO" ? "video" : "image";
  const posterUrl = type === "VIDEO" ? Poster : imgLink;

  return (
    <React.Fragment>
      <div onClick={() => setToggler(!toggler)}>
        <ProductImage
          className="gallery-big"
          imgLink={posterUrl}
          alt={imgAlt}
        />
      </div>
      <FsLightbox toggler={toggler} type={fileType} sources={[imgLink]} />
    </React.Fragment>
  );
};

export default MainImage;
