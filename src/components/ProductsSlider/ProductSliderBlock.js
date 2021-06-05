import React, { Component } from "react";
import Swiper from "react-id-swiper";
var Translate = require("react-redux-i18n").Translate;

class ProductSliderBlock extends Component {
  render = () => {
    const count =
      this.props.productList.length < 4 ? this.props.productList.length : 4;
    const params = {
      slidesPerView: count,
      freeMode: true,
      spaceBetween: 16,

      navigation:
        this.props.productList.length !== 0
          ? {
              nextEl: ".swiper-button-next",
              prevEl: ".swiper-button-prev"
            }
          : {
              nextEl: "",
              prevEl: ""
            },
      containerClass: "products-slider-blc",
      breakpoints: {
        1024: {
          slidesPerView: 4,
          spaceBetween: 12
        },
        920: {
          slidesPerView: 3,
          spaceBetween: 10
        },
        768: {
          slidesPerView: 3,
          spaceBetween: 5
        },
        640: {
          slidesPerView: 3,
          spaceBetween: 2
        },
        512: {
          slidesPerView: 2,
          spaceBetween: 10
        },
        400: {
          slidesPerView: 1,
          spaceBetween: 16
        },
        320: {
          slidesPerView: 1,
          spaceBetween: 5
        }
      }
    };

    return count !== 0 ? (
      <Swiper {...params}>
        {this.props.productList.map((item, index) => (
          <div
            key={index}
            onClick={
              this.props.isProductDetail
                ? () => this.props.onGoToOtherListing(item.id)
                : () => this.props.onGoToProductEdit(item.id)
            }
          >
            <div className="card">
              <div className="card-imgholder">
                <img className="card-images" src={item.image} alt=""></img>
              </div>
              <div className="card-info">
                <div className="card-info-header">
                  <h2 className="card-name">{item.title}</h2>
                </div>
                <div className="card-info-footer">
                  <div className="card-price">
                    {item.status === "Active" && (
                      <div>
                        <span
                          ref={spanRef => {
                            if (spanRef) spanRef.innerHTML = item.Currency.symbol;
                          }}
                        />
                        {item.pricePerUnit}/{item.unit === "mt" ? "t" : item.unit}
                      </div>
                    )}
                    {item.status === "Pending" && (
                      <div>
                        <span>- -</span>
                      </div>
                    )}
                    {item.isAuction && (
                      <span className="auc-sign">
                        <Translate value="auction.sign" />
                      </span>
                    )}
                  </div>
                  <div className="card-location">{item.formatted_address}</div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </Swiper>
    ) : null;
  };
}

export default ProductSliderBlock;
