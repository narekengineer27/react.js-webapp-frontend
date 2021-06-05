import React, { useState } from "react";
import Swiper from "react-id-swiper";
import FsLightbox from "fslightbox-react";

import ProductImage from "./ProductImage";
import Poster from "../../assets/img/poster.jpeg";

const ImageSlider = props => {
  const [toggler, setToggler] = useState(false);
  const { files, className } = props;
  const params = {
    navigation: {
      nextEl: "",
      prevEl: ""
    },
    spaceBetween: 16,
    freeMode: true,
    slidesPerView: 4,
    containerClass: "slider-nav",
    slideClass: "slider-nav-element",
    breakpoints: {
      400: {
        slidesPerView: 3,
        spaceBetween: 16
      },
      300: {
        slidesPerView: 3,
        spaceBetween: 10
      },
      200: {
        slidesPerView: 1,
        spaceBetween: 10
      },
      100: {
        slidesPerView: 1,
        spaceBetween: 10
      }
    }
  };
  if (!files || files.length === 0) return null;
  let sources = [], types = [], posterUrl = [];

  files.map(file => {
    sources.push(file.url);
    types.push(file.type === "VIDEO" ? "video" : null);
    posterUrl.push(file.type === "VIDEO" ? Poster : file.url)
    return null;
  });

  return (
    <React.Fragment>
      <div className={className} onClick={() => setToggler(!toggler)}>
        <Swiper {...params}>
          {posterUrl.map(url => (
            <ProductImage imgLink={url} alt="img" key={url} />
          ))}
        </Swiper>
      </div>
      <FsLightbox
        toggler={toggler}
        type="image"
        types={types}
        sources={sources}
      />
    </React.Fragment>
  );
};

export default ImageSlider;
