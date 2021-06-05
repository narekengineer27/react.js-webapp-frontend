import React from "react";
import Swiper from "react-id-swiper";
var I18n = require('react-redux-i18n').I18n;

class SlidePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      swiper: null
    };
  }

  pageSlideItems = [
    {
      image: "https://plast-asset.s3.amazonaws.com/1.png",
      title: I18n.t("landing.slide_first_title"),
      description: I18n.t("landing.slide_first_desc")
    },
    {
      image: "https://plast-asset.s3.amazonaws.com/2.png",
      title: I18n.t("landing.slide_second_title"),
      description: I18n.t("landing.slide_second_desc")
    },
    {
      image: "https://plast-asset.s3.amazonaws.com/3.png",
      title: I18n.t("landing.slide_third_title"),
      description: I18n.t("landing.slide_third_desc")
    },
    {
      image: "https://plast-asset.s3.amazonaws.com/4.png",
      title: I18n.t("landing.slide_fourth_title"),
      description: I18n.t("landing.slide_fourth_desc")
    },
    {
      image: "https://plast-asset.s3.amazonaws.com/5.png",
      title: I18n.t("landing.slide_fifth_title"),
      description: I18n.t("landing.slide_fifth_desc")
    },
    {
      image: "https://plast-asset.s3.amazonaws.com/6.png",
      title: I18n.t("landing.slide_sixth_title"),
      description: I18n.t("landing.slide_sixth_desc")
    }
  ];

  slideChange = () => {
    const { blockUp, blockDown, currentPage, isMobile } = this.props;
    const { swiper } = this.state;
    if (isMobile) return
    if (currentPage !== 3) {
      blockDown(false)
      blockUp(false)
      return
    }
    if (swiper.activeIndex < 5) {
      blockDown(true);
    } else {
      setTimeout(() => blockDown(false), 1000);
    }
    if (swiper.activeIndex > 0) {
      blockUp(true);
    } else {
      setTimeout(() => blockUp(false), 1000);
    }
  };

  render() {
    const params = {
      slidesPerView: 1,
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev"
      },
      pagination: {
        el: ".swiper-pagination",
        type: "bullets",
        clickable: true
      },
      mousewheel: true,
      on: {
        slideChange: this.slideChange
      }
    };

    const slidePages = this.pageSlideItems.map(item => (
      <div
        key={item.title}
        className="landing-slide-main"
        style={{ backgroundImage: `url(${item.image})` }}
      >
        <div className="sliding-filter-sheet"></div>
        <div className="main-content">
          <div className="slide-title">{item.title}</div>
          <div className="slide-desc">{item.description}</div>
        </div>
      </div>
    ))

    // if (this.props.isMobile) return slidePages
    return (
      <Swiper {...params} getSwiper={swiper => this.setState({ swiper })}>
        {slidePages}
      </Swiper>
    );
  }
}

export default SlidePage;
